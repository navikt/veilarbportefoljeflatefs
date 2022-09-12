import innloggetVeileder from './innloggetVeileder';
import me from './me';
import brukere, {hentArbeidsliste, hentArbeidslisteForBruker, hentMockPlan} from './portefolje';
import {veilederResponse} from './veiledere';
import statustall from './statustall';
import tiltak from './tiltak';
import {veiledergrupper} from './veiledergrupper';
import lagPortefoljeStorrelser from './portefoljestorrelser';
import features from './features';
import {faker} from '@faker-js/faker/locale/nb_NO';
import FetchMock, {MiddlewareUtils} from 'yet-another-fetch-mock';
import {delayed, jsonResponse} from './utils';
import {mineFilter} from './mine-filter';
import {LagretFilter, SorteringOgId} from '../ducks/lagret-filter';
import {hentSystemmeldinger} from './systemmeldinger';
import {endringsloggListe} from './endringslogg';

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

let customVeiledergrupper = veiledergrupper();
let customMineFilter = mineFilter();

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(500), MiddlewareUtils.loggingMiddleware())
});

// Azure Ad
mock.get(
    '/auth/info',
    jsonResponse({
        loggedIn: true,
        expirationTime: '2040-07-04T14:18:54.000Z',
        remainingSeconds: 60 * 60
    })
);

// features
mock.get('/veilarbportefoljeflatefs/api/feature', jsonResponse(features));

//veiledergrupper
mock.get('/veilarbfilter/api/enhet/:enhetId/', jsonResponse(customVeiledergrupper));

mock.put('/veilarbfilter/api/enhet/:enhetId', ({body}, res, ctx) => {
    let oppdatertGruppe = {};
    customVeiledergrupper = customVeiledergrupper.map(v => {
        if (v.filterId === body.filterId) {
            oppdatertGruppe = {...v, filterNavn: body.filterNavn, filterValg: body.filterValg};
            return oppdatertGruppe;
        }
        return v;
    }) as LagretFilter[];
    return res(ctx.json(oppdatertGruppe));
});

mock.post('/veilarbfilter/api/enhet/:enhetId', (req, res, ctx) => {
    const filterId = Math.floor(Math.random() * 100) + 500;
    customVeiledergrupper = [...customVeiledergrupper, {...req.body, filterId}];
    return res(ctx.json({...req.body, filterId}));
});

mock.delete('/veilarbfilter/api/enhet/:enhetId/filter/:filterId', (req, res, ctx) => {
    const filterId = parseInt(req.pathParams.filterId);
    if (!isNaN(filterId)) {
        customVeiledergrupper = customVeiledergrupper.filter(v => v.filterId !== filterId);
        return res(ctx.status(200));
    }
    return res(ctx.status(401));
});

//mine filter
mock.get('/veilarbfilter/api/minelagredefilter/', jsonResponse(customMineFilter));

mock.put('/veilarbfilter/api/minelagredefilter/', ({body}, res, ctx) => {
    let filterIndex = customMineFilter.findIndex(elem => elem.filterId === body.filterId);
    const aktiv = true;
    customMineFilter[filterIndex] = {...body, aktiv};
    return res(ctx.json(customMineFilter[filterIndex]));
});

mock.post('/veilarbfilter/api/minelagredefilter/', (req, res, ctx) => {
    const filterId = Math.floor(Math.random() * 100) + 500;
    const aktiv = true;
    customMineFilter = [...customMineFilter, {...req.body, filterId, aktiv}];
    return res(ctx.json({...req.body, filterId, aktiv}));
});

mock.delete('/veilarbfilter/api/minelagredefilter/:filterId', (req, res, ctx) => {
    const filterId = parseInt(req.pathParams.filterId);
    if (!isNaN(filterId)) {
        customMineFilter = customMineFilter.filter(v => v.filterId !== filterId);
        return res(ctx.status(200));
    }
    return res(ctx.status(401));
});

mock.post('/veilarbfilter/api/minelagredefilter/lagresortering/', (req, res, ctx) => {
    const sorteringer = req.body as SorteringOgId[];
    sorteringer.forEach(elem => {
        const customMineFilterElem = customMineFilter.find(filter => elem.filterId === filter.filterId);
        if (customMineFilterElem) {
            customMineFilterElem.sortOrder = elem.sortOrder;
        }
    });
    return res(ctx.json(customMineFilter), ctx.status(200));
});

mock.post('/poao-sanity/analytics/session-duration', (req, res, ctx) => {
    return res(ctx.json([]));
});

mock.post('/poao-sanity/endringslogg', (req, res, ctx) => {
    return res(ctx.json(endringsloggListe));
});

mock.post('/poao-sanity/analytics/session-duration', (req, res, ctx) => {
    return res(ctx.json([]));
});
mock.patch('/poao-sanity/analytics/modal-open', (req, res, ctx) => res(ctx.json([])));

// veileder-api
mock.get('/veilarbveileder/api/veileder/v2/me', jsonResponse(innloggetVeileder));
mock.get('/veilarbveileder/api/enhet/:enhetId/veiledere', jsonResponse(veilederResponse));
mock.get('/veilarbveileder/api/veileder/enhet/:enhetId/tilgangTilEnhet', jsonResponse(true));

// portefolje-api
mock.get('/veilarbportefolje/api/enhet/:enhetId/statustall', delayed(500, jsonResponse(statustall)));
mock.post('/veilarbportefolje/api/enhet/:enhetId/portefolje', (req, res, ctx) =>
    res(ctx.json(lagPortefolje(req.queryParams, req.pathParams.enhetId, brukere)))
);
mock.get('/veilarbportefolje/api/enhet/:enhetId/portefoljestorrelser', jsonResponse(lagPortefoljeStorrelser()));
mock.post('/veilarbportefolje/api/veileder/:ident/portefolje', (req, res, ctx) =>
    res(ctx.json(lagPortefoljeForVeileder(req.queryParams, brukere)))
);
mock.get('/veilarbportefolje/api/veileder/:veileder/statustall', delayed(500, jsonResponse(statustall)));
mock.get('/veilarbportefolje/api/enhet/:enhetId/tiltak', jsonResponse(tiltak));
mock.get('/veilarbportefolje/api/veileder/:veileder/hentArbeidslisteForVeileder', jsonResponse(hentArbeidsliste()));
mock.get('/veilarbportefolje/api/arbeidsliste/:fodselsnummer', (req, res, ctx) =>
    res(ctx.json(hentArbeidslisteForBruker(req.pathParams)))
);

mock.get('/veilarbportefolje/api/veileder/:veileder/moteplan', jsonResponse(hentMockPlan()));

// situasjon-api
function tildel(body: any) {
    return {feilendeTilordninger: []}; //uten feilende brukere
    //return {feilendeTilordninger: [body[0]]}; //noen feilende brukere
    //return {feilendeTilordninger: body}; //alle feilende brukere
}

//veilarbvedtakstøtte
mock.get('/veilarbvedtaksstotte/api/utrulling/erUtrullet', jsonResponse(true));

mock.post('/veilarboppfolging/api/tilordneveileder/', ({body}, res, ctx) => res(ctx.json(tildel(body))));

// arbeidsliste-api
mock.post('/veilarbportefolje/api/arbeidsliste/', (req, res, ctx) =>
    res(ctx.json({error: [], data: req.body.map(arbeidsliste => arbeidsliste.fnr)}))
);

mock.put('/veilarbportefolje/api/arbeidsliste/:fnr', ({body}, res, ctx) =>
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
);

mock.post('/veilarbportefolje/api/arbeidsliste/delete', ({body}, res, ctx) =>
    res(ctx.json({error: [], data: body.map(arbeidsliste => arbeidsliste.fnr)}))
);

// modiacontextholder-api

mock.get(
    '/modiacontextholder/api/context/aktivenhet',
    delayed(
        500,
        jsonResponse({
            aktivBruker: null,
            aktivEnhet: '1234'
        })
    )
);

mock.get(
    '/modiacontextholder/api/context/aktivbruker',
    delayed(
        500,
        jsonResponse({
            aktivBruker: null,
            aktivEnhet: null
        })
    )
);

mock.delete(
    '/modiacontextholder/api/context/aktivbruker',
    delayed(
        500,
        jsonResponse({
            aktivBruker: null,
            aktivEnhet: null
        })
    )
);

mock.get(
    '/modiacontextholder/api/decorator',
    delayed(
        500,
        jsonResponse({
            enheter: innloggetVeileder.enheter,
            etternavn: innloggetVeileder.etternavn,
            fornavn: innloggetVeileder.fornavn,
            ident: innloggetVeileder.ident,
            navn: innloggetVeileder.navn
        })
    )
);

mock.get('/poao-sanity/systemmeldinger', jsonResponse(hentSystemmeldinger()));

// websocket
class MockWebSocket {
    constructor(uri: string) {
        console.log('MOCK WS: Tried to connect to: ' + uri);
    }

    addEventListener() {}
    close() {}
}

(window as any).WebSocket = MockWebSocket;
