import {HeaderCellMedSorteringBasertPaFiltervalgProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';
import {
    filtrertPaDagpengerArenaFilterMedPermittering,
    filtrertPaDagpengerArenaFilterUtenPermittering
} from '../../../utils/dagpengerArenaKolonneUtils';

export const DagpengerArenaGjenstaendeUkerRettighetHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick,
    filtervalg
}: HeaderCellMedSorteringBasertPaFiltervalgProps) => {
    const {ytelseDagpengerArena} = filtervalg;

    // Bruk ulikt sorteringsfelt i OpenSearch for "ukerIgjen" basert på kva dagpengetype det er filtrert på
    const sorteringsfeltBasertPaDagpengetype = () => {
        if (filtrertPaDagpengerArenaFilterMedPermittering(ytelseDagpengerArena)) {
            return Sorteringsfelt.DAGPENGER_PERM_UTLOP_UKE;
        } else if (filtrertPaDagpengerArenaFilterUtenPermittering(ytelseDagpengerArena)) {
            return Sorteringsfelt.DAGPENGER_UTLOP_UKE;
        }
    };

    return (
        <SorteringHeader
            skalVises={valgteKolonner.includes(Kolonne.YTELSE_ARENA_GJENSTAENDE_UKER_RETTIGHET_DAGPENGER)}
            sortering={sorteringsfeltBasertPaDagpengetype()}
            erValgt={gjeldendeSorteringsfelt === sorteringsfeltBasertPaDagpengetype()}
            rekkefolge={rekkefolge}
            onClick={onClick}
            tekst="Gjenstående uker rettighet dagpenger"
            title="Gjenstående uker av rettighetsperioden for dagpenger (Arena)"
            className="col col-xs-2"
        />
    );
};
