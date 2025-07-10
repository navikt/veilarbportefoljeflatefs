import {
    fullBrowserVersion,
    isChrome,
    isEdge,
    isEdgeChromium,
    isFirefox,
    isIE,
    isLegacyEdge,
    isOpera,
    isSafari
} from 'react-device-detect';
import {OrNothing} from '../types/types';
import {InnloggetVeilederModell} from '../../typer/enhet-og-veiledere-modeller';
import {logEvent} from '../frontend-logger';
import {mapVeilederIdentTilNonsens} from '../../middleware/metrics-middleware';

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

export const logBrowserMetrikker = (veilederIdent: OrNothing<InnloggetVeilederModell>): void => {
    const browserAgent = getBrowserAgent();
    const browserVersion = getBrowserVersion();

    if (veilederIdent) {
        logEvent(
            'portefolje.browser_bruk',
            {
                browser: browserAgent,
                version: browserVersion,
                zoom: getBrowserZoom()
            },
            {
                versionTag: browserVersion,
                identTag: mapVeilederIdentTilNonsens(veilederIdent.ident)
            }
        );
    }
};

function getBrowserVersion() {
    return fullBrowserVersion;
}
