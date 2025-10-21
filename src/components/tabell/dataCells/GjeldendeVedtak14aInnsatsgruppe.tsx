import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {DataCellProps} from './DataCellProps';
import {innsatsgruppeNavn} from '../../../model-interfaces';

export const GjeldendeVedtak14aInnsatsgruppe = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstKolonne
        tekst={
            bruker.gjeldendeVedtak14a?.innsatsgruppe ? innsatsgruppeNavn[bruker.gjeldendeVedtak14a.innsatsgruppe] : '-'
        }
        skalVises={valgteKolonner.includes(Kolonne.GJELDENDE_VEDTAK_14A_INNSATSGRUPPE)}
        className="col col-xs-2"
    />
);
