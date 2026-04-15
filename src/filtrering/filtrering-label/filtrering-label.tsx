import {MouseEvent} from 'react';
import {Chips} from '@navikt/ds-react';
import {lagConfig} from '../filter-konstanter';
import {FilterFeilModal} from '../../components/modal/filter-feil-modal';
import {kebabUtenSpesialtegn} from '../../utils/utils';
import './filtrering-label.css';
import '../filtrering-skjema.css';

interface FiltreringLabelProps {
    label: string | {label: string};
    slettFilter: (event: MouseEvent<HTMLButtonElement>) => void;
    skalHaKryssIkon?: boolean;
}

export function FiltreringLabel({label, slettFilter, skalHaKryssIkon = true}: Readonly<FiltreringLabelProps>) {
    const ariaLabel = skalHaKryssIkon ? `Fjern filtervalg "${lagConfig(label)?.label}"` : 'Nullstill filtervalg';

    if (label === undefined) {
        return <FilterFeilModal isOpen={true} />;
    }

    const handleDelete = (event?: React.MouseEvent<HTMLButtonElement>) => {
        if (event) {
            slettFilter(event);
        }
    };

    return (
        <Chips.Removable
            data-color="info"
            onDelete={handleDelete}
            data-testid={`filtreringlabel_${kebabUtenSpesialtegn(label)}`}
        >
            {lagConfig(label).label}
        </Chips.Removable>
    );
}
