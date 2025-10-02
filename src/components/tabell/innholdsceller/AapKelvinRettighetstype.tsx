import {InnholdscelleProps} from './InnholdscelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';

export const AapKelvinRettighetstype = ({bruker, valgteKolonner}: InnholdscelleProps) => {
    return (
        <TekstKolonne
            tekst={bruker.aapKelvin?.rettighetstype ?? '-'}
            skalVises={valgteKolonner.includes(Kolonne.AAP_KELVIN_RETTIGHETSTYPE)}
            className="col col-xs-2"
        />
    );
};
