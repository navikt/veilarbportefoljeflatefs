/* eslint-disable no-undef */
import {fetchToJson, sjekkStatuskode} from '../ducks/utils';
import {NyGruppe, RedigerGruppe} from '../ducks/veiledergrupper_filter';
import {VeilederModell} from '../model-interfaces';
import {NyttFilter, RedigerFilter} from "../ducks/lagret-filter";

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

function buildUrl(baseUrl: string, queryParams?: {}): string {
    if(queryParams) {
        return baseUrl + '?' + Object.entries(queryParams)
            .filter(([_, value]) => value !== undefined )
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
    }
    return baseUrl;
}

export function hentEnhetsPortefolje(enhet, rekkefolge, sorteringsfelt, filtervalg: {}, fra?: number, antall?: number) {
    const baseUrl = `${VEILARBPORTEFOLJE_URL}/enhet/${enhet}/portefolje`;
    const url = buildUrl(baseUrl, {fra, antall, sortDirection: rekkefolge, sortField: sorteringsfelt});
    const config = { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(filtervalg) };
    return fetchToJson(url, config);
}

export function hentVeiledersPortefolje(enhet, veilederident, rekkefolge, sorteringsfelt, filtervalg, fra?: number, antall?: number) {
    const baseUrl = `${VEILARBPORTEFOLJE_URL}/veileder/${veilederident}/portefolje`;
    const url =  buildUrl(baseUrl, {enhet, fra, antall, sortDirection: rekkefolge, sortField: sorteringsfelt});
    const config = { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(filtervalg) };
    return fetchToJson(url, config);
}

export function hentEnhetsVeiledere(enhetId) {
    const url = `${VEILARBVEILEDER_URL}/api/enhet/${enhetId}/veiledere`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentAktivBruker(): Promise<VeilederModell> {
    return fetchToJson(`/veilarbveileder/api/veileder/v2/me`, MED_CREDENTIALS)
}


export function hentEnhetsFilterGrupper(enhetId) {
    const url = `${VEILARBFILTER_URL}/enhet/${enhetId}/`;
    return fetchToJson(url, MED_CREDENTIALS);
}


export function hentMineLagredeFilter() {
    const url = `${VEILARBFILTER_URL}/minelagredefilter/`;
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

export function redigerVeiledergruppe(endringer: RedigerGruppe, enhetId: string): Promise<RedigerGruppe> {
    const url = `${VEILARBFILTER_URL}/enhet/${enhetId}`;
    const config = { ...MED_CREDENTIALS, method: 'put', body: JSON.stringify(endringer) };
    return fetchToJson(url, config);
}

export function nyVeiledergruppe(endringer: NyGruppe, enhetId: string): Promise<NyGruppe> {
    const url = `${VEILARBFILTER_URL}/enhet/${enhetId}`;
    const config = { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(endringer) };
    return fetchToJson(url, config);
}

export function slettVeiledergruppe(enhetId: string | undefined | null, filterId: number): Promise<number> {
    const url = `${VEILARBFILTER_URL}/enhet/${enhetId}/filter/${filterId}`;
    const config = { ...MED_CREDENTIALS, method: 'delete'};
    return fetch(url, config).then(sjekkStatuskode).then(_ => Promise.resolve(filterId));
}

export function hentStatusTall(enhetId) {
    const url = `${VEILARBPORTEFOLJE_URL}/enhet/${enhetId}/statustall`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentStatusTallForVeileder(enhetId, veileder) {
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

export function redigerLagretFilter(endringer: RedigerFilter): Promise<RedigerFilter> {
    const url = `${VEILARBFILTER_URL}/minelagredefilter/`;
    const config = { ...MED_CREDENTIALS, method: 'put', body: JSON.stringify(endringer) };
    return fetchToJson(url, config);
}

export function nyttLagretFilter(nyttFilter: NyttFilter): Promise<NyttFilter> {
    const url = `${VEILARBFILTER_URL}/minelagredefilter/`;
    const config = { ...MED_CREDENTIALS, method: 'post', body: JSON.stringify(nyttFilter) };
    return fetchToJson(url, config);
}

export function slettLagretFilter(filterId: number): Promise<number> {
    const url = `${VEILARBFILTER_URL}/minelagredefilter/${filterId}`;
    const config = { ...MED_CREDENTIALS, method: 'delete'};
    return fetch(url, config).then(sjekkStatuskode).then(_ => Promise.resolve(filterId));
}
