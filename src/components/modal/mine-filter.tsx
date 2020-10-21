export function harGjortEndringerIFilterValg(redigertListe: string[], initialstateListe: string[]) {
    return !veilederlisterErLik(redigertListe, initialstateListe);
}

export function harGjortEndringerIGruppeNavn(gruppeNavn: string, initialGruppeNavn: string) {
    return gruppeNavn !== initialGruppeNavn;
}

export function harGjortEndringer(
    redigertListe: string[],
    initialstateListe: string[],
    gruppeNavn: string,
    initialGruppeNavn: string
) {
    return (
        harGjortEndringerIGruppeNavn(gruppeNavn, initialGruppeNavn) ||
        harGjortEndringerIFilterValg(redigertListe, initialstateListe)
    );
}

export function veilederlisterErLik(lagretVeiledergruppe: string[], veiledereFilter: string[]): boolean {
    return (
        lagretVeiledergruppe.length === veiledereFilter.length &&
        lagretVeiledergruppe.every(v => veiledereFilter.includes(v))
    );
}
