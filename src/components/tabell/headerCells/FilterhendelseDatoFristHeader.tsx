import {HeaderCellMedSorteringBasertPaFiltervalgProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';
import {Filtervalg} from '../../../typer/filtervalg-modell';
import {CV_KAN_DELES_STILLING_FRA_NAV, KANDIDAT_FOR_UTMELDING} from '../../../filtrering/filter-konstanter';

export const FilterhendelseDatoFristHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick,
    filtervalg
}: HeaderCellMedSorteringBasertPaFiltervalgProps) => {
    const tekster = lagTekster(filtervalg[Filtervalg.ferdigfilterListe]);

    return (
        <SorteringHeader
            skalVises={valgteKolonner.includes(Kolonne.FILTERHENDELSE_DATO_FRIST) && tekster !== null}
            sortering={Sorteringsfelt.FILTERHENDELSE_DATO_FRIST}
            erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.FILTERHENDELSE_DATO_FRIST}
            rekkefolge={rekkefolge}
            onClick={onClick}
            tekst={tekster?.tekst ?? ''}
            title={tekster?.tooltipTekst ?? ''}
            className="col col-xs-2"
        />
    );
};

const lagTekster = (ferdigfilterListe: string[]) => {
    if (ferdigfilterListe.includes(CV_KAN_DELES_STILLING_FRA_NAV)) {
        return {tekst: 'Frist deling av CV', tooltipTekst: 'Frist deling av CV'};
    }
    if (ferdigfilterListe.includes(KANDIDAT_FOR_UTMELDING)) {
        return {
            tekst: 'Automatisk avslutning',
            tooltipTekst: 'Dato når arbeidsrettet oppfølging avsluttes automatisk'
        };
    }
    return null;
};
