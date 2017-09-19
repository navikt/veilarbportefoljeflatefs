import * as React from 'react';
import { lagConfig } from './filter-konstanter';
import FilterIkon from '../components/filter-ikon';
import {MouseEvent} from 'react';

interface FiltreringLabelProps {
    label: string | { label: string };
    slettFilter: (event: MouseEvent<HTMLButtonElement>) => void;
}

function FiltreringLabel({ label, slettFilter }: FiltreringLabelProps) {
    return (
        <button aria-label="Slett filter" className="filtreringlabel typo-undertekst" onClick={slettFilter}>
            <span className="filtreringlabel__label">{lagConfig(label).label}</span>
            <FilterIkon />
        </button>
    );
}

export default FiltreringLabel;
