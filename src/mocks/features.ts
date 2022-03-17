import {
    DARKMODE,
    SPOR_OM_TILBAKEMELDING,
    VEDTAKSTOTTE,
    ALERTSTRIPE_FEILMELDING,
    UTEN_KRR_FILTER,
    TVUNGEN_STEPPER,
    IKKE_AVTALT
} from '../konstanter';

const toggles = {
    [SPOR_OM_TILBAKEMELDING]: true,
    [VEDTAKSTOTTE]: true,
    [DARKMODE]: true,
    [ALERTSTRIPE_FEILMELDING]: false,
    [UTEN_KRR_FILTER]: true,
    [TVUNGEN_STEPPER]: false,
    [IKKE_AVTALT]: false
};

export default toggles;
