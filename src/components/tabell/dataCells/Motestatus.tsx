import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {InnholdscelleProps} from './InnholdscelleProps';
import moment from 'moment/moment';

export const Motestatus = ({bruker, valgteKolonner}: InnholdscelleProps) => {
    const moteErAvtaltMedNAV = moment(bruker.moteStartTid).isSame(new Date(), 'day');

    return (
        <TekstKolonne
            tekst={moteErAvtaltMedNAV ? 'Avtalt med Nav' : '-'}
            skalVises={valgteKolonner.includes(Kolonne.MOTE_ER_AVTALT)}
            className="col col-xs-2"
        />
    );
};
