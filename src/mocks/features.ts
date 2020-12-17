import {
    ALDER_FILTER,
    ALERTSTRIPE_FEILMELDING,
    DARKMODE,
    LIVE_FILTRERING,
    SISTE_ENDRING,
    SPOR_OM_TILBAKEMELDING,
    VEDTAKSTOTTE
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
