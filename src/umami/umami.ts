import {erProd} from '../utils/url-utils';

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
