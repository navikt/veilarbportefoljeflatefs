import {HeaderCellMedSorteringBasertPaFiltervalgProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';
import {Filtervalg} from '../../../typer/filtervalg-modell';
import {KANDIDAT_FOR_UTMELDING} from '../../../filtrering/filter-konstanter';

export const FilterhendelseDatoFristHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick,
    filtervalg
}: HeaderCellMedSorteringBasertPaFiltervalgProps) => {
    const kandidatForUtmelding = filtervalg[Filtervalg.ferdigfilterListe].includes(KANDIDAT_FOR_UTMELDING);
    return (
        <SorteringHeader
            skalVises={valgteKolonner.includes(Kolonne.FILTERHENDELSE_DATO_FRIST) && kandidatForUtmelding}
            sortering={Sorteringsfelt.FILTERHENDELSE_DATO_FRIST}
            erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.FILTERHENDELSE_DATO_FRIST}
            rekkefolge={rekkefolge}
            onClick={onClick}
            tekst={'Automatisk avslutning'}
            title={'Dato når arbeidsrettet oppfølging avsluttes automatisk'}
            className="col col-xs-2"
        />
    );
};
