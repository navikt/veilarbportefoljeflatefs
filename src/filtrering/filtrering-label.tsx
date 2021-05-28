import React, {MouseEvent} from 'react';
import {lagConfig} from './filter-konstanter';
import {ReactComponent as FilterIkon} from './filtrering-veileder-grupper/filter-ikon.svg';
import classNames from 'classnames';
import './filtrering-label.less';
import './filtrering-skjema.less';
import FilterFeilModal from '../components/modal/filter-feil-modal';
import {kebabUtenSpesialtegn} from '../utils/utils';

interface FiltreringLabelProps {
    label: string | {label: string};
    slettFilter: (event: MouseEvent<HTMLButtonElement>) => void;
    markert?: boolean;
    harMuligMenIkkeValgtKolonne?: boolean;
    skalHaKryssIkon?: boolean;
}

function FiltreringLabel({
    label,
    slettFilter,
    harMuligMenIkkeValgtKolonne = false,
    markert = false,
    skalHaKryssIkon = true
}: FiltreringLabelProps) {
    const className = classNames('filtreringlabel__label', {
        'filtreringlabel-slett-filter': !skalHaKryssIkon
    });
    const arialLabel = skalHaKryssIkon ? `Fjern filtervalg "${lagConfig(label).label}"` : ' Slett alle filtervalg';
    const slettAlleFiltervalg = arialLabel === ' Slett alle filtervalg';
    const buttonClassnames = classNames(
        'filtreringlabel',
        'typo-undertekst',
        {'filtreringlabel--markert': markert},
        {'filtreringlabel--muligeKolonner': harMuligMenIkkeValgtKolonne},
        {'slett-alle-filtervalg-knapp': slettAlleFiltervalg}
    );

    if (label === undefined) {
        return <FilterFeilModal isOpen={true} />;
    }

    console.log(`filtreringlabel_${kebabUtenSpesialtegn(label)}`);
    return (
        <button
            title={lagConfig(label).label}
            aria-label={arialLabel}
            className={buttonClassnames}
            onClick={slettFilter}
            data-testid={`filtreringlabel_${kebabUtenSpesialtegn(label)}`}
        >
            <span className={className}>{lagConfig(label).label}</span>
            {skalHaKryssIkon && <FilterIkon />}
        </button>
    );
}

export default FiltreringLabel;
