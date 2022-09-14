import {
    DARKMODE,
    SPOR_OM_TILBAKEMELDING,
    VEDTAKSTOTTE,
    ALERTSTRIPE_FEILMELDING,
    UTEN_KRR_FILTER,
    TVUNGEN_STEPPER,
    STILLING_FRA_NAV
} from '../konstanter';

const toggles = {
    [SPOR_OM_TILBAKEMELDING]: true,
    [VEDTAKSTOTTE]: true,
    [DARKMODE]: true,
    [ALERTSTRIPE_FEILMELDING]: false,
    [UTEN_KRR_FILTER]: true,
    [TVUNGEN_STEPPER]: false,
    [STILLING_FRA_NAV]: false
};

export default toggles;
