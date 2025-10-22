import {Kolonne} from '../../../../ducks/ui/listevisning';
import {TekstDataCellType} from '../../dataCellTypes/TekstDataCellType';
import {DataCellProps} from '../DataCellProps';
import {truncateTekst} from '../../../../utils/tekst-utils';

export const HuskelappKommentarData = ({bruker, valgteKolonner}: DataCellProps) => {
    // Fjerner eventuelle linjeskift før teksten og viser kun tekst fram til første linjeskift eller maks 30 tegn, ref. truncateTekst()
    const hentForhandsvisningAvHuskelapp = (kommentar: string) => truncateTekst(kommentar.trimStart().split('\n')[0]);

    return (
        <TekstDataCellType
            tekst={bruker.huskelapp?.kommentar ? hentForhandsvisningAvHuskelapp(bruker.huskelapp.kommentar) : ' '}
            skalVises={valgteKolonner.includes(Kolonne.HUSKELAPP_KOMMENTAR)}
            className="col col-xs-2"
        />
    );
};
