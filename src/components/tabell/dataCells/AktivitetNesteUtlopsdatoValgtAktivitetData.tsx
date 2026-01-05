import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';

/** Viser neste utløpsdato for aktivitetane som er valgt i Aktivitet-filtera
 * (Den heng med andre ord ikkje saman med statusfilteret "i avtalt aktivitet) */
export const AktivitetNesteUtlopsdatoValgtAktivitetData = ({bruker, valgteKolonner}: DataCellProps) => (
    <DatoDataCellType
        className="col col-xs-2"
        dato={
            bruker.aktiviteterAvtaltMedNav.nesteUtlopsdatoForFiltrerteAktiviteter
                ? new Date(bruker.aktiviteterAvtaltMedNav.nesteUtlopsdatoForFiltrerteAktiviteter)
                : null
        }
        skalVises={valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET)}
    />
);
