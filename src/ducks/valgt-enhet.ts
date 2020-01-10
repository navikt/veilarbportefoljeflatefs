import { STATUS } from './utils';
import { leggEnhetIUrl, leggSeAlleIUrl, leggSideIUrl } from '../utils/url-utils';
import { Action, Dispatch } from 'redux';
import { AppState } from '../reducer';
import { hentStatusTall } from './statustall';
import { hentEnhetTiltak } from './enhettiltak';
import { hentVeiledereForEnhet } from './veiledere';
import { hentPortefoljeForEnhet, hentPortefoljeForVeileder } from './portefolje';
import { IKKE_SATT } from '../konstanter';
import { pagineringSetup } from './paginering';
import {OrNothing} from "../utils/types/types";

// Actions
const PENDING = 'veilarbportefolje/enheter/PENDING';
const OK = 'VELG_ENHET';

export interface ValgtEnhetState {
    data: {
        enhetId: OrNothing<string>
    };
    status: string,
}

const initialState: ValgtEnhetState = {
    status: STATUS.NOT_STARTED,
    data: {
        enhetId: undefined
    },
};

//  Reducer
export default function reducer(state: ValgtEnhetState = initialState, action): ValgtEnhetState {
    switch (action.type) {
        case PENDING:
            return { ...state, status: STATUS.PENDING };
        case OK:
            return {...state, data: {enhetId: action.valgtEnhet}, status: STATUS.OK };
        default:
            return state;
    }
}


export function velgEnhetForVeileder(valgtEnhet) {
    const enhetId = valgtEnhet.enhetId ? valgtEnhet.enhetId : valgtEnhet;
    leggEnhetIUrl(enhetId);
    return {
        type: OK,
        valgtEnhet: enhetId
    };
}

export function oppdaterValgtEnhet(nyEnhet: string) {
    return (dispatch: Dispatch<Action, AppState>, getState: () => AppState) => {
        const state = getState();
        const valgtEnhet = state.valgtEnhet.data;
        if(valgtEnhet && valgtEnhet.enhetId === nyEnhet ) {
            return;
        }
        dispatch(velgEnhetForVeileder(nyEnhet));
        dispatch(hentEnhetTiltak(nyEnhet));
        dispatch(hentVeiledereForEnhet(nyEnhet));

        leggSideIUrl(1);
        leggSeAlleIUrl(false);
        dispatch(pagineringSetup({side: 1, seAlle: false}));

        const uri = window.location.pathname;
        if (uri.includes('/portefolje')) {
            const valgtVeileder = state.portefolje.veileder.ident;
            const veilederIdent = valgtVeileder === IKKE_SATT ? state.inloggetVeileder.data!.ident : valgtVeileder;
            dispatch(hentPortefoljeForVeileder(nyEnhet, veilederIdent, IKKE_SATT, IKKE_SATT, state.filtreringMinoversikt));
            dispatch(hentStatusTall(nyEnhet, veilederIdent));
        } else if(uri.includes('/enhet')) {
            dispatch(hentPortefoljeForEnhet(nyEnhet, IKKE_SATT, IKKE_SATT, state.filtrering));
            dispatch(hentStatusTall(nyEnhet));
        } else if(uri.includes('/veiledere')) {
            dispatch(hentStatusTall(nyEnhet));
        }
    };
}
