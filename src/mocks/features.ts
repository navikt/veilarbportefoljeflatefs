import {
    DARKMODE,
    LIVE_FILTRERING,
    SISTE_ENDRING,
    SPOR_OM_TILBAKEMELDING,
    VEDTAKSTOTTE,
    ALERTSTRIPE_FEILMELDING,
    ALDER_FILTER,
} from '../konstanter';

const toggles = {
    [SPOR_OM_TILBAKEMELDING]: true,
    [VEDTAKSTOTTE]: true,
    [DARKMODE]: true,
    [ALERTSTRIPE_FEILMELDING]: false,
    [ALDER_FILTER]: true,
    [LIVE_FILTRERING]: true,
    [SISTE_ENDRING]: true
};

export default toggles;
