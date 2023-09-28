import innloggetVeileder from './innloggetVeileder';
import me from './me';
import brukere, {hentArbeidsliste, hentArbeidslisteForBruker, hentMockPlan} from './portefolje';
import {veilederResponse} from './veiledere';
import {statustallEnhet, statustallVeileder} from './statustall';
import tiltak from './tiltak';
import {veiledergrupper} from './veiledergrupper';
import lagPortefoljeStorrelser from './portefoljestorrelser';
import features from './features';
import {faker} from '@faker-js/faker/locale/nb_NO';
import FetchMock, {MiddlewareUtils, MockRequest, ResponseData} from 'yet-another-fetch-mock';
import {delayed, errorResponse, jsonResponse} from './utils';
import {mineFilter} from './mine-filter';
import {LagretFilter, SorteringOgId} from '../ducks/lagret-filter';
import {hentSystemmeldinger} from './systemmeldinger';
import {endringsloggListe} from './endringslogg';
import {geografiskBostedListMockData} from './geografiskBosted';
import {foedelandListMockData} from './foedeland';
import {tolkebehovSpraakMockData} from './tolkebehovSpraak';
import getSessionData, {DEFAULT_SESSION_LIFETIME_IN_SECONDS, defaultSessionDataMockConfig} from './session';
import {SessionMeta} from '../middleware/api';
import {mockApiCalls} from '@navikt/veilarbcontextholder';

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
let foedeland = foedelandListMockData();
let tolkebehovSpraak = tolkebehovSpraakMockData();
let sessionBaseTimestamp = Date.now();
let sessionDataMockConfig = defaultSessionDataMockConfig(sessionBaseTimestamp);
let sessionData: SessionMeta | null = null;

let geografiskBosted = geografiskBostedListMockData();

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(500),
        MiddlewareUtils.loggingMiddleware(),
        (request: MockRequest, response: ResponseData) => {
            if (sesjonUtlopt()) {
                return {status: 401};
            } else {
                return response;
            }
        }
    )
});

const sesjonUtlopt = () => {
    return sessionData?.tokens?.expire_at && Date.now() >= new Date(sessionData?.tokens?.expire_at).getTime();
};

// situasjon-api
function tildel(body: any) {
    return {feilendeTilordninger: []}; //uten feilende brukere
    //return {feilendeTilordninger: [body[0]]}; //noen feilende brukere
    //return {feilendeTilordninger: body}; //alle feilende brukere
}

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
mock.get('/veilarbfilter/api/enhet/:enhetId', jsonResponse(customVeiledergrupper));

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
mock.get('/veilarbfilter/api/minelagredefilter', jsonResponse(customMineFilter));

mock.put('/veilarbfilter/api/minelagredefilter', ({body}, res, ctx) => {
    let filterIndex = customMineFilter.findIndex(elem => elem.filterId === body.filterId);
    const aktiv = true;
    customMineFilter[filterIndex] = {...body, aktiv};
    return res(ctx.json(customMineFilter[filterIndex]));
});

mock.post('/veilarbfilter/api/minelagredefilter', (req, res, ctx) => {
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

mock.post('/veilarbfilter/api/minelagredefilter/lagresortering', (req, res, ctx) => {
    const sorteringer = req.body as SorteringOgId[];
    sorteringer.forEach(elem => {
        const customMineFilterElem = customMineFilter.find(filter => elem.filterId === filter.filterId);
        if (customMineFilterElem) {
            customMineFilterElem.sortOrder = elem.sortOrder;
        }
    });
    return res(ctx.json(customMineFilter), ctx.status(200));
});

mock.post('https://poao-endringslogg.intern.nav.no/analytics/session-duration', (req, res, ctx) => {
    return res(ctx.json([]));
});

mock.post('https://poao-endringslogg.intern.nav.no/endringslogg', (req, res, ctx) => {
    return res(ctx.json(endringsloggListe));
});

mock.post('https://poao-endringslogg.intern.nav.no/analytics/session-duration', (req, res, ctx) => {
    return res(ctx.json([]));
});

// veileder-api
mock.get('/veilarbveileder/api/veileder/v2/me', jsonResponse(innloggetVeileder));
mock.get('/veilarbveileder/api/enhet/:enhetId/veiledere', jsonResponse(veilederResponse));
mock.get('/veilarbveileder/api/veileder/enhet/:enhetId/tilgangTilEnhet', jsonResponse(true));

// portefolje-api
mock.get('/veilarbportefolje/api/enhet/:enhetId/statustall', delayed(500, jsonResponse(statustallVeileder)));
mock.get('/veilarbportefolje/api/enhet/:enhetId/portefolje/statustall', delayed(500, jsonResponse(statustallEnhet)));
mock.post('/veilarbportefolje/api/enhet/:enhetId/portefolje', (req, res, ctx) =>
    res(ctx.json(lagPortefolje(req.queryParams, req.pathParams.enhetId, brukere)))
);
mock.patch('https://poao-endringslogg.intern.nav.no/analytics/modal-open', (req, res, ctx) => res(ctx.json([])));
mock.get('/veilarbportefolje/api/enhet/:enhetId/portefoljestorrelser', jsonResponse(lagPortefoljeStorrelser()));
mock.post('/veilarbportefolje/api/veileder/:ident/portefolje', (req, res, ctx) =>
    res(ctx.json(lagPortefoljeForVeileder(req.queryParams, brukere)))
);
mock.get('/veilarbportefolje/api/veileder/:veileder/statustall', delayed(500, jsonResponse(statustallVeileder)));
mock.get(
    '/veilarbportefolje/api/veileder/:veileder/portefolje/statustall',
    delayed(500, jsonResponse(statustallVeileder))
);
mock.get('/veilarbportefolje/api/enhet/:enhetId/tiltak', jsonResponse(tiltak));
mock.get('/veilarbportefolje/api/veileder/:veileder/hentArbeidslisteForVeileder', jsonResponse(hentArbeidsliste()));
mock.get('/veilarbportefolje/api/arbeidsliste/:fodselsnummer', (req, res, ctx) =>
    res(ctx.json(hentArbeidslisteForBruker(req.pathParams)))
);

mock.get('/veilarbportefolje/api/veileder/:veileder/moteplan', jsonResponse(hentMockPlan()));

//veilarbvedtakstøtte
mock.get('/veilarbvedtaksstotte/api/utrulling/erUtrullet', jsonResponse(true));

mock.post('/veilarboppfolging/api/tilordneveileder', ({body}, res, ctx) => res(ctx.json(tildel(body))));

// arbeidsliste-api
mock.post('/veilarbportefolje/api/arbeidsliste', (req, res, ctx) =>
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

mock.post('/modiacontextholder/api/context', (req, res, ctx) => {
    return res(ctx.status(200));
});

mock.get('/modiacontextholder/api/context', (req, res, ctx) => {
    return res(ctx.json({aktivBruker: '00000123456', aktivEnhet: null}));
});

mock.get('https://poao-sanity.intern.nav.no/systemmeldinger', jsonResponse(hentSystemmeldinger()));

mock.get('/veilarbportefolje/api/enhet/:enhetId/foedeland', delayed(500, jsonResponse(foedeland)));
mock.get('/veilarbportefolje/api/enhet/:enhetId/tolkSpraak', delayed(500, jsonResponse(tolkebehovSpraak)));

mock.get(
    '/oauth2/session',
    delayed(100, (req, res, ctx) => {
        sessionData = getSessionData(sessionDataMockConfig);
        return jsonResponse(sessionData)(req, res, ctx);
    })
);

mock.get(
    '/oauth2/session/refresh',
    delayed(100, (req, res, ctx) => {
        if (sesjonUtlopt()) {
            return errorResponse(401)(req, res, ctx);
        }

        sessionDataMockConfig = defaultSessionDataMockConfig(Date.now(), DEFAULT_SESSION_LIFETIME_IN_SECONDS);
        sessionData = getSessionData(sessionDataMockConfig);
        return jsonResponse(sessionData)(req, res, ctx);
    })
);

mock.get('/veilarbportefolje/api/enhet/:enhetId/geografiskbosted', delayed(500, jsonResponse(geografiskBosted)));

mockApiCalls(mock);

// websocket
class MockWebSocket {
    constructor(uri: string) {
        // eslint-disable-next-line no-console
        console.log('MOCK WS: Tried to connect to: ' + uri);
    }

    addEventListener() {}

    close() {}
}

(window as any).WebSocket = MockWebSocket;
