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
    script.setAttribute('data-exclude-search', 'true');
    script.setAttribute('defer', '');
    script.setAttribute('data-before-send', 'beforeSendHandler');

    (window as any).beforeSendHandler = function (type: string, payload: any) {
        const maskerNavIdentIUrl = (value: string) => value.replace(/[A-Za-z]\d{6}/g, 'maskertNavident');

        if (payload?.url) {
            payload.url = maskerNavIdentIUrl(payload.url);
        }

        if (payload?.referrer) {
            payload.referrer = maskerNavIdentIUrl(payload.referrer);
        }

        return maskerIdenter(payload);
    };

    document.head.appendChild(script);
}

//Funksjonen maskerer all potensiell logging av fødselsnummer og navident før det sendes til Umami. Kan også utvides til flere ting.
const maskerIdenter = (data?: Record<string, unknown>) => {
    const maskertObjektFnr = JSON.stringify(data).replace(/\d{11}/g, (_, indexOfMatch, fullString) =>
        fullString.charAt(indexOfMatch - 1) === '"' ? '***********' : '"***********"'
    );
    const maskertObjektNavIdent = maskertObjektFnr.replace(/[A-Za-z]\d{6}/g, '*******');

    try {
        return JSON.parse(maskertObjektNavIdent);
    } catch (e) {
        console.error('kunne ikke maskere data korrekt før sending til Umami');
    }
    return {};
};
