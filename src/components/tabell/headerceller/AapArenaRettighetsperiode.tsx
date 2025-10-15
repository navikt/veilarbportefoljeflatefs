import {HeadercelleMedSorteringBasertPaFiltervalgProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {
    AAPFilterArena,
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
    const {ytelse: valgtArenaytelsesfilter} = filtervalg; // Dette er det gamle Arena-ytelsesfilteret som inneheld AAP-filter og litt andre ytelsar
    const {ytelseAapArena: valgtArenaAAPfilter} = filtervalg; // Dette er det nye Arena-filteret som inneheld berre AAP-filter

    /* Hjelpeverdiar for gamle AAP-ytelsesfilter */
    const ordinarAapYtelsesfilterArena = valgtArenaytelsesfilter === YTELSE_ARENA_AAP_ORDINAR;
    const unntakAapYtelsesfilterArena = valgtArenaytelsesfilter === YTELSE_ARENA_AAP_UNNTAK;
    const beggeAapYtelsesfilterArena = valgtArenaytelsesfilter === YTELSE_ARENA_AAP;

    /* Hjelpeverdiar for nye AAP-ytelsesfilter */
    const ordinarAapArena = valgtArenaAAPfilter.includes(AAPFilterArena.HAR_AAP_ORDINAR_I_ARENA);
    const unntakAapArena = valgtArenaAAPfilter.includes(AAPFilterArena.HAR_AAP_UNNTAK_I_ARENA);
    const beggeAapArena = unntakAapArena && ordinarAapArena;

    const sorteringsfeltBasertPaAapFiltrering = () => {
        if (beggeAapYtelsesfilterArena || beggeAapArena) {
            return Sorteringsfelt.AAP_RETTIGHETSPERIODE;
        } else if (ordinarAapYtelsesfilterArena || ordinarAapArena) {
            return Sorteringsfelt.AAP_ARENA_MAXTID_UKE;
        } else if (unntakAapYtelsesfilterArena || unntakAapArena) {
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
