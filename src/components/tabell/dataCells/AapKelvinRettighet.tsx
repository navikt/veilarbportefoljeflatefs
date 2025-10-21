import {DataCellProps} from './DataCellProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';

export const AapKelvinRettighet = ({bruker, valgteKolonner}: DataCellProps) => {
    return (
        <TekstKolonne
            tekst={bruker.aapKelvin?.rettighetstype ?? '-'}
            skalVises={valgteKolonner.includes(Kolonne.AAP_KELVIN_RETTIGHET)}
            className="col col-xs-2"
        />
    );
};
