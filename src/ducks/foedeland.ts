// Actions
import * as Api from '../middleware/api';
import {doThenDispatch, STATUS} from './utils';

export const OK = 'veilarbportefoljeflatefs/foedeland/OK';
export const FEILET = 'veilarbportefoljeflatefs/foedeland/FEILET';
export const PENDING = 'veilarbportefoljeflatefs/foedeland/PENDING';

export interface Foedeland {
    code: string;
    land: string;
}

export interface FoedelandOptions {
    label: string;
    value: string;
    checked?: boolean;
}

export interface FoedelandListState {
    data: Map<string, string>;
    status: string;
}

const initalState: FoedelandListState = {
    data: new Map<string, string>(),
    status: STATUS.NOT_STARTED
};

// Reducer
export function foedelandListReducer(state: FoedelandListState = initalState, action) {
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
                    action.data.map(foedeland => {
                        return [foedeland.code, foedeland.land];
                    })
                )
            };
        }
        default:
            return state;
    }
}

// Action Creators
export function hentFoedelandList(enhet) {
    return doThenDispatch(() => Api.hentFoedeland(enhet), {
        OK,
        FEILET,
        PENDING
    });
}
