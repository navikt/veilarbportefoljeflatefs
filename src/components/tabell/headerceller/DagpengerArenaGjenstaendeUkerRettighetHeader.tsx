import {HeadercelleMedSorteringBasertPaFiltervalgProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';
import {
    YTELSE_ARENA_DAGPENGER,
    YTELSE_ARENA_DAGPENGER_LONNSGARANTIMIDLER,
    YTELSE_ARENA_DAGPENGER_ORDINARE,
    YTELSE_ARENA_DAGPENGER_PERMITTERING,
    YTELSE_ARENA_DAGPENGER_PERMITTERING_FISKEINDUSTRI
} from '../../../filtrering/filter-konstanter';

export const DagpengerArenaGjenstaendeUkerRettighetHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick,
    filtervalg
}: HeadercelleMedSorteringBasertPaFiltervalgProps) => {
    const {ytelse: valgtArenaytelsesfilter} = filtervalg;

    // Bruk ulikt sorteringsfelt i OpenSearch for "ukerIgjen" basert på kva dagpengetype det er filtrert på
    const sorteringsfeltBasertPaDagpengetype = () => {
        if (
            valgtArenaytelsesfilter === YTELSE_ARENA_DAGPENGER_PERMITTERING ||
            valgtArenaytelsesfilter === YTELSE_ARENA_DAGPENGER_PERMITTERING_FISKEINDUSTRI
        ) {
            return Sorteringsfelt.DAGPENGER_PERM_UTLOP_UKE;
        } else if (
            valgtArenaytelsesfilter === YTELSE_ARENA_DAGPENGER ||
            valgtArenaytelsesfilter === YTELSE_ARENA_DAGPENGER_ORDINARE ||
            valgtArenaytelsesfilter === YTELSE_ARENA_DAGPENGER_LONNSGARANTIMIDLER
        ) {
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
