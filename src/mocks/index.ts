import { randomFailure } from './utils';
import enheter from './enheter';
import me from './me';
import brukere from './portefolje';
import veiledere from './veiledere';
import statustall from './statustall';
import tiltak from './tiltak';
import { veilederGrupper } from './veileder-grupper';
import lagDiagramData from './diagramdataV2';
import lagPortefoljeStorrelser from './portefoljestorrelser';
import features from './features';
import { endringsloggListe } from './endringslogg';
import * as faker from 'faker/locale/nb_NO';
import FetchMock, {
    HandlerArgument,
    JSONArray,
    MatcherUtils,
    MiddlewareUtils, ResponseUtils
} from "yet-another-fetch-mock";
import { LagretFilter } from "../ducks/lagret-filter";

function lagPortefoljeForVeileder(queryParams, alleBrukere) {
    const enhetportefolje = lagPortefolje(queryParams, enheter.enhetliste[0].enhetId, alleBrukere);
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

//veiledergrupper
mock.get('/veilarbfilter/api/enhet/:enhetId/', customVeilederGrupper );


mock.put('/veilarbfilter/api/enhet/:enhetId', ({ body }) => {
        customVeilederGrupper= customVeilederGrupper.map(v => {
            if(v.filterId === body.filterId) {
                return body;
            }
            return v;
        }) as  LagretFilter [] & JSONArray;
        return {...body}
    }
);

mock.post('/veilarbfilter/api/enhet/:enhetId', (args: HandlerArgument) => {
    const filterId = Math.floor(Math.random() * 100) + 50;
    customVeilederGrupper = [...customVeilederGrupper, {...args.body, filterId}];
    return {...args.body, filterId};
});

mock.delete('/veilarbfilter/api/enhet/:enhetId/filter/:filterId',(args: HandlerArgument) => {
    const {pathParams} = args;
    if(pathParams.filterId) {
        customVeilederGrupper = customVeilederGrupper.filter(v => v.filterId !== pathParams.filterId) as LagretFilter [] & JSONArray;
        return {status: 200};
    }
    return {status: 401};
});

// veileder-api
mock.get('/veilarbveileder/api/veileder/enheter', enheter);
mock.get('/veilarbveileder/api/veileder/me', me);
mock.get('/veilarbveileder/api/enhet/:enhetId/veiledere', veiledere);
mock.get('/veilarbveileder/api/veileder/enhet/:enhetId/tilgangTilEnhet', true);

// portefolje-api
mock.get('/veilarbportefolje/api/enhet/:enhetId/statustall', ResponseUtils.delayed(1000, statustall));
mock.post('/veilarbportefolje/api/enhet/:enhetId/portefolje', (args: HandlerArgument) => lagPortefolje(args.queryParams, args.pathParams.enhetId, brukere));
mock.get('/veilarbportefolje/api/enhet/:enhetId/portefoljestorrelser', lagPortefoljeStorrelser());
mock.post('/veilarbportefolje/api/veileder/:ident/portefolje', (args: HandlerArgument) => lagPortefoljeForVeileder(args.queryParams, brukere));
mock.get('/veilarbportefolje/api/veileder/:veileder/statustall', ResponseUtils.delayed(1000, statustall));
mock.get('/veilarbportefolje/api/enhet/:enhetId/tiltak', tiltak);

// diagram-api
mock.post('/veilarbportefolje/api/diagram/v2', ({body}) => lagDiagramData(body));

// situasjon-api
(mock as any).post('/veilarboppfolging/api/tilordneveileder/', ResponseUtils.delayed(1000, randomFailure({feilendeTilordninger: ['11111111111', '22222222222']})));

// arbeidsliste-api
mock.post('/veilarbportefolje/api/arbeidsliste/', (args: HandlerArgument)=> {
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
        isOppfolgendeVeileder: true,
        arbeidslisteAktiv: null,
        harVeilederTilgang: true
    };
});

mock.post('/veilarbportefolje/api/arbeidsliste/delete', ({body}) => {
    return {error: [], data: body.map((arbeidsliste) => arbeidsliste.fnr)};
});

// modiacontextholder-api
mock.post('/modiacontextholder/api/context', ResponseUtils.delayed(1000, randomFailure({
    error: ['111111111111', '222222222222'],
    data: []
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
