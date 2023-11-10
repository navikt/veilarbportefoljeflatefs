import {doThenDispatch, STATUS} from './utils';
import {lagreArbeidsliste, oppdaterArbeidsliste, slettArbeidsliste} from '../middleware/api';
import {skjulModal} from './modal';
import {oppdaterArbeidsListeState} from '../components/modal/arbeidsliste/arbeidsliste-modal-rediger';
import {dateToISODate} from '../utils/dato-utils';

// Actions
export const ARBEIDSLISTE_LAGRE_OK = 'veilarbportefolje/lagre_arbeidsliste/OK';
const ARBEIDSLISTE_LAGRE_FEILET = 'veilarbportefolje/lagre_arbeidsliste/FEILET';
const ARBEIDSLISTE_LAGRE_PENDING = 'veilarbportefolje/lagre_arbeidsliste/PENDING';

export const ARBEIDSLISTE_SLETT_OK = 'veilarbportefolje/slett_arbeidsliste/OK';
const ARBEIDSLISTE_SLETT_FEILET = 'veilarbportefolje/slett_arbeidsliste/FEILET';
const ARBEIDSLISTE_SLETT_PENDING = 'veilarbportefolje/slett_arbeidsliste/PENDING';

export const ARBEIDSLISTE_REDIGER_OK = 'veilarbportefolje/rediger_arbeidsliste/OK';
const ARBEIDSLISTE_REDIGER_FEILET = 'veilarbportefolje/rediger_arbeidsliste/FEILET';
const ARBEIDSLISTE_REDIGER_PENDING = 'veilarbportefolje/rediger_arbeidsliste/PENDING';

const initialState = {
    data: {}
};

//  Reducer
export default function arbeidslisteReducer(state = initialState, action) {
    switch (action.type) {
        case ARBEIDSLISTE_LAGRE_PENDING:
            return {...state, status: STATUS.PENDING};
        case ARBEIDSLISTE_LAGRE_FEILET:
            return {...state, status: STATUS.ERROR, data: action.data};
        case ARBEIDSLISTE_LAGRE_OK:
            return {...state, status: STATUS.OK, data: action.data};
        case ARBEIDSLISTE_SLETT_PENDING:
            return {...state, status: STATUS.PENDING};
        case ARBEIDSLISTE_SLETT_FEILET:
            return {...state, status: STATUS.ERROR, data: action.data};
        case ARBEIDSLISTE_SLETT_OK:
            return {...state, status: STATUS.OK, data: action.data};
        case ARBEIDSLISTE_REDIGER_PENDING:
            return {...state, status: STATUS.PENDING};
        case ARBEIDSLISTE_REDIGER_FEILET:
            return {...state, status: STATUS.ERROR, data: action.data};
        case ARBEIDSLISTE_REDIGER_OK:
            return {...state, status: STATUS.OK, data: action.data};
        default:
            return state;
    }
}

// Action Creators
export function redigerArbeidslisteAction(formData, props) {
    const arbeidsliste = {
        kommentar: formData.kommentar.length ? formData.kommentar : null,
        overskrift: formData.overskrift.length ? formData.overskrift : null,
        frist: formData.frist ? dateToISODate(formData.frist) : null,
        kategori: formData.kategori
    };

    return dispatch =>
        oppdaterArbeidslisteAction(
            arbeidsliste,
            props.bruker.fnr
        )(dispatch)
            .then(res =>
                oppdaterArbeidsListeState(res, arbeidsliste, props.innloggetVeileder, props.bruker.fnr, dispatch)
            )
            .then(() => dispatch(skjulModal()));
}

export function lagreArbeidslisteAction(arbeidsliste) {
    return doThenDispatch(() => lagreArbeidsliste(arbeidsliste), {
        OK: ARBEIDSLISTE_LAGRE_OK,
        FEILET: ARBEIDSLISTE_LAGRE_FEILET,
        PENDING: ARBEIDSLISTE_LAGRE_PENDING
    });
}

export function slettArbeidslisteAction(arbeidsliste) {
    return doThenDispatch(() => slettArbeidsliste(arbeidsliste), {
        OK: ARBEIDSLISTE_SLETT_OK,
        FEILET: ARBEIDSLISTE_SLETT_FEILET,
        PENDING: ARBEIDSLISTE_SLETT_PENDING
    });
}

export function oppdaterArbeidslisteAction(arbeidsliste, fnr) {
    return doThenDispatch(() => oppdaterArbeidsliste(arbeidsliste, fnr), {
        OK: ARBEIDSLISTE_REDIGER_OK,
        FEILET: ARBEIDSLISTE_REDIGER_FEILET,
        PENDING: ARBEIDSLISTE_REDIGER_PENDING
    });
}
