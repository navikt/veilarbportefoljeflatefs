import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {InnholdscelleProps} from './InnholdscelleProps';
import {innsatsgruppeNavn} from '../../../model-interfaces';

export const GjeldendeVedtak14aInnsatsgruppe = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <TekstKolonne
        skalVises={valgteKolonner.includes(Kolonne.GJELDENDE_VEDTAK_14A_INNSATSGRUPPE)}
        tekst={
            bruker.gjeldendeVedtak14a?.innsatsgruppe ? innsatsgruppeNavn[bruker.gjeldendeVedtak14a.innsatsgruppe] : '-'
        }
        className="col col-xs-2"
    />
);
