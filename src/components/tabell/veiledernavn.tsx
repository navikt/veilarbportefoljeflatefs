import {useSelector} from 'react-redux';
import classNames from 'classnames';
import {BodyShort, Tag} from '@navikt/ds-react';
import {VeilederModell} from '../../typer/enhet-og-veiledere-modeller';
import {BrukerModell} from '../../typer/bruker-modell';
import {AppState} from '../../reducer';

interface VeiledernavnProps {
    className?: string;
    bruker: BrukerModell;
    skalVises: boolean;
}

export function VeilederNavn({className, bruker, skalVises}: VeiledernavnProps) {
    const veiledere = useSelector((state: AppState) => state.veiledere);

    if (!skalVises) {
        return null;
    }

    const brukersVeileder = finnBrukersVeileder(veiledere.data.veilederListe, bruker);
    const veilederNavn = brukersVeileder ? `${brukersVeileder.etternavn}, ${brukersVeileder.fornavn}` : '';

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

const finnBrukersVeileder = (veiledere: VeilederModell[], bruker: BrukerModell) => {
    return veiledere.find(veileder => veileder.ident === bruker.veilederId);
};
