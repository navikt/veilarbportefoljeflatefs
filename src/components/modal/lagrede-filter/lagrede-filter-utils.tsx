import {FiltervalgModell} from "../../../model-interfaces";
import {isEmptyArray, isObject} from "formik";
import {LagretFilterValideringsError} from "./lagre-filter-modal";

export function lagredeFilterListerErLik(lagretFilter: FiltervalgModell, nyttFilter: FiltervalgModell): boolean {
    return objectEquals(lagretFilter, nyttFilter)
}

function objectEquals(lagretFilter, nyttFilter) {
    // if both are functions
    if (lagretFilter === null || lagretFilter === undefined || nyttFilter === null || nyttFilter === undefined) {
        return lagretFilter === nyttFilter;
    }
    if (lagretFilter === nyttFilter || lagretFilter.valueOf() === nyttFilter.valueOf()) {
        return true;
    }

    // if they are not functions or strictly equal, they both need to be objects
    if (!(lagretFilter instanceof Object)) {
        return false;
    }
    if (!(nyttFilter instanceof Object)) {
        return false;
    }

    const filterliste = Object.keys(lagretFilter);
    return Object.keys(nyttFilter).every(function (elem) {
        return filterliste.indexOf(elem) !== -1;
    })
        ? filterliste.every(function (i) {
            return objectEquals(lagretFilter[i], nyttFilter[i]);
        })
        : false;
}

export function erTomtObjekt(objekt): boolean {
    return Object.keys(objekt).length === 0;
}

export function erObjektValuesTomt(minOversiktObjekt): boolean {
    return Object.values(minOversiktObjekt).every(value => erValueTomt(value))
}

function erValueTomt(value) {
    if (value instanceof Object) return erObjektValuesTomt(value)
    else if (Array.isArray(value)) return isEmptyArray(value)
    else return value === null || value === 'NA' || value === "" || erTomtObjekt(value)
}

export function antallFilter(minOversiktObjekt) {
    return Object.values(minOversiktObjekt).filter(value => !erValueTomt(value))
        .reduce((acc: number, filter) => isObject(filter)
            ? acc + antallFilter(filter)
            : Array.isArray(filter)
                ? acc + filter.length
                : acc + 1
            , 0);
}

export function feilValidering(filterNavn, filterValg, eksisterendeFilter, filterId?) {
    let feilmelding: any = {} as LagretFilterValideringsError

    filterNavn = filterNavn.trim()

    if (!filterNavn) {
        feilmelding.filterNavn = "Filteret mangler navn."
    }

    if (filterNavn.length > 255) {
        feilmelding.filterNavn = "Filternavn er for langt, kan ikke ha mer enn 255 bokstaver."
    }

    if (eksisterendeFilter.find(elem => elem.filterId !== filterId && elem.filterNavn.toLowerCase() === filterNavn.toLowerCase())) {
        feilmelding.filterNavn = "Filternavn er allerede i bruk."
    }

    if (eksisterendeFilter.find(elem => elem.filterId !== filterId && lagredeFilterListerErLik(elem.filterValg, filterValg))) {
        feilmelding.filterNavn = "Valgt filter er allerede lagret."
    }

    return feilmelding
}
