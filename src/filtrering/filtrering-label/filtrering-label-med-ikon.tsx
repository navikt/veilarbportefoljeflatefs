import {MouseEvent, ReactNode} from 'react';
import {XMarkIcon} from '@navikt/aksel-icons';
import './filtrering-label.css';

interface FiltreringLabelMedIkonProps {
    label: string;
    slettFilter: (event: MouseEvent<HTMLButtonElement>) => void;
    ikon: ReactNode;
    tittel: string;
}

export function FiltreringLabelMedIkon({label, slettFilter, ikon, tittel}: Readonly<FiltreringLabelMedIkonProps>) {
    return (
        <button
            type="button"
            className="aksel-chips__chip aksel-chips__removable aksel-chips--icon-right"
            data-color="neutral"
            aria-label={tittel}
            title={tittel}
            onClick={slettFilter}
        >
            <span className="filtreringlabel__med-ikon aksel-chips__chip-text">
                {ikon}
                {label}
            </span>
            <span className="aksel-chips__removable-icon">
                <XMarkIcon aria-hidden />
            </span>
        </button>
    );
}
