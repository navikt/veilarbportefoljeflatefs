import {HeaderCellProps} from '../HeaderCellProps';
import {Kolonne} from '../../../../ducks/ui/listevisning';
import {SorteringHeader} from '../../sortering-header';
import {Sorteringsfelt} from '../../../../typer/kolonnesortering';

export const AvtaltAktivitetForrigeStartdatoAktivitetHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.FORRIGE_START_DATO_AKTIVITET)}
        sortering={Sorteringsfelt.FORRIGE_DATO_FOR_AVTALT_AKTIVITET}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.FORRIGE_DATO_FOR_AVTALT_AKTIVITET}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Passert startdato aktivitet"
        title='Passert startdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
        className="col col-xs-2"
    />
);
