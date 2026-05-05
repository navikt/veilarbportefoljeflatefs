import {MouseEvent} from 'react';
import {Button, Chips} from '@navikt/ds-react';
import {lagConfig} from '../filter-konstanter';
import {FilterFeilModal} from '../../components/modal/filter-feil-modal';
import {kebabUtenSpesialtegn} from '../../utils/utils';
import './filtrering-label.css';
import '../filtrering-skjema.css';

interface FiltreringLabelProps {
    label: string | {label: string};
    slettFilter: (event: MouseEvent<HTMLButtonElement>) => void;
    skalHaKryssIkon?: boolean;
    dataColor?: 'info' | 'neutral';
}

export function FiltreringLabel({
    label,
    slettFilter,
    skalHaKryssIkon = true,
    dataColor = 'neutral'
}: Readonly<FiltreringLabelProps>) {
    const ariaLabel = skalHaKryssIkon ? `Fjern filtervalg "${lagConfig(label)?.label}"` : 'Nullstill filtervalg';

    if (label === undefined) {
        return <FilterFeilModal isOpen={true} />;
    }

    const handleDelete = (event?: React.MouseEvent<HTMLButtonElement>) => {
        if (event) {
            slettFilter(event);
        }
    };

    if (!skalHaKryssIkon) {
        return (
            <Button
                variant="secondary-neutral"
                size="small"
                data-testid={`filtreringlabel_${kebabUtenSpesialtegn(label)}`}
                onClick={handleDelete}
            >
                {ariaLabel}
            </Button>
        );
    }

    return (
        <Chips.Removable
            data-color={dataColor}
            onDelete={handleDelete}
            data-testid={`filtreringlabel_${kebabUtenSpesialtegn(label)}`}
        >
            {lagConfig(label).label}
        </Chips.Removable>
    );
}
