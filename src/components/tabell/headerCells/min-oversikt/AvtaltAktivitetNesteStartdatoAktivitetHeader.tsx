import {HeaderCellProps} from '../HeaderCellProps';
import {Kolonne} from '../../../../ducks/ui/listevisning';
import {SorteringHeader} from '../../sortering-header';
import {Sorteringsfelt} from '../../../../typer/kolonnesortering';

export const AvtaltAktivitetNesteStartdatoAktivitetHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.NESTE_START_DATO_AKTIVITET)}
        sortering={Sorteringsfelt.NESTE_STARTDATO_FOR_AVTALT_AKTIVITET}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.NESTE_STARTDATO_FOR_AVTALT_AKTIVITET}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Neste startdato aktivitet"
        title='Neste startdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
        className="col col-xs-2"
    />
);
