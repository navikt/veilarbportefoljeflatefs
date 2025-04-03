import {fetchPortefoljeStorrelser} from '../middleware/api';
import {doThenDispatch, STATUS} from './utils';

// Actions
const OK = 'veilarbportefolje/portefoljestorrelser/OK';
const FEILET = 'veilarbportefolje/portefoljestorrelser/FEILET';
const PENDING = 'veilarbportefolje/portefoljestorrelser/PENDING';

interface FacetResults {
    value: string;
    count: number;
}

export interface PortefoljeStorrelser {
    status: string;
    data: {
        facetResults: FacetResults[];
    };
}

const initialState: PortefoljeStorrelser = {
    status: STATUS.NOT_STARTED,
    data: {
        facetResults: []
    }
};

//  Reducer
export function portefoljestorrelserReducer(state = initialState, action) {
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
export function hentPortefoljeStorrelser(enhetId: string) {
    return doThenDispatch(() => fetchPortefoljeStorrelser(enhetId), {
        OK,
        FEILET,
        PENDING
    });
}
