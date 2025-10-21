import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../dataCellTypes/tekstkolonne';
import {DataCellProps} from './DataCellProps';
import moment from 'moment/moment';

export const MotestatusData = ({bruker, valgteKolonner}: DataCellProps) => {
    const moteErAvtaltMedNAV = moment(bruker.moteStartTid).isSame(new Date(), 'day');

    return (
        <TekstKolonne
            tekst={moteErAvtaltMedNAV ? 'Avtalt med Nav' : '-'}
            skalVises={valgteKolonner.includes(Kolonne.MOTE_ER_AVTALT)}
            className="col col-xs-2"
        />
    );
};
