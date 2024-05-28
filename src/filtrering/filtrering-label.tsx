import React, {MouseEvent} from 'react';
import classNames from 'classnames';
import {lagConfig} from './filter-konstanter';
import FilterFeilModal from '../components/modal/filter-feil-modal';
import {kebabUtenSpesialtegn} from '../utils/utils';
import {Button} from '@navikt/ds-react';
import {XMarkIcon} from '@navikt/aksel-icons';
import './filtrering-label.css';
import './filtrering-skjema.css';

interface FiltreringLabelProps {
    label: string | {label: string};
    slettFilter: (event: MouseEvent<HTMLButtonElement>) => void;
    markert?: boolean;
    skalHaKryssIkon?: boolean;
}

function FiltreringLabel({label, slettFilter, skalHaKryssIkon = true}: FiltreringLabelProps) {
    const ariaLabel = skalHaKryssIkon ? `Fjern filtervalg "${lagConfig(label).label}"` : 'Nullstill filtervalg';
    const slettAlleFiltervalg = ariaLabel === 'Nullstill filtervalg';
    const buttonClassnames = classNames('filtreringlabel', {'filtreringlabel--slett-alle': slettAlleFiltervalg});

    if (label === undefined) {
        return <FilterFeilModal isOpen={true} />;
    }

    return (
        <Button
            size="small"
            variant="primary-neutral"
            icon={skalHaKryssIkon && <XMarkIcon />}
            iconPosition="right"
            title={ariaLabel}
            onClick={slettFilter}
            className={buttonClassnames}
            aria-label={ariaLabel}
            data-testid={`filtreringlabel_${kebabUtenSpesialtegn(label)}`}
        >
            {lagConfig(label).label}
        </Button>
    );
}

export default FiltreringLabel;
