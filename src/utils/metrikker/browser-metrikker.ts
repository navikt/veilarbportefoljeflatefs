import { logEvent } from '../frontend-logger';

const BROWSER_METRIKKER_LOG_TAG = 'portefolje.browser_metrikker';
const BROWSER_METRIKKER_LOCAL_STORAGE_KEY = 'har_logget_browser_metrikker';

function getBrowserAgent() {

    const userAgent = navigator.userAgent;
    const contains = (str: string): boolean => userAgent.indexOf(str) > -1;
    let agent;

    if (contains('Firefox')) {
        agent = 'firefox';
    } else if (contains('Opera') || contains('OPR')) {
        agent = 'opera';
    } else if (contains('Trident')) {
        agent = 'ie';
    } else if (contains('Edge')) {
        agent = 'edge';
    } else if (contains('Chrome')) {
        agent = 'chrome';
    } else if (contains('Safari')) {
        agent = 'safari';
    } else {
        agent = 'unknown';
    }

    return agent;
}

export const loggBrowserMetrikker = (): void => {

    const storageKey = BROWSER_METRIKKER_LOCAL_STORAGE_KEY;

    logEvent('portefolje.browser_bruk', { browser: getBrowserAgent() });

    if (window.localStorage.getItem(storageKey) == null) {
        window.localStorage.setItem(storageKey, 'true');
        logEvent(BROWSER_METRIKKER_LOG_TAG, { browser: getBrowserAgent() });
    }

};
