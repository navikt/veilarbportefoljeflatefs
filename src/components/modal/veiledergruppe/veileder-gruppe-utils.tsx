import { FiltervalgModell } from '../../../model-interfaces';

export const fjernVeiledereFraListen = (prevState: FiltervalgModell, veilederTarget: string) => prevState.veiledere
    ? {...prevState, veiledere: prevState.veiledere.filter(v => v !== veilederTarget)}
    : {...prevState, veiledere: []};


export let veiledergruppeListe = [];

export function harGjortEndringer (redigertListe: string[], initialstateListe: string[], gruppeNavn: string, initialGruppeNavn: string) {
    if(gruppeNavn !== initialGruppeNavn) {
        return true;
    }
    return !veilederlisterErLik(redigertListe, initialstateListe);
}

export function veilederlisterErLik (lagretVeilederGruppe: string[], veiledereFilter: string[]) {
    return lagretVeilederGruppe.length === veiledereFilter.length  && lagretVeilederGruppe.every((v) => veiledereFilter.includes(v));
}
