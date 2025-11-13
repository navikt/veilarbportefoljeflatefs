import {
    DagpengerFilterArena,
    YTELSE_ARENA_DAGPENGER,
    YTELSE_ARENA_DAGPENGER_LONNSGARANTIMIDLER,
    YTELSE_ARENA_DAGPENGER_ORDINARE,
    YTELSE_ARENA_DAGPENGER_PERMITTERING,
    YTELSE_ARENA_DAGPENGER_PERMITTERING_FISKEINDUSTRI
} from '../filtrering/filter-konstanter';

/** Filtrert på dagpengeytelse med permittering i nytt arenafilter (ytelseDagpengerArena)
 * (men det ikkje er filtrert på alle dagpengeytelser) */
export const filtrertPaYtelseDagpengerArenaFilterMedPermittering = (ytelseDagpengerArena: string[]) => {
    if (ytelseDagpengerArena.length > 1) {
        return false;
    }
    return (
        ytelseDagpengerArena[0] === DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_ARENA ||
        ytelseDagpengerArena[0] === DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI_ARENA
    );
};

/** Filtrert på dagpengeytelser utan permittering (eller "alle med dagpenger"), i nytt arenafilter ("ytelseDagpengerArena") */
export const filtrertPaYtelseDagpengerArenaFilterUtenPermittering = (ytelseDagpengerArena: string[]) => {
    return (
        ytelseDagpengerArena.length > 1 ||
        ytelseDagpengerArena[0] === DagpengerFilterArena.HAR_DAGPENGER_ORDINAR_ARENA ||
        ytelseDagpengerArena[0] === DagpengerFilterArena.HAR_DAGPENGER_LONNSGARANTIMIDLER_ARENA
    );
};

/** Filtrert på dagpengeytelse med permittering i gamalt arenafilter ("ytelse") */
export const filtrertPaYtelsesfilterMedDagpengerMedPermittering = (valgtArenaytelsesfilter: string | null) => {
    return (
        valgtArenaytelsesfilter === YTELSE_ARENA_DAGPENGER_PERMITTERING ||
        valgtArenaytelsesfilter === YTELSE_ARENA_DAGPENGER_PERMITTERING_FISKEINDUSTRI
    );
};

/** Filtrert på dagpengeytelser utan permittering (eller "alle med dagpenger"), i gamalt arenafilter ("ytelse") */
export const filtrertPaYtelsesfilterMedDagpengerUtenPermittering = (valgtArenaytelsesfilter: string | null) => {
    return (
        valgtArenaytelsesfilter === YTELSE_ARENA_DAGPENGER ||
        valgtArenaytelsesfilter === YTELSE_ARENA_DAGPENGER_ORDINARE ||
        valgtArenaytelsesfilter === YTELSE_ARENA_DAGPENGER_LONNSGARANTIMIDLER
    );
};

/** Filtrert på dagpengeytelse med permittering i nytt eller gamalt arenafilter */
export const filtrertPaFilterMedDagpengerMedPermittering = (
    ytelseDagpengerArena: string[],
    valgtArenaytelsesfilter: string | null
) => {
    return (
        filtrertPaYtelseDagpengerArenaFilterMedPermittering(ytelseDagpengerArena) ||
        filtrertPaYtelsesfilterMedDagpengerMedPermittering(valgtArenaytelsesfilter)
    );
};

/** Filtrert på dagpengeytelser utan permittering (eller "alle med dagpenger"), i nytt eller gamalt arenafilter */
export const filtrertPaFilterMedDagpengerUtenPermittering = (
    ytelseDagpengerArena: string[],
    valgtArenaytelsesfilter: string | null
) => {
    return (
        filtrertPaYtelseDagpengerArenaFilterUtenPermittering(ytelseDagpengerArena) ||
        filtrertPaYtelsesfilterMedDagpengerUtenPermittering(valgtArenaytelsesfilter)
    );
};
