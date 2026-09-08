import {HeaderCellMedSorteringBasertPaFiltervalgProps} from './HeaderCellProps';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {Header} from '../header';
import {Filtervalg} from '../../../typer/filtervalg-modell';
import {KANDIDAT_FOR_UTMELDING} from '../../../filtrering/filter-konstanter';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const FilterhendelseLenkeHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    filtervalg,
    rekkefolge,
    onClick
}: HeaderCellMedSorteringBasertPaFiltervalgProps) => {
    const kandidatForUtmelding = filtervalg[Filtervalg.ferdigfilterListe].includes(KANDIDAT_FOR_UTMELDING);

    if (kandidatForUtmelding) {
        return (
            <SorteringHeader
                skalVises={valgteKolonner.includes(Kolonne.FILTERHENDELSE_LENKE)}
                sortering={Sorteringsfelt.FILTERHENDELSE_BESKRIVELSE_ENUM}
                erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.FILTERHENDELSE_BESKRIVELSE_ENUM}
                rekkefolge={rekkefolge}
                onClick={onClick}
                tekst="Årsak til avslutning"
                title="Lenke til å behandle årsak til avslutning"
                className="col col-xs-2-5"
            />
        );
    }

    return (
        <Header
            skalVises={valgteKolonner.includes(Kolonne.FILTERHENDELSE_LENKE)}
            title="Lenke til hendelsen"
            className="col col-xs-2-5"
        >
            Hendelse
        </Header>
    );
};
