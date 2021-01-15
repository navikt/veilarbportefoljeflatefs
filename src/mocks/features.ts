import {
    DARKMODE,
    SISTE_ENDRING,
    SPOR_OM_TILBAKEMELDING,
    VEDTAKSTOTTE,
    ALDER_FILTER,
    ALERTSTRIPE_FEILMELDING
} from '../konstanter';

const toggles = {
    [SPOR_OM_TILBAKEMELDING]: true,
    [VEDTAKSTOTTE]: true,
    [DARKMODE]: true,
    [ALERTSTRIPE_FEILMELDING]: false,
    [ALDER_FILTER]: true,
    [SISTE_ENDRING]: true
};

export default toggles;
