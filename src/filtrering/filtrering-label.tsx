import React, {MouseEvent} from 'react';
import {lagConfig} from './filter-konstanter';
import {ReactComponent as FilterIkon} from './filtrering-veileder-grupper/filter-ikon.svg';
import classNames from 'classnames';
import './filtrering-label.less';
import './filtrering-skjema.less';
import { useDispatch } from 'react-redux';
import { ToastActionType } from '../store/toast/actions';
import { useToastSelector } from '../hooks/redux/use-toast-selector';

interface FiltreringLabelProps {
    label: string | { label: string };
    slettFilter: (event: MouseEvent<HTMLButtonElement>) => void;
    markert?: boolean;
    harMuligMenIkkeValgtKolonne?: boolean;
    skalHaKryssIkon?: boolean;
}

function FiltreringLabel({label, slettFilter, harMuligMenIkkeValgtKolonne = false, markert = false, skalHaKryssIkon = true}: FiltreringLabelProps) {
    const className = classNames('filtreringlabel__label', {'filtreringlabel-slett-filter': !skalHaKryssIkon});
    const arialLabel = skalHaKryssIkon ? 'Slett filter' : ' Slett alle filtervalg';
    const slettAlleFiltervalg = arialLabel === " Slett alle filtervalg";
    const buttonClassnames = classNames('filtreringlabel', 'typo-undertekst', {'filtreringlabel--markert': markert}, {'filtreringlabel--muligeKolonner': harMuligMenIkkeValgtKolonne}, {'slett-alle-filtervalg-knapp': slettAlleFiltervalg});
    const dispatch = useDispatch();
    const toastSelector = useToastSelector()

    if(label === undefined){
        if(toastSelector !== ToastActionType.VIS_FILTER_FEIL_TOAST)
            dispatch({type: ToastActionType.VIS_FILTER_FEIL_TOAST})
            
        return null;
    }
    return (
        <button
            title={lagConfig(label).label}
            aria-label={arialLabel}
            className={buttonClassnames}
            onClick={slettFilter}>
            <span className={className}>{lagConfig(label).label}</span>
            {skalHaKryssIkon && <FilterIkon/>}
        </button>
    );
}

export default FiltreringLabel;
