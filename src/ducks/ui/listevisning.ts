import {Dispatch} from 'redux';
import {getMuligeKolonner} from './listevisning-selectors';
import {FiltervalgModell} from '../../model-interfaces';

export enum ActionTypeKeys {
    VELG_KOLONNE = 'listevisning/velg_alternativ',
    AVVELG_KOLONNE = 'listevisning/avvelg_alternativ',
    OPPDATER_VALGTE_KOLONNER = 'listevisning/oppdater_valgte_alternativ',
    OPPDATER_MULIGE_KOLONNER = 'listevisning/oppdater_mulige_alternativ',
    LUKK_VELG_KOLONNER_DROPDOWN = 'listevisning/lukk_infopanel',
    OTHER_ACTION = '__OTHER_ACTION__'
}

export enum Kolonne {
    OPPFOLGING_STARTET = 'oppfolgingstartet',
    VEILEDER = 'veileder',
    NAVIDENT = 'navident',
    UTLOPTE_AKTIVITETER = 'utlopteaktiviteter',
    AVTALT_AKTIVITET = 'avtaltaktivitet',
    VENTER_SVAR = 'ventersvar',
    UTLOP_YTELSE = 'utlopytelse',
    GJENSTAENDE_UKER_RETTIGHET_DAGPENGER = 'gjenstaende_uker_rettighet_dagpenger',
    GJENSTAENDE_UKER_VEDTAK_TILTAKSPENGER = 'gjenstaende_uker_vedtak_tiltakspenger',
    VURDERINGSFRIST_YTELSE = 'vurderingsfrist_ytelse',
    TYPE_YTELSE = 'type_ytelse',
    VEDTAKSPERIODE = 'vedtaksperiode',
    RETTIGHETSPERIODE = 'rettighetsperiode',
    UTLOP_AKTIVITET = 'utlopaktivitet',
    START_DATO_AKTIVITET = 'aktivitet_start',
    NESTE_START_DATO_AKTIVITET = 'neste_aktivitet_start',
    FORRIGE_START_DATO_AKTIVITET = 'forrige_aktivitet_start',
    MOTER_IDAG = 'moterMedNavIdag',
    MOTER_VARIGHET = 'moter_varighet',
    MOTE_ER_AVTALT = 'mote_avtalt',
    VEDTAKSTATUS_ENDRET = 'vedtakstatus_endret',
    VEDTAKSTATUS = 'vedtakstatus',
    ANSVARLIG_VEILEDER_FOR_VEDTAK = 'ansvarlig_veileder_for_vedtak',
    SISTE_ENDRING = 'siste_endring',
    SISTE_ENDRING_DATO = 'siste_endring_dato',
    FODELAND = 'fodeland',
    STATSBORGERSKAP = 'statsborgerskap',
    STATSBORGERSKAP_GYLDIG_FRA = 'statsborgerskap_gyldig_fra',
    BOSTED_KOMMUNE = 'bosted_kommune',
    BOSTED_BYDEL = 'bosted_bydel',
    BOSTED_SIST_OPPDATERT = 'bosted_sist_oppdatert',
    TOLKEBEHOV = 'tolkebehov',
    TOLKESPRAK = 'tolkebehov_spraak',
    TOLKEBEHOV_SIST_OPPDATERT = 'tolkebehov_sist_oppdatert',
    CV_SVARFRIST = 'cv_svarfrist',
    GJELDENDE_VEDTAK_14A_INNSATSGRUPPE = 'innsatsgruppe-gjeldende-vedtak-14a',
    GJELDENDE_VEDTAK_14A_HOVEDMAL = 'hovedmal-gjeldende-vedtak-14a',
    GJELDENDE_VEDTAK_14A_VEDTAKSDATO = 'vedtaksdato-gjeldende-vedtak-14a',
    AVVIK_14A_VEDTAK = 'avvik_14a_vedtak',
    ENSLIGE_FORSORGERE_UTLOP_OVERGANGSSTONAD = 'utlop_overgangsstonad',
    ENSLIGE_FORSORGERE_VEDTAKSPERIODE = 'type_vedtaksperiode',
    ENSLIGE_FORSORGERE_AKIVITETSPLIKT = 'om_aktivitetsplikt',
    ENSLIGE_FORSORGERE_OM_BARNET = 'om_barnet',
    BARN_UNDER_18_AAR = 'har_barn_under_18',
    UTDANNING_OG_SITUASJON_SIST_ENDRET = 'utdanning_og_situasjon_sist_endret',
    HUSKELAPP_FRIST = 'huskelapp_frist',
    HUSKELAPP_KOMMENTAR = 'huskelapp_kommentar',
    TILTAKSHENDELSE_LENKE = 'tiltakshendelse_lenke',
    TILTAKSHENDELSE_DATO_OPPRETTET = 'tiltakshendelse_dato_opprettet'
}

export enum OversiktType {
    minOversikt = 'minOversikt',
    enhetensOversikt = 'enhetensOversikt',
    veilederOversikt = 'veilederOversikt'
}

interface VelgKolonnerAction {
    type: ActionTypeKeys.VELG_KOLONNE | ActionTypeKeys.AVVELG_KOLONNE;
    kolonne: Kolonne;
}

interface OppdaterValgteKolonnerAction {
    type: ActionTypeKeys.OPPDATER_VALGTE_KOLONNER | ActionTypeKeys.OPPDATER_MULIGE_KOLONNER;
    kolonner: Kolonne[];
}

interface LukkVelgKolonnerDropdownAction {
    type: ActionTypeKeys.LUKK_VELG_KOLONNER_DROPDOWN;
}

interface OtherAction {
    type: ActionTypeKeys.OTHER_ACTION;
}

type VelgKolonnerActions =
    | VelgKolonnerAction
    | OppdaterValgteKolonnerAction
    | LukkVelgKolonnerDropdownAction
    | OtherAction;

export interface ListevisningState {
    valgte: Kolonne[];
    mulige: Kolonne[];
    lukketInfopanel: boolean;
}

export const initialStateEnhetensOversikt: ListevisningState = {
    valgte: [],
    mulige: [],
    lukketInfopanel: false
};

export const initialStateMinOversikt: ListevisningState = {
    valgte: [],
    mulige: [],
    lukketInfopanel: false
};

function addIfNotExists(kolonne: Kolonne, kolonner: Kolonne[]): Kolonne[] {
    if (kolonner.includes(kolonne)) {
        return kolonner;
    }
    return [...kolonner, kolonne];
}

export function listevisningReducer(state = initialStateMinOversikt, action: VelgKolonnerActions) {
    switch (action.type) {
        case ActionTypeKeys.VELG_KOLONNE:
            return {...state, valgte: addIfNotExists(action.kolonne, state.valgte)};
        case ActionTypeKeys.AVVELG_KOLONNE:
            return {...state, valgte: state.valgte.filter(alternativ => alternativ !== action.kolonne)};
        case ActionTypeKeys.OPPDATER_VALGTE_KOLONNER:
            return {...state, valgte: action.kolonner};
        case ActionTypeKeys.OPPDATER_MULIGE_KOLONNER:
            return {...state, mulige: action.kolonner};
        case ActionTypeKeys.LUKK_VELG_KOLONNER_DROPDOWN:
            return {...state, lukketInfopanel: true};
        default:
            return state;
    }
}

export default listevisningReducer;

export const velgAlternativ = (kolonne: Kolonne, oversiktType: OversiktType) => ({
    type: ActionTypeKeys.VELG_KOLONNE,
    kolonne,
    name: oversiktType
});
export const avvelgAlternativ = (kolonne: Kolonne, oversiktType: OversiktType) => ({
    type: ActionTypeKeys.AVVELG_KOLONNE,
    kolonne,
    name: oversiktType
});
export const lukkInfopanel = (oversiktType: OversiktType) => ({
    type: ActionTypeKeys.LUKK_VELG_KOLONNER_DROPDOWN,
    name: oversiktType
});

export const oppdaterKolonneAlternativer = (
    dispatch: Dispatch<OppdaterValgteKolonnerAction>,
    filterValg: FiltervalgModell,
    oversiktType: OversiktType
) => {
    const nyeMuligeAlternativer = getMuligeKolonner(filterValg, oversiktType);

    dispatch({
        type: ActionTypeKeys.OPPDATER_MULIGE_KOLONNER,
        kolonner: nyeMuligeAlternativer,
        name: oversiktType
    });

    if (nyeMuligeAlternativer.length <= 3) {
        dispatch({
            type: ActionTypeKeys.OPPDATER_VALGTE_KOLONNER,
            kolonner: nyeMuligeAlternativer,
            name: oversiktType
        });
    } else {
        dispatch({
            type: ActionTypeKeys.OPPDATER_VALGTE_KOLONNER,
            name: oversiktType,
            kolonner: nyeMuligeAlternativer.slice(0, 3)
        });
    }
};
