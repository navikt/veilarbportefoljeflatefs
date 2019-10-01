import { mock, delayed, respondWith, randomFailure } from './utils';
import enheter from './enheter';
import me from './me';
import brukere from './portefolje';
import veiledere from './veiledere';
import { statustall}  from './statustall';
import tiltak from './tiltak';
import diagramdata from './diagramdata';
import lagDiagramData from './diagramdataV2';
import lagPortefoljeStorrelser from './portefoljestorrelser';
import features from './features';
import { API_BASE_URL, FEATURE_URL } from '../middleware/api';
import { endringsloggListe } from './endringslogg';
import {BrukerModell, FiltervalgModell} from "../model-interfaces";

function lagPortefoljeForVeileder(queryParams, alleBrukere) {
    const enhetportefolje = lagPortefolje(queryParams, enheter.enhetliste[0].enhetId, alleBrukere);
    enhetportefolje.brukere.forEach((bruker) => bruker.veilederId = me.ident);
    return enhetportefolje;
}

function kjonnFilter (f: BrukerModell, kjonn: string[]| undefined) {
    if(!kjonn) {
        return true;
    }
    return kjonn.reduce((acc, elem) => (elem === "K" && f.kjonn === "K") || (elem === "M" && f.kjonn === "M"), true)
}

function filterIshFerdigFilter (f: BrukerModell, ferdigfilterListe: string[]) {
    return ferdigfilterListe.reduce((acc, elem) => {
        switch (elem) {
            case "UFORDELTE_BRUKERE":
                return acc && f.nyForEnhet;
            case "TRENGER_VURDERING":
                return acc && f.trengerVurdering;
            case "ER_SYKMELDT_MED_ARBEIDSGIVER":
                return acc && f.erSykmeldtMedArbeidsgiver;
            case "MOTER_IDAG" :
                return acc && !!f.moteStartTid && !!f.moteSluttTid;
            case "VENTER_PA_SVAR_FRA_BRUKER":
                return acc && !!f.venterPaSvarFraBruker;
            case "VENTER_PA_SVAR_FRA_NAV":
                return acc && !!f.venterPaSvarFraNAV;
            default:
                return acc;
        }
    } , true);
}

function filtrerBruker (alleBruker: BrukerModell[] , bodyParams?: FiltervalgModell ) {
    return bodyParams
        ? alleBruker
            .filter(b => filterIshFerdigFilter(b, bodyParams.ferdigfilterListe))
            .filter(b => kjonnFilter(b, bodyParams.kjonn))
        : alleBruker;
}


function lagPortefolje(queryParams, enhet, alleBrukere, bodyParams?: FiltervalgModell) {
    const { fra, antall } = queryParams;

    const maybeFra = parseInt(fra, 10);
    const maybeAntal = parseInt(antall, 10);

    const fraInt = isNaN(maybeFra) ? 0 : maybeFra;
    const antallInt = isNaN(maybeAntal) ? alleBrukere.length : maybeAntal;

    const filtrerteBrukere = alleBrukere
        .slice(fraInt, fraInt + antallInt)
        .map((bruker, index) => {
            if (index < 5) {
                bruker.fnr = '';
                bruker.fornavn = '';
                bruker.etternavn = '';
                bruker.kjonn = '';
                bruker.fodselsdato = null;
                bruker.diskresjonskode = Math.random() < 0.5 ? '6' : '7';
                bruker.oppfolgingStartDato = new Date(+(new Date()) - Math.floor(Math.random()*10000000000));

            }
            return bruker;
        });

    return {
        enhet,
        antallTotalt: alleBrukere.length,
        antallReturnert: antallInt,
        fraIndex: fraInt,
        brukere: filtrerBruker(filtrerteBrukere, bodyParams)
    };
}

// features
(mock as any).get(`glob:${API_BASE_URL}${FEATURE_URL}*`, respondWith(features));

// endringslogg
(mock as any).patch(`/veilarbremotestore/`, respondWith((url, config, {bodyParams}) => Object.assign(endringsloggListe, bodyParams)));

(mock as any).get('/veilarbremotestore/?ressurs=endringslogg', respondWith(() => endringsloggListe));

// veileder-api
(mock as any).get('/veilarbveileder/api/veileder/enheter', respondWith(enheter));
(mock as any).get('/veilarbveileder/api/veileder/me', respondWith(me));
(mock as any).get('express:/veilarbveileder/api/enhet/:enhet/veiledere', respondWith(veiledere));

// portefolje-api
(mock as any).get('express:/veilarbportefolje/api/enhet/:enhet/statustall', respondWith(delayed(1000, randomFailure(statustall(brukere)))));
(mock as any).post('express:/veilarbportefolje/api/enhet/:enhet/portefolje*', respondWith((url, config, { queryParams, bodyParams, extra }) => lagPortefolje(queryParams, extra.enhet, brukere, bodyParams)));
(mock as any).get('express:/veilarbportefolje/api/enhet/:enhet/portefoljestorrelser*', respondWith(() => lagPortefoljeStorrelser()));
(mock as any).post('express:/veilarbportefolje/api/veileder/:ident/portefolje*', respondWith((url, config, { queryParams, bodyParams, extra }) => lagPortefoljeForVeileder(queryParams, brukere)));
(mock as any).get('express:/veilarbportefolje/api/veileder/:veileder/statustall*', respondWith(delayed(1000, randomFailure(statustall(brukere)))));
(mock as any).get('express:/veilarbportefolje/api/enhet/:enhet/tiltak', () => respondWith(tiltak));

// diagram-api
(mock as any).post('express:/veilarbportefolje/api/diagram/v2*', () => respondWith((url, config, { queryParams, bodyParams, extra }) => lagDiagramData(bodyParams)));
(mock as any).post('express:/veilarbportefolje/api/diagram*', () => respondWith(diagramdata));

// situasjon-api
(mock as any).post('/veilarboppfolging/api/tilordneveileder/', respondWith(delayed(1000, randomFailure({ feilendeTilordninger: ['11111111111','22222222222'] }))));

// arbeidsliste-api
(mock as any).post('/veilarbportefolje/api/arbeidsliste/', respondWith((url, config, {bodyParams}) => {
    return {error: [], data: bodyParams.map((arbeidsliste) => arbeidsliste.fnr)};
}));
(mock as any).put('/veilarbportefolje/api/arbeidsliste/:fnr', respondWith((url, config, {bodyParams}) => {
    return {
        sistEndretAv : {
            veilederId : 'Z990007'
        },
        endringstidspunkt : '2018-06-21T10:39:17.153Z',
        kommentar : `${bodyParams.kommentar}`,
        overskrift : `${bodyParams.overskrift}`,
        frist : `${bodyParams.frist}`,
        isOppfolgendeVeileder : true,
        arbeidslisteAktiv : null,
        harVeilederTilgang : true
    };
}));

(mock as any).post('/veilarbportefolje/api/arbeidsliste/delete', respondWith((url, config, {bodyParams}) => {
    return {error: [], data: bodyParams.map((arbeidsliste) => arbeidsliste.fnr)};
}));

// modiacontextholder-api
(mock as any).post('/modiacontextholder/api/context', respondWith(delayed(1000, randomFailure({ error: ['111111111111', '222222222222'], data: [] }))));

(mock as any).mock('*', respondWith((url, config) => (mock as any).realFetch.call(window, url, config)));

// websocket
class MockWebSocket {
    constructor(uri: string) {
        console.log("MOCK WS: Tried to connect to: " + uri); // tslint:disable-line
    }
    addEventListener() {} // tslint:disable-line
    close() {} // tslint:disable-line
}

(window as any).WebSocket = MockWebSocket; // tslint:disable-line
