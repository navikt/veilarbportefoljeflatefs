import {FargekategoriDataModell} from '../model-interfaces';
import {VeilederePaEnhetModell, InnloggetVeilederModell} from '../typer/enhet-og-veiledere-modeller';
import {FiltervalgModell} from '../typer/filtervalg-modell';
import {NyttLagretFilter, RedigerLagretFilter, SorteringOgId} from '../ducks/lagret-filter';
import {erDev, loginUrl} from '../utils/url-utils';
import {FrontendEvent} from '../utils/frontend-logger';
import {GeografiskBosted} from '../ducks/geografiskBosted';
import {Foedeland} from '../ducks/foedeland';
import {TolkebehovSpraak} from '../ducks/tolkebehov';
import {filterSomIkkeSkalSendesTilBackend} from '../filtrering/filter-konstanter';
import {EndreHuskelapp, LagreHuskelapp} from '../ducks/huskelapp';

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

export const VEILARBVEILEDER_URL = '/veilarbveileder';
export const VEILARBPORTEFOLJE_URL = '/veilarbportefolje/api';
export const VEILARBOPPFOLGING_URL = '/veilarboppfolging';
export const VEILARBFILTER_URL = '/veilarbfilter/api';
export const FEATURE_URL = '/feature';

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

class FetchError extends Error {
    public response: Response;

    constructor(message: string, response: Response) {
        super(message);
        this.response = response;
    }
}

export function sjekkStatuskode(response, redirectOnUnauthorized: Boolean = true) {
    if (response.status >= 200 && response.status < 300 && response.ok) {
        return response;
    }
    if (response.status === 401 && redirectOnUnauthorized) {
        window.location.href = loginUrl();
    }
    return Promise.reject(new FetchError(response.statusText, response));
}

export function toJson(response) {
    if (response.status !== 204) {
        // No content
        return response.text().then(res => (res.length ? JSON.parse(res) : null));
    }
    return response;
}

export function fetchToJson(url: string, config: RequestInit = {}, redirectOnUnauthorized: Boolean = true) {
    return fetch(url, config)
        .then(res => sjekkStatuskode(res, redirectOnUnauthorized))
        .then(toJson);
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
        avvik14aVedtak: filtervalg.avvik14aVedtak.filter(f => !filterSomIkkeSkalSendesTilBackend.includes(f)),
        ferdigfilterListe: filtervalg.ferdigfilterListe.filter(f => !filterSomIkkeSkalSendesTilBackend.includes(f))
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
        avvik14aVedtak: filtervalg.avvik14aVedtak.filter(f => !filterSomIkkeSkalSendesTilBackend.includes(f)),
        ferdigfilterListe: filtervalg.ferdigfilterListe.filter(f => !filterSomIkkeSkalSendesTilBackend.includes(f))
    };
    const baseUrl = `${VEILARBPORTEFOLJE_URL}/veileder/${veilederident}/portefolje`;
    const url = buildUrl(baseUrl, {enhet, fra, antall, sortDirection: rekkefolge, sortField: sorteringsfelt});
    const config = {...MED_CREDENTIALS, method: 'post', body: JSON.stringify(filtrerteFiltervalg)};
    return fetchToJson(url, config);
}

export function hentEnhetsVeiledere(enhetId): Promise<VeilederePaEnhetModell> {
    const url = `${VEILARBVEILEDER_URL}/api/enhet/${enhetId}/veiledere`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentAktivBruker(): Promise<InnloggetVeilederModell> {
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

export function oppdaterFargekategori(fnrlisteOgFargekategori: FargekategoriDataModell) {
    const url = `${VEILARBPORTEFOLJE_URL}/v1/fargekategorier`;
    const config = {...MED_CREDENTIALS, method: 'put', body: JSON.stringify(fnrlisteOgFargekategori)};
    return fetchToJson(url, config);
}

export function lagreHuskelapp(huskelapp: LagreHuskelapp) {
    const url = `${VEILARBPORTEFOLJE_URL}/v1/huskelapp`;
    const config = {...MED_CREDENTIALS, method: 'post', body: JSON.stringify(huskelapp)};
    return fetchToJson(url, config);
}

export function endreHuskelapp(huskelapp: EndreHuskelapp) {
    const url = `${VEILARBPORTEFOLJE_URL}/v1/huskelapp`;
    const config = {...MED_CREDENTIALS, method: 'put', body: JSON.stringify(huskelapp)};
    return fetchToJson(url, config);
}

export function hentHuskelappForBruker(fnr: string, enhetId: string) {
    const url = `${VEILARBPORTEFOLJE_URL}/v1/hent-huskelapp-for-bruker`;
    const config = {...MED_CREDENTIALS, method: 'post', body: JSON.stringify({fnr, enhetId})};
    return fetchToJson(url, config);
}

export function slettHuskelapp(huskelappId: string) {
    const url = `${VEILARBPORTEFOLJE_URL}/v1/huskelapp`;
    const config = {...MED_CREDENTIALS, method: 'delete', body: JSON.stringify({huskelappId})};
    return fetchToJson(url, config);
}

export function hentEnhetTiltak(enhetId) {
    const url = `${VEILARBPORTEFOLJE_URL}/enhet/${enhetId}/tiltak`;
    return fetchToJson(url, MED_CREDENTIALS);
}

export function hentFeatures(featureQueryString: string) {
    return fetchToJson(`${API_BASE_URL}${FEATURE_URL}?${featureQueryString}`);
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
    return fetchToJson(`https://poao-sanity.intern${erDev() ? '.dev' : ''}.nav.no/systemmeldinger`, MED_CREDENTIALS);
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

export const settBrukerIKontekst = async (fnr: string): Promise<void> => {
    const respons = await fetch('/modiacontextholder/api/context', {
        ...MED_CREDENTIALS,
        method: 'post',
        body: JSON.stringify({verdi: fnr, eventType: 'NY_AKTIV_BRUKER'})
    });

    return sjekkStatuskode(respons);
};

export const hentBrukerIKontekst = async () => {
    try {
        const data = await fetchToJson('/modiacontextholder/api/context');

        if (!data || typeof data.aktivBruker === 'undefined') {
            console.error('Klarte ikke hente bruker fra kontekst. Grunn: responsen var tom.');
            return null;
        }

        if (data.aktivBruker === null) {
            return null;
        }

        if (typeof data.aktivBruker !== 'string') {
            console.error('Klarte ikke hente bruker fra kontekst. Grunn: responstypen var på et uforventet format.');
            return null;
        }

        return data.aktivBruker as string;
    } catch (e) {
        console.error('Klarte ikke hente bruker fra kontekst. Grunn: fikk uforventet statuskode.');
        return null;
    }
};

export const fjernBrukerIKontekst = async () => {
    const respons = await fetch('/modiacontextholder/api/context/aktivbruker', {
        ...MED_CREDENTIALS,
        method: 'delete'
    });

    return sjekkStatuskode(respons);
};

export const hentEnhetIKontekst = async () => {
    try {
        const data = await fetchToJson('/modiacontextholder/api/context/v2/aktivenhet');

        if (data.aktivEnhet === null) {
            return null;
        }

        if (typeof data.aktivEnhet !== 'string') {
            return null;
        }

        return data.aktivEnhet as string;
    } catch {
        return null;
    }
};
