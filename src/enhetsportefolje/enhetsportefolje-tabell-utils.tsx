export function filtrerValgteKolonner(tabellKolonneObj, valgteKolonner) {
    const filtreradeKolonner = tabellKolonneObj.kolonner.filter((kol) => valgteKolonner.includes(kol.id));
    return Object.assign({}, tabellKolonneObj, {kolonner: filtreradeKolonner});
}

export function filtrerYtelseKolonner(tabellKolonneObj, valgtYtelse) {
    const filtreradeKolonner = tabellKolonneObj.kolonner.filter((kol) => kol.filterId ? kol.filterId.includes(valgtYtelse) : true);
    return Object.assign({}, tabellKolonneObj, {kolonner: filtreradeKolonner});
}

export function filtrerTommeKolonneGruppe(tabellKolonneObj) {
    return tabellKolonneObj.kolonner.length > 0;
}

export function antallFilter(filtervalg) {
    function mapAktivitetFilter(value) {
        return Object.entries(value).map(([_, verdi]) => {
            if (verdi === 'NA') return 0;
            return 1;
        }).reduce((a: number, b: number) => a + b, 0);
    }

    return Object.entries(filtervalg)
        .map(([filter, value]) => {
            if (value === true) return 1;
            else if (Array.isArray(value)) return value.length;
            else if (filter === 'aktiviteter') return mapAktivitetFilter(value);
            else if (typeof value === 'object') return value ? Object.entries(value).length : 0;
            else if (value) return 1;
            return 0;
        }).reduce((a, b) => a + b, 0);
}
