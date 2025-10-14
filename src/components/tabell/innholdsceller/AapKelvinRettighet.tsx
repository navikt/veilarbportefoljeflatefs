import {InnholdscelleProps} from './InnholdscelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';

export const AapKelvinRettighet = ({bruker, valgteKolonner}: InnholdscelleProps) => {
    return (
        <TekstKolonne
            tekst={bruker.aapKelvin?.rettighetstype ?? '-'}
            skalVises={valgteKolonner.includes(Kolonne.AAP_KELVIN_RETTIGHET)}
            className="col col-xs-2"
        />
    );
};
