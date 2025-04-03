import {MouseEvent, ReactNode} from 'react';
import classNames from 'classnames';
import {Bleed, Button} from '@navikt/ds-react';
import {XMarkIcon} from '@navikt/aksel-icons';
import './filtrering-label.css';
import './filtrering-skjema.css';

interface FiltreringLabelMedIkonProps {
    label: string;
    slettFilter: (event: MouseEvent<HTMLButtonElement>) => void;
    ikon: ReactNode;
    tittel: string;
}

export function FiltreringLabelMedIkon({label, slettFilter, ikon, tittel}: Readonly<FiltreringLabelMedIkonProps>) {
    const buttonClassnames = classNames('filtreringlabel', 'filtreringlabel--ikon', {});
    return (
        <Button
            size="small"
            variant="primary-neutral"
            icon={<XMarkIcon />}
            iconPosition="right"
            title={tittel}
            onClick={slettFilter}
            className={buttonClassnames}
            aria-label={tittel}
        >
            <Bleed marginBlock="05" asChild>
                {ikon}
            </Bleed>
            {label}
        </Button>
    );
}
