import * as React from 'react';
import { lagConfig } from './filter-konstanter';
import FilterIkon from '../components/filter-ikon';
import { MouseEvent } from 'react';
import * as classNames from 'classnames';

interface FiltreringLabelProps {
    label: string | { label: string };
    slettFilter: (event: MouseEvent<HTMLButtonElement>) => void;
    markert?: boolean;
    harMuligMenIkkeValgtKolonne?: boolean;
    skalHaKryssIkon?: boolean;
    intl: any;
}

function FiltreringLabel({label, slettFilter, harMuligMenIkkeValgtKolonne = false, markert = false, skalHaKryssIkon = true, intl}: FiltreringLabelProps) {
    return (
        <button
            aria-label={skalHaKryssIkon ? intl.formatMessage({id:'filtrering.label.slett-filter'}) : intl.formatMessage({id:'filtrering.label.slett-alle-filter'})}
            className={classNames('filtreringlabel', 'typo-undertekst', {'filtreringlabel--markert': markert}, {'filtreringlabel--muligeKolonner': harMuligMenIkkeValgtKolonne})}
            onClick={slettFilter}>

                    <span
                        className={classNames('filtreringlabel__label', {'filtreringlabel-slett-filter': !skalHaKryssIkon})}>{lagConfig(label).label}</span>
            {skalHaKryssIkon && <FilterIkon/>}
        </button>
    );
}

export default FiltreringLabel;
