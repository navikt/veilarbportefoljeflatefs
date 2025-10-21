import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {DataCellProps} from './DataCellProps';

export const Utkast14aAnsvarligVeilederData = ({bruker, valgteKolonner}: DataCellProps) => (
    <TekstKolonne
        tekst={bruker.utkast14a?.ansvarligVeileder ?? ' '}
        skalVises={valgteKolonner.includes(Kolonne.ANSVARLIG_VEILEDER_FOR_VEDTAK)}
        className="col col-xs-2"
    />
);
