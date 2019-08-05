import React, {useState} from 'react';
import {useTable} from 'react-table';
import {BrukerModell, Sorteringsrekkefolge} from "../../model-interfaces";
import {Kolonne} from "../../ducks/ui/listevisning";
import classNames from "classnames";
import Header from "../tabell/header";
import {useSorteringSelector} from "../../hooks/redux/use-sortering-selector";


type KolonneMapper = (bruker: BrukerModell) => React.ReactNode;


export interface KolonneConfig {
    kolonneElementer: {tittel: string, sorterbar: boolean}[];
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
            {kolonneMappers.map(kolonneMap => <td>{kolonneMap(bruker)}</td>)}
        </tr>
    );
}

function mapTilKolonnerHeader (kolonnerElement: any ) {
    return <div/>
}

function kolonneHeader (kolonneElementer: {tittel: string, sorterbar: boolean}[], sorter: (kolonneId: any) => void, kolonneId, rekkefolge, sorteringsfelt ) {
    const erValgt = kolonneId === sorteringsfelt;

    return kolonneElementer.map(kolonnerElement => {
        if (kolonnerElement.sorterbar) {
            return (
                <button
                onClick={()=> sorter(kolonneId)}
                className={classNames('lenke lenke--frittstaende', { valgt: erValgt }, {'valgt-sortering': erValgt})}
                aria-pressed={erValgt}
                aria-label={erValgt && rekkefolge !== Sorteringsrekkefolge.ikke_satt ?
                    rekkefolge : 'inaktiv'}
            >
                {kolonnerElement.tittel}
            </button>
            )
        }
        return (
            <span className="sortering-header">
                {kolonnerElement.tittel}
            </span>
        )

    })
}


export function Tabell({ konfig, brukere, onSortChanged}: TabellProps) {
    const {sorteringsfelt, sorteringsrekkefolge} = useSorteringSelector();


    const kolonneMapper = konfig.flatMap(kolonnegruppeKonfig =>
        kolonnegruppeKonfig.kolonner.map(kolonne => kolonne.mapper));

    return (
        <table className="portefoljetabell">
            <thead>
            <tr>
                {konfig.map(kolonnegruppeKonfig =>
                    <th colSpan={kolonnegruppeKonfig.kolonner.length}>{kolonnegruppeKonfig.tittel}</th>)}
            </tr>
            <tr>
                {konfig.map(kolonnegruppeKonfig =>
                    kolonnegruppeKonfig.kolonner.map(kolonne =>
                        <th>{kolonneHeader(kolonne.kolonneElementer, onSortChanged, kolonne.id, sorteringsrekkefolge, sorteringsfelt)}</th>
                    ))}
            </tr>
            </thead>
            <tbody>
            {brukere.map(bruker => rowMapper(bruker, kolonneMapper))}
            </tbody>
        </table>
    )
}
