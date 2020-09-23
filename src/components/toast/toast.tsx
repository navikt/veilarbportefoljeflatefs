import React from 'react';
import { connect } from 'react-redux';
import {
    fjernIngenEndringerToast,
    fjernLagreEndringerToast,
    fjernOpprettGruppeToast,
    fjernSletteGruppeToast,
    fjernSorteringToast,
    ToastActionType
} from '../../store/toast/actions';
import hiddenIf from '../hidden-if/hidden-if';
import { AppState } from '../../reducer';
import { OrNothing } from '../../utils/types/types';
import TimedToast from './veiledergruppe-toast';
import './toast.less';

interface StateProps {
    toasts: OrNothing<ToastActionType>;
}

function Toasts({toasts}: StateProps) {
    switch (toasts) {
        case ToastActionType.VIS_OPPRETT_GRUPPE_TOAST:
            return <TimedToast
                toastTekst="Gruppen er opprettet"
                alertstripe="suksess"
                fjernToast={fjernOpprettGruppeToast()}
            />;
        case ToastActionType.VIS_LAGRE_ENDRINGER_TOAST:
            return <TimedToast
                toastTekst="Gruppen er lagret"
                alertstripe="suksess"
                fjernToast={fjernLagreEndringerToast()}
            />;
        case ToastActionType.VIS_SLETTE_GRUPPE_TOAST:
            return <TimedToast
                toastTekst="Gruppen er slettet"
                alertstripe="suksess"
                fjernToast={fjernSletteGruppeToast()}
            />;
        case ToastActionType.VIS_INGEN_ENDRINGER_TOAST:
            return <TimedToast
                toastTekst="Du har ikke gjort noen endringer"
                alertstripe="info"
                fjernToast={fjernIngenEndringerToast()}
            />;
        case ToastActionType.VIS_LAGRE_SORTERING_TOAST:
            return <TimedToast
                toastTekst="Din sortering er lagret"
                alertstripe="suksess"
                fjernToast={fjernSorteringToast()}
            />;

        case ToastActionType.FJERN_OPPRETT_GRUPPE_TOAST:
        case ToastActionType.FJERN_LAGRE_ENDRINGER_TOAST:
        case ToastActionType.FJERN_SLETTE_GRUPPE_TOAST:
        case ToastActionType.FJERN_INGEN_ENDRINGER_TOAST:
            return null;
        default:
            return null;
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    toasts: state.toastReducer.toasts
});

// @ts-ignore
export default connect<StateProps>(mapStateToProps)(hiddenIf(Toasts));
