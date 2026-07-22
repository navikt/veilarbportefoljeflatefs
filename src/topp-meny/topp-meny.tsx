import {useSelector} from 'react-redux';
import Toasts from '../components/toast/toast';
import {Lenker} from './lenker';
import {AppState} from '../reducer';
import {STATUS} from '../ducks/utils';
import {DarkModeToggle} from '../components/toggle/dark-mode-toggle';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {Moteplan} from '../minoversikt/moteplan/Moteplan';
import {useEnhetSelector} from '../hooks/redux/use-enhet-selector';
import {useSelectGjeldendeVeileder} from '../hooks/portefolje/use-select-gjeldende-veileder';
import {OversiktType} from '../ducks/ui/valgte-kolonner';
import {Endringslogg} from '../components/endringslogg/endringslogg';
import {DARKMODE} from '../konstanter';
import './topp-meny.css';

interface Props {
    erPaloggetVeileder?: boolean;
    oversiktType: OversiktType;
}

export function ToppMeny({erPaloggetVeileder = false, oversiktType}: Props) {
    //VENTER PÅ ATT HENTE PORTEFOLJESTORRELSER FØR ATT VETA OM VI SKA VISA MIN OVERSIKT LENKEN ELLER EJ
    const portefoljestorrelser = useSelector((state: AppState) => state.portefoljestorrelser);
    const innloggetVeileder = useSelector((state: AppState) => state.innloggetVeileder);
    const gjeldendeVeileder = useSelectGjeldendeVeileder();
    const enhet = useEnhetSelector();

    if (portefoljestorrelser.status === STATUS.PENDING || portefoljestorrelser.status === STATUS.NOT_STARTED) {
        return null;
    }

    if (innloggetVeileder.status === STATUS.PENDING || innloggetVeileder.status === STATUS.NOT_STARTED) {
        return null;
    }

    return (
        <div className="topp-meny">
            <Lenker erPaloggetVeileder={erPaloggetVeileder} />
            <Toasts />
            {oversiktType === OversiktType.minOversikt && enhet && (
                <Moteplan veileder={gjeldendeVeileder} enhet={enhet} />
            )}
            <Endringslogg userId={innloggetVeileder.data?.ident!} />
            {harDarkModeFeatureToggle && <DarkModeToggle />}
        </div>
    );
}
