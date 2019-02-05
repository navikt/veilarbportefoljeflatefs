import { hentVeiledersEnheter } from './../middleware/api';
import { STATUS, doThenDispatch } from './utils';
import { leggEnhetIUrl, leggSeAlleIUrl, leggSideIUrl } from '../utils/url-utils';
import { ValgtEnhetModell } from '../model-interfaces';
import { Action, Dispatch } from 'redux';
import { AppState } from '../reducer';
import { settNyAktivEnhet } from '../components/enhet-context/context-reducer';
import { hentStatusTall } from './statustall';
import { hentEnhetTiltak } from './enhettiltak';
import { hentVeiledereForEnhet } from './veiledere';
import { hentPortefoljeForEnhet, hentPortefoljeForVeileder } from './portefolje';
import { IKKE_SATT } from '../konstanter';
import { pagineringSetup } from './paginering';

// Actions
const OK = 'veilarbportefolje/enheter/OK';
const FEILET = 'veilarbportefolje/enheter/FEILET';
const PENDING = 'veilarbportefolje/enheter/PENDING';
const VELG_ENHET = 'VELG_ENHET';

export interface EnheterState {
    data: any[];
    valgtEnhet: ValgtEnhetModell;
    ident?: string;
    status: string;
}

const initialState: EnheterState = {
    data: [],
    valgtEnhet: {
        status: STATUS.NOT_STARTED,
        enhet: undefined
    },
    ident: undefined,
    status: STATUS.NOT_STARTED
};

//  Reducer
export default function reducer(state: EnheterState = initialState, action): EnheterState {
    switch (action.type) {
        case PENDING:
            return { ...state, status: STATUS.PENDING };
        case FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case OK:
            return { ...state, status: STATUS.OK, data: action.data.enhetliste, ident: action.data.ident };
        case VELG_ENHET:
            return {
                ...state,
                valgtEnhet: {
                    enhet: {
                        enhetId: action.valgtEnhet
                    },
                    status: STATUS.OK
                }
            };
        default:
            return state;
    }
}

// Action Creators
export function hentEnheterForVeileder() {
    return doThenDispatch(() => hentVeiledersEnheter(), {
        OK,
        FEILET,
        PENDING
    });
}

export function velgEnhetForVeileder(valgtEnhet) {
    const enhetId = valgtEnhet.enhetId ? valgtEnhet.enhetId : valgtEnhet;
    leggEnhetIUrl(enhetId);
    return {
        type: VELG_ENHET,
        valgtEnhet: enhetId
    };
}

export function oppdaterValgtEnhet(nyEnhet: string) {
    return (dispatch: Dispatch<Action, AppState>, getState: () => AppState) => {
        const state = getState();

        dispatch(velgEnhetForVeileder(nyEnhet));
        dispatch(settNyAktivEnhet(nyEnhet));
        dispatch(hentEnhetTiltak(nyEnhet));

        leggSideIUrl(1);
        leggSeAlleIUrl(false);
        dispatch(pagineringSetup({side: 1, seAlle: false}));

        const uri = window.location.pathname;
        if (uri.includes('/portefolje')) {
            const valgtVeileder = state.portefolje.veileder.ident;
            const veilederIdent = valgtVeileder === IKKE_SATT ? state.enheter.ident : valgtVeileder;
            dispatch(hentPortefoljeForVeileder(nyEnhet, veilederIdent, IKKE_SATT, IKKE_SATT, state.filtreringMinoversikt));
            dispatch(hentStatusTall(nyEnhet, veilederIdent));
        } else if(uri.includes('/enhet')) {
            dispatch(hentPortefoljeForEnhet(nyEnhet, IKKE_SATT, IKKE_SATT, state.filtrering));
            dispatch(hentStatusTall(nyEnhet));
        } else if(uri.includes('/veiledere')) {
            dispatch(hentVeiledereForEnhet(nyEnhet));
        }
    };
}
