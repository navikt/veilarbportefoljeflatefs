import { hentEnhetsVeiledere } from './../middleware/api';
import { STATUS, doThenDispatch } from './utils';

// Actions
export const OK = 'veilarbveileder/veiledere/OK';
export const FEILET = 'veilarbveileder/veiledere/FEILET';
export const PENDING = 'veilarbveileder/veiledere/PENDING';
export const SETT_SOKERESULTAT = 'veiledere/sett_sokeresultat';
export const RESET_SOKERESULTAT = 'veiledere/reset_sokeresultat';
export const SETT_VEILEDERFILTERVALG = 'veiledere/sett_veilederfiltervalg';
export const SETT_VEILEDEREITABELL = 'veiledere/sett_veiledereitabell';

const initialState = {
    status: STATUS.NOT_STARTED,
    data: {
        veilederListe: [],
        enhet: {}
    },
    sokeresultat: { sokIkkeStartet: true },
    veilederfiltervalg: [],
    veiledereITabell: undefined
};

//  Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PENDING:
            return { ...state, status: STATUS.PENDING };
        case FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case OK:
            return { ...state, status: STATUS.OK, data: action.data };
        case SETT_SOKERESULTAT:
            return { ...state, sokeresultat: action.sokeresultat };
        case RESET_SOKERESULTAT:
            return { ...state, sokeresultat: { sokIkkeStartet: true } };
        case SETT_VEILEDERFILTERVALG:
            return { ...state, veilederfiltervalg: action.veilederfiltervalg };
        case SETT_VEILEDEREITABELL:
            return { ...state, veiledereITabell: action.veiledere.length === 0 ? undefined : action.veiledere };
        default:
            return state;
    }
}

// Action Creators
export function hentVeiledereForEnhet(enhetId) {
    return doThenDispatch(() => hentEnhetsVeiledere(enhetId), {
        OK,
        FEILET,
        PENDING
    });
}

export function settSokeresultat(sokeresultat) {
    return {
        type: SETT_SOKERESULTAT,
        sokeresultat
    };
}

export function resetSokeresultater() {
    return {
        type: RESET_SOKERESULTAT
    };
}

export function settVeilederfiltervalg(veilederfiltervalg) {
    return {
        type: SETT_VEILEDERFILTERVALG,
        veilederfiltervalg
    };
}

export function settVeiledereITabell(veiledere) {
    return {
        type: SETT_VEILEDEREITABELL,
        veiledere
    };
}
