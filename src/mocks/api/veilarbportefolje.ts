import {FetchMockHandler} from '../index';
import {delayed, jsonResponse} from '../utils';
import {statustallEnhet, statustallVeileder} from '../data/statustall';
import brukere, {hentArbeidsliste, hentArbeidslisteForBruker, hentMockPlan} from '../data/portefolje';
import lagPortefoljeStorrelser from '../data/portefoljestorrelser';
import tiltak from '../data/tiltak';
import FetchMock from 'yet-another-fetch-mock';
import innloggetVeileder from '../data/innloggetVeileder';
import me from '../data/me';
import {faker} from '@faker-js/faker/locale/nb_NO';
import {foedelandListMockData} from '../data/foedeland';
import {tolkebehovSpraakMockData} from '../data/tolkebehovSpraak';
import {geografiskBostedListMockData} from '../data/geografiskBosted';

function lagPortefoljeForVeileder(queryParams, alleBrukere) {
    const enhetportefolje = lagPortefolje(queryParams, innloggetVeileder.enheter[0].enhetId, alleBrukere);
    enhetportefolje.brukere.forEach(bruker => (bruker.veilederId = me.ident));
    return enhetportefolje;
}

function lagPortefolje(queryParams, enhet, alleBrukere) {
    const {fra, antall} = queryParams;
    const maybeFra = parseInt(fra, 10);
    const maybeAntal = parseInt(antall, 10);

    const fraInt = isNaN(maybeFra) ? 0 : maybeFra;
    const antallInt = isNaN(maybeAntal) ? alleBrukere.length : maybeAntal;

    const filtrerteBrukere = alleBrukere.slice(fraInt, fraInt + antallInt).map((bruker, index) => {
        if (index < 2) {
            bruker.fnr = '';
            bruker.fornavn = '';
            bruker.etternavn = '';
            bruker.kjonn = '';
            bruker.fodselsdato = null;
            bruker.diskresjonskode = index === 0 ? '6' : '7';
            bruker.oppfolgingStartdato = faker.date.between(new Date('2015-01-01'), new Date());
            bruker.erPermittertEtterNiendeMars = true;
        }
        return bruker;
    });

    return {
        enhet,
        antallTotalt: alleBrukere.length,
        antallReturnert: antallInt,
        fraIndex: fraInt,
        brukere: filtrerteBrukere
    };
}

let foedeland = foedelandListMockData();
let tolkebehovSpraak = tolkebehovSpraakMockData();
let geografiskBosted = geografiskBostedListMockData();

export const veilarbportefoljeHandlers: FetchMockHandler[] = [
    (fetchMock: FetchMock) =>
        fetchMock.get(
            '/veilarbportefolje/api/enhet/:enhetId/statustall',
            delayed(500, jsonResponse(statustallVeileder))
        ),
    (fetchMock: FetchMock) =>
        fetchMock.get(
            '/veilarbportefolje/api/enhet/:enhetId/portefolje/statustall',
            delayed(500, jsonResponse(statustallEnhet))
        ),
    (fetchMock: FetchMock) =>
        fetchMock.post('/veilarbportefolje/api/enhet/:enhetId/portefolje', (req, res, ctx) =>
            res(ctx.json(lagPortefolje(req.queryParams, req.pathParams.enhetId, brukere)))
        ),
    (fetchMock: FetchMock) =>
        fetchMock.get(
            '/veilarbportefolje/api/enhet/:enhetId/portefoljestorrelser',
            jsonResponse(lagPortefoljeStorrelser())
        ),
    (fetchMock: FetchMock) =>
        fetchMock.post('/veilarbportefolje/api/veileder/:ident/portefolje', (req, res, ctx) =>
            res(ctx.json(lagPortefoljeForVeileder(req.queryParams, brukere)))
        ),
    (fetchMock: FetchMock) =>
        fetchMock.get(
            '/veilarbportefolje/api/veileder/:veileder/statustall',
            delayed(500, jsonResponse(statustallVeileder))
        ),
    (fetchMock: FetchMock) =>
        fetchMock.get(
            '/veilarbportefolje/api/veileder/:veileder/portefolje/statustall',
            delayed(500, jsonResponse(statustallVeileder))
        ),
    (fetchMock: FetchMock) => fetchMock.get('/veilarbportefolje/api/enhet/:enhetId/tiltak', jsonResponse(tiltak)),
    (fetchMock: FetchMock) =>
        fetchMock.get(
            '/veilarbportefolje/api/veileder/:veileder/hentArbeidslisteForVeileder',
            jsonResponse(hentArbeidsliste())
        ),
    (fetchMock: FetchMock) =>
        fetchMock.post('/veilarbportefolje/api/v2/hent-arbeidsliste', (req, res, ctx) =>
            res(ctx.json(hentArbeidslisteForBruker(req.pathParams)))
        ),
    (fetchMock: FetchMock) =>
        fetchMock.get('/veilarbportefolje/api/veileder/:veileder/moteplan', jsonResponse(hentMockPlan())),
    (fetchMock: FetchMock) =>
        fetchMock.post('/veilarbportefolje/api/arbeidsliste', (req, res, ctx) =>
            res(ctx.json({error: [], data: req.body.map(arbeidsliste => arbeidsliste.fnr)}))
        ),
    (fetchMock: FetchMock) =>
        fetchMock.put('/veilarbportefolje/api/v2/arbeidsliste', ({body}, res, ctx) =>
            res(
                ctx.json({
                    sistEndretAv: {
                        veilederId: 'Z990007'
                    },
                    endringstidspunkt: '2018-06-21T10:39:17.153Z',
                    kommentar: `${body.kommentar}`,
                    overskrift: `${body.overskrift}`,
                    frist: `${body.frist}`,
                    kategori: `${body.kategori}`,
                    isOppfolgendeVeileder: true,
                    arbeidslisteAktiv: null,
                    harVeilederTilgang: true
                })
            )
        ),
    (fetchMock: FetchMock) =>
        fetchMock.post('/veilarbportefolje/api/arbeidsliste/delete', ({body}, res, ctx) =>
            res(ctx.json({error: [], data: body.map(arbeidsliste => arbeidsliste.fnr)}))
        ),
    (fetchMock: FetchMock) =>
        fetchMock.get('/veilarbportefolje/api/enhet/:enhetId/foedeland', delayed(500, jsonResponse(foedeland))),
    (fetchMock: FetchMock) =>
        fetchMock.get('/veilarbportefolje/api/enhet/:enhetId/tolkSpraak', delayed(500, jsonResponse(tolkebehovSpraak))),
    (fetchMock: FetchMock) =>
        fetchMock.get(
            '/veilarbportefolje/api/enhet/:enhetId/geografiskbosted',
            delayed(500, jsonResponse(geografiskBosted))
        )
];
