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
    script.setAttribute('data-auto-track', 'false');
    script.setAttribute('defer', '');

    script.onload = () => {
        const trackUrl = (url: string) => {
            const sanitizedUrl = /\/[A-Za-z]\d{6}$/.test(url)
                ? url.replace(/\/[A-Za-z]\d{6}$/, '/maskertNavident')
                : url;

            globalThis.umami?.track({
                website: dataWebsiteId,
                url: sanitizedUrl,
                type: 'pageview'
            });
        };

        // Track initial load
        trackUrl(window.location.pathname);

        // Patch history.pushState and history.replaceState for SPA navigation
        const originalPush = window.history.pushState;
        const originalReplace = window.history.replaceState;

        window.history.pushState = function (state, title, url) {
            if (url) trackUrl(url.toString());
            return originalPush.apply(this, [state, title, url]);
        };

        window.history.replaceState = function (state, title, url) {
            if (url) trackUrl(url.toString());
            return originalReplace.apply(this, [state, title, url]);
        };

        // Optional: track back/forward navigation
        window.addEventListener('popstate', () => trackUrl(window.location.pathname));
    };

    document.head.appendChild(script);
}
