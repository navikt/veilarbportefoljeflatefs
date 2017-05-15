(function() {
    function includes(base, needle) {
        return base.indexOf(needle) >= 0;
    }
    function erDev() {
        const url = window.location.href;
        return includes(url, 'debug=true') || includes(url, 'devillo.no:9592')
            || includes(url, 'devillo.no:9593') || includes(url, 'localhost:');
    }
    var credentials = erDev() ? 'include' : 'same-origin';
    var VEILARBVEILEDER_URL = erDev() ? ':9590/veilarbveileder' : '/veilarbveileder';
    var VEILARBPORTEFOLJE_URL = erDev() ? ':9594/veilarbportefolje' : '/veilarbportefolje';
    var VEILARBSITUASJON_URL = erDev() ? ':8485/veilarbsituasjon' : '/veilarbsituasjon';

    function fetchAsJson(url, config) {
        return fetch(url, config)
            .then(function (resp) {
                return resp.json();
            });
    }

    function hentMe() {
        return fetchAsJson('https://'+ window.location.hostname + VEILARBVEILEDER_URL + '/tjenester/veileder/me')
    }
    function hentEnheter() {
        return fetchAsJson('https://'+ window.location.hostname + VEILARBVEILEDER_URL + '/tjenester/veileder/enheter')
    }
    function hentBrukere(enhet) {
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

        return fetchAsJson('https://'+ window.location.hostname + VEILARBPORTEFOLJE_URL + '/tjenester/enhet/'+ enhet +'/portefolje?fra=0&antall=99999&sortDirection=ikke_satt&sortField=ikke_satt', config);
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