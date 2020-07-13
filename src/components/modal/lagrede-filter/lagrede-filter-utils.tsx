import {FiltervalgModell} from "../../../model-interfaces";

export function lagredeFilterListerErLik(lagretFilter: FiltervalgModell, nyttFilter: FiltervalgModell): boolean {
    return JSON.stringify(lagretFilter) === JSON.stringify(nyttFilter);
}

export function erTomtObjekt(objekt): boolean {
    return Object.values(objekt).length === 0;
}
