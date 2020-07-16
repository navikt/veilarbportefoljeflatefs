import {FiltervalgModell} from "../../../model-interfaces";
import {isEmptyArray} from "formik";

export function lagredeFilterListerErLik(lagretFilter: FiltervalgModell, nyttFilter: FiltervalgModell): boolean {
    return JSON.stringify(lagretFilter) === JSON.stringify(nyttFilter);
}

export function erTomtObjekt(objekt): boolean {
    return Object.values(objekt).length === 0;
}

export function erObjektValuesTomt(minOversiktObjekt): boolean {
    return Object.values(minOversiktObjekt).filter(value => !erValueTomt(value)).length == 0
}

function erValueTomt(value){
    return value == null || value == "" || isEmptyArray(value) || erTomtObjekt(value)
}
