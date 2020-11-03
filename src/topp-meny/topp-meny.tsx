import React from 'react';
import EndringsloggTourWrapper from '../components/endringslogg/endringslogg-tour-wrapper';
import './lenker.less';
import Toasts from '../components/toast/toast';
import {Lenker} from './lenker';
import {useSelector} from 'react-redux';
import {AppState} from '../reducer';
import {STATUS} from '../ducks/utils';
import DarkModeToggle from '../components/toggle/dark-mode-toggle';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {DARKMODE} from '../konstanter';

function ToppMeny(props: {erPaloggetVeileder?: boolean}) {
    //VENTER PÅ ATT HENTE PORTEFOLJESTORRELSER FØR ATT VETA OM VI SKA VISA MIN OVERSIKT LENKEN ELLER EJ
    const portefoljestorrelser = useSelector((state: AppState) => state.portefoljestorrelser);
    const harDarkModeFeatureToggle = useFeatureSelector()(DARKMODE);

    if (portefoljestorrelser.status === STATUS.PENDING || portefoljestorrelser.status === STATUS.NOT_STARTED) {
        return null;
    }

    return (
        <div className="topp-meny" role="tablist">
            <Lenker erPaloggetVeileder={!!props.erPaloggetVeileder} />
            {harDarkModeFeatureToggle && <DarkModeToggle />}
            <Toasts />
            <EndringsloggTourWrapper />
        </div>
    );
}

export default ToppMeny;
