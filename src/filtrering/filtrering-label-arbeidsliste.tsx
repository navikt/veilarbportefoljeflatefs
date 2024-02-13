import React from 'react';
import {lagConfig} from './filter-konstanter';
import {ReactComponent as FilterIkon} from './filtrering-veileder-grupper/filter-ikon.svg';
import {MouseEvent} from 'react';
import classNames from 'classnames';
import './filtrering-label.css';
import './filtrering-skjema.css';
import ArbeidslistekategoriVisning from '../components/tabell/arbeidslisteikon';
import {KategoriModell} from '../model-interfaces';
import {Button} from '@navikt/ds-react';

interface FiltreringLabelArbeidslisteProps {
    label: string | {label: string};
    slettFilter: (event: MouseEvent<HTMLButtonElement>) => void;
    harMuligMenIkkeValgtKolonne?: boolean;
    kategori: KategoriModell;
}

function FiltreringLabelArbeidsliste({
    label,
    slettFilter,
    harMuligMenIkkeValgtKolonne = false,
    kategori
}: FiltreringLabelArbeidslisteProps) {
    const buttonClassnames = classNames('filtreringlabel', {
        'filtreringlabel--muligeKolonner': harMuligMenIkkeValgtKolonne
    });
    return (
        <Button
            size="small"
            title={`Arbeidslistekategori ${lagConfig(label).label}`}
            aria-label="Slett filter"
            className={buttonClassnames}
            onClick={slettFilter}
            icon={<FilterIkon />}
            iconPosition="right"
        >
            <span className="filtreringlabel__container">
                <ArbeidslistekategoriVisning kategori={kategori} />
                {lagConfig(label).label}
            </span>
        </Button>
    );
}

export default FiltreringLabelArbeidsliste;
