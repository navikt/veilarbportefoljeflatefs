import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {DataCellProps} from './DataCellProps';
import {innsatsgruppeNavn} from '../../../model-interfaces';

export const GjeldendeVedtak14aInnsatsgruppeData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstDataCellType
        tekst={
            bruker.vedtak14a.gjeldendeVedtak14a.innsatsgruppe
                ? innsatsgruppeNavn[bruker.vedtak14a.gjeldendeVedtak14a.innsatsgruppe]
                : '-'
        }
        skalVises={valgteKolonner.includes(Kolonne.GJELDENDE_VEDTAK_14A_INNSATSGRUPPE)}
        className="col col-xs-2"
    />
);
