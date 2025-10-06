import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleProps} from './InnholdscelleProps';
import {UkeKolonne} from '../kolonner/ukekolonne';
import {ukerIgjenTilUtlopsdato} from '../../../utils/utils';

export const TiltakspengerArenaGjenstaendeUkerVedtak = ({bruker, valgteKolonner}: InnholdscelleProps) => {
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
