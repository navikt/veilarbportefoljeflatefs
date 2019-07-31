import React, {useState} from 'react';
import {useTable} from 'react-table';
import {BrukerModell, Sorteringsrekkefolge} from "../../model-interfaces";
import {Kolonne} from "../../ducks/ui/listevisning";


type KolonneMapper = (bruker: BrukerModell) => React.ReactNode;

export enum DefaultKolonneType  {
    Checkboks = 'Checkboks',
    Etikett = 'Etikett'
}

type KolonneTyper = Kolonne | DefaultKolonneType

export interface KolonneConfig {
    kolonneElement: (onClick: () => void) => React.ReactNode;
    mapper: KolonneMapper;
    id: KolonneTyper;
}

export interface KolonneGruppeConfig {
    tittel: string;
    kolonner: KolonneConfig [];
}

export type TabellConfig = KolonneGruppeConfig []


interface TabellProps {
    konfig: TabellConfig;
    brukere: BrukerModell [];
    onSortChanged: (kolonne: KolonneTyper | 'ikke_satt', sorting: Sorteringsrekkefolge)=> void;
}

function rowMapper (bruker: BrukerModell, kolonneMappers: KolonneMapper[]) {
    return  (
        <tr>
            {kolonneMappers.map(kolonneMap => <td>{kolonneMap(bruker)}</td>)}
        </tr>
    );
}

function getNewSortOrder (sortOrder: Sorteringsrekkefolge) {
    switch (sortOrder) {
        case Sorteringsrekkefolge.ikke_satt:
            return Sorteringsrekkefolge.ascending;
        case  Sorteringsrekkefolge.ascending:
            return Sorteringsrekkefolge.descending;
        case Sorteringsrekkefolge.descending:
            return Sorteringsrekkefolge.ikke_satt;
        default:
            return Sorteringsrekkefolge.ikke_satt;
    }

}

function getNewSortingState(oldSortState: SortState, id: KolonneTyper): SortState {
    if(id === oldSortState.sorteringskolonne) {
        return {sorteringskolonne: id, sorteingrekkefolge: getNewSortOrder(oldSortState.sorteingrekkefolge)}
    }
    return {sorteringskolonne: id, sorteingrekkefolge: getNewSortOrder(Sorteringsrekkefolge.ikke_satt)}
}

interface SortState {
    sorteringskolonne: KolonneTyper | 'ikke_satt' ;
    sorteingrekkefolge: Sorteringsrekkefolge;
}


export function Tabell({ konfig, brukere, onSortChanged }: TabellProps) {
    const [sortState, setSortState]  = useState<SortState>({sorteringskolonne: 'ikke_satt', sorteingrekkefolge: Sorteringsrekkefolge.ikke_satt});

    const handleKolonneHeaderClicked = (id: KolonneTyper) => {
        const newSortState = getNewSortingState(sortState, id);
        onSortChanged(newSortState.sorteringskolonne, newSortState.sorteingrekkefolge);
        setSortState(newSortState);
    };

    const kolonneMapper = konfig.flatMap(kolonnegruppeKonfig => kolonnegruppeKonfig.kolonner.map(kolonne => kolonne.mapper));

    return (
        <table>
            <thead>
            <tr>
                {konfig.map(kolonnegruppeKonfig =>
                    <th colSpan={kolonnegruppeKonfig.kolonner.length}>{kolonnegruppeKonfig.tittel}</th>)}
            </tr>
            <tr>
                {konfig.map(kolonnegruppeKonfig =>
                    kolonnegruppeKonfig.kolonner.map(kolonne =>
                        <th colSpan={1}>{kolonne.kolonneElement(()=> handleKolonneHeaderClicked(kolonne.id))}</th>))}
            </tr>
            </thead>
            <tbody>
            {brukere.map(bruker => rowMapper(bruker, kolonneMapper))}
            </tbody>
        </table>
    )
}
