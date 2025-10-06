import {utlopsdatoUker} from '../../../utils/utils';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleProps} from './InnholdscelleProps';
import {UkeKolonne} from '../kolonner/ukekolonne';

export const TiltakspengerArenaGjenstaendeUkerVedtak = ({bruker, valgteKolonner}: InnholdscelleProps) => {
    const ukerIgjenTilUtlopsdato = utlopsdatoUker(bruker.utlopsdato);

    return (
        <UkeKolonne
            className="col col-xs-2"
            ukerIgjen={ukerIgjenTilUtlopsdato}
            minVal={2}
            skalVises={valgteKolonner.includes(Kolonne.YTELSE_ARENA_GJENSTAENDE_UKER_VEDTAK_TILTAKSPENGER)}
        />
    );
};
