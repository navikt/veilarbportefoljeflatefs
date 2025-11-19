import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellMedLenkePropsOgFiltervalg} from './DataCellProps';
import {LenkeDataCellType} from '../dataCellTypes/LenkeDataCellType';
import {UDELT_SAMTALEREFERAT, UTGATTE_VARSEL} from '../../../filtrering/filter-konstanter';
import {HendelseKategori} from '../../../typer/bruker-modell';

export const FilterhendelseLenkeData = ({
    bruker,
    valgteKolonner,
    enhetId,
    filtervalg
}: DataCellMedLenkePropsOgFiltervalg) => {
    const filtrertPaUtgattVarsel = filtervalg.ferdigfilterListe.includes(UTGATTE_VARSEL);
    const filtrertPaUdelteSamtalereferat = filtervalg.ferdigfilterListe.includes(UDELT_SAMTALEREFERAT);

    const hendelseInnhold = filtrertPaUtgattVarsel
        ? bruker.hendelser?.get(HendelseKategori.UTGATTE_VARSEL)
        : filtrertPaUdelteSamtalereferat
          ? bruker.hendelser?.get(HendelseKategori.UDELTE_SAMTALEREFERAT)
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
