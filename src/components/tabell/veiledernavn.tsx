import classNames from 'classnames';
import {BodyShort, Tag} from '@navikt/ds-react';
import {BrukerModell, VeilederModell} from '../../model-interfaces';

interface VeiledernavnProps {
    className?: string;
    bruker: BrukerModell;
    skalVises: boolean;
    veileder?: VeilederModell;
}

export function VeilederNavn({className, bruker, skalVises, veileder}: VeiledernavnProps) {
    if (!skalVises) {
        return null;
    }

    const veilederNavn = veileder ? `${veileder.etternavn}, ${veileder.fornavn}` : '';

    const ufordeltBrukerEtikett = (
        <Tag className="tabell-etikett" size="small" variant="info" hidden={!bruker.nyForEnhet}>
            Ufordelt bruker
        </Tag>
    );

    return (
        <div className={classNames('ord-brekk', className)}>
            <BodyShort size="small">{bruker.nyForEnhet ? ufordeltBrukerEtikett : veilederNavn}</BodyShort>
        </div>
    );
}
