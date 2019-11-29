/* eslint-disable no-undef */
import { fetchToJson, sjekkStatuskode } from '../ducks/utils';
import { PortefoljeData } from '../ducks/portefolje';
import { NyGruppe, RedigerGruppe } from '../ducks/lagret-filter';

export const API_BASE_URL = '/veilarbportefoljeflatefs/api';
const credentials = 'same-origin';

const MED_CREDENTIALS: RequestInit = {
    credentials,
    headers: {
        'Content-Type': 'application/json',
    }
};

export const VEILARBVEILEDER_URL = '/veilarbveileder';
export const VEILARBPORTEFOLJE_URL = '/veilarbportefolje/api';
export const VEILARBOPPFOLGING_URL = '/veilarboppfolging';
export const VEILARBFILTER_URL = '/veilarbfilter/api';
export const FEATURE_URL = '/feature';

export function hentVeiledersEnheter() {
    const url = `${VEILARBVEILEDER_URL}/api/veileder/enheter`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentTilgangTilEnhet(enhet: string): Promise<boolean> {
    const url = `${VEILARBVEILEDER_URL}/api/veileder/enhet/${enhet}/tilgangTilEnhet`;
    return fetchToJson(url, MED_CREDENTIALS);
}

function buildUrl(baseUrl: string, queryParams?: {}): string {
    if(queryParams) {
        return baseUrl + '?' + Object.entries(queryParams)
            .filter(([key, value]) => value !== undefined )
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
    }
    return baseUrl;
}

export function hentEnhetsPortefolje(enhet, rekkefolge, sorteringsfelt, filtervalg: {}, fra?: number, antall?: number) {
    const baseUrl = `${VEILARBPORTEFOLJE_URL}/enhet/${enhet}/portefolje`;
    const url = buildUrl(baseUrl, {fra, antall, sortDirection: rekkefolge, sortField: sorteringsfelt});
    const config = { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(filtervalg) };
    return fetchToJson<PortefoljeData>(url, config);
}

export function hentVeiledersPortefolje(enhet, veilederident, rekkefolge, sorteringsfelt, filtervalg, fra?: number, antall?: number) {
    const baseUrl = `${VEILARBPORTEFOLJE_URL}/veileder/${veilederident}/portefolje`;
    const url =  buildUrl(baseUrl, {enhet, fra, antall, sortDirection: rekkefolge, sortField: sorteringsfelt});
    const config = { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(filtervalg) };
    return fetchToJson<PortefoljeData>(url, config);
}

export function hentDiagramdata(enhet, filtervalg, veilederident) {
    let url = `${VEILARBPORTEFOLJE_URL}/diagram/v2/` +
        `?enhet=${enhet}`;

    if (veilederident) {
        url += `&veilederident=${veilederident}`;
    }

    const config = { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(filtervalg) };
    return fetchToJson(url, config);
}

export function hentEnhetsVeiledere(enhetId) {
    const url = `${VEILARBVEILEDER_URL}/api/enhet/${enhetId}/veiledere`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentEnhetsFilterGrupper(enhetId) {
    const url = `${VEILARBFILTER_URL}/enhet/${enhetId}/`;
    console.log("url", url);
    return fetchToJson(url, MED_CREDENTIALS);
}

export function fetchPortefoljeStorrelser(enhetId) {
    const url = `${VEILARBPORTEFOLJE_URL}/enhet/${enhetId}` +
        '/portefoljestorrelser';
    return fetchToJson(url, MED_CREDENTIALS);
}

export function tilordneVeileder(tilordninger) {
    const url = `${VEILARBOPPFOLGING_URL}/api/tilordneveileder/`;
    const config = { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(tilordninger) };
    return fetch(url, config)
        .then(sjekkStatuskode);
}

export function redigerVeiledergruppe(endringer: RedigerGruppe): Promise<RedigerGruppe> {
    const url = `${VEILARBFILTER_URL}/enhet/`;
    const config = { ...MED_CREDENTIALS, method: 'put', body: JSON.stringify(endringer) };
    return fetchToJson(url, config);
}

export function nyVeiledergruppe(endringer: NyGruppe): Promise<NyGruppe> {
    const url = `${VEILARBFILTER_URL}/enhet/`;
    const config = { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(endringer) };
    return fetchToJson(url, config);
}

export function slettVeiledergruppe(enhetId:string, filterId: number): Promise<number> {
    const url = `${VEILARBFILTER_URL}/enhet/${enhetId}/filter/${filterId}`;
    const config = { ...MED_CREDENTIALS, method: 'delete'};
    return fetch(url, config).then(sjekkStatuskode).then(_ => Promise.resolve(filterId));
}

export function hentStatusTall(enhetId) {
    const url = `${VEILARBPORTEFOLJE_URL}/enhet/${enhetId}/statustall`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentStatusTallForveileder(enhetId, veileder) {
    const url = `${VEILARBPORTEFOLJE_URL}/veileder/${veileder}` +
        `/statustall?enhet=${enhetId}`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function httpArbeidsliste(arbeidsliste, method, additionalPath = '') {
    const url = `${VEILARBPORTEFOLJE_URL}/arbeidsliste/${additionalPath}`;
    const config = { ...MED_CREDENTIALS, method, body: JSON.stringify(arbeidsliste) };
    return fetchToJson(url, config);
}

export function hentEnhetTiltak(enhetId) {
    const url = `${VEILARBPORTEFOLJE_URL}/enhet/${enhetId}/tiltak`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentFeatures(featureQueryString: string) {
    return fetchToJson(`${API_BASE_URL}${FEATURE_URL}?${featureQueryString}`);
}
