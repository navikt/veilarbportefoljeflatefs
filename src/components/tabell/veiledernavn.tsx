import * as React from 'react';
import {BrukerModell, VeilederModell} from '../../model-interfaces';
import {BodyShort, Tag} from '@navikt/ds-react';

interface VeiledernavnProps {
    className?: string;
    bruker: BrukerModell;
    skalVises: boolean;
    veileder?: VeilederModell;
}

function VeilederNavn({className, bruker, skalVises, veileder}: VeiledernavnProps) {
    if (!skalVises) {
        return null;
    }

    const veilederNavn = veileder ? `${veileder.etternavn}, ${veileder.fornavn}` : '';

    const ufordeltBrukerEtikett = (
        <Tag size="small" variant="info" hidden={!bruker.nyForEnhet}>
            Ufordelt bruker
        </Tag>
    );

    return (
        <div className={className}>
            <BodyShort>{bruker.nyForEnhet ? ufordeltBrukerEtikett : veilederNavn}</BodyShort>
        </div>
    );
}

export default VeilederNavn;
