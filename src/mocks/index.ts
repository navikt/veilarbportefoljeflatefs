import inloggetVeileder from './inloggetVeileder';
import me from './me';
import brukere from './portefolje';
import veiledere from './veiledere';
import statustall from './statustall';
import tiltak from './tiltak';
import {veilederGrupper} from './veileder-grupper';
import lagPortefoljeStorrelser from './portefoljestorrelser';
import features from './features';
import {endringsloggListe} from './endringslogg';
import * as faker from 'faker/locale/nb_NO';
import FetchMock, {MatcherUtils, MiddlewareUtils} from 'yet-another-fetch-mock';
import {delayed, jsonResponse} from './utils';
import {LagretFilter} from '../ducks/lagret-filter';
import {lagredeFilter} from "./lagrede-filter";

function lagPortefoljeForVeileder(queryParams, alleBrukere) {
    const enhetportefolje = lagPortefolje(queryParams, inloggetVeileder.enheter[0].enhetId, alleBrukere);
    enhetportefolje.brukere.forEach((bruker) => bruker.veilederId = me.ident);
    return enhetportefolje;
}

function lagPortefolje(queryParams, enhet, alleBrukere) {
    const {fra, antall} = queryParams;
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

let customVeilederGrupper = veilederGrupper();
let customLagredeFilter = lagredeFilter();

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(500),
        MiddlewareUtils.loggingMiddleware()
    )
});

// features
mock.get('/veilarbportefoljeflatefs/api/feature', jsonResponse(features));

// endringslogg
mock.mock(
    MatcherUtils.combine(
        MatcherUtils.method('PATCH'),
        MatcherUtils.url('/veilarbremotestore/'),
    ), (req, res, ctx) => res(
        ctx.json(Object.assign(endringsloggListe, req.body)))
);

mock.get('/veilarbremotestore/', jsonResponse(endringsloggListe));

//veiledergrupper
mock.get('/veilarbfilter/api/enhet/:enhetId/', jsonResponse(customVeilederGrupper));

mock.put('/veilarbfilter/api/enhet/:enhetId', ({body}, res, ctx) => {
        let oppdatertGruppe = {};
        customVeilederGrupper = customVeilederGrupper.map(v => {
            if (v.filterId === body.filterId) {
                oppdatertGruppe = {...v, filterNavn: body.filterNavn, filterValg: body.filterValg};
                return oppdatertGruppe;
            }
            return v;
        }) as LagretFilter[];
        return res(ctx.json(oppdatertGruppe));
    }
);

mock.post('/veilarbfilter/api/enhet/:enhetId', (req, res, ctx) => {
    const filterId = Math.floor(Math.random() * 100) + 500;
    customVeilederGrupper = [...customVeilederGrupper, {...req.body, filterId}];
    return res(
        ctx.json({...req.body, filterId})
    );
});

mock.delete('/veilarbfilter/api/enhet/:enhetId/filter/:filterId', (req, res, ctx) => {
    const {pathParams} = req;
    if (pathParams.filterId) {
        customVeilederGrupper = customVeilederGrupper.filter(v => v.filterId !== pathParams.filterId)
        return res(ctx.status(200));
    }
    return res(ctx.status(401));
});

//lagrede filter
mock.get('/veilarbfilter/api/minelagredefilter/', jsonResponse(customLagredeFilter));


mock.put('/veilarbfilter/api/minelagredefilter/', ({body}, res, ctx) => {
        let oppdatertFilter = {};
        customLagredeFilter = customLagredeFilter.map(filter => {
            if (filter.filterId === body.filterId) {
                oppdatertFilter = {...filter, filterNavn: body.filterNavn, filterValg: body.filterValg};
                return oppdatertFilter;
            }
            return filter;
        }) as LagretFilter [];
        return res(ctx.json(customLagredeFilter));
    }
);

mock.post('/veilarbfilter/api/minelagredefilter/', (req, res, ctx) => {
    const filterId = Math.floor(Math.random() * 100) + 500;
    customLagredeFilter = [...customLagredeFilter, {...req.body, filterId}];
    return res(
        ctx.json({...req.body, filterId})
    );
});

mock.delete('/veilarbfilter/api/minelagredefilter/:filterId', (req, res, ctx) => {
    const {pathParams} = req;
    if (pathParams.filterId) {
        customLagredeFilter = customLagredeFilter.filter(v => v.filterId !== pathParams.filterId);
        return res(ctx.status(200));
    }
    return res(ctx.status(401));
});


// veileder-api
mock.get('/veilarbveileder/api/veileder/v2/me', jsonResponse(inloggetVeileder));
mock.get('/veilarbveileder/api/enhet/:enhetId/veiledere', jsonResponse(veiledere));
mock.get('/veilarbveileder/api/veileder/enhet/:enhetId/tilgangTilEnhet', jsonResponse(true));

// portefolje-api
mock.get('/veilarbportefolje/api/enhet/:enhetId/statustall', delayed(1000, jsonResponse(statustall)));
mock.post('/veilarbportefolje/api/enhet/:enhetId/portefolje', (req, res, ctx) => res(
    ctx.json(lagPortefolje(req.queryParams, req.pathParams.enhetId, brukere))
));
mock.get('/veilarbportefolje/api/enhet/:enhetId/portefoljestorrelser', jsonResponse(lagPortefoljeStorrelser()));
mock.post('/veilarbportefolje/api/veileder/:ident/portefolje', (req, res, ctx) => res(
    ctx.json(lagPortefoljeForVeileder(req.queryParams, brukere))
));
mock.get('/veilarbportefolje/api/veileder/:veileder/statustall', delayed(1000, jsonResponse(statustall)));
mock.get('/veilarbportefolje/api/enhet/:enhetId/tiltak', jsonResponse(tiltak));

// situasjon-api
function tildel(body: any) {
    return {feilendeTilordninger: []}; //uten feilende brukere
    //return {feilendeTilordninger: [body[0]]}; //noen feilende brukere
    //return {feilendeTilordninger: body}; //alle feilende brukere
}

mock.post('/veilarboppfolging/api/tilordneveileder/', ({body}, res, ctx) => res(
    ctx.json(tildel(body))
));

// arbeidsliste-api
mock.post('/veilarbportefolje/api/arbeidsliste/', (req, res, ctx) => res(
    ctx.json({error: [], data: req.body.map((arbeidsliste) => arbeidsliste.fnr)})
));

mock.put('/veilarbportefolje/api/arbeidsliste/:fnr', ({body}, res, ctx) => res(
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
));

mock.post('/veilarbportefolje/api/arbeidsliste/delete', ({body}, res, ctx) => res(
    ctx.json({error: [], data: body.map((arbeidsliste) => arbeidsliste.fnr)})
));

// modiacontextholder-api

mock.get('/modiacontextholder/api/context/aktivenhet', delayed(1000, jsonResponse({
    'aktivBruker': null,
    'aktivEnhet': '1234'
})));

mock.get('/modiacontextholder/api/context/aktivbruker', delayed(1000, jsonResponse({
    'aktivBruker': null,
    'aktivEnhet': null
})));

mock.delete('/modiacontextholder/api/context/aktivbruker', delayed(1000, jsonResponse({
    'aktivBruker': null,
    'aktivEnhet': null
})));

mock.get('/modiacontextholder/api/decorator', delayed(1000, jsonResponse({
    enheter: inloggetVeileder.enheter,
    etternavn: inloggetVeileder.etternavn,
    fornavn: inloggetVeileder.fornavn,
    ident: inloggetVeileder.ident,
    navn: inloggetVeileder.navn
})));

// websocket
class MockWebSocket {
    constructor(uri: string) {
        console.log('MOCK WS: Tried to connect to: ' + uri); // tslint:disable-line
    }

    addEventListener() {
    } // tslint:disable-line
    close() {
    } // tslint:disable-line
}

(window as any).WebSocket = MockWebSocket; // tslint:disable-line
