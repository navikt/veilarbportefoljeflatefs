import {DagpengerFilterArena} from '../filtrering/filter-konstanter';

/** Filtrert på dagpengeytelse med permittering i filteret "ytelseDagpengerArena"
 * (men det ikkje er filtrert på alle dagpengeytelser) */
export const filtrertPaDagpengerArenaFilterMedPermittering = (ytelseDagpengerArena: string[]) => {
    const filtrertPaBareEtPermitteringsfilter =
        ytelseDagpengerArena.length === 1 &&
        (ytelseDagpengerArena[0] === DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_ARENA ||
            ytelseDagpengerArena[0] === DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI_ARENA);

    const filtrerPaBeggePermitteringsfilter =
        ytelseDagpengerArena.length === 2 &&
        ytelseDagpengerArena[0] === DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_ARENA &&
        ytelseDagpengerArena[1] === DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI_ARENA;

    return filtrertPaBareEtPermitteringsfilter || filtrerPaBeggePermitteringsfilter;
};

/** Filtrert på dagpengeytelser utan permittering (eller "alle med dagpenger"), i filteret "ytelseDagpengerArena" */
export const filtrertPaDagpengerArenaFilterUtenPermittering = (ytelseDagpengerArena: string[]) => {
    // TODO heller sjekk på "inneheld eit av desse to filtera" her, og "inneheld berre denne lista av filter" på permittering-greia.
    return (
        ytelseDagpengerArena.length > 1 ||
        ytelseDagpengerArena[0] === DagpengerFilterArena.HAR_DAGPENGER_ORDINAR_ARENA ||
        ytelseDagpengerArena[0] === DagpengerFilterArena.HAR_DAGPENGER_LONNSGARANTIMIDLER_ARENA
    );
};
