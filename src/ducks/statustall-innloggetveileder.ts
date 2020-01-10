import * as Api from './../middleware/api';
import { doThenDispatch, STATUS } from './utils';
import { initalStatusState, StatustallState } from './statustall';

// Actions
export const OK = 'veilarbportefoljeflatefs/statustallInnloggetVeileder/OK';
export const FEILET = 'veilarbportefoljeflatefs/statustallInnloggetVeileder/FEILET';
export const PENDING = 'veilarbportefoljeflatefs/statustallInnloggetVeileder/PENDING';

// Reducer
export default function reducer(state: StatustallState = initalStatusState, action): StatustallState {
    switch (action.type) {
        case PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case FEILET:
            return {...state, status: STATUS.ERROR, data: action.data};
        case OK: {
            return {...state, status: STATUS.OK, data: action.data};
        }
        default:
            return state;
    }
}

// Action Creators
export function hentStatusTallForInnloggetVeileder(enhet: string, veileder?: string) {
    return doThenDispatch(() => Api.hentStatusTallForVeileder(enhet, veileder), {
        OK,
        FEILET,
        PENDING
    });
}
