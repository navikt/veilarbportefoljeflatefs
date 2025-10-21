import {ukerIgjenTilUtlopsdato} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {UkeKolonne} from '../dataCellTypes/ukekolonne';

export const AapArenaVedtaksperiodeData = ({bruker, valgteKolonner}: DataCellProps) => {
    const ukerIgjen = ukerIgjenTilUtlopsdato(bruker.utlopsdato);

    return (
        <UkeKolonne
            className="col col-xs-2"
            ukerIgjen={ukerIgjen}
            minVal={2}
            skalVises={valgteKolonner.includes(Kolonne.YTELSE_ARENA_VEDTAKSPERIODE_AAP)}
        />
    );
};
