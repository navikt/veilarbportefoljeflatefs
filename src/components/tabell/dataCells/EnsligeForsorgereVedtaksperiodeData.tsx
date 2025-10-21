import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../dataCellTypes/tekstkolonne';
import {DataCellProps} from './DataCellProps';

export const EnsligeForsorgereVedtaksperiodeData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstKolonne
        tekst={bruker.ensligeForsorgereOvergangsstonad?.vedtaksPeriodetype ?? '-'}
        skalVises={valgteKolonner.includes(Kolonne.ENSLIGE_FORSORGERE_VEDTAKSPERIODE)}
        className="col col-xs-2"
    />
);
