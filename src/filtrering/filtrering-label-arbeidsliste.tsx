import React from 'react';
import { lagConfig } from './filter-konstanter';
import { ReactComponent as FilterIkon } from './filtrering-veileder-grupper/filter-ikon.svg';
import { MouseEvent } from 'react';
import classNames from 'classnames';
import './filtrering-label.less';
import './filtrering-skjema.less';
import ArbeidslistekategoriVisning from '../components/tabell/arbeidslisteikon';
import { KategoriModell } from '../model-interfaces';

interface FiltreringLabelArbeidslisteProps {
    label: string | { label: string };
    slettFilter: (event: MouseEvent<HTMLButtonElement>) => void;
    harMuligMenIkkeValgtKolonne?: boolean;
    kategori: KategoriModell;
}

function FiltreringLabelArbeidsliste({label, slettFilter, harMuligMenIkkeValgtKolonne = false, kategori}: FiltreringLabelArbeidslisteProps) {
    const buttonClassnames = classNames('filtreringlabel', 'typo-undertekst', {'filtreringlabel--muligeKolonner': harMuligMenIkkeValgtKolonne});
    return (
        <button
            title={`Arbeidslistekategori ${lagConfig(label).label}`}
            aria-label='Slett filter'
            className={buttonClassnames}
            onClick={slettFilter}>
            <span className='filtreringlabel__container'>
                <ArbeidslistekategoriVisning skalVises={true} kategori={kategori}/>
                {lagConfig(label).label}
                <FilterIkon/>
            </span>
        </button>
    );
}

export default FiltreringLabelArbeidsliste;
