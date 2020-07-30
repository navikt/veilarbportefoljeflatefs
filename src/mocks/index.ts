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
import FetchMock, {
    HandlerArgument,
    JSONArray,
    MatcherUtils,
    MiddlewareUtils,
    ResponseUtils
} from 'yet-another-fetch-mock';
import {lagredeFilter} from "./lagrede-filter";
import {VeiledergrupperFilter} from "../ducks/veiledergrupper_filter";
import {LagretFilter} from "../ducks/lagret-filter";

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
mock.get('/veilarbportefoljeflatefs/api/feature', features);

// endringslogg
mock.mock(
    MatcherUtils.combine(
        MatcherUtils.method('PATCH'),
        MatcherUtils.url('/veilarbremotestore/'),
    ), (args: HandlerArgument) => Object.assign(endringsloggListe, args.body));

mock.get('/veilarbremotestore/', endringsloggListe);

//lagrede filter
mock.get('/veilarbfilter/api/minelagredefilter/', customLagredeFilter);

mock.put('/veilarbfilter/api/minelagredefilter/', ({body}) => {
        let oppdatertFilter = {};
        customLagredeFilter = customLagredeFilter.map(filter => {
            if (filter.filterId === body.filterId) {
                oppdatertFilter = {...filter, filterNavn: body.filterNavn, filterValg: body.filterValg};
                return oppdatertFilter;
            }
            return filter;
        }) as VeiledergrupperFilter [] & JSONArray;
        return oppdatertFilter;
    }
);

mock.post('/veilarbfilter/api/minelagredefilter/', (args: HandlerArgument) => {
    const filterId = Math.floor(Math.random() * 100) + 500;
    customLagredeFilter = [...customLagredeFilter, {...args.body, filterId}];
    return {...args.body, filterId};
});

mock.delete('/veilarbfilter/api/minelagredefilter/:filterId', (args: HandlerArgument) => {
    const {pathParams} = args;
    if (pathParams.filterId) {
        customLagredeFilter = customLagredeFilter.filter(v => v.filterId !== pathParams.filterId) as LagretFilter [] & JSONArray;
        return {status: 200};
    }
    return {status: 401};
});
//veiledergrupper
mock.get('/veilarbfilter/api/enhet/:enhetId/', customVeilederGrupper);

mock.put('/veilarbfilter/api/enhet/:enhetId', ({body}) => {
        let oppdatertGruppe = {};
        customVeilederGrupper = customVeilederGrupper.map(v => {
            if (v.filterId === body.filterId) {
                oppdatertGruppe = {...v, filterNavn: body.filterNavn, filterValg: body.filterValg};
                return oppdatertGruppe;
            }
            return v;
        }) as VeiledergrupperFilter [] & JSONArray;
        return oppdatertGruppe;
    }
);

mock.post('/veilarbfilter/api/enhet/:enhetId', (args: HandlerArgument) => {
    const filterId = Math.floor(Math.random() * 100) + 500;
    customVeilederGrupper = [...customVeilederGrupper, {...args.body, filterId}];
    return {...args.body, filterId};
});

mock.delete('/veilarbfilter/api/enhet/:enhetId/filter/:filterId', (args: HandlerArgument) => {
    const {pathParams} = args;
    if (pathParams.filterId) {
        customVeilederGrupper = customVeilederGrupper.filter(v => v.filterId !== pathParams.filterId) as VeiledergrupperFilter [] & JSONArray;
        return {status: 200};
    }
    return {status: 401};
});


// veileder-api
mock.get('/veilarbveileder/api/veileder/v2/me', inloggetVeileder);
mock.get('/veilarbveileder/api/enhet/:enhetId/veiledere', veiledere);
mock.get('/veilarbveileder/api/veileder/enhet/:enhetId/tilgangTilEnhet', true);

// portefolje-api
mock.get('/veilarbportefolje/api/enhet/:enhetId/statustall', ResponseUtils.delayed(1000, statustall));
mock.post('/veilarbportefolje/api/enhet/:enhetId/portefolje', (args: HandlerArgument) => lagPortefolje(args.queryParams, args.pathParams.enhetId, brukere));
mock.get('/veilarbportefolje/api/enhet/:enhetId/portefoljestorrelser', lagPortefoljeStorrelser());
mock.post('/veilarbportefolje/api/veileder/:ident/portefolje', (args: HandlerArgument) => lagPortefoljeForVeileder(args.queryParams, brukere));
mock.get('/veilarbportefolje/api/veileder/:veileder/statustall', ResponseUtils.delayed(1000, statustall));
mock.get('/veilarbportefolje/api/enhet/:enhetId/tiltak', tiltak);

// situasjon-api
function tildel(body: any) {
    return {feilendeTilordninger: []}; //uten feilende brukere
    //return {feilendeTilordninger: [body[0]]}; //noen feilende brukere
    //return {feilendeTilordninger: body}; //alle feilende brukere
}

mock.post('/veilarboppfolging/api/tilordneveileder/', ({body}) => tildel(body));

// arbeidsliste-api
mock.post('/veilarbportefolje/api/arbeidsliste/', (args: HandlerArgument) => {
    return {error: [], data: args.body.map((arbeidsliste) => arbeidsliste.fnr)};
});

mock.put('/veilarbportefolje/api/arbeidsliste/:fnr', ({body}) => {
    return {
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
    };
});

mock.post('/veilarbportefolje/api/arbeidsliste/delete', ({body}) => {
    return {error: [], data: body.map((arbeidsliste) => arbeidsliste.fnr)};
});

// modiacontextholder-api

mock.get('/modiacontextholder/api/context/aktivenhet', ResponseUtils.delayed(1000, {
    'aktivBruker': null,
    'aktivEnhet': '1234'
}));

mock.get('/modiacontextholder/api/context/aktivbruker', ResponseUtils.delayed(1000, {
    'aktivBruker': null,
    'aktivEnhet': null
}));

mock.delete('/modiacontextholder/api/context/aktivbruker', ResponseUtils.delayed(1000, {
    'aktivBruker': null,
    'aktivEnhet': null
}));

mock.get('/modiacontextholder/api/decorator', ResponseUtils.delayed(1000, {
    enheter: inloggetVeileder.enheter,
    etternavn: inloggetVeileder.etternavn,
    fornavn: inloggetVeileder.fornavn,
    ident: inloggetVeileder.ident,
    navn: inloggetVeileder.navn
}));

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
