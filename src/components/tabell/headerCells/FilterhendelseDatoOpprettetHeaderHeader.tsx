import {HeaderCellMedSorteringBasertPaFiltervalgProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';
import {Filtervalg} from '../../../typer/filtervalg-modell';
import {KANDIDAT_FOR_UTMELDING} from '../../../filtrering/filter-konstanter';

export const FilterhendelseDatoOpprettetHeaderHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick,
    filtervalg
}: HeaderCellMedSorteringBasertPaFiltervalgProps) => {
    const kandidatForUtmelding = filtervalg[Filtervalg.ferdigfilterListe].includes(KANDIDAT_FOR_UTMELDING);
    const tekst = kandidatForUtmelding ? 'Dato for årsak' : 'Dato for hendelse';
    const tooltipTekst = kandidatForUtmelding ? 'Dato da årsaken oppsto' : 'Dato da hendelsen ble opprettet';

    return (
        <SorteringHeader
            skalVises={valgteKolonner.includes(Kolonne.FILTERHENDELSE_DATO_OPPRETTET)}
            sortering={Sorteringsfelt.FILTERHENDELSE_DATO_OPPRETTET}
            erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.FILTERHENDELSE_DATO_OPPRETTET}
            rekkefolge={rekkefolge}
            onClick={onClick}
            tekst={tekst}
            title={tooltipTekst}
            className="col col-xs-2"
        />
    );
};
