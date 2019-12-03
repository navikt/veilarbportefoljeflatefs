export function harGjortEndringer (redigertListe: string[], initialstateListe: string[], initialGruppeNavn: string, gruppeNavn: string) {
    if(gruppeNavn !== initialGruppeNavn) {
        return true;
    }
    return !veilederlisterErLik(redigertListe, initialstateListe);
}


export function veilederlisterErLik (lagretVeilederGruppe: string[], veiledereFilter: string[]) {
    return lagretVeilederGruppe.length === veiledereFilter.length  && lagretVeilederGruppe.every((v) => veiledereFilter.includes(v));
}