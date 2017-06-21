import { MOCK_CONFIG, mock, delayed, respondWith, randomFailure } from './utils';
MOCK_CONFIG.failureRate = -1;


import brukere from './portefolje';
const enheter = require('./enheter');
const veiledere = require('./veiledere');
const me = require('./me');
const statustall = require('./statustall');
const tekster = require('./tekster');

function matcherBruker(query, body) {
    return (bruker) => {
        if (bruker.fnr === '68099104620') return false;
        return true;
    };
}

function lagPortefolje(queryParams, bodyParams, enhet, alleBrukere) {
    const { fra, antall } = queryParams;
    const fraInt = parseInt(fra);
    const antallInt = parseInt(antall);

    const filtrerteBrukere = alleBrukere
        .filter(matcherBruker(queryParams, bodyParams))
        .slice(fraInt, fraInt + antallInt);

    return {
        enhet,
        antallTotalt: alleBrukere.length,
        antallReturnert: filtrerteBrukere.length,
        fraIndex: parseInt(queryParams.fra),
        brukere: filtrerteBrukere
    };
}

// Hvis du vil hente tenker fra applikasjonen, så la linjen nedenfor være kommentert ut.
mock.get('/veilarbportefoljeflatefs/tjenester/tekster', respondWith(tekster));
mock.get('/veilarbveileder/tjenester/veileder/enheter', respondWith(enheter));
mock.get('/veilarbveileder/tjenester/veileder/me', respondWith(me));
mock.get('/veilarbveileder/tjenester/enhet/0709/veiledere', respondWith(veiledere));
mock.get('/veilarbportefolje/tjenester/enhet/0709/statustall', respondWith(delayed(1000, randomFailure(statustall))));
mock.post('express:/veilarbportefolje/tjenester/enhet/:enhet/portefolje*', respondWith((url, config, { queryParams, bodyParams, extra }) => lagPortefolje(queryParams, bodyParams, extra.enhet, brukere)));

mock.post('/veilarbsituasjon/api/tilordneveileder/', respondWith(delayed(1000, { feilendeTilordninger: [] })));

mock.mock('*', respondWith((url, config) => mock.realFetch.call(window, url, config)));
