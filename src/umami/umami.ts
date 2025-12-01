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
    const prodSporingskode = 'e76b7abe-f2c7-4399-a09f-31d99b82f872';
    const devSporingskode = 'b73cc288-29e2-439c-83c7-565aa6a25a96';
    const dataWebsiteId = erProd() ? prodSporingskode : devSporingskode;

    const script = document.createElement('script');
    script.src = 'https://cdn.nav.no/team-researchops/sporing/sporing.js';
    script.setAttribute('data-host-url', 'https://umami.nav.no');
    script.setAttribute('data-website-id', dataWebsiteId);
    script.setAttribute('data-auto-track', 'false'); // temporarily disable auto-tracking
    script.setAttribute('defer', '');

    script.onload = () => {
        const pathname = window.location.pathname;

        // Only sanitize if it matches the sensitive pattern
        const sanitizedUrl = /\/[A-Za-z]\d{6}$/.test(pathname)
            ? pathname.replace(/\/[A-Za-z]\d{6}$/, '/santertident')
            : pathname;

        globalThis.umami?.track({
            url: sanitizedUrl,
            type: 'pageview'
        });
    };

    document.head.appendChild(script);
}
