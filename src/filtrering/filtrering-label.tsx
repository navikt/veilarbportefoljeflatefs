import React from 'react';
import { lagConfig } from './filter-konstanter';
import { ReactComponent as FilterIkon } from './filter-ikon.svg';
import { MouseEvent } from 'react';
import classNames from 'classnames';

interface FiltreringLabelProps {
    label: string | { label: string };
    slettFilter: (event: MouseEvent<HTMLButtonElement>) => void;
    markert?: boolean;
    harMuligMenIkkeValgtKolonne?: boolean;
    skalHaKryssIkon?: boolean;
}

function FiltreringLabel({label, slettFilter, harMuligMenIkkeValgtKolonne = false, markert = false, skalHaKryssIkon = true}: FiltreringLabelProps) {
    const className = classNames('filtreringlabel__label', {'filtreringlabel-slett-filter': !skalHaKryssIkon});
    const arialLabel = skalHaKryssIkon ? 'Slett filter':' Slett alle filtervalg';
    const buttonClassnames = classNames('filtreringlabel', 'typo-undertekst', {'filtreringlabel--markert': markert}, {'filtreringlabel--muligeKolonner': harMuligMenIkkeValgtKolonne});
    return (
        <button
            aria-label={arialLabel}
            className={buttonClassnames}
            onClick={slettFilter}>
            <span className={className}>{lagConfig(label).label}</span>
            {skalHaKryssIkon && <FilterIkon/>}
        </button>
    );
}

export default FiltreringLabel;
