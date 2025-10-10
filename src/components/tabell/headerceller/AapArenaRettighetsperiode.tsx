import {HeadercelleMedSorteringBasertPaFiltervalgProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {
    YTELSE_ARENA_AAP,
    YTELSE_ARENA_AAP_ORDINAR,
    YTELSE_ARENA_AAP_UNNTAK
} from '../../../filtrering/filter-konstanter';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const AapArenaRettighetsperiode = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick,
    filtervalg
}: HeadercelleMedSorteringBasertPaFiltervalgProps) => {
    const {ytelse: valgtArenaytelsesfilter} = filtervalg;

    const sorteringsfeltBasertPaAapFiltrering = () => {
        if (valgtArenaytelsesfilter === YTELSE_ARENA_AAP) {
            return Sorteringsfelt.AAP_RETTIGHETSPERIODE;
        } else if (valgtArenaytelsesfilter === YTELSE_ARENA_AAP_ORDINAR) {
            return Sorteringsfelt.AAP_ARENA_MAXTID_UKE;
        } else if (valgtArenaytelsesfilter === YTELSE_ARENA_AAP_UNNTAK) {
            return Sorteringsfelt.AAP_ARENA_UNNTAK_UKER_IGJEN;
        }
    };

    return (
        <SorteringHeader
            skalVises={valgteKolonner.includes(Kolonne.YTELSE_ARENA_RETTIGHETSPERIODE_AAP)}
            sortering={sorteringsfeltBasertPaAapFiltrering()}
            erValgt={gjeldendeSorteringsfelt === sorteringsfeltBasertPaAapFiltrering()}
            rekkefolge={rekkefolge}
            onClick={onClick}
            tekst="Gjenstående uker rettighet AAP"
            title="Gjenstående uker av rettighetsperioden for AAP (Arena)"
            className="col col-xs-2"
        />
    );
};
