import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const Utkast14aAnsvarligVeileder = ({
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
        tekst="Ansvarlig for oppfølgingsvedtak"
        title="Ansvarlig veileder for utkast til oppfølgingsvedtak § 14 a"
        className="col col-xs-2"
    />
);
