import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {DataCellProps} from './DataCellProps';
import {oppfolingsdatoEnsligeForsorgere} from '../../../utils/enslig-forsorger';

export const EnsligeForsorgereOmBarnetData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstDataCellType
        tekst={oppfolingsdatoEnsligeForsorgere(bruker.ytelser.ensligeForsorgereOvergangsstonad?.yngsteBarnsFodselsdato)}
        skalVises={valgteKolonner.includes(Kolonne.ENSLIGE_FORSORGERE_OM_BARNET)}
        className="col col-xs-3"
    />
);
