import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {InnholdscelleProps} from './InnholdscelleProps';
import {toDateString} from '../../../utils/dato-utils';

export const SvarfristCv = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <TekstKolonne
        tekst={bruker.nesteSvarfristCvStillingFraNav ? toDateString(bruker.nesteSvarfristCvStillingFraNav) : '-'}
        skalVises={valgteKolonner.includes(Kolonne.CV_SVARFRIST)}
        className="col col-xs-2"
    />
);
