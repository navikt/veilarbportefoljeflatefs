import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {DataCellProps} from './DataCellProps';
import {mapOmAktivitetsPlikt} from '../../../utils/enslig-forsorger';

export const EnsligeForsorgereAktivitetsplikt = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstKolonne
        tekst={mapOmAktivitetsPlikt(bruker.ensligeForsorgereOvergangsstonad?.harAktivitetsplikt)}
        skalVises={valgteKolonner.includes(Kolonne.ENSLIGE_FORSORGERE_AKIVITETSPLIKT)}
        className="col col-xs-2"
    />
);
