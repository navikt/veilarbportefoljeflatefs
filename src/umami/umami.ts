import {erProd} from '../utils/url-utils';

interface Umami {
    track(payload: unknown): void;
    track(event_name: string, payload: unknown): void;
    identify(session_data: unknown): void;
}

declare global {
    interface GlobalThis {
        umami?: Umami;
    }
}

export function leggTilUmamiScript() {
    const dataWebsiteId = erProd() ? 'e76b7abe-f2c7-4399-a09f-31d99b82f872' : 'b73cc288-29e2-439c-83c7-565aa6a25a96';
    const script = document.createElement('script');
    script.dataset.dataHostUrl = 'https://umami.nav.no';
    script.dataset.dataWebsiteId = dataWebsiteId;
    script.dataset.src = 'https://cdn.nav.no/team-researchops/sporing/sporing.js';
    script.dataset.defer = 'defer';
    document.head.appendChild(script);
}

export enum UmamiEvents {
    filtervalg = 'filtervalg',
    alertvist = 'alert vist',
    knappklikket = 'knapp klikket'
}

export const trackFilterValgEvent = (sidenavn: string, filternavn: string, kategori: string) => {
    if (!globalThis.umami) {
        // eslint-disable-next-line no-console
        console.warn('Umami is not initialized. Ignoring');
        return;
    }
    globalThis.umami.track(UmamiEvents.filtervalg, {sidenavn: sidenavn, filternavn: filternavn, kategori: kategori});
};

export const trackAlertVistEvent = (variant: string, tekst: string) => {
    if (!globalThis.umami) {
        // eslint-disable-next-line no-console
        console.warn('Umami is not initialized. Ignoring');
        return;
    }
    globalThis.umami.track(UmamiEvents.alertvist, {variant: variant, tekst: tekst});
};

export const trackKnappKlikketEvent = (knapptekst: string, effekt: string) => {
    if (!globalThis.umami) {
        // eslint-disable-next-line no-console
        console.warn('Umami is not initialized. Ignoring');
        return;
    }
    globalThis.umami.track(UmamiEvents.knappklikket, {knapptekst: knapptekst, effekt: effekt});
};
