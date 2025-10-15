import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleMedDataBasertPaFiltervalgProps} from './InnholdscelleProps';
import {UkeKolonne} from '../kolonner/ukekolonne';
import {
    AAPFilterArena,
    YTELSE_ARENA_AAP,
    YTELSE_ARENA_AAP_ORDINAR,
    YTELSE_ARENA_AAP_UNNTAK
} from '../../../filtrering/filter-konstanter';

export const AapArenaRettighetsperiode = ({
    bruker,
    valgteKolonner,
    filtervalg
}: InnholdscelleMedDataBasertPaFiltervalgProps) => {
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

    const ukerIgjenForYtelsenDetErFiltrertPa = () => {
        if (beggeAapYtelsesfilterArena || beggeAapArena) {
            return bruker.aapmaxtidUke !== 0 ? bruker.aapmaxtidUke : bruker.aapUnntakUkerIgjen;
        } else if (ordinarAapYtelsesfilterArena || ordinarAapArena) {
            return bruker.aapmaxtidUke;
        } else if (unntakAapYtelsesfilterArena || unntakAapArena) {
            return bruker.aapUnntakUkerIgjen;
        }
    };

    return (
        <UkeKolonne
            className="col col-xs-2"
            ukerIgjen={ukerIgjenForYtelsenDetErFiltrertPa()}
            minVal={2}
            skalVises={valgteKolonner.includes(Kolonne.YTELSE_ARENA_RETTIGHETSPERIODE_AAP)}
        />
    );
};
