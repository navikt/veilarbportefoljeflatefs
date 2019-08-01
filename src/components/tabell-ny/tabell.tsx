import React, {useState} from 'react';
import {useTable} from 'react-table';
import {BrukerModell, Sorteringsrekkefolge} from "../../model-interfaces";
import {Kolonne} from "../../ducks/ui/listevisning";


type KolonneMapper = (bruker: BrukerModell) => React.ReactNode;


export interface KolonneConfig {
    kolonneElement: (onClick: () => void) => React.ReactNode;
    mapper: KolonneMapper;
    id: Kolonne;
}

export interface KolonneGruppeConfig {
    tittel: string;
    kolonner: KolonneConfig [];
}

export type TabellConfig = KolonneGruppeConfig []


interface TabellProps {
    konfig: TabellConfig;
    brukere: BrukerModell [];
    onSortChanged: (kolonne: Kolonne)=> void;
}

function rowMapper (bruker: BrukerModell, kolonneMappers: KolonneMapper[]) {
    return  (
        <tr>
            <td></td>
            {kolonneMappers.map(kolonneMap => <td>{kolonneMap(bruker)}</td>)}
        </tr>
    );
}


export function Tabell({ konfig, brukere, onSortChanged }: TabellProps) {

    const kolonneMapper = konfig.flatMap(kolonnegruppeKonfig =>
        kolonnegruppeKonfig.kolonner.map(kolonne => kolonne.mapper));

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
                        <th colSpan={1}>{kolonne.kolonneElement(()=> onSortChanged(kolonne.id))}</th>
                    ))}
            </tr>
            </thead>
            <tbody>
            {brukere.map(bruker => rowMapper(bruker, kolonneMapper))}
            </tbody>
        </table>
    )
}
