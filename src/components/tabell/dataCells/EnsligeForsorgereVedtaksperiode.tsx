import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {DataCellProps} from './DataCellProps';

export const EnsligeForsorgereVedtaksperiode = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstKolonne
        tekst={bruker.ensligeForsorgereOvergangsstonad?.vedtaksPeriodetype ?? '-'}
        skalVises={valgteKolonner.includes(Kolonne.ENSLIGE_FORSORGERE_VEDTAKSPERIODE)}
        className="col col-xs-2"
    />
);
