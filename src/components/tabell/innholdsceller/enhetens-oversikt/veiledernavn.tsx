import {useSelector} from 'react-redux';
import {BodyShort, Tag} from '@navikt/ds-react';
import {VeilederModell} from '../../../../typer/enhet-og-veiledere-modeller';
import {BrukerModell} from '../../../../typer/bruker-modell';
import {AppState} from '../../../../reducer';
import {Kolonne} from '../../../../ducks/ui/listevisning';
import {InnholdscelleProps} from '../InnholdscelleProps';

export function VeilederNavn({bruker, valgteKolonner}: InnholdscelleProps) {
    const veiledere = useSelector((state: AppState) => state.veiledere);

    const skalVises = valgteKolonner.includes(Kolonne.VEILEDER);
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
        <div className="col col-xs-2 ord-brekk">
            <BodyShort size="small">{bruker.nyForEnhet ? ufordeltBrukerEtikett : veilederNavn}</BodyShort>
        </div>
    );
}

const finnBrukersVeileder = (veiledere: VeilederModell[], bruker: BrukerModell) => {
    return veiledere.find(veileder => veileder.ident === bruker.veilederId);
};
