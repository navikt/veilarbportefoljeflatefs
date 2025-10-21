import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../dataCellTypes/tekstkolonne';
import {DataCellProps} from './DataCellProps';
import {oppfolingsdatoEnsligeForsorgere} from '../../../utils/enslig-forsorger';

export const EnsligeForsorgereOmBarnetData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstKolonne
        tekst={oppfolingsdatoEnsligeForsorgere(bruker.ensligeForsorgereOvergangsstonad?.yngsteBarnsFodselsdato)}
        skalVises={valgteKolonner.includes(Kolonne.ENSLIGE_FORSORGERE_OM_BARNET)}
        className="col col-xs-3"
    />
);
