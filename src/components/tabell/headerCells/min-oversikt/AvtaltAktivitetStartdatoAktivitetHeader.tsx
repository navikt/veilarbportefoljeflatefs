import {HeaderCellProps} from '../HeaderCellProps';
import {Kolonne} from '../../../../ducks/ui/listevisning';
import {SorteringHeader} from '../../sortering-header';
import {Sorteringsfelt} from '../../../../typer/kolonnesortering';

export const AvtaltAktivitetStartdatoAktivitetHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.START_DATO_AKTIVITET)}
        sortering={Sorteringsfelt.STARTDATO_FOR_AVTALT_AKTIVITET}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.STARTDATO_FOR_AVTALT_AKTIVITET}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Startdato aktivitet"
        title='Startdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
        className="col col-xs-2"
    />
);
