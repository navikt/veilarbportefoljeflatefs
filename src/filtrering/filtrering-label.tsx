import React, {MouseEvent} from 'react';
import {lagConfig} from './filter-konstanter';
import {ReactComponent as FilterIkon} from './filtrering-veileder-grupper/filter-ikon.svg';
import classNames from 'classnames';
import './filtrering-label.css';
import './filtrering-skjema.css';
import FilterFeilModal from '../components/modal/filter-feil-modal';
import {kebabUtenSpesialtegn} from '../utils/utils';
import {BodyShort, Button} from '@navikt/ds-react';

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
    const arialLabel = skalHaKryssIkon ? `Fjern filtervalg "${lagConfig(label).label}"` : ' Nullstill filtervalg';
    const slettAlleFiltervalg = arialLabel === ' Nullstill filtervalg';
    const buttonClassnames = classNames(
        'filtreringlabel',
        {'filtreringlabel--markert': markert},
        {'filtreringlabel--muligeKolonner': harMuligMenIkkeValgtKolonne},
        {'slett-alle-filtervalg-knapp': slettAlleFiltervalg}
    );

    if (label === undefined) {
        return <FilterFeilModal isOpen={true} />;
    }

    return (
        <Button
            size="small"
            variant="primary"
            title={lagConfig(label).label}
            aria-label={arialLabel}
            className={buttonClassnames}
            onClick={slettFilter}
            data-testid={`filtreringlabel_${kebabUtenSpesialtegn(label)}`}
            icon={skalHaKryssIkon && <FilterIkon />}
            iconPosition="right"
        >
            <BodyShort size="small" className={className}>
                {lagConfig(label).label}
            </BodyShort>
        </Button>
    );
}

export default FiltreringLabel;
