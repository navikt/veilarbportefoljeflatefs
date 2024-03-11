import {Tiltak} from '../../ducks/enhettiltak';
import {OrNothing} from '../../utils/types/types';
import {MINE_FARGEKATEGORIER} from '../filter-konstanter';

export const CHECKBOX_FILTER = ['UFORDELTE_BRUKERE', 'NYE_BRUKERE_FOR_VEILEDER', MINE_FARGEKATEGORIER];

export function leggTilFerdigFilter(filterListe: string[], filter: string): string[] {
    if (CHECKBOX_FILTER.includes(filter)) {
        return [...filterListe, filter];
    } else if (!filterListe.includes(filter)) {
        const checkboxFilter = filterListe.filter(valgtfilter => CHECKBOX_FILTER.includes(valgtfilter));
        return [...checkboxFilter, filter];
    }
    return [filter];
}

export function fjernFerdigfilter(valgtFilterList: string[], removeFilter: string): string[] {
    return valgtFilterList.filter(filter => filter !== removeFilter);
}

export function sortTiltak(tiltak: OrNothing<Tiltak>): OrNothing<Tiltak> {
    return (
        tiltak &&
        Object.entries(tiltak)
            .sort((a, b) => a[1].localeCompare(b[1]))
            .reduce((acc, curr) => ({...acc, [curr[0]]: curr[1]}), {} as Tiltak)
    );
}
