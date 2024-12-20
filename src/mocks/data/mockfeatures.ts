import {
    ALERTSTRIPE_FEILMELDING,
    DARKMODE,
    SPOR_OM_TILBAKEMELDING,
    VEDTAKSTOTTE,
    VIS_FILTER_14A_FRA_VEDTAKSSTOTTE,
    VIS_HENDELSESFILTER,
    VIS_MELDING_OM_BRUKERE_MED_ADRESSEBESKYTTELSE_ELLER_SKJERMING
} from '../../konstanter';

export const mockFeatureToggles = {
    [SPOR_OM_TILBAKEMELDING]: true,
    [VEDTAKSTOTTE]: true,
    [DARKMODE]: true,
    [ALERTSTRIPE_FEILMELDING]: false,
    [VIS_MELDING_OM_BRUKERE_MED_ADRESSEBESKYTTELSE_ELLER_SKJERMING]: true,
    [VIS_FILTER_14A_FRA_VEDTAKSSTOTTE]: false,
    [VIS_HENDELSESFILTER]: true
};
