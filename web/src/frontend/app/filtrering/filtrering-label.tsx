import * as React from 'react';
import { lagConfig } from './filter-konstanter';
import FilterIkon from '../components/filter-ikon';
import {MouseEvent} from 'react';
import * as classNames from 'classnames';

interface FiltreringLabelProps {
    label: string | { label: string };
    slettFilter: (event: MouseEvent<HTMLButtonElement>) => void;
    markert?: boolean;
    harMuligMenIkkeValgtKolonne?: boolean;
}

function FiltreringLabel({ label, slettFilter, harMuligMenIkkeValgtKolonne= false, markert= false }: FiltreringLabelProps) {
    return (
        <button
            aria-label="Slett filter"
            className={classNames('filtreringlabel', 'typo-undertekst', {'filtreringlabel--markert': markert}, {'filtreringlabel--muligeKolonner': harMuligMenIkkeValgtKolonne})}
            onClick={slettFilter}>

            <span className="filtreringlabel__label">{lagConfig(label).label}</span>
            <FilterIkon />
        </button>
    );
}

export default FiltreringLabel;
