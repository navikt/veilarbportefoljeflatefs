import {erProd} from '../utils/url-utils';
import {AlertVistEvent, FilterValgEvent, KnappKlikketEvent} from '../amplitude/umami-event-datatype';

interface Umami {
    track(payload: unknown): void;
    track(event_name: string, payload: unknown): void;
    identify(session_data: unknown): void;
}

//Legger til type umami-felt på globalThis slik at TypeScript forstår at det finnes en globalThis.umami
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

//Før du lager en ny event -> sjekk https://github.com/navikt/analytics-taxonomy/tree/main/events
export enum UmamiEvents {
    filtervalg = 'filtervalg',
    alertvist = 'alert vist',
    knappklikket = 'knapp klikket'
}

export const trackFilterValgEvent = ({sidenavn, filternavn, kategori}: FilterValgEvent) => {
    if (!globalThis.umami) {
        // eslint-disable-next-line no-console
        console.warn('Umami is not initialized. Ignoring');
        return;
    }
    globalThis.umami.track(UmamiEvents.filtervalg, {
        sidenavn: sidenavn,
        filternavn: filternavn,
        kategori: kategori
    });
};

export const trackAlertVistEvent = ({variant, tekst}: AlertVistEvent) => {
    if (!globalThis.umami) {
        // eslint-disable-next-line no-console
        console.warn('Umami is not initialized. Ignoring');
        return;
    }
    globalThis.umami.track(UmamiEvents.alertvist, {
        variant: variant,
        tekst: tekst
    });
};

export const trackKnappKlikketEvent = ({tekst, effekt}: KnappKlikketEvent) => {
    if (!globalThis.umami) {
        // eslint-disable-next-line no-console
        console.warn('Umami is not initialized. Ignoring');
        return;
    }
    globalThis.umami.track(UmamiEvents.knappklikket, {
        tekst: tekst,
        effekt: effekt
    });
};
