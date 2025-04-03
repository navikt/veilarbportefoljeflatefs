// Actions
import * as Api from '../middleware/api';
import {doThenDispatch, STATUS} from './utils';

export const OK = 'veilarbportefoljeflatefs/tolkebehov/OK';
export const FEILET = 'veilarbportefoljeflatefs/tolkebehov/FEILET';
export const PENDING = 'veilarbportefoljeflatefs/tolkebehov/PENDING';

export interface TolkebehovSpraak {
    code: string;
    spraak: string;
}

export interface TolkebehovSpraakOptions {
    label: string;
    value: string;
    checked?: boolean;
}

export interface TolkebehovSpraakListState {
    data: Map<string, string>;
    status: string;
}

const initalState: TolkebehovSpraakListState = {
    data: new Map<string, string>(),
    status: STATUS.NOT_STARTED
};

// Reducer
export function tolkebehovListReducer(state: TolkebehovSpraakListState = initalState, action) {
    switch (action.type) {
        case PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case FEILET:
            return {...state, status: STATUS.ERROR, data: new Map()};
        case OK: {
            return {
                ...state,
                status: STATUS.OK,
                data: new Map(
                    action.data.map(tolkebehov => {
                        return [tolkebehov.code, tolkebehov.spraak];
                    })
                )
            };
        }
        default:
            return state;
    }
}

// Action Creators
export function hentTolkebehovSpraak(enhet) {
    return doThenDispatch(() => Api.hentTolkebehovSpraak(enhet), {
        OK,
        FEILET,
        PENDING
    });
}
