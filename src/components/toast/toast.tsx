import {connect} from 'react-redux';
import {
    fjernIngenEndringerToast,
    fjernLagreEndringerToast,
    fjernOpprettGruppeToast,
    fjernSletteGruppeToast,
    fjernSorteringToast,
    ToastActionType
} from '../../store/toast/actions';
import {AppState} from '../../reducer';
import {OrNothing} from '../../utils/types/types';
import {TimedToast} from './timed-toast';
import './toast.css';

interface StateProps {
    toasts: OrNothing<ToastActionType>;
}

function Toasts({toasts}: StateProps) {
    switch (toasts) {
        case ToastActionType.VIS_OPPRETT_GRUPPE_TOAST:
            return (
                <TimedToast
                    toastTekst="Gruppen er opprettet"
                    alertstripe="success"
                    fjernToast={fjernOpprettGruppeToast()}
                />
            );
        case ToastActionType.VIS_LAGRE_ENDRINGER_TOAST:
            return (
                <TimedToast
                    toastTekst="Gruppen er lagret"
                    alertstripe="success"
                    fjernToast={fjernLagreEndringerToast()}
                />
            );
        case ToastActionType.VIS_SLETTE_GRUPPE_TOAST:
            return (
                <TimedToast
                    toastTekst="Gruppen er slettet"
                    alertstripe="success"
                    fjernToast={fjernSletteGruppeToast()}
                />
            );
        case ToastActionType.VIS_INGEN_ENDRINGER_TOAST:
            return (
                <TimedToast
                    toastTekst="Du har ikke gjort noen endringer"
                    alertstripe="info"
                    fjernToast={fjernIngenEndringerToast()}
                />
            );
        case ToastActionType.VIS_LAGRE_SORTERING_TOAST:
            return (
                <TimedToast
                    toastTekst="Din sortering er lagret"
                    alertstripe="success"
                    fjernToast={fjernSorteringToast()}
                />
            );
        case ToastActionType.VIS_SORTERING_FEILET_TOAST:
            return (
                <TimedToast
                    toastTekst="Din sortering ble ikke lagret"
                    alertstripe="error"
                    fjernToast={fjernSorteringToast()}
                />
            );

        case ToastActionType.FJERN_OPPRETT_GRUPPE_TOAST:
        case ToastActionType.FJERN_LAGRE_ENDRINGER_TOAST:
        case ToastActionType.FJERN_SLETTE_GRUPPE_TOAST:
        case ToastActionType.FJERN_INGEN_ENDRINGER_TOAST:
        case ToastActionType.FJERN_SORTERING_TOAST:
            return null;
        default:
            return null;
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    toasts: state.toastReducer.toasts
});

// @ts-ignore
export default connect<StateProps>(mapStateToProps)(Toasts);
