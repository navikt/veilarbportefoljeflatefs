import {handterFeil, STATUS} from './utils';
import {toJson} from '../middleware/api';
import {FargekategoriDataModell} from '../model-interfaces';
import {AppState} from '../reducer';
import * as Api from '../middleware/api';
import {visServerfeilModal} from './modal-serverfeil';
import {visFeiletModal} from './modal-feilmelding-brukere';
import {visTilordningOkModal} from './modal';
import {pagineringSetup} from './paginering';
import {hentPortefoljeForVeileder} from './portefolje';
import {useSelector} from 'react-redux';

// Actions
const FARGEKATEGORI_REDIGER_OK = 'veilarbportefolje/oppdater_fargekategori/OK';
const FARGEKATEGORI_REDIGER_FEILET = 'veilarbportefolje/oppdater_fargekategori/FEILET';
const FARGEKATEGORI_REDIGER_PENDING = 'veilarbportefolje/oppdater_fargekategori/PENDING';
const OPPDATER_FARGEKATEGORI = 'veilarbportefolje/portefolje/FARGEKATEGORI';

const initialState = {
    data: {}
};

function useSetInnloggetVeileder() {
    const innloggetVeilederInfo = useSelector((state: AppState) => state.innloggetVeileder.data);
    return innloggetVeilederInfo?.ident;
}

//  Reducer
export default function fargekategoriReducer(state = initialState, action) {
    switch (action.type) {
        case FARGEKATEGORI_REDIGER_OK: {
            return {...state, status: STATUS.OK, data: action.data};
        }
        case FARGEKATEGORI_REDIGER_PENDING: {
            return {...state, status: STATUS.PENDING};
        }
        case FARGEKATEGORI_REDIGER_FEILET: {
            return {...state, status: STATUS.ERROR};
        }
        default:
            return state;
    }
}

// Action Creators
/*
export function lagreFargekategoriAction(fargekategori: FargekategoriDataModell) {
    return doThenDispatch(() => oppdaterFargekategori(fargekategori), {
        OK: FARGEKATEGORI_REDIGER_OK,
        FEILET: FARGEKATEGORI_REDIGER_FEILET,
        PENDING: FARGEKATEGORI_REDIGER_PENDING
    });
}
*/
export function oppdaterFargekategori(fargekategori: FargekategoriDataModell) {
    return (dispatch, getState: () => AppState) => {
        //       dispatch({type: TILDEL_VEILEDER_RELOAD});
        dispatch({type: FARGEKATEGORI_REDIGER_PENDING});
        Api.oppdaterFargekategorier(fargekategori)
            .then(toJson)
            .then(res => {
                dispatch({
                    type: OPPDATER_FARGEKATEGORI,
                    fargekategori: fargekategori.fargekategoriVerdi,
                    okOppdateringer: res.data
                });

                if (res.error.length > 0) {
                    const feilendeOppdateringer = res.error;
                    const feiledeFnr = feilendeOppdateringer.map(f => f.brukerFnr);

                    const vellykkedeOppdateringer = res.data;
                    const suksessFnr = vellykkedeOppdateringer.map(f => f.brukerFnr);

                    visFeiletModal({
                        aarsak: FARGEKATEGORI_REDIGER_FEILET,
                        brukereError: feiledeFnr,
                        brukereOk: suksessFnr
                    })(dispatch);
                } else {
                    const vellykkedeOppdateringer = res.data;
                    const suksessFnr = vellykkedeOppdateringer.map(f => f.brukerFnr);
                    dispatch(visTilordningOkModal(suksessFnr.map(tilordning => ({brukerFnr: tilordning.brukerFnr}))));
                    dispatch(pagineringSetup({side: 1}));
                }
                /*
                             if (oversiktType === OversiktType.minOversikt) {
                                 dispatch({
                                     type: OPPDATER_ANTALL,
                                     antallTilordninger: tilordninger.length - res.feilendeTilordninger.length
                                 });
                             }

                 */
            })
            .then(() => {
                // Venter litt slik at indeks kan komme i sync
                setTimeout(() => {
                    const enhet = getState().valgtEnhet.data.enhetId;
                    const rekkefolge = getState().portefolje.sorteringsrekkefolge;
                    const sorteringsfelt = getState().portefolje.sorteringsfelt;

                    const filtervalg = getState().filtreringMinoversikt;
                    dispatch(
                        hentPortefoljeForVeileder(
                            enhet,
                            useSetInnloggetVeileder(),
                            rekkefolge,
                            sorteringsfelt,
                            filtervalg
                        )
                    );
                }, 2000);
            })

            .catch(error => {
                visServerfeilModal()(dispatch);
                // TILDEL_VEILEDER_FEILET setter errorstatus slik at spinner forsvinner
                return handterFeil(dispatch, FARGEKATEGORI_REDIGER_FEILET)(error);
            })
            .then(() => {
                // Venter litt slik at indeks kan komme i sync
                setTimeout(() => {
                    const enhet = getState().valgtEnhet.data.enhetId;
                    //eslint-disable-next-line
                    console.log('enhet', enhet);
                    /*

                                    if (oversiktType === OversiktType.minOversikt) {
                                        hentStatustallForVeileder(enhet, veilederIdent)(dispatch);
                                    } else {
                                        hentStatustallForEnhet(enhet)(dispatch);
                                    }

                     */
                }, 2000);
            });
    };
}
