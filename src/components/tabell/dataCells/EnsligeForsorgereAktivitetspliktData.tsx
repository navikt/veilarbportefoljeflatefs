import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {DataCellProps} from './DataCellProps';
import {mapOmAktivitetsPlikt} from '../../../utils/enslig-forsorger';

export const EnsligeForsorgereAktivitetspliktData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstDataCellType
        tekst={mapOmAktivitetsPlikt(bruker.ytelser.ensligeForsorgereOvergangsstonad?.harAktivitetsplikt)}
        skalVises={valgteKolonner.includes(Kolonne.ENSLIGE_FORSORGERE_AKIVITETSPLIKT)}
        className="col col-xs-2"
    />
);
