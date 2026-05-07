import {MouseEvent, ReactNode} from 'react';
import {XMarkIcon} from '@navikt/aksel-icons';
import './filtrering-label.css';
import '../filtrering-skjema.css';

interface FiltreringLabelMedIkonProps {
    label: string;
    slettFilter: (event: MouseEvent<HTMLButtonElement>) => void;
    ikon: ReactNode;
    tittel: string;
}

export function FiltreringLabelMedIkon({label, slettFilter, ikon, tittel}: Readonly<FiltreringLabelMedIkonProps>) {
    return (
        <button
            className="aksel-chips__chip aksel-chips__removable aksel-chips--icon-right"
            data-color="neutral"
            aria-label={tittel}
            title={tittel}
            onClick={slettFilter}
        >
            <span
                className="aksel-chips__chip-text"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    alignSelf: 'stretch',
                    height: '100%',
                    lineHeight: 1
                }}
            >
                {ikon}
                {label}
            </span>
            <span className="aksel-chips__removable-icon">
                <XMarkIcon aria-hidden />
            </span>
        </button>
    );
}
