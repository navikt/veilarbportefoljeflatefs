import {handterFeil, STATUS} from './utils';
import {toJson} from '../middleware/api';
import {FargekategoriDataModell} from '../model-interfaces';
import {AppState} from '../reducer';
import * as Api from '../middleware/api';
import {visServerfeilModal} from './modal-serverfeil';

// Actions
const FARGEKATEGORI_REDIGER_OK = 'veilarbportefolje/oppdater_fargekategori/OK';
const FARGEKATEGORI_REDIGER_FEILET = 'veilarbportefolje/oppdater_fargekategori/FEILET';
const FARGEKATEGORI_REDIGER_PENDING = 'veilarbportefolje/oppdater_fargekategori/PENDING';
const OPPDATER_FARGEKATEGORI = 'veilarbportefolje/portefolje/FARGEKATEGORI';

const initialState = {
    data: {}
};

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
                })
                    /*
                                if (res.feilendeTilordninger.length > 0) {
                                    const feilendeTilordninger = res.feilendeTilordninger;
                                    const feiledeFnr = feilendeTilordninger.map(f => f.brukerFnr);

                                    const vellykkedeTilordninger = tilordninger
                                        .filter(tilordning => !feiledeFnr.includes(tilordning.brukerFnr))
                                        .map(tilordning => ({brukerFnr: tilordning.brukerFnr}));

                                    visFeiletModal({
                                        aarsak: TILDELING_FEILET,
                                        brukereError: feilendeTilordninger,
                                        brukereOk: vellykkedeTilordninger
                                    })(dispatch);
                                } else {
                                    dispatch(visTilordningOkModal(tilordninger.map(tilordning => ({brukerFnr: tilordning.brukerFnr}))));
                                    dispatch(pagineringSetup({side: 1}));
                                }
                                if (oversiktType === OversiktType.minOversikt) {
                                    dispatch({
                                        type: OPPDATER_ANTALL,
                                        antallTilordninger: tilordninger.length - res.feilendeTilordninger.length
                                    });
                                }


                            })
                            .then(() => {
                                // Venter litt slik at indeks kan komme i sync
                                setTimeout(() => {
                                    const enhet = getState().valgtEnhet.data.enhetId;
                                    const rekkefolge = getState().portefolje.sorteringsrekkefolge;
                                    const sorteringsfelt = getState().portefolje.sorteringsfelt;
                                    if (oversiktType === OversiktType.minOversikt) {
                                        const filtervalg = getState().filtreringMinoversikt;
                                        dispatch(
                                            hentPortefoljeForVeileder(enhet, veilederIdent, rekkefolge, sorteringsfelt, filtervalg)
                                        );
                                    } else {
                                        const filtervalg = getState().filtreringEnhetensOversikt;
                                        dispatch(hentPortefoljeForEnhet(enhet, rekkefolge, sorteringsfelt, filtervalg));
                                    }
                                }, 2000);
                            })

                     */
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
            });
    };
}
