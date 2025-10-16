import {
    ALERTSTRIPE_FEILMELDING,
    BRUK_NYTT_ARENA_AAP_FILTER,
    DARKMODE,
    VIS_AAPFILTER_MED_KELVINDATA,
    VIS_MELDING_OM_BRUKERE_MED_ADRESSEBESKYTTELSE_ELLER_SKJERMING,
    VIS_TILTAKSPENGER_MED_TPSAKDATA
} from '../../konstanter';

/** Styrer kva som vert vist lokalt,
 * og på demo-versjonen på https://navikt.github.io/veilarbportefoljeflatefs (2025-10-16) */
export const mockFeatureToggles = {
    [DARKMODE]: true,
    [ALERTSTRIPE_FEILMELDING]: false,
    [VIS_MELDING_OM_BRUKERE_MED_ADRESSEBESKYTTELSE_ELLER_SKJERMING]: true,
    [VIS_AAPFILTER_MED_KELVINDATA]: true,
    [VIS_TILTAKSPENGER_MED_TPSAKDATA]: true,
    [BRUK_NYTT_ARENA_AAP_FILTER]: true
};
