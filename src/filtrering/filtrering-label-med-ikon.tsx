import React, {MouseEvent} from 'react';
import {ReactComponent as FilterIkon} from './filtrering-veileder-grupper/filter-ikon.svg';
import classNames from 'classnames';
import './filtrering-label.css';
import './filtrering-skjema.css';
import {Button} from '@navikt/ds-react';

interface FiltreringLabelMedIkonProps {
    label: string;
    slettFilter: (event: MouseEvent<HTMLButtonElement>) => void;
    harMuligMenIkkeValgtKolonne?: boolean;
    ikon: React.ReactNode;
    tittel: string;
}

function FiltreringLabelMedIkon({
    label,
    slettFilter,
    harMuligMenIkkeValgtKolonne = false,
    ikon,
    tittel
}: FiltreringLabelMedIkonProps) {
    const buttonClassnames = classNames('filtreringlabel', {
        'filtreringlabel--muligeKolonner': harMuligMenIkkeValgtKolonne
    });
    return (
        <Button
            size="small"
            title={tittel}
            aria-label="Slett filter"
            className={buttonClassnames}
            onClick={slettFilter}
            icon={<FilterIkon />}
            iconPosition="right"
        >
            <span className="filtreringlabel__container">
                {ikon}
                {label}
            </span>
        </Button>
    );
}

export default FiltreringLabelMedIkon;
