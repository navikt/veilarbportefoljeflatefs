import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellMedInnholdBasertPaFiltervalgProps} from './DataCellProps';
import {UkeDataCellType} from '../dataCellTypes/UkeDataCellType';
import {
    filtrertPaBeggeAapFilterArena,
    filtrertPaOrdinarAapFilterArena,
    filtrertPaUnntakAapFilterArena
} from '../../../utils/AapFiltermigreringUtils';

export const AapArenaRettighetsperiodeData = ({
    bruker,
    valgteKolonner,
    filtervalg
}: DataCellMedInnholdBasertPaFiltervalgProps) => {
    const ukerIgjenForYtelsenDetErFiltrertPa = () => {
        if (filtrertPaBeggeAapFilterArena(filtervalg)) {
            return bruker.ytelser.ytelserArena.aapmaxtidUke !== 0
                ? bruker.ytelser.ytelserArena.aapmaxtidUke
                : bruker.ytelser.ytelserArena.aapUnntakUkerIgjen;
        } else if (filtrertPaOrdinarAapFilterArena(filtervalg)) {
            return bruker.ytelser.ytelserArena.aapmaxtidUke;
        } else if (filtrertPaUnntakAapFilterArena(filtervalg)) {
            return bruker.ytelser.ytelserArena.aapUnntakUkerIgjen;
        }
    };

    return (
        <UkeDataCellType
            className="col col-xs-2"
            ukerIgjen={ukerIgjenForYtelsenDetErFiltrertPa()}
            minVal={2}
            skalVises={valgteKolonner.includes(Kolonne.YTELSE_ARENA_RETTIGHETSPERIODE_AAP)}
        />
    );
};
