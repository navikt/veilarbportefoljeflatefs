import {InnholdscelleProps} from './InnholdscelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {enumTilLesbarTekst} from '../../../utils/utils';

export const AapKelvinRettighetstype = ({bruker, valgteKolonner}: InnholdscelleProps) => {
    return (
        <TekstKolonne
            tekst={enumTilLesbarTekst(bruker.aapKelvinRettighetstype)}
            skalVises={valgteKolonner.includes(Kolonne.AAP_KELVIN_RETTIGHETSTYPE)}
            className="col col-xs-2"
        />
    );
};
