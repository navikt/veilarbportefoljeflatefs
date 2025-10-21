import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {oppfolgingStartetDato} from '../../../utils/dato-utils';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

export const OppfolgingStartetData = ({bruker, valgteKolonner}: DataCellProps) => (
    <DatoDataCellType
        dato={oppfolgingStartetDato(bruker.oppfolgingStartdato)}
        skalVises={valgteKolonner.includes(Kolonne.OPPFOLGING_STARTET)}
        className="col col-xs-2"
    />
);
