import * as React from 'react';
import {BodyShort} from '@navikt/ds-react';

export function DagerSidenKolonne(props: {skalVises: boolean; dato: number | null; className: string}) {
    if (!props.skalVises || props.dato === null) {
        return null;
    }

    const datoTekst = () => {
        if (props.dato === 0) {
            return 'I dag';
        } else if (props.dato === 1) {
            return '1 dag siden';
        } else {
            return `${props.dato} dager siden`;
        }
    };

    return (
        <BodyShort size="small" className={props.className}>
            {datoTekst()}
        </BodyShort>
    );
}
