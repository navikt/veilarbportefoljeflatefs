import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellMedInnholdBasertPaFiltervalgProps} from './DataCellProps';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';
import {UDELT_SAMTALEREFERAT, UTGATTE_VARSEL} from '../../../filtrering/filter-konstanter';
import {HendelseKategori} from '../../../typer/bruker-modell';

export const FilterhendelseDatoOpprettetData = ({
    bruker,
    valgteKolonner,
    filtervalg
}: DataCellMedInnholdBasertPaFiltervalgProps) => {
    const filtrertPaUtgattVarsel = filtervalg.ferdigfilterListe.includes(UTGATTE_VARSEL);
    const filtrertPaUdelteSamtalereferat = filtervalg.ferdigfilterListe.includes(UDELT_SAMTALEREFERAT);

    const hendelseInnhold = filtrertPaUtgattVarsel
        ? bruker.hendelser?.get(HendelseKategori.UTGATTE_VARSEL)
        : filtrertPaUdelteSamtalereferat
          ? bruker.hendelser?.get(HendelseKategori.UDELTE_SAMTALEREFERAT)
          : null;

    return (
        <DatoDataCellType
            skalVises={valgteKolonner.includes(Kolonne.FILTERHENDELSE_DATO_OPPRETTET)}
            dato={hendelseInnhold?.dato ? new Date(hendelseInnhold?.dato) : null}
            className="col col-xs-2"
        />
    );
};
