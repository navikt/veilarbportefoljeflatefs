import { mock, delayed, respondWith, randomFailure } from './utils';
import enheter from './enheter';
import me from './me';
import brukere from './portefolje';
import veiledere from './veiledere';
import statustall from './statustall';
import tekster from './tekster';
import tiltak from './tiltak';
import diagramdata from './diagramdata';
import lagDiagramData from './diagramdataV2';
import lagPortefoljeStorrelser from './portefoljestorrelser';

function lagPortefoljeForVeileder(queryParams, alleBrukere) {
    const enhetportefolje = lagPortefolje(queryParams, enheter.enhetliste[0].enhetId, alleBrukere);
    enhetportefolje.brukere.forEach((bruker) => bruker.veilederId = me.ident);
    return enhetportefolje;
}

function lagPortefolje(queryParams, enhet, alleBrukere) {
    const { fra, antall } = queryParams;
    const fraInt = parseInt(fra, 10);
    const antallInt = parseInt(antall, 10);
    const filtrerteBrukere = alleBrukere.slice(fraInt, fraInt + antallInt);

    return {
        enhet,
        antallTotalt: alleBrukere.length,
        antallReturnert: filtrerteBrukere.length,
        fraIndex: parseInt(queryParams.fra, 10),
        brukere: filtrerteBrukere
    };
}

// Hvis du vil hente tekster fra applikasjonen, så la linjen nedenfor være kommentert ut.
(mock as any).get('/veilarbportefoljeflatefs/api/tekster', respondWith(tekster));

// veileder-api
(mock as any).get('/veilarbveileder/api/veileder/enheter', respondWith(enheter));
(mock as any).get('/veilarbveileder/api/veileder/me', respondWith(me));
(mock as any).get('express:/veilarbveileder/api/enhet/:enhet/veiledere', respondWith(veiledere));

// portefolje-api
(mock as any).get('express:/veilarbportefolje/api/enhet/:enhet/statustall', respondWith(delayed(1000, randomFailure(statustall))));
(mock as any).post('express:/veilarbportefolje/api/enhet/:enhet/portefolje*', respondWith((url, config, { queryParams, bodyParams, extra }) => lagPortefolje(queryParams, extra.enhet, brukere)));
(mock as any).get('express:/veilarbportefolje/api/enhet/:enhet/portefoljestorrelser*', respondWith(() => lagPortefoljeStorrelser()));
(mock as any).post('express:/veilarbportefolje/api/veileder/:ident/portefolje*', respondWith((url, config, { queryParams, bodyParams, extra }) => lagPortefoljeForVeileder(queryParams, brukere)));
(mock as any).get('express:/veilarbportefolje/api/veileder/:veileder/statustall*', respondWith(delayed(1000, randomFailure(statustall))));
(mock as any).get('express:/veilarbportefolje/api/enhet/:enhet/tiltak', () => respondWith(tiltak));

// diagram-api
(mock as any).post('express:/veilarbportefolje/api/diagram/v2*', () => respondWith((url, config, { queryParams, bodyParams, extra }) => lagDiagramData(bodyParams)));
(mock as any).post('express:/veilarbportefolje/api/diagram*', () => respondWith(diagramdata));

// situasjon-api
(mock as any).post('/veilarbsituasjon/api/tilordneveileder/', respondWith(delayed(1000, randomFailure({ feilendeTilordninger: ['11111111111','22222222222'] }))));

// arbeidsliste-api
(mock as any).post('/veilarbportefolje/api/arbeidsliste/', respondWith(delayed(1000, randomFailure({ error: ['111111111111', '222222222222'], data: [] }))));
(mock as any).put('/veilarbportefolje/api/arbeidsliste/', respondWith(delayed(1000, randomFailure({ error: ['111111111111', '222222222222'] }))));
(mock as any).delete('/veilarbportefolje/api/arbeidsliste/', respondWith(delayed(1000, { aktoerIds: ['111111111111', '222222222222'] })));
(mock as any).post('/veilarbportefolje/api/arbeidsliste/delete', respondWith(delayed(1000, randomFailure({ error: ['111111111111', '222222222222'], data: [] }))));

// modiacontextholder-api
(mock as any).post('/modiacontextholder/api/context', respondWith(delayed(1000, randomFailure({ error: ['111111111111', '222222222222'], data: [] }))));

(mock as any).mock('*', respondWith((url, config) => (mock as any).realFetch.call(window, url, config)));

// websocket
class MockWebSocket {
    addEventListener() {} // tslint:disable-line
    close() {} // tslint:disable-line
}
(window as any).WebSocket = MockWebSocket; // tslint:disable-line
