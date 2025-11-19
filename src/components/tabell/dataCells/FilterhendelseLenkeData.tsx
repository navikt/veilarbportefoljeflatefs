import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellMedLenkePropsOgFiltervalg} from './DataCellProps';
import {LenkeDataCellType} from '../dataCellTypes/LenkeDataCellType';
import {UDELT_SAMTALEREFERAT, UTGATTE_VARSEL} from '../../../filtrering/filter-konstanter';

export const FilterhendelseLenkeData = ({
    bruker,
    valgteKolonner,
    enhetId,
    filtervalg
}: DataCellMedLenkePropsOgFiltervalg) => {
    const filtrertPaUtgattVarsel = filtervalg.ferdigfilterListe.includes(UTGATTE_VARSEL);
    const filtrertPaUdelteSamtalereferat = filtervalg.ferdigfilterListe.includes(UDELT_SAMTALEREFERAT);

    const hendelseInnhold = filtrertPaUtgattVarsel
        ? bruker.hendelser?.UTGATTE_VARSEL
        : filtrertPaUdelteSamtalereferat
          ? bruker.hendelser?.UDELTE_SAMTALEREFERAT
          : null;

    return (
        <LenkeDataCellType
            bruker={bruker}
            lenke={hendelseInnhold?.lenke ?? ''}
            lenketekst={hendelseInnhold?.beskrivelse ?? ''}
            erAbsoluttLenke={true}
            enhetId={enhetId}
            skalVises={valgteKolonner.includes(Kolonne.FILTERHENDELSE_LENKE)}
            className="col col-xs-2-5"
        />
    );
};
