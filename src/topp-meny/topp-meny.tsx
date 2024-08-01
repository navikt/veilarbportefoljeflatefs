import React from 'react';
import './topp-meny.css';
import Toasts from '../components/toast/toast';
import {Lenker} from './lenker';
import {useSelector} from 'react-redux';
import {AppState} from '../reducer';
import {STATUS} from '../ducks/utils';
import DarkModeToggle from '../components/toggle/dark-mode-toggle';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {ALERTSTRIPE_FEILMELDING, DARKMODE} from '../konstanter';
import classNames from 'classnames';
import {getEndringsloggUrl} from '../utils/url-utils';
import Moteplan from '../minoversikt/moteplan/moteplan';
import {useEnhetSelector} from '../hooks/redux/use-enhet-selector';
import {useSelectGjeldendeVeileder} from '../hooks/portefolje/use-select-gjeldende-veileder';
import {OversiktType} from '../ducks/ui/listevisning';
import Endringslogg from '../components/endringslogg';

interface Props {
    erPaloggetVeileder?: boolean;
    oversiktType: OversiktType;
}

function ToppMeny({erPaloggetVeileder = false, oversiktType}: Props) {
    //VENTER PÅ ATT HENTE PORTEFOLJESTORRELSER FØR ATT VETA OM VI SKA VISA MIN OVERSIKT LENKEN ELLER EJ
    const portefoljestorrelser = useSelector((state: AppState) => state.portefoljestorrelser);
    const innloggetVeileder = useSelector((state: AppState) => state.innloggetVeileder);
    const harDarkModeFeatureToggle = useFeatureSelector()(DARKMODE);
    const erAlertstripeFeilmeldingFeatureTogglePa = useFeatureSelector()(ALERTSTRIPE_FEILMELDING);
    const gjeldendeVeileder = useSelectGjeldendeVeileder();
    const enhet = useEnhetSelector();

    if (portefoljestorrelser.status === STATUS.PENDING || portefoljestorrelser.status === STATUS.NOT_STARTED) {
        return null;
    }

    if (innloggetVeileder.status === STATUS.PENDING || innloggetVeileder.status === STATUS.NOT_STARTED) {
        return null;
    }

    return (
        <div className={classNames('topp-meny', erAlertstripeFeilmeldingFeatureTogglePa && 'topp-meny__alertstripe')}>
            <Lenker erPaloggetVeileder={erPaloggetVeileder} />
            {harDarkModeFeatureToggle && <DarkModeToggle />}
            <Toasts />
            {oversiktType === OversiktType.minOversikt && enhet && (
                <Moteplan veileder={gjeldendeVeileder} enhet={enhet} />
            )}
            <Endringslogg
                userId={innloggetVeileder.data?.ident!}
                appId="afolg"
                backendUrl={getEndringsloggUrl()}
                appName="Arbeidsrettet oppfølging"
                alignLeft
            />
        </div>
    );
}

export default ToppMeny;
