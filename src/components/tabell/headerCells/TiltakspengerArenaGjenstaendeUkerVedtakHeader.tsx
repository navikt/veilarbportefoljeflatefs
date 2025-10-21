import {HeaderCellProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const TiltakspengerArenaGjenstaendeUkerVedtakHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => {
    return (
        <SorteringHeader
            skalVises={valgteKolonner.includes(Kolonne.YTELSE_ARENA_GJENSTAENDE_UKER_VEDTAK_TILTAKSPENGER)}
            sortering={Sorteringsfelt.UTLOPSDATO_AAP_OG_TILTAKSPENGER_ARENA}
            erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.UTLOPSDATO_AAP_OG_TILTAKSPENGER_ARENA}
            rekkefolge={rekkefolge}
            onClick={onClick}
            tekst="Gjenstående uker vedtak tiltakspenger"
            title="Gjenstående uker på gjeldende vedtak tiltakspenger (Arena)"
            className="col col-xs-2"
        />
    );
};
