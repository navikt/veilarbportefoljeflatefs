import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellMedInnholdBasertPaFiltervalgProps} from './DataCellProps';
import {UkeKolonne} from '../dataCellTypes/ukekolonne';
import {
    YTELSE_ARENA_DAGPENGER,
    YTELSE_ARENA_DAGPENGER_LONNSGARANTIMIDLER,
    YTELSE_ARENA_DAGPENGER_ORDINARE,
    YTELSE_ARENA_DAGPENGER_PERMITTERING,
    YTELSE_ARENA_DAGPENGER_PERMITTERING_FISKEINDUSTRI
} from '../../../filtrering/filter-konstanter';

export const DagpengerArenaGjenstaendeUkerRettighetData = ({
    bruker,
    valgteKolonner,
    filtervalg
}: DataCellMedInnholdBasertPaFiltervalgProps) => {
    const {ytelse: valgtArenaytelsesfilter} = filtervalg;

    // Bruk ulik kjelde for "ukerIgjen" basert på kva dagpengetype det er filtrert på
    const ukerIgjenBasertPaDagpengetype = () => {
        if (
            valgtArenaytelsesfilter === YTELSE_ARENA_DAGPENGER_PERMITTERING ||
            valgtArenaytelsesfilter === YTELSE_ARENA_DAGPENGER_PERMITTERING_FISKEINDUSTRI
        ) {
            return bruker.permutlopUke;
        } else if (
            valgtArenaytelsesfilter === YTELSE_ARENA_DAGPENGER ||
            valgtArenaytelsesfilter === YTELSE_ARENA_DAGPENGER_ORDINARE ||
            valgtArenaytelsesfilter === YTELSE_ARENA_DAGPENGER_LONNSGARANTIMIDLER
        ) {
            return bruker.dagputlopUke;
        }
    };

    return (
        <UkeKolonne
            className="col col-xs-2"
            ukerIgjen={ukerIgjenBasertPaDagpengetype()}
            minVal={2}
            skalVises={valgteKolonner.includes(Kolonne.YTELSE_ARENA_GJENSTAENDE_UKER_RETTIGHET_DAGPENGER)}
        />
    );
};
