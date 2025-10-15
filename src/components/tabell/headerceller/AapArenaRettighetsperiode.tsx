import {HeadercelleMedSorteringBasertPaFiltervalgProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';
import {
    filtrertPaAAPOrdinarINyttEllerGammeltFilter,
    filtrertPaAAPUnntakINyttEllerGammeltFilter,
    filtrertPaAAPYtelseINyttEllerGammeltFilter
} from '../../../utils/AapFiltermigreringUtils';

export const AapArenaRettighetsperiode = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick,
    filtervalg
}: HeadercelleMedSorteringBasertPaFiltervalgProps) => {
    const sorteringsfeltBasertPaAapFiltrering = () => {
        if (filtrertPaAAPYtelseINyttEllerGammeltFilter(filtervalg)) {
            return Sorteringsfelt.AAP_RETTIGHETSPERIODE;
        } else if (filtrertPaAAPOrdinarINyttEllerGammeltFilter(filtervalg)) {
            return Sorteringsfelt.AAP_ARENA_MAXTID_UKE;
        } else if (filtrertPaAAPUnntakINyttEllerGammeltFilter(filtervalg)) {
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
