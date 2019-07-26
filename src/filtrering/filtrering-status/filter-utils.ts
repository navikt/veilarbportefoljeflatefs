const CHECKBOX_FILTER = ['UFORDELTE_BRUKERE', 'NYE_BRUKERE_FOR_VEILEDER'];

export function leggTilFerdigFilter(filterListe: string[], filter: string): string[] {
    if (CHECKBOX_FILTER.includes(filter)) {
        return [...filterListe, filter];
    } else if (!filterListe.includes(filter)) {
        const checkboxFilter = filterListe
            .filter((valgtfilter) => CHECKBOX_FILTER.includes(valgtfilter));
        return [...checkboxFilter, filter];
    }
    return [filter];
}

export function fjernFerdigfilter(valgtFilterList: string[], removeFilter: string): string[] {
    return valgtFilterList.filter((filter) => filter !== removeFilter);
}
