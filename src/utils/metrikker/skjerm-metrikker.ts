import {logEvent} from '../frontend-logger';

const SKJERM_METRIKKER_LOG_TAG = 'portefolje.skjerm_metrikker';
const SKJERM_METRIKKER_SESSION_STORAGE_KEY = 'har_logget_skjerm_metrikker';

interface ScreenSize {
    width: number;
    height: number;
}

export enum Side {
    MIN_OVERSIKT = 'MIN_OVERSIKT',
    ENHETENS_OVERSIKT = 'ENHETENS_OVERSIKT',
    VEILEDER_OVERSIKT = 'VEILEDER_OVERSIKT',
    VEILEDER_PORTEFOLJE_OVERSIKT = 'VEILEDER_PORTEFOLJE_OVERSIKT'
}

const screenSizes: ScreenSize[] = [
    {width: 1920, height: 1080},
    {width: 1600, height: 900},
    {width: 1536, height: 864},
    {width: 1440, height: 900},
    {width: 1366, height: 768},
    {width: 1280, height: 1024},
    {width: 1280, height: 800},
    {width: 1024, height: 768}
];

const screenSizeToStr = (screenSize: ScreenSize) => {
    return screenSize.width + 'x' + screenSize.height;
};

const finnSkjermStorrelse = (width: number, height: number): string => {
    const largestSize = screenSizes[0];
    const smallestSize = screenSizes[screenSizes.length - 1];

    if (width > largestSize.width) {
        return '>' + screenSizeToStr(largestSize);
    } else if (width < smallestSize.width) {
        return '<' + screenSizeToStr(smallestSize);
    }

    let closestScreenSize: ScreenSize = screenSizes[0];
    let closestScreenSizeDelta = Number.MAX_VALUE;

    screenSizes.forEach(screenSize => {
        const screenSizeDelta = Math.abs(screenSize.width - width) + Math.abs(screenSize.height - height);

        if (screenSizeDelta < closestScreenSizeDelta) {
            closestScreenSizeDelta = screenSizeDelta;
            closestScreenSize = screenSize;
        }
    });

    return screenSizeToStr(closestScreenSize);
};

const erFullskjerm = () => {
    return window.screen.availWidth - window.innerWidth === 0;
};

export const loggSkjermMetrikker = (side: Side): void => {
    const storageKey = SKJERM_METRIKKER_SESSION_STORAGE_KEY + '-' + side;

    if (window.sessionStorage.getItem(storageKey) != null) {
        return;
    }

    window.sessionStorage.setItem(storageKey, 'true');

    logEvent(SKJERM_METRIKKER_LOG_TAG, {
        side,
        screenSize: finnSkjermStorrelse(window.screen.width, window.screen.height),
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        brukerFullskjerm: erFullskjerm()
    });
};
