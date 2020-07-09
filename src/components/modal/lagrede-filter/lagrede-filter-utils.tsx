import {FiltervalgModell} from "../../../model-interfaces";

export function harGjortEndringerIFilterValg(redigertListe: FiltervalgModell, initialstateListe: FiltervalgModell) {
    return !lagredeFilterListerErLik(redigertListe, initialstateListe);
}

export function harGjortEndringerIFilterNavn(filterNavn: string, initialFilterNavn: string) {
    return filterNavn !== initialFilterNavn;
}

export function harGjortEndringer(redigertListe: FiltervalgModell, initialstateListe: FiltervalgModell, filterNavn: string, initialFilterNavn: string) {
    if (harGjortEndringerIFilterNavn(filterNavn, initialFilterNavn)) {
        return true;
    }
    return harGjortEndringerIFilterValg(redigertListe, initialstateListe);
}

export function lagredeFilterListerErLik(lagretFilter: FiltervalgModell, nyttFilter: FiltervalgModell): boolean {
    // console.log("agre", JSON.stringify(lagretFilter))
    // console.log("nytt", JSON.stringify(nyttFilter))
    return JSON.stringify(lagretFilter) === JSON.stringify(nyttFilter);
}
