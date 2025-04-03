import classNames from 'classnames';
import {BodyShort} from '@navikt/ds-react';

interface TekstKolonneProps {
    /** Send inn "-" om det ikkje er noko tekst å vise */
    tekst: string;
    skalVises: boolean;
    className?: string;
}

export function TekstKolonne({tekst, skalVises, className}: TekstKolonneProps) {
    if (!skalVises) {
        return null;
    }

    return (
        <BodyShort size="small" className={classNames('ord-brekk', className)}>
            {tekst}
        </BodyShort>
    );
}
