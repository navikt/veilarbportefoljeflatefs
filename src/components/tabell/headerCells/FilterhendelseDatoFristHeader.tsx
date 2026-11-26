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
    const kandidatForUtmelding = filtervalg[Filtervalg.ferdigfilterListe].includes(KANDIDAT_FOR_UTMELDING);
    const cvKanDelesStillingFraNav = filtervalg[Filtervalg.ferdigfilterListe].includes(CV_KAN_DELES_STILLING_FRA_NAV);

    const tekst = cvKanDelesStillingFraNav ? 'Frist deling av CV' : 'Automatisk avslutning';
    const tooltipTekst = cvKanDelesStillingFraNav
        ? 'Frist deling av CV'
        : 'Dato når arbeidsrettet oppfølging avsluttes automatisk';

    return (
        <SorteringHeader
            skalVises={
                valgteKolonner.includes(Kolonne.FILTERHENDELSE_DATO_FRIST) &&
                (kandidatForUtmelding || cvKanDelesStillingFraNav)
            }
            sortering={Sorteringsfelt.FILTERHENDELSE_DATO_FRIST}
            erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.FILTERHENDELSE_DATO_FRIST}
            rekkefolge={rekkefolge}
            onClick={onClick}
            tekst={tekst}
            title={tooltipTekst}
            className="col col-xs-2"
        />
    );
};
