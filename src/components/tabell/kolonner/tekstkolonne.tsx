import React from 'react';
import {BodyShort} from '@navikt/ds-react';
import classNames from 'classnames';

interface TekstKolonneProps {
    tekst?: string;
    skalVises: boolean;
    className?: string;
}

export function TekstKolonne({tekst, skalVises, className}: TekstKolonneProps) {
    if (!skalVises || !tekst) {
        return null;
    }

    return (
        <BodyShort size="small" className={classNames('ord-brekk', className)}>
            {tekst}
        </BodyShort>
    );
}
