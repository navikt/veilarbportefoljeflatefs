import {fetchToJson, sjekkStatuskode} from '../ducks/utils';
import {VeilederModell} from '../model-interfaces';
import {NyttLagretFilter, RedigerLagretFilter, SorteringOgId} from '../ducks/lagret-filter';
import {erDev} from '../utils/url-utils';
import {FrontendEvent} from '../utils/frontend-logger';

export const API_BASE_URL = '/veilarbportefoljeflatefs/api';
const credentials = 'same-origin';

const MED_CREDENTIALS: RequestInit = {
    credentials,
    headers: {
        'Nav-Consumer-Id': 'veilarbportefoljeflatefs',
        'Content-Type': 'application/json'
    }
};

export const AUTH_URL = '/auth/info';
export const VEILARBVEILEDER_URL = '/veilarbveileder';
export const VEILARBPORTEFOLJE_URL = '/veilarbportefolje/api';
export const VEILARBOPPFOLGING_URL = '/veilarboppfolging';
export const VEILARBFILTER_URL = '/veilarbfilter/api';
export const FEATURE_URL = '/feature';
export const VEDTAKSTOTTE_FEATURE_URL = '/veilarbvedtaksstotte/api/utrulling/erUtrullet';

function buildUrl(baseUrl: string, queryParams?: {}): string {
    if (queryParams) {
        return (
            baseUrl +
            '?' +
            Object.entries(queryParams)
                .filter(([_, value]) => value !== undefined)
                .map(([key, value]) => `${key}=${value}`)
                .join('&')
        );
    }
    return baseUrl;
}

export function hentEnhetsPortefolje(enhet, rekkefolge, sorteringsfelt, filtervalg: {}, fra?: number, antall?: number) {
    if (rekkefolge === 'stigende') {
        rekkefolge = 'ascending';
    } else if (rekkefolge === 'synkende') {
        rekkefolge = 'descending';
    }
    const baseUrl = `${VEILARBPORTEFOLJE_URL}/enhet/${enhet}/portefolje`;
    const url = buildUrl(baseUrl, {fra, antall, sortDirection: rekkefolge, sortField: sorteringsfelt});
    const config = {...MED_CREDENTIALS, method: 'post', body: JSON.stringify(filtervalg)};
    return fetchToJson(url, config);
}

export function hentVeiledersPortefolje(
    enhet,
    veilederident,
    rekkefolge,
    sorteringsfelt,
    filtervalg,
    fra?: number,
    antall?: number
) {
    if (rekkefolge === 'stigende') {
        rekkefolge = 'ascending';
    } else if (rekkefolge === 'synkende') {
        rekkefolge = 'descending';
    }
    const baseUrl = `${VEILARBPORTEFOLJE_URL}/veileder/${veilederident}/portefolje`;
    const url = buildUrl(baseUrl, {enhet, fra, antall, sortDirection: rekkefolge, sortField: sorteringsfelt});
    const config = {...MED_CREDENTIALS, method: 'post', body: JSON.stringify(filtervalg)};
    return fetchToJson(url, config);
}

export function hentArbeidslisteForVeileder(enhet, veilederident) {
    const url = `${VEILARBPORTEFOLJE_URL}/veileder/${veilederident}/hentArbeidslisteForVeileder?enhet=${enhet}`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentArbeidslisteForBruker(fodselsnummer) {
    const url = `${VEILARBPORTEFOLJE_URL}/arbeidsliste/${fodselsnummer}`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentEnhetsVeiledere(enhetId) {
    const url = `${VEILARBVEILEDER_URL}/api/enhet/${enhetId}/veiledere`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentAktivBruker(): Promise<VeilederModell> {
    return fetchToJson(`/veilarbveileder/api/veileder/v2/me`, MED_CREDENTIALS);
}

export function hentEnhetsFilterGrupper(enhetId) {
    const url = `${VEILARBFILTER_URL}/enhet/${enhetId}/`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentMineFilter() {
    const url = `${VEILARBFILTER_URL}/minelagredefilter/`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function fetchPortefoljeStorrelser(enhetId) {
    const url = `${VEILARBPORTEFOLJE_URL}/enhet/${enhetId}/portefoljestorrelser`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function tilordneVeileder(tilordninger) {
    const url = `${VEILARBOPPFOLGING_URL}/api/tilordneveileder/`;
    const config = {...MED_CREDENTIALS, method: 'post', body: JSON.stringify(tilordninger)};
    return fetch(url, config).then(sjekkStatuskode);
}

export function redigerVeiledergruppe(endringer: RedigerLagretFilter, enhetId: string): Promise<RedigerLagretFilter> {
    const url = `${VEILARBFILTER_URL}/enhet/${enhetId}`;
    const config = {...MED_CREDENTIALS, method: 'put', body: JSON.stringify(endringer)};
    return fetchToJson(url, config);
}

export function nyVeiledergruppe(endringer: NyttLagretFilter, enhetId: string): Promise<NyttLagretFilter> {
    const url = `${VEILARBFILTER_URL}/enhet/${enhetId}`;
    const config = {...MED_CREDENTIALS, method: 'post', body: JSON.stringify(endringer)};
    return fetchToJson(url, config);
}

export function slettVeiledergruppe(enhetId: string | undefined | null, filterId: number): Promise<number> {
    const url = `${VEILARBFILTER_URL}/enhet/${enhetId}/filter/${filterId}`;
    const config = {...MED_CREDENTIALS, method: 'delete'};
    return fetch(url, config)
        .then(sjekkStatuskode)
        .then(_ => Promise.resolve(filterId));
}

export function hentStatusTall(enhetId) {
    const url = `${VEILARBPORTEFOLJE_URL}/enhet/${enhetId}/statustall`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentStatusTallForVeileder(enhetId, veileder) {
    const url = `${VEILARBPORTEFOLJE_URL}/veileder/${veileder}/statustall?enhet=${enhetId}`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function httpArbeidsliste(arbeidsliste, method, additionalPath = '') {
    const url = `${VEILARBPORTEFOLJE_URL}/arbeidsliste/${additionalPath}`;
    const config = {...MED_CREDENTIALS, method, body: JSON.stringify(arbeidsliste)};
    return fetchToJson(url, config);
}

export function hentEnhetTiltak(enhetId) {
    const url = `${VEILARBPORTEFOLJE_URL}/enhet/${enhetId}/tiltak`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentFeatures(featureQueryString: string) {
    return fetchToJson(`${API_BASE_URL}${FEATURE_URL}?${featureQueryString}`);
}

export function hentVedtakstotteFeature(enhetId: string) {
    return fetchToJson(`${VEDTAKSTOTTE_FEATURE_URL}?enhetId=${enhetId}`);
}

export function redigerMineFilter(endringer: RedigerLagretFilter): Promise<RedigerLagretFilter> {
    const url = `${VEILARBFILTER_URL}/minelagredefilter/`;
    const config = {...MED_CREDENTIALS, method: 'put', body: JSON.stringify(endringer)};
    return fetchToJson(url, config);
}

export function nyttMineFilter(nyttFilter: NyttLagretFilter): Promise<NyttLagretFilter> {
    const url = `${VEILARBFILTER_URL}/minelagredefilter/`;
    const config = {...MED_CREDENTIALS, method: 'post', body: JSON.stringify(nyttFilter)};
    return fetchToJson(url, config);
}

export function slettMineFilter(filterId: number): Promise<number> {
    const url = `${VEILARBFILTER_URL}/minelagredefilter/${filterId}`;
    const config = {...MED_CREDENTIALS, method: 'delete'};
    return fetch(url, config)
        .then(sjekkStatuskode)
        .then(_ => Promise.resolve(filterId));
}

export function lagreSorteringFiltere(sorteringOgIder: SorteringOgId[]): Promise<number> {
    const url = `${VEILARBFILTER_URL}/minelagredefilter/lagresortering/`;
    const config = {...MED_CREDENTIALS, method: 'post', body: JSON.stringify(sorteringOgIder)};
    return fetchToJson(url, config);
}

export function hentSystemmeldinger() {
    return fetchToJson(`https://poao-sanity${erDev() ? '.dev' : ''}.intern.nav.no/systemmeldinger`, MED_CREDENTIALS);
}

export function hentMoteplan(veileder: string, enhet: string) {
    const url = `${VEILARBPORTEFOLJE_URL}/veileder/${veileder}/moteplan/?enhet=${enhet}`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export async function hentResterendeSekunder(): Promise<number> {
    return fetchToJson(AUTH_URL, MED_CREDENTIALS)
        .then(data => {
            const remainingSeconds = data?.remainingSeconds;
            if (remainingSeconds && typeof remainingSeconds == 'number' && remainingSeconds > 0) {
                return remainingSeconds;
            }
            return Promise.reject('Fant ikke forventet verdi av remainingSeconds på /auth/info');
        })
        .catch(e => {
            return Promise.reject('Fant ikke forventet verdi av remainingSeconds på /auth/info');
        });
}

export function sendEventTilPortefolje(event: FrontendEvent) {
    const url = `${VEILARBPORTEFOLJE_URL}/logger/event`;
    const config = {...MED_CREDENTIALS, method: 'post', body: JSON.stringify(event)};
    return fetch(url, config);
}
