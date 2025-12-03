import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {UkeDataCellType} from '../dataCellTypes/UkeDataCellType';
import {ukerIgjenTilUtlopsdato} from '../../../utils/utils';

export const TiltakspengerArenaGjenstaendeUkerVedtakData = ({bruker, valgteKolonner}: DataCellProps) => {
    const ukerIgjen = ukerIgjenTilUtlopsdato(bruker.ytelser.ytelserArena.utlopsdato);

    return (
        <UkeDataCellType
            className="col col-xs-2"
            ukerIgjen={ukerIgjen}
            minVal={2}
            skalVises={valgteKolonner.includes(Kolonne.YTELSE_ARENA_GJENSTAENDE_UKER_VEDTAK_TILTAKSPENGER)}
        />
    );
};
