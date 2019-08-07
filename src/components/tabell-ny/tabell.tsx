import React from 'react';
import {useTable} from 'react-table';
import {BrukerModell, Sorteringsrekkefolge} from "../../model-interfaces";
import {Kolonne} from "../../ducks/ui/listevisning";
import classNames from 'classnames';
import {useSorteringSelector} from "../../hooks/redux/use-sortering-selector";


type KolonneMapper = (bruker: BrukerModell) => React.ReactNode;

export interface KolonneConfig {
    kolonneProps: { tittel: string, sorterbar: boolean}[];
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
    forrigebruker: any;
}


export function Tabell({ konfig, brukere, onSortChanged}: TabellProps) {
    const kolonneMapper = konfig.flatMap(kolonnegruppeKonfig =>
        kolonnegruppeKonfig.kolonner.map(kolonne => kolonne.mapper));

    const headerKonfig = konfig.map(kolonnegruppeKonfig =>
        ({tittel: kolonnegruppeKonfig.tittel, kolumneLengde: kolonnegruppeKonfig.kolonner.length}));

    const kolonneKofig = konfig.flatMap(kolonnegruppeKonfig =>
        kolonnegruppeKonfig.kolonner.map(kolonne =>
            ({id: kolonne.id, kolonneProps: kolonne.kolonneProps})));

    return (
        <table className="portefoljetabell">
            <thead>
            <TabellHeader headerKonfig={headerKonfig}/>
            <TabellKolonner kolonneKofig={kolonneKofig} onSortChanged={onSortChanged}/>
            </thead>
            <tbody>
            {brukere.map(bruker => rowMapper(bruker, kolonneMapper))}
            </tbody>
        </table>
    )
}

function TabellHeader(props: {headerKonfig: {tittel: string, kolumneLengde: number}[]}) {
    return (
        <tr className="portefoljetabell__header">
            {props.headerKonfig.map(konfig => <th colSpan={konfig.kolumneLengde}>{konfig.tittel}</th>)}
        </tr>
    );
}

interface TabellKolonneProps {
    id: Kolonne | undefined;
    kolonneProps: {tittel: string, sorterbar: boolean}[];
}

type TabellKolonnerProps = {kolonneKofig: TabellKolonneProps[], onSortChanged: (kolonne: Kolonne)=> void };

function TabellKolonner (props: TabellKolonnerProps) {
    return (
        <tr>
            {props.kolonneKofig.flatMap(kolonneKonfig =>
                <th>
                    {kolonneKonfig.kolonneProps.map(kolonne =>
                        kolonne.sorterbar
                            ? <SorteringsHeader sorter={props.onSortChanged} kolonneId={kolonneKonfig.id} tittel={kolonne.tittel}/>
                            : <span>{kolonne.tittel}</span>

                    )}
                </th>
            )}
        </tr>
    )
}

function rowMapper (bruker: BrukerModell, kolonneMappers: KolonneMapper[]) {
    return  (
        <tr>
            {kolonneMappers.map(kolonneMap => <td>{kolonneMap(bruker)}</td>)}
        </tr>
    );
}

function SorteringsHeader (props: {sorter: (kolonneId: Kolonne) => void, kolonneId, tittel} ){
    const {sorteringsfelt, sorteringsrekkefolge} = useSorteringSelector();

    const erValgt = props.kolonneId === sorteringsfelt;
    return (
        <button
            onClick={()=> props.sorter(props.kolonneId)}
            className={classNames('lenke lenke--frittstaende', { valgt: erValgt }, {'valgt-sortering': erValgt})}
            aria-pressed={erValgt}
            aria-label={erValgt && sorteringsrekkefolge !== Sorteringsrekkefolge.ikke_satt ?
                sorteringsrekkefolge : 'inaktiv'}
        >
            {props.tittel}
        </button>
    )
}
