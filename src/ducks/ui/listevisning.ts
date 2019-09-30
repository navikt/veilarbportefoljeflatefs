import { Dispatch } from 'redux';
import { AppState } from '../../reducer';
import { selectMuligeAlternativer, selectValgteAlternativer, getMuligeKolonner } from './listevisning-selectors';
import { ToolbarPosisjon } from '../../components/toolbar/toolbar';

export enum ActionTypeKeys {
    VELG_ALTERNATIV = 'listevisning/velg_alternativ',
    AVVELG_ALTERNATIV = 'listevisning/avvelg_alternativ',
    OPPDATER_VALGTE_ALTERNATIV = 'listevisning/oppdater_valgte_alternativ',
    OPPDATER_MULIGE_ALTERNATIV = 'listevisning/oppdater_mulige_alternativ',
    LUKK_INFOPANEL = 'listevisning/lukk_infopanel',
    OTHER_ACTION = '__OTHER_ACTION__'
}

export enum Veilederpaginering {
    TABELLVISNING = 'TABELLVISNING',
    DIAGRAMVISNING = 'DIAGRAMVISNING'
}

export enum Kolonne {
    BRUKER = 'bruker',
    FODSELSNR = 'fodselsnr',
    OPPFOLGINGSTARTET = 'oppfolgingstartet',
    VEILEDER = 'veileder',
    NAVIDENT = 'navident',
    UTLOPTE_AKTIVITETER = 'utlopteaktiviteter',
    AVTALT_AKTIVITET = 'avtaltaktivitet',
    VENTER_SVAR = 'ventersvar',
    UTLOP_YTELSE = 'utlopytelse',
    UTLOP_AKTIVITET = 'utlopaktivitet',
    START_DATO_AKTIVITET = 'aktivitet_start',
    NESTE_START_DATO_AKTIVITET = 'neste_aktivitet_start',
    FORRIGE_START_DATO_AKTIVITET = 'forrige_aktivitet_start',
    MOTER_IDAG = 'moterMedNavIdag',
    MOTER_VARIGHET = 'moter_varighet',
    ARBEIDSLISTE_FRIST = 'arbeidslistefrist',
    ARBEIDSLISTE_OVERSKRIFT = 'arbeidsliste_overskrift',
}

export enum ListevisningType {
    minOversikt = 'minOversikt',
    enhetensOversikt = 'enhetensOversikt',
    veilederOversikt = 'veiledere'
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

type ListevisningActions =
    | ListevisningAction
    | OppdaterListevisningAction
    | LukkInfopanelAction
    | OtherAction;

export interface ListevisningState {
    valgte: Kolonne[];
    mulige: Kolonne[];
    lukketInfopanel: boolean;
}

export const initialStateEnhetensOversikt: ListevisningState = {
    valgte: [Kolonne.BRUKER, Kolonne.FODSELSNR, Kolonne.OPPFOLGINGSTARTET, Kolonne.NAVIDENT, Kolonne.VEILEDER],
    mulige: [Kolonne.BRUKER, Kolonne.FODSELSNR, Kolonne.OPPFOLGINGSTARTET, Kolonne.NAVIDENT, Kolonne.VEILEDER],
    lukketInfopanel: false
};

export const initialStateMinOversikt: ListevisningState = {
    valgte: [Kolonne.BRUKER, Kolonne.FODSELSNR, Kolonne.OPPFOLGINGSTARTET],
    mulige: [Kolonne.BRUKER, Kolonne.FODSELSNR, Kolonne.OPPFOLGINGSTARTET],
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
            return {...state, valgte: state.valgte.filter((alternativ) => alternativ !== action.kolonne)};
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

export const velgAlternativ = (kolonne: Kolonne, name: ListevisningType, toolbarPosisjon?: ToolbarPosisjon) => ({type: ActionTypeKeys.VELG_ALTERNATIV, kolonne, name, toolbarPosisjon});
export const avvelgAlternativ = (kolonne: Kolonne, name: ListevisningType) => ({type: ActionTypeKeys.AVVELG_ALTERNATIV, kolonne, name});
export const lukkInfopanel = (name: ListevisningType) => ({type: ActionTypeKeys.LUKK_INFOPANEL, name});

export const oppdaterAlternativer = (dispatch: Dispatch<OppdaterListevisningAction, AppState>, getState: () => AppState, name: ListevisningType) => {
    const appState = getState();
    const muligeAlternativer = selectMuligeAlternativer(appState, name);
    const valgteAlternativer = selectValgteAlternativer(appState, name);
    const nyeMuligeAlternativer = getMuligeKolonner(appState, name);

    dispatch({
        type: ActionTypeKeys.OPPDATER_MULIGE_ALTERNATIV,
        kolonner: nyeMuligeAlternativer,
        name
    });

    if (nyeMuligeAlternativer.length <= 5) {
        dispatch({
            type: ActionTypeKeys.OPPDATER_VALGTE_ALTERNATIV,
            kolonner: nyeMuligeAlternativer,
            name
        });
    } else {
        dispatch({
            type: ActionTypeKeys.OPPDATER_VALGTE_ALTERNATIV,
            name,
            kolonner: valgteAlternativer
                .filter((alternativ) => nyeMuligeAlternativer.includes(alternativ))
                .concat(nyeMuligeAlternativer.filter((alternativ) => !muligeAlternativer.includes(alternativ)))
                .slice(0, 5)
        });
    }
};
