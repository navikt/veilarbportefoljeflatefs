import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {DataCellProps} from './DataCellProps';

export const MoteIDagAvtaltData = ({bruker, valgteKolonner}: DataCellProps) => {
    return (
        <TekstDataCellType
            tekst={bruker.moteMedNavIDag?.avtaltMedNav ? 'Avtalt med Nav' : '-'}
            skalVises={valgteKolonner.includes(Kolonne.MOTE_ER_AVTALT)}
            className="col col-xs-2"
        />
    );
};
