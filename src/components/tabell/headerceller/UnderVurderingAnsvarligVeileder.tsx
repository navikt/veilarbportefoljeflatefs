import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';

export const UnderVurderingAnsvarligVeileder = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.ANSVARLIG_VEILEDER_FOR_VEDTAK)}
        sortering={Sorteringsfelt.UTKAST_14A_ANSVARLIG_VEILEDER}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.UTKAST_14A_ANSVARLIG_VEILEDER}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Ansvarlig for vedtak"
        title="Ansvarlig veileder for utkast til § 14 a-vedtak"
        className="col col-xs-2"
    />
);
