import {doThenDispatch, STATUS} from './utils';
import {FiltervalgModell} from '../model-interfaces';
import {hentMineFilter, nyttMineFilter, redigerMineFilter, slettMineFilter} from "../middleware/api";

// Actions
export const HENT_LAGREDEFILTER_OK = 'lagredefilter/OK';
export const HENT_LAGREDEFILTER_FEILET = 'lagredefilter/FEILET';
export const HENT_LAGREDEFILTER_PENDING = 'lagredefilter/PENDING';

export const REDIGER_LAGREDEFILTER_OK = 'lagredefilter_endre/OK';
export const REDIGER_LAGREDEFILTER_FEILET = 'lagredefilter_endre/FEILET';
export const REDIGER_LAGREDEFILTER_PENDING = 'lagredefilter_endre/PENDING';

export const NY_LAGREDEFILTER_OK = 'lagredefilter_ny/OK';
export const NY_LAGREDEFILTER_FEILET = 'lagredefilter_ny/FEILET';
export const NY_LAGREDEFILTER_PENDING = 'lagredefilter_ny/PENDING';

export const SLETT_LAGREDEFILTER_OK = 'lagredefilter_slette/OK';
export const SLETT_LAGREDEFILTER_FEILET = 'lagredefilter_slette/FEILET';
export const SLETT_LAGREDEFILTER_PENDING = 'lagredefilter_slette/PENDING';

export interface MineFilter {
    filterNavn: string;
    filterId: number;
    filterValg: FiltervalgModell;
    opprettetDato: Date;
}

export interface MineFilterState {
    status: string;
    data: MineFilter[];
    handlingType: HandlingsType | null;
}

export interface RedigerMineFilter {
    filterNavn: string;
    filterValg: FiltervalgModell;
    filterId: number;
}

export interface NyttMineFilter {
    filterNavn: string;
    filterValg: FiltervalgModell;
}

export enum HandlingsType {
    NYTT,
    REDIGERE,
    SLETTE,
    HENTE
}

const initialState = {
    status: STATUS.NOT_STARTED,
    data: [],
    handlingType: null
};

//  Reducer
export default function reducer(state: MineFilterState = initialState, action) {
    switch (action.type) {
        case HENT_LAGREDEFILTER_PENDING:
            return {...state, status: STATUS.PENDING, handlingType: HandlingsType.HENTE};
        case NY_LAGREDEFILTER_PENDING:
            return {...state, status: STATUS.PENDING, handlingType: HandlingsType.NYTT};
        case REDIGER_LAGREDEFILTER_PENDING:
            return {...state, status: STATUS.PENDING, handlingType: HandlingsType.REDIGERE};
        case SLETT_LAGREDEFILTER_PENDING:
            return {...state, status: STATUS.PENDING, handlingType: HandlingsType.SLETTE};
        case HENT_LAGREDEFILTER_FEILET:
            return {...state, status: STATUS.ERROR, handlingType: HandlingsType.HENTE};
        case NY_LAGREDEFILTER_FEILET:
            return {...state, status: STATUS.ERROR, handlingType: HandlingsType.NYTT};
        case REDIGER_LAGREDEFILTER_FEILET:
            return {...state, status: STATUS.ERROR, handlingType: HandlingsType.REDIGERE};
        case SLETT_LAGREDEFILTER_FEILET:
            return {...state, status: STATUS.ERROR, handlingType: HandlingsType.SLETTE};
        case HENT_LAGREDEFILTER_OK:
            return {...state, status: STATUS.OK, data: action.data, handlingType: HandlingsType.HENTE};
        case NY_LAGREDEFILTER_OK:
            return {
                ...state,
                status: STATUS.OK,
                handlingType: HandlingsType.NYTT,
                data: state.data.concat(action.data)
            };
        case
        REDIGER_LAGREDEFILTER_OK:
            return {
                ...state, status: STATUS.OK, handlingType: HandlingsType.REDIGERE, data: state.data.map(elem => {
                        if (elem.filterId !== action.data.filterId) {
                            return elem;
                        }
                        return action.data;
                    }
                )
            };
        case
        SLETT_LAGREDEFILTER_OK:
            return {
                ...state,
                status: STATUS.OK,
                handlingType: HandlingsType.SLETTE,
                data: state.data.filter(elem => elem.filterId !== action.data)
            };
        default:
            return state;
    }
}


export function hentMineFilterForVeileder() {
    return doThenDispatch(() => hentMineFilter(), {
        OK: HENT_LAGREDEFILTER_OK,
        FEILET: HENT_LAGREDEFILTER_FEILET,
        PENDING: HENT_LAGREDEFILTER_PENDING
    });
}

export function lagreEndringer(endringer: RedigerMineFilter) {
    return doThenDispatch(() => redigerMineFilter(endringer), {
        OK: REDIGER_LAGREDEFILTER_OK,
        FEILET: REDIGER_LAGREDEFILTER_FEILET,
        PENDING: REDIGER_LAGREDEFILTER_PENDING
    });
}

export function lagreNyttFilter(nyttFilter: NyttMineFilter) {
    return doThenDispatch(() => nyttMineFilter(nyttFilter), {
        OK: NY_LAGREDEFILTER_OK,
        FEILET: NY_LAGREDEFILTER_FEILET,
        PENDING: NY_LAGREDEFILTER_PENDING
    });
}

export function slettFilter(filterId: number) {
    return doThenDispatch(() => slettMineFilter(filterId), {
        OK: SLETT_LAGREDEFILTER_OK,
        FEILET: SLETT_LAGREDEFILTER_FEILET,
        PENDING: SLETT_LAGREDEFILTER_PENDING
    });
}
