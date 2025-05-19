import {isEmptyArray, isObject} from 'formik';
import {FiltervalgModell} from '../../../typer/filtervalg-modell';
import {LagretFilterValideringsError} from './mine-filter-modal';
import {AktiviteterValg} from '../../../filtrering/filter-konstanter';

export function lagretFilterValgModellErLik(filter1?: FiltervalgModell, filter2?: FiltervalgModell): boolean {
    return deepEqual(filter1, filter2);
}

function deepEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if ((areObjects && !deepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
            return false;
        }
    }

    return true;
}

export function erTomtObjekt(objekt): boolean {
    return Object.keys(objekt).length === 0;
}

export function erObjektValuesTomt(minOversiktObjekt): boolean {
    return Object.values(minOversiktObjekt).every(value => erValueTomt(value));
}

function erValueTomt(value) {
    if (value instanceof Object) return erObjektValuesTomt(value);
    else if (Array.isArray(value)) return isEmptyArray(value);
    else return value === null || value === AktiviteterValg.NA || value === '' || erTomtObjekt(value);
}

export function feilValidering(filterNavn, filterValg, eksisterendeFilter, filterId?) {
    let feilmelding: any = {} as LagretFilterValideringsError;

    filterNavn = filterNavn.trim();

    if (!filterNavn) {
        feilmelding.filterNavn = 'Filteret mangler navn.';
    }

    if (filterNavn.length > 255) {
        feilmelding.filterNavn = 'Filternavn er for langt, kan ikke ha mer enn 255 bokstaver.';
    }

    if (
        eksisterendeFilter
            .filter(elem => elem.aktiv)
            .find(elem => elem.filterId !== filterId && elem.filterNavn.toLowerCase() === filterNavn.toLowerCase())
    ) {
        feilmelding.filterNavn = 'Filternavn er allerede i bruk.';
    }

    if (
        eksisterendeFilter
            .filter(elem => elem.aktiv)
            .find(elem => elem.filterId !== filterId && lagretFilterValgModellErLik(elem.filterValg, filterValg))
    ) {
        feilmelding.filterNavn = 'Valgt filter er allerede lagret.';
    }

    return feilmelding;
}
