import React from 'react';
import { connect } from 'react-redux';
import { ToastActionType } from '../../store/toast/actions';
import hiddenIf from '../hidden-if/hidden-if';
import { AppState } from '../../reducer';
import LagreEndringerToast from './lagre-endringer-toast';
import SletteGruppeToast from './slette-gruppe-toast';
import { OrNothing } from '../../utils/types/types';

interface StateProps {
    toasts: OrNothing<ToastActionType>;
}

function Toasts({toasts}: StateProps) {
    const toast = () => {
        switch (toasts) {
            case ToastActionType.VIS_LAGRE_ENDRINGER_TOAST:
            case ToastActionType.VIS_LAGRE_NYTT_FILTER_TOAST:
                return <LagreEndringerToast/>;
            case ToastActionType.VIS_SLETTE_GRUPPE_TOAST:
                return <SletteGruppeToast/>;
            case ToastActionType.FJERN_LAGRE_ENDRINGER_TOAST:
                return null;
            default:
                return null;
        }
    };
    return (
        <>
            {toast()}
        </>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    toasts: state.toastReducer.toasts
});

// @ts-ignore
export default connect<StateProps>(mapStateToProps)(hiddenIf(Toasts));
