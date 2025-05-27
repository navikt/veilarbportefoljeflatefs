import classNames from 'classnames';
import {BodyShort, Tag} from '@navikt/ds-react';
import {InnloggetVeilederModell} from '../../typer/enhet-og-veiledere-modeller';
import {BrukerModell} from '../../typer/bruker-modell';

interface VeiledernavnProps {
    className?: string;
    bruker: BrukerModell;
    skalVises: boolean;
    veileder?: InnloggetVeilederModell;
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
