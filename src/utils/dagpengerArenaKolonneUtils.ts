import {DagpengerFilterArena} from '../filtrering/filter-konstanter';
import {inneholderBareElementerViSerEtter, inneholderMinstEtAvElementeneViSerEtter} from './listesammenligning';

export const filtrertPaDagpengerArenaFilterMedPermittering = (ytelseDagpengerArena: string[]) => {
    return inneholderBareElementerViSerEtter(ytelseDagpengerArena, [
        DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_ARENA,
        DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI_ARENA
    ]);
};

export const filtrertPaDagpengerArenaFilterUtenPermittering = (ytelseDagpengerArena: string[]) => {
    return inneholderMinstEtAvElementeneViSerEtter(ytelseDagpengerArena, [
        DagpengerFilterArena.HAR_DAGPENGER_ORDINAR_ARENA,
        DagpengerFilterArena.HAR_DAGPENGER_LONNSGARANTIMIDLER_ARENA
    ]);
};
