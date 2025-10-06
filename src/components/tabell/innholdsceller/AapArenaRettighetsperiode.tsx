import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleArenaytelseProps} from './InnholdscelleProps';
import {UkeKolonne} from '../kolonner/ukekolonne';
import {
    YTELSE_ARENA_AAP,
    YTELSE_ARENA_AAP_ORDINAR,
    YTELSE_ARENA_AAP_UNNTAK
} from '../../../filtrering/filter-konstanter';

export const AapArenaRettighetsperiode = ({
    bruker,
    valgteKolonner,
    arenaytelsefilter
}: InnholdscelleArenaytelseProps) => {
    const ukerIgjenForYtelsenDetErFiltrertPa = () => {
        if (arenaytelsefilter === YTELSE_ARENA_AAP) {
            return bruker.aapmaxtidUke !== 0 ? bruker.aapmaxtidUke : bruker.aapUnntakUkerIgjen;
        } else if (arenaytelsefilter === YTELSE_ARENA_AAP_ORDINAR) {
            return bruker.aapmaxtidUke;
        } else if (arenaytelsefilter === YTELSE_ARENA_AAP_UNNTAK) {
            return bruker.aapUnntakUkerIgjen;
        }
    };

    return (
        <UkeKolonne
            className="col col-xs-2"
            ukerIgjen={ukerIgjenForYtelsenDetErFiltrertPa()}
            minVal={2}
            skalVises={valgteKolonner.includes(Kolonne.YTELSE_ARENA_RETTIGHETSPERIODE_AAP)}
        />
    );
};
