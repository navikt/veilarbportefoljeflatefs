import {hentAktivBruker} from '../middleware/api';
import {STATUS, doThenDispatch} from './utils';
import {InnloggetVeilederModell} from '../typer/enhet-og-veiledere-modeller';
import {OrNothing} from '../utils/types/types';

// Actions
export const OK = 'veilarbveileder/me/OK';
export const FEILET = 'veilarbveileder/me/FEILET';
export const PENDING = 'veilarbveileder/me/PENDING';

export interface InnloggetVeilederState {
    status: any;
    data: OrNothing<InnloggetVeilederModell>;
}

const initialState = {
    status: STATUS.NOT_STARTED,
    data: null
};

//  Reducer
export function innloggetVeilederReducer(state: InnloggetVeilederState = initialState, action) {
    switch (action.type) {
        case PENDING:
            return {...state, status: STATUS.PENDING};
        case FEILET:
            return {...state, status: STATUS.ERROR, data: action.data};
        case OK:
            return {...state, status: STATUS.OK, data: action.data};
        default:
            return state;
    }
}

// Action Creators
export function hentInnloggetVeileder() {
    return doThenDispatch(() => hentAktivBruker(), {
        OK,
        FEILET,
        PENDING
    });
}
