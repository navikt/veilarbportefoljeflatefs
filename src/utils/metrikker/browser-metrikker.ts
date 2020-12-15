import {OrNothing} from '../types/types';
import {VeilederModell} from '../../model-interfaces';
import {logEvent} from '../frontend-logger';
import {mapVeilederIdentTilNonsens} from '../../middleware/metrics-middleware';
import {
    engineName,
    fullBrowserVersion,
    isChrome,
    isEdge,
    isEdgeChromium,
    isFirefox,
    isIE,
    isLegacyEdge,
    isOpera,
    isSafari,
    osName
} from 'react-device-detect';

function getBrowserAgent(): string {
    let agent;

    if (isFirefox) {
        agent = 'firefox';
    } else if (isOpera) {
        agent = 'opera';
    } else if (isIE) {
        agent = 'ie';
    } else if (isEdge || isLegacyEdge || isEdgeChromium) {
        agent = 'edge';
    } else if (isChrome) {
        agent = 'chrome';
    } else if (isSafari) {
        agent = 'safari';
    } else {
        agent = 'unknown';
    }

    return agent;
}

function getBrowserZoom(): number {
    // Denne måten å hente zoom fungerer ikke på Safari
    if (getBrowserAgent() === 'safari') {
        return -1;
    }

    return Math.round(window.devicePixelRatio * 100);
}

export const logBrowserMetrikker = (veilederIdent: OrNothing<VeilederModell>): void => {
    const browserAgent = getBrowserAgent();
    const browserVersion = getBrowserVersion();
    const operatingSystem = getOS();
    const engineName = getEngineName();

    if (veilederIdent) {
        logEvent(
            'portefolje.browser_bruk',
            {
                browser: browserAgent,
                version: browserVersion,
                zoom: getBrowserZoom(),
                os: operatingSystem,
                engineName: engineName
            },
            {
                versionTag: browserVersion,
                osTag: operatingSystem,
                engineNameTag: engineName,
                identTag: mapVeilederIdentTilNonsens(veilederIdent.ident)
            }
        );
    }
};

function getBrowserVersion() {
    return fullBrowserVersion;
}

function getOS() {
    return osName;
}

function getEngineName() {
    return engineName;
}
