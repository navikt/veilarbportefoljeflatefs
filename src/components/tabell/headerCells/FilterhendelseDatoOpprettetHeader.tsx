import {HeaderCellMedSorteringBasertPaFiltervalgProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';
import {Filtervalg} from '../../../typer/filtervalg-modell';
import {CV_KAN_DELES_STILLING_FRA_NAV, KANDIDAT_FOR_UTMELDING} from '../../../filtrering/filter-konstanter';

export const FilterhendelseDatoOpprettetHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick,
    filtervalg
}: HeaderCellMedSorteringBasertPaFiltervalgProps) => {
    const {tekst, tooltipTekst} = lagTekster(filtervalg[Filtervalg.ferdigfilterListe]);

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

const lagTekster = (ferdigfilterListe: string[]) => {
    if (ferdigfilterListe.includes(KANDIDAT_FOR_UTMELDING)) {
        return {tekst: 'Dato for årsak', tooltipTekst: 'Dato da årsaken oppsto'};
    }
    if (ferdigfilterListe.includes(CV_KAN_DELES_STILLING_FRA_NAV)) {
        return {tekst: 'Bruker svart ja til deling av CV', tooltipTekst: 'Dato da bruker svarte ja til deling av CV'};
    }
    return {tekst: 'Dato for hendelse', tooltipTekst: 'Dato da hendelsen ble opprettet'};
};
