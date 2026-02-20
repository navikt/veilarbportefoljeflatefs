import {
    DARKMODE,
    LA_VEILEDER_VISE_FLERE_ENN_TRE_KOLONNER_SAMTIDIG,
    VIS_MELDING_OM_BRUKERE_MED_ADRESSEBESKYTTELSE_ELLER_SKJERMING
} from '../../konstanter';

/** Styrer kva som vert vist lokalt,
 * og på demo-versjonen på https://navikt.github.io/veilarbportefoljeflatefs (2025-10-16) */
export const mockFeatureToggles = {
    [DARKMODE]: true,
    [VIS_MELDING_OM_BRUKERE_MED_ADRESSEBESKYTTELSE_ELLER_SKJERMING]: true,
    [LA_VEILEDER_VISE_FLERE_ENN_TRE_KOLONNER_SAMTIDIG]: false
};
