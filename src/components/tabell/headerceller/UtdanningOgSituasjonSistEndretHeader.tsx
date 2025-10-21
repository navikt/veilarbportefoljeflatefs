import {HeaderCellProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const UtdanningOgSituasjonSistEndretHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => (
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.UTDANNING_OG_SITUASJON_SIST_ENDRET)}
        sortering={Sorteringsfelt.UTDANNING_OG_SITUASJON_SIST_ENDRET}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.UTDANNING_OG_SITUASJON_SIST_ENDRET}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Dato sist endret"
        title="Dato personen sist ga informasjon om situasjon eller utdanning"
        className="col col-xs-2"
    />
);
