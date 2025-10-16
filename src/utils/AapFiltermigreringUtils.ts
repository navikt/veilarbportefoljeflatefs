import {FiltervalgModell} from '../typer/filtervalg-modell';
import {
    AAPFilterArena,
    YTELSE_ARENA_AAP,
    YTELSE_ARENA_AAP_ORDINAR,
    YTELSE_ARENA_AAP_UNNTAK
} from '../filtrering/filter-konstanter';

/* Hjelpeverdiar for nye Arena-AAP-filter */
export const filtrertPaOrdinarAapFilterArena = (filtervalg: FiltervalgModell) => {
    return filtervalg.ytelseAapArena?.includes(AAPFilterArena.HAR_AAP_ORDINAR_I_ARENA);
};
export const filtrertPaUnntakAapFilterArena = (filtervalg: FiltervalgModell) => {
    return filtervalg.ytelseAapArena?.includes(AAPFilterArena.HAR_AAP_UNNTAK_I_ARENA);
};
const filtrertPaBeggeAapFilterArena = (filtervalg: FiltervalgModell) => {
    return filtrertPaUnntakAapFilterArena(filtervalg) && filtrertPaOrdinarAapFilterArena(filtervalg);
};
const minstEnAapFilterArena = (filtervalg: FiltervalgModell) => {
    return filtrertPaOrdinarAapFilterArena(filtervalg) || filtrertPaUnntakAapFilterArena(filtervalg);
};
export const filtrertPaAapFilterArenaMenIkkeBegge = (filtervalg: FiltervalgModell) => {
    return minstEnAapFilterArena(filtervalg) && !filtrertPaBeggeAapFilterArena(filtervalg);
};

/* Hjelpeverdiar for gamle AAP-ytelsesfilter */
export const filtrertPaOrdinarAapYtelsesfilterArena = (filtervalg: FiltervalgModell) => {
    return filtervalg.ytelse === YTELSE_ARENA_AAP_ORDINAR;
};
export const filtrertPaUnntakAapYtelsesfilterArena = (filtervalg: FiltervalgModell) => {
    return filtervalg.ytelse === YTELSE_ARENA_AAP_UNNTAK;
};
export const filtrertPaBeggeAapYtelsesfilterArena = (filtervalg: FiltervalgModell) => {
    return filtervalg.ytelse === YTELSE_ARENA_AAP;
};

/* Nye og gamle AAP-filter i parallell så vi får same oppførsel i kolonnevisninga */
export const filtrertPaAAPYtelseINyttEllerGammeltFilter = (filtervalg: FiltervalgModell) => {
    return filtrertPaBeggeAapFilterArena(filtervalg) || filtrertPaBeggeAapYtelsesfilterArena(filtervalg);
};
export const filtrertPaAAPOrdinarINyttEllerGammeltFilter = (filtervalg: FiltervalgModell) => {
    return filtrertPaOrdinarAapFilterArena(filtervalg) || filtrertPaOrdinarAapYtelsesfilterArena(filtervalg);
};
export const filtrertPaAAPUnntakINyttEllerGammeltFilter = (filtervalg: FiltervalgModell) => {
    return filtrertPaUnntakAapFilterArena(filtervalg) || filtrertPaUnntakAapYtelsesfilterArena(filtervalg);
};
