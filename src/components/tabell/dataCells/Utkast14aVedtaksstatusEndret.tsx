import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleProps} from './InnholdscelleProps';
import {dagerSiden} from '../../../utils/dato-utils';
import {DagerSidenKolonne} from '../kolonner/dagersidenkolonne';

export const Utkast14aVedtaksstatusEndret = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <DagerSidenKolonne
        dato={dagerSiden(bruker.utkast14a?.statusEndret)}
        skalVises={valgteKolonner.includes(Kolonne.VEDTAKSTATUS_ENDRET)}
        className="col col-xs-2"
    />
);
