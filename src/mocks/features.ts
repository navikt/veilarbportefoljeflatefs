import {
    DARKMODE,
    SISTE_ENDRING,
    SPOR_OM_TILBAKEMELDING,
    VEDTAKSTOTTE,
    ALERTSTRIPE_FEILMELDING, ULESTE_ENDRINGER
} from '../konstanter';

const toggles = {
    [SPOR_OM_TILBAKEMELDING]: true,
    [VEDTAKSTOTTE]: true,
    [DARKMODE]: true,
    [ALERTSTRIPE_FEILMELDING]: false,
    [SISTE_ENDRING]: true,
    [ULESTE_ENDRINGER]: true
};

export default toggles;
