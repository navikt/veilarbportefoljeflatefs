import {DagpengerFilterArena} from '../filtrering/filter-konstanter';

/** Filtrert på dagpengeytelse med permittering i filteret "ytelseDagpengerArena"
 * (men det ikkje er filtrert på alle dagpengeytelser) */
export const filtrertPaDagpengerArenaFilterMedPermittering = (ytelseDagpengerArena: string[]) => {
    if (ytelseDagpengerArena.length > 1) {
        return false;
    }
    return (
        ytelseDagpengerArena[0] === DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_ARENA ||
        ytelseDagpengerArena[0] === DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI_ARENA
    );
};

/** Filtrert på dagpengeytelser utan permittering (eller "alle med dagpenger"), i filteret "ytelseDagpengerArena" */
export const filtrertPaDagpengerArenaFilterUtenPermittering = (ytelseDagpengerArena: string[]) => {
    return (
        ytelseDagpengerArena.length > 1 ||
        ytelseDagpengerArena[0] === DagpengerFilterArena.HAR_DAGPENGER_ORDINAR_ARENA ||
        ytelseDagpengerArena[0] === DagpengerFilterArena.HAR_DAGPENGER_LONNSGARANTIMIDLER_ARENA
    );
};
