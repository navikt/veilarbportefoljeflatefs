import {Dispatch} from 'redux';
import {getMuligeKolonner} from './listevisning-selectors';
import {FiltervalgModell} from '../../model-interfaces';

export enum ActionTypeKeys {
    VELG_ALTERNATIV = 'listevisning/velg_alternativ',
    AVVELG_ALTERNATIV = 'listevisning/avvelg_alternativ',
    OPPDATER_VALGTE_ALTERNATIV = 'listevisning/oppdater_valgte_alternativ',
    OPPDATER_MULIGE_ALTERNATIV = 'listevisning/oppdater_mulige_alternativ',
    LUKK_INFOPANEL = 'listevisning/lukk_infopanel',
    OTHER_ACTION = '__OTHER_ACTION__'
}

export enum Kolonne {
    OPPFOLGINGSTARTET = 'oppfolgingstartet',
    VEILEDER = 'veileder',
    NAVIDENT = 'navident',
    UTLOPTE_AKTIVITETER = 'utlopteaktiviteter',
    AVTALT_AKTIVITET = 'avtaltaktivitet',
    VENTER_SVAR = 'ventersvar',
    UTLOP_YTELSE = 'utlopytelse',
    VEDTAKSPERIODE = 'vedtaksperiode',
    RETTIGHETSPERIODE = 'rettighetsperiode',
    UTLOP_AKTIVITET = 'utlopaktivitet',
    START_DATO_AKTIVITET = 'aktivitet_start',
    NESTE_START_DATO_AKTIVITET = 'neste_aktivitet_start',
    FORRIGE_START_DATO_AKTIVITET = 'forrige_aktivitet_start',
    MOTER_IDAG = 'moterMedNavIdag',
    MOTER_VARIGHET = 'moter_varighet',
    MOTE_ER_AVTALT = 'mote_avtalt',
    ARBEIDSLISTE_FRIST = 'arbeidslistefrist',
    ARBEIDSLISTE_OVERSKRIFT = 'arbeidsliste_overskrift',
    VEDTAKSTATUS_ENDRET = 'vedtakstatus_endret',
    VEDTAKSTATUS = 'vedtakstatus',
    ANSVARLIG_VEILEDER_FOR_VEDTAK = 'ansvarlig_veileder_for_vedtak',
    SISTE_ENDRING = 'siste_endring',
    SISTE_ENDRING_DATO = 'siste_endring_dato',
    FODELAND = 'fodeland',
    STATSBORGERSKAP = 'statsborgerskap',
    STATSBORGERSKAP_GYLDIG_FRA = 'statsborgerskap_gyldig_fra',
    TOLKEBEHOV = 'tolkebehov',
    TOLKEBEHOV_SPRAAK = 'tolkebehov_spraak',
    TOLKEBEHOV_SIST_OPPDATERT = 'tolkebehov_sist_oppdatert',
    CV_SVARFRIST = 'cv_svarfrist'
}

export enum OversiktType {
    minOversikt = 'minOversikt',
    enhetensOversikt = 'enhetensOversikt',
    veilederOversikt = 'veilederOversikt'
}

interface ListevisningAction {
    type: ActionTypeKeys.VELG_ALTERNATIV | ActionTypeKeys.AVVELG_ALTERNATIV;
    kolonne: Kolonne;
}

interface OppdaterListevisningAction {
    type: ActionTypeKeys.OPPDATER_VALGTE_ALTERNATIV | ActionTypeKeys.OPPDATER_MULIGE_ALTERNATIV;
    kolonner: Kolonne[];
}

interface LukkInfopanelAction {
    type: ActionTypeKeys.LUKK_INFOPANEL;
}

interface OtherAction {
    type: ActionTypeKeys.OTHER_ACTION;
}

type ListevisningActions = ListevisningAction | OppdaterListevisningAction | LukkInfopanelAction | OtherAction;

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

export function listevisningReducer(state = initialStateMinOversikt, action: ListevisningActions) {
    switch (action.type) {
        case ActionTypeKeys.VELG_ALTERNATIV:
            return {...state, valgte: addIfNotExists(action.kolonne, state.valgte)};
        case ActionTypeKeys.AVVELG_ALTERNATIV:
            return {...state, valgte: state.valgte.filter(alternativ => alternativ !== action.kolonne)};
        case ActionTypeKeys.OPPDATER_VALGTE_ALTERNATIV:
            return {...state, valgte: action.kolonner};
        case ActionTypeKeys.OPPDATER_MULIGE_ALTERNATIV:
            return {...state, mulige: action.kolonner};
        case ActionTypeKeys.LUKK_INFOPANEL:
            return {...state, lukketInfopanel: true};
        default:
            return state;
    }
}

export default listevisningReducer;

export const velgAlternativ = (kolonne: Kolonne, oversiktType: OversiktType) => ({
    type: ActionTypeKeys.VELG_ALTERNATIV,
    kolonne,
    name: oversiktType
});
export const avvelgAlternativ = (kolonne: Kolonne, oversiktType: OversiktType) => ({
    type: ActionTypeKeys.AVVELG_ALTERNATIV,
    kolonne,
    name: oversiktType
});
export const lukkInfopanel = (oversiktType: OversiktType) => ({
    type: ActionTypeKeys.LUKK_INFOPANEL,
    name: oversiktType
});

export const oppdaterAlternativer = (
    dispatch: Dispatch<OppdaterListevisningAction>,
    filterValg: FiltervalgModell,
    oversiktType: OversiktType
) => {
    const nyeMuligeAlternativer = getMuligeKolonner(filterValg, oversiktType);

    dispatch({
        type: ActionTypeKeys.OPPDATER_MULIGE_ALTERNATIV,
        kolonner: nyeMuligeAlternativer,
        name: oversiktType
    });

    if (nyeMuligeAlternativer.length <= 3) {
        dispatch({
            type: ActionTypeKeys.OPPDATER_VALGTE_ALTERNATIV,
            kolonner: nyeMuligeAlternativer,
            name: oversiktType
        });
    } else {
        dispatch({
            type: ActionTypeKeys.OPPDATER_VALGTE_ALTERNATIV,
            name: oversiktType,
            kolonner: nyeMuligeAlternativer.slice(0, 3)
        });
    }
};
