import * as Api from './../middleware/api';
import { doThenDispatch } from './utils';

// Actions
const OK = 'veilarbportefolje/portefolje/OK';
const FEILET = 'veilarbportefolje/portefolje/FEILET';
const PENDING = 'veilarbportefolje/portefolje/PENDING';
export const VALGT_NYE_BRUKERE = 'VALGT_NYE_BRUKERE';
export const AVVALGT_NYE_BRUKERE = 'AVVALGT_NYE_BRUKERE';
export const VALGT_INAKTIVE_BRUKERE = 'VALGT_INAKTIVE_BRUKERE';
export const AVVALGT_INAKTIVE_BRUKERE = 'AVVALGT_INAKTIVE_BRUKERE';

//  Reducer
const initialState = {
    filtervalg: {
        nyeBrukere: false,
        inaktiveBrukere: false
    }
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case VALGT_NYE_BRUKERE:
            return { ...state,
                filtervalg: {
                    nyeBrukere: true,
                    inaktiveBrukere: state.filtervalg.inaktiveBrukere
                }
            };
        case AVVALGT_NYE_BRUKERE:
            return { ...state,
                filtervalg: {
                    nyeBrukere: false,
                    inaktiveBrukere: state.filtervalg.inaktiveBrukere
                }
            };
        case VALGT_INAKTIVE_BRUKERE:
            return { ...state,
                filtervalg: {
                    nyeBrukere: state.filtervalg.nyeBrukere,
                    inaktiveBrukere: true
                }
            };
        case AVVALGT_INAKTIVE_BRUKERE:
            return { ...state,
                filtervalg: {
                    nyeBrukere: state.filtervalg.nyeBrukere,
                    inaktiveBrukere: false
                }
            };
        default:
            return state;
    }
}

// Action Creators
export function endreFiltervalg(filterId, filtervalg) {
    if (filterId === 'checkbox-filtrering-oversikt-nye-brukere') {
        return { type: filtervalg ? VALGT_NYE_BRUKERE : AVVALGT_NYE_BRUKERE };
    } else if (filterId === 'checkbox-filtrering-oversikt-inaktive-brukere') {
        return { type: filtervalg ? VALGT_INAKTIVE_BRUKERE : AVVALGT_INAKTIVE_BRUKERE };
    }
    return {};
}

export function hentPortefoljeForEnhet(enhet, rekkefolge, fra, antall, nyeBrukere, inaktiveBrukere) {
    return doThenDispatch(() =>
        Api.hentEnhetsPortefolje(enhet, rekkefolge, fra, antall, nyeBrukere, inaktiveBrukere), {
            OK, FEILET, PENDING
        });
}
