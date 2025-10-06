import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleArenaytelseProps} from './InnholdscelleProps';
import {UkeKolonne} from '../kolonner/ukekolonne';
import {
    YTELSE_ARENA_DAGPENGER,
    YTELSE_ARENA_DAGPENGER_LONNSGARANTIMIDLER,
    YTELSE_ARENA_DAGPENGER_ORDINARE,
    YTELSE_ARENA_DAGPENGER_PERMITTERING,
    YTELSE_ARENA_DAGPENGER_PERMITTERING_FISKEINDUSTRI
} from '../../../filtrering/filter-konstanter';

export const DagpengerArenaGjenstaendeUkerRettighet = ({
    bruker,
    valgteKolonner,
    arenaytelsefilter
}: InnholdscelleArenaytelseProps) => {
    const ukerIgjenBasertPaDagpengetype = () => {
        // Bruk ulik kjelde for "ukerIgjen" basert på kva dagpengetype det er filtrert på
        if (
            arenaytelsefilter === YTELSE_ARENA_DAGPENGER_PERMITTERING ||
            arenaytelsefilter === YTELSE_ARENA_DAGPENGER_PERMITTERING_FISKEINDUSTRI
        ) {
            return bruker.permutlopUke;
        } else if (
            arenaytelsefilter === YTELSE_ARENA_DAGPENGER ||
            arenaytelsefilter === YTELSE_ARENA_DAGPENGER_ORDINARE ||
            arenaytelsefilter === YTELSE_ARENA_DAGPENGER_LONNSGARANTIMIDLER
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
