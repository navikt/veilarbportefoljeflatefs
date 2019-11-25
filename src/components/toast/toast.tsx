import React from 'react';
import {connect} from 'react-redux';
import {ToastActionType} from '../../store/toast/actions';
import hiddenIf from '../hidden-if/hidden-if';
import { AppState } from '../../reducer';
import LagreEndringerToast from './lagre-endringer-toast';

interface StateProps {
    toasts: ToastActionType[];
}

function Toasts({toasts}: StateProps) {
    return (
        <>
            {toasts.map((toast, index) => {
                switch (toast) {
                    case ToastActionType.VIS_LAGRE_ENDRINGER_TOAST:
                        // @ts-ignore
                        return <LagreEndringerToast key={index}
                        />;
                    default:
                        return null;
                }
            })}
        </>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    toasts: state.toastReducer.toasts
});

// @ts-ignore
export default connect<StateProps>(mapStateToProps)(hiddenIf(Toasts));
