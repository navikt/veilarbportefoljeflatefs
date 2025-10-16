import {FiltervalgModell} from '../typer/filtervalg-modell';
import {AAPFilterArena} from '../filtrering/filter-konstanter';

/* Hjelpeverdiar for å sjekke om eit Arena-AAP-filter er valgt */
export const filtrertPaOrdinarAapFilterArena = (filtervalg: FiltervalgModell) => {
    return filtervalg.ytelseAapArena?.includes(AAPFilterArena.HAR_AAP_ORDINAR_I_ARENA);
};
export const filtrertPaUnntakAapFilterArena = (filtervalg: FiltervalgModell) => {
    return filtervalg.ytelseAapArena?.includes(AAPFilterArena.HAR_AAP_UNNTAK_I_ARENA);
};
export const filtrertPaBeggeAapFilterArena = (filtervalg: FiltervalgModell) => {
    return filtrertPaUnntakAapFilterArena(filtervalg) && filtrertPaOrdinarAapFilterArena(filtervalg);
};
const minstEnAapFilterArena = (filtervalg: FiltervalgModell) => {
    return filtrertPaOrdinarAapFilterArena(filtervalg) || filtrertPaUnntakAapFilterArena(filtervalg);
};
export const filtrertPaAapFilterArenaMenIkkeBegge = (filtervalg: FiltervalgModell) => {
    return minstEnAapFilterArena(filtervalg) && !filtrertPaBeggeAapFilterArena(filtervalg);
};
