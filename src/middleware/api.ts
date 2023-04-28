import {fetchToJson, sjekkStatuskode} from '../ducks/utils';
import {FiltervalgModell, VeilederModell} from '../model-interfaces';
import {NyttLagretFilter, RedigerLagretFilter, SorteringOgId} from '../ducks/lagret-filter';
import {erDev} from '../utils/url-utils';
import {FrontendEvent} from '../utils/frontend-logger';
import {GeografiskBosted} from '../ducks/geografiskBosted';
import {Foedeland} from '../ducks/foedeland';
import {TolkebehovSpraak} from '../ducks/tolkebehov';
import {filterSomIkkeSkalSendesTilBackend} from '../filtrering/filter-konstanter';

export const API_BASE_URL = '/veilarbportefoljeflatefs/api';
const credentials = 'same-origin';

const MED_CREDENTIALS: RequestInit = {
    credentials,
    headers: {
        'Nav-Consumer-Id': 'veilarbportefoljeflatefs',
        'Content-Type': 'application/json'
    }
};

export interface Session {
    created_at?: string;
    ends_at?: string;
    ends_in_seconds?: number;
}

export interface Tokens {
    expire_at?: string;
    expire_in_seconds?: number;
    next_auto_refresh_in_seconds?: number;
    refresh_cooldown?: boolean;
    refresh_cooldown_seconds?: number;
    refreshed_at?: string;
}

export interface SessionMeta {
    session?: Session;
    tokens?: Tokens;
}

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

export function hentEnhetsPortefolje(
    enhet,
    rekkefolge,
    sorteringsfelt,
    filtervalg: FiltervalgModell,
    fra?: number,
    antall?: number
) {
    if (rekkefolge === 'stigende') {
        rekkefolge = 'ascending';
    } else if (rekkefolge === 'synkende') {
        rekkefolge = 'descending';
    }
    const filtrerteFiltervalg: FiltervalgModell = {
        ...filtervalg,
        avvik14aVedtak: filtervalg.avvik14aVedtak.filter(f => !filterSomIkkeSkalSendesTilBackend.includes(f))
    };
    const baseUrl = `${VEILARBPORTEFOLJE_URL}/enhet/${enhet}/portefolje`;
    const url = buildUrl(baseUrl, {fra, antall, sortDirection: rekkefolge, sortField: sorteringsfelt});
    const config = {...MED_CREDENTIALS, method: 'post', body: JSON.stringify(filtrerteFiltervalg)};
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
    const filtrerteFiltervalg: FiltervalgModell = {
        ...filtervalg,
        avvik14aVedtak: filtervalg.avvik14aVedtak.filter(f => !filterSomIkkeSkalSendesTilBackend.includes(f))
    };
    const baseUrl = `${VEILARBPORTEFOLJE_URL}/veileder/${veilederident}/portefolje`;
    const url = buildUrl(baseUrl, {enhet, fra, antall, sortDirection: rekkefolge, sortField: sorteringsfelt});
    const config = {...MED_CREDENTIALS, method: 'post', body: JSON.stringify(filtrerteFiltervalg)};
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
    return fetchToJson(`${VEILARBVEILEDER_URL}/api/veileder/v2/me`, MED_CREDENTIALS);
}

export function hentEnhetsFilterGrupper(enhetId) {
    const url = `${VEILARBFILTER_URL}/enhet/${enhetId}`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentMineFilter() {
    const url = `${VEILARBFILTER_URL}/minelagredefilter`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function fetchPortefoljeStorrelser(enhetId) {
    const url = `${VEILARBPORTEFOLJE_URL}/enhet/${enhetId}/portefoljestorrelser`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function tilordneVeileder(tilordninger) {
    const url = `${VEILARBOPPFOLGING_URL}/api/tilordneveileder`;
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
    const url = `${VEILARBPORTEFOLJE_URL}/enhet/${enhetId}/portefolje/statustall`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentStatusTallForVeileder(enhetId, veilederId) {
    const url = `${VEILARBPORTEFOLJE_URL}/veileder/${veilederId}/portefolje/statustall?enhet=${enhetId}`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function lagreArbeidsliste(arbeidsliste) {
    const url = `${VEILARBPORTEFOLJE_URL}/arbeidsliste`;
    const config = {...MED_CREDENTIALS, method: 'post', body: JSON.stringify(arbeidsliste)};
    return fetchToJson(url, config);
}

export function oppdaterArbeidsliste(arbeidsliste, fnr) {
    const url = `${VEILARBPORTEFOLJE_URL}/arbeidsliste/${fnr}`;
    const config = {...MED_CREDENTIALS, method: 'put', body: JSON.stringify(arbeidsliste)};
    return fetchToJson(url, config);
}

export function slettArbeidsliste(arbeidsliste) {
    const url = `${VEILARBPORTEFOLJE_URL}/arbeidsliste/delete`;
    const config = {...MED_CREDENTIALS, method: 'post', body: JSON.stringify(arbeidsliste)};
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
    return fetchToJson(`${VEDTAKSTOTTE_FEATURE_URL}?enhetId=${enhetId}`, MED_CREDENTIALS);
}

export function redigerMineFilter(endringer: RedigerLagretFilter): Promise<RedigerLagretFilter> {
    const url = `${VEILARBFILTER_URL}/minelagredefilter`;
    const config = {...MED_CREDENTIALS, method: 'put', body: JSON.stringify(endringer)};
    return fetchToJson(url, config);
}

export function nyttMineFilter(nyttFilter: NyttLagretFilter): Promise<NyttLagretFilter> {
    const url = `${VEILARBFILTER_URL}/minelagredefilter`;
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
    const url = `${VEILARBFILTER_URL}/minelagredefilter/lagresortering`;
    const config = {...MED_CREDENTIALS, method: 'post', body: JSON.stringify(sorteringOgIder)};
    return fetchToJson(url, config);
}

export function hentSystemmeldinger() {
    return fetchToJson(`https://poao-sanity${erDev() ? '.dev' : ''}.intern.nav.no/systemmeldinger`, MED_CREDENTIALS);
}

export function hentMoteplan(veileder: string, enhet: string) {
    const url = `${VEILARBPORTEFOLJE_URL}/veileder/${veileder}/moteplan?enhet=${enhet}`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentFoedeland(enhet: string): Promise<Foedeland[]> {
    return fetchToJson(`${VEILARBPORTEFOLJE_URL}/enhet/${enhet}/foedeland`, MED_CREDENTIALS);
}

export function hentTolkebehovSpraak(enhet: string): Promise<TolkebehovSpraak[]> {
    return fetchToJson(`${VEILARBPORTEFOLJE_URL}/enhet/${enhet}/tolkSpraak`, MED_CREDENTIALS);
}

export function hentGeografiskBosted(enhet: string): Promise<GeografiskBosted[]> {
    return fetchToJson(`/veilarbportefolje/api/enhet/${enhet}/geografiskbosted`, MED_CREDENTIALS);
}

export function sendEventTilPortefolje(event: FrontendEvent) {
    const url = `${VEILARBPORTEFOLJE_URL}/logger/event`;
    const config = {...MED_CREDENTIALS, method: 'post', body: JSON.stringify(event)};
    return fetch(url, config);
}

export const refreshAccessTokens = async (): Promise<SessionMeta> => {
    return fetchToJson('/oauth2/session/refresh', {}, false).then(data => Promise.resolve(data as SessionMeta));
};

export const hentSesjonMetadata = async (): Promise<SessionMeta> => {
    return fetchToJson('/oauth2/session', {}, false).then(data => Promise.resolve(data as SessionMeta));
};
