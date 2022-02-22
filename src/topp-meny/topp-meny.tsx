import React from 'react';
import './lenker.less';
import Toasts from '../components/toast/toast';
import {Lenker} from './lenker';
import {useSelector} from 'react-redux';
import {AppState} from '../reducer';
import {STATUS} from '../ducks/utils';
import DarkModeToggle from '../components/toggle/dark-mode-toggle';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {ALERTSTRIPE_FEILMELDING, DARKMODE} from '../konstanter';
import classNames from 'classnames';
import {Endringslogg} from '@navikt/familie-endringslogg';

function ToppMeny(props: {erPaloggetVeileder?: boolean}) {
    //VENTER PÅ ATT HENTE PORTEFOLJESTORRELSER FØR ATT VETA OM VI SKA VISA MIN OVERSIKT LENKEN ELLER EJ
    const portefoljestorrelser = useSelector((state: AppState) => state.portefoljestorrelser);
    const innloggetVeileder = useSelector((state: AppState) => state.innloggetVeileder);
    const harDarkModeFeatureToggle = useFeatureSelector()(DARKMODE);
    const erAlertstripeFeilmeldingFeatureTogglePa = useFeatureSelector()(ALERTSTRIPE_FEILMELDING);

    if (portefoljestorrelser.status === STATUS.PENDING || portefoljestorrelser.status === STATUS.NOT_STARTED) {
        return null;
    }

    if (innloggetVeileder.status === STATUS.PENDING || innloggetVeileder.status === STATUS.NOT_STARTED) {
        return null;
    }

    return (
        <div className={classNames('topp-meny', erAlertstripeFeilmeldingFeatureTogglePa && 'topp-meny__alertstripe')}>
            <Lenker erPaloggetVeileder={!!props.erPaloggetVeileder} />
            {harDarkModeFeatureToggle && <DarkModeToggle />}
            <Toasts />
            <Endringslogg
                userId={innloggetVeileder.data?.ident!}
                appId="afolg"
                backendUrl="https://poao-endringslogg.intern.navn.no"
                appName="Arbeidsrettet oppfølging"
                alignLeft
            />
        </div>
    );
}

export default ToppMeny;
