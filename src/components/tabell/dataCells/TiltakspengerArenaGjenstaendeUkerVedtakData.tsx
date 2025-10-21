import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {UkeKolonne} from '../dataCellTypes/ukekolonne';
import {ukerIgjenTilUtlopsdato} from '../../../utils/utils';

export const TiltakspengerArenaGjenstaendeUkerVedtakData = ({bruker, valgteKolonner}: DataCellProps) => {
    const ukerIgjen = ukerIgjenTilUtlopsdato(bruker.utlopsdato);

    return (
        <UkeKolonne
            className="col col-xs-2"
            ukerIgjen={ukerIgjen}
            minVal={2}
            skalVises={valgteKolonner.includes(Kolonne.YTELSE_ARENA_GJENSTAENDE_UKER_VEDTAK_TILTAKSPENGER)}
        />
    );
};
