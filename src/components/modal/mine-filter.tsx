export function harGjortEndringerIFilterValg(redigertListe: string[], initialstateListe: string[]) {
    return !veilederlisterErLik(redigertListe, initialstateListe);
}

export function harGjortEndringerIGruppeNavn(gruppeNavn: string, initialGruppeNavn: string) {
    return gruppeNavn !== initialGruppeNavn;
}

export function harGjortEndringer(redigertListe: string[], initialstateListe: string[], gruppeNavn: string, initialGruppeNavn: string) {
    return harGjortEndringerIGruppeNavn(gruppeNavn, initialGruppeNavn) || harGjortEndringerIFilterValg(redigertListe, initialstateListe);
}

export function veilederlisterErLik(lagretVeilederGruppe: string[], veiledereFilter: string[]) : boolean {
    return lagretVeilederGruppe.length === veiledereFilter.length && lagretVeilederGruppe.every((v) => veiledereFilter.includes(v));
}
