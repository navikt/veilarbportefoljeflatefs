(function() {
    const credentials = 'same-origin';
    const VEILARBVEILEDER_URL = '/veilarbveileder';
    const VEILARBPORTEFOLJE_URL = '/veilarbportefolje';
    const VEILARBSITUASJON_URL = '/veilarbsituasjon';

    function fetchAsJson(url, config) {
        return fetch(url, config)
            .then(function (resp) {
                return resp.json();
            });
    }

    function hentMe() {
        return fetchAsJson('https://'+ window.location.hostname + VEILARBVEILEDER_URL + '/tjenester/veileder/me', { credentials: credentials, });
    }
    function hentEnheter() {
        return fetchAsJson('https://'+ window.location.hostname + VEILARBVEILEDER_URL + '/tjenester/veileder/enheter', { credentials: credentials });
    }
    function hentBrukere(enhet, veileder) {
        var filtervalg = {
            brukerstatus: "INAKTIVE_BRUKERE"
        };
        var config = {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: credentials,
            method: 'post',
            body: JSON.stringify(filtervalg)
        };

        return fetchAsJson('https://'+ window.location.hostname + VEILARBPORTEFOLJE_URL + '/tjenester/veileder/' + veileder + '/portefolje?enhet=' + enhet + '&fra=0&antall=99999&sortDirection=ikke_satt&sortField=ikke_satt', config);
    }

    function fjernTilordning(fnrs, fraVeileder) {
        var nyeTilordninger = fnrs.map(function (input) {
            return {
                brukerFnr: input.dataset.fnr,
                fraVeilederId: fraVeileder,
                tilVeilederId: null
            };
        });
        var config = {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: credentials,
            method: 'post',
            body: JSON.stringify(nyeTilordninger)
        };

        return fetchAsJson('https://'+ window.location.hostname + VEILARBSITUASJON_URL + '/api/tilordneveileder/', config);
    }

    function FristillApi() {
    }

    FristillApi.prototype.hentMe = hentMe;
    FristillApi.prototype.hentEnheter = hentEnheter;
    FristillApi.prototype.hentBrukere = hentBrukere;
    FristillApi.prototype.fjernTilordning = fjernTilordning;

    window.FristillApi = FristillApi;
})();