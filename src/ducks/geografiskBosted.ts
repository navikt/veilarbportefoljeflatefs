// Actions
import * as Api from '../middleware/api';
import {doThenDispatch, STATUS} from './utils';

export const OK = 'veilarbportefoljeflatefs/geografiskbosted/OK';
export const FEILET = 'veilarbportefoljeflatefs/geografiskbosted/FEILET';
export const PENDING = 'veilarbportefoljeflatefs/geografiskbosted/PENDING';

export interface GeografiskBosted {
    code: string;
    navn: string;
}

export interface GeografiskBostedOptions {
    label: string;
    value: string;
    checked?: boolean;
}

export interface GeografiskBostedListState {
    data: Map<string, string>;
    status: string;
}

const initalState: GeografiskBostedListState = {
    data: new Map<string, string>(),
    status: STATUS.NOT_STARTED
};

// Reducer
export function geografiskbostedListReducer(state: GeografiskBostedListState = initalState, action) {
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
                    action.data.map(bosted => {
                        return [bosted.code, bosted.navn];
                    })
                )
            };
        }
        default:
            return state;
    }
}

// Action Creators
export function hentGeografiskBosted(enhet) {
    return doThenDispatch(() => Api.hentGeografiskBosted(enhet), {
        OK,
        FEILET,
        PENDING
    });
}
