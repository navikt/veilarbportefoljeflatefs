import React from 'react';
import {BodyShort} from '@navikt/ds-react';

interface TekstKolonneProps {
    tekst?: string;
    skalVises: boolean;
    className?: string;
}

export function TekstKolonne({tekst, skalVises, className}: TekstKolonneProps) {
    if (!skalVises || !tekst) {
        return null;
    }

    return <BodyShort className={className}>{tekst}</BodyShort>;
}
