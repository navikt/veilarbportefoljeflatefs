import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {InnholdscelleProps} from './InnholdscelleProps';
import {toDateString} from '../../../utils/dato-utils';

export const SvarfristCv = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <TekstKolonne
        className="col col-xs-2"
        skalVises={valgteKolonner.includes(Kolonne.CV_SVARFRIST)}
        tekst={bruker.nesteSvarfristCvStillingFraNav ? toDateString(bruker.nesteSvarfristCvStillingFraNav) : '-'}
    />
);
