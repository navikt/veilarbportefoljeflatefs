import {
    DARKMODE,
    SISTE_ENDRING,
    SPOR_OM_TILBAKEMELDING,
    VEDTAKSTOTTE,
    ALERTSTRIPE_FEILMELDING
} from '../konstanter';

const toggles = {
    [SPOR_OM_TILBAKEMELDING]: true,
    [VEDTAKSTOTTE]: true,
    [DARKMODE]: true,
    [ALERTSTRIPE_FEILMELDING]: false,
    [SISTE_ENDRING]: true
};

export default toggles;
