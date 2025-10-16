import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleMedDataBasertPaFiltervalgProps} from './InnholdscelleProps';
import {UkeKolonne} from '../kolonner/ukekolonne';
import {
    filtrertPaAAPOrdinarINyttEllerGammeltFilter,
    filtrertPaAAPUnntakINyttEllerGammeltFilter,
    filtrertPaAAPYtelseINyttEllerGammeltFilter
} from '../../../utils/AapFiltermigreringUtils';

export const AapArenaRettighetsperiode = ({
    bruker,
    valgteKolonner,
    filtervalg
}: InnholdscelleMedDataBasertPaFiltervalgProps) => {
    const ukerIgjenForYtelsenDetErFiltrertPa = () => {
        if (filtrertPaAAPYtelseINyttEllerGammeltFilter(filtervalg)) {
            return bruker.aapmaxtidUke !== 0 ? bruker.aapmaxtidUke : bruker.aapUnntakUkerIgjen;
        } else if (filtrertPaAAPOrdinarINyttEllerGammeltFilter(filtervalg)) {
            return bruker.aapmaxtidUke;
        } else if (filtrertPaAAPUnntakINyttEllerGammeltFilter(filtervalg)) {
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
