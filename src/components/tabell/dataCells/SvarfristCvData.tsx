import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {DataCellProps} from './DataCellProps';
import {toDateString} from '../../../utils/dato-utils';

export const SvarfristCvData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstKolonne
        tekst={bruker.nesteSvarfristCvStillingFraNav ? toDateString(bruker.nesteSvarfristCvStillingFraNav) : '-'}
        skalVises={valgteKolonner.includes(Kolonne.CV_SVARFRIST)}
        className="col col-xs-2"
    />
);
