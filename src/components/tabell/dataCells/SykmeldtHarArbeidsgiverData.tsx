import {DataCellProps} from './DataCellProps';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';

export const SykmeldtHarArbeidsgiverData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstDataCellType
        tekst={bruker.sykmeldt?.harArbeidsgiver ?? '-'}
        skalVises={valgteKolonner.includes(Kolonne.SYKMELDT_HAR_ARBEIDSGIVER)}
        className="col col-xs-2"
    />
);
