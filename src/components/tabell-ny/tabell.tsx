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
    kolonneStorrelse?: string;
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
        kolonnegruppeKonfig.kolonner.map(kolonne => ({mapper: kolonne.mapper, id: kolonne.id})));

    const headerKonfig = konfig.map(kolonnegruppeKonfig =>
        ({tittel: kolonnegruppeKonfig.tittel, kolumneLengde: kolonnegruppeKonfig.kolonner.length}));

    const kolonneKofig = konfig.flatMap(kolonnegruppeKonfig =>
        kolonnegruppeKonfig.kolonner.map(kolonne =>
            ({id: kolonne.id, kolonneProps: kolonne.kolonneProps})));

    const gridTemplateColumns = konfig.flatMap(kolonneKofig =>
        kolonneKofig.kolonner.map(kol => kol.kolonneStorrelse || '2fr')).join(' ');

    return (
        <div className="portefoljetabell" style={{display: 'grid', gridTemplateColumns: gridTemplateColumns}}>
            <TabellHeader headerKonfig={headerKonfig}/>
            <TabellKolonner kolonneKofig={kolonneKofig} onSortChanged={onSortChanged}/>
            <TabellBody brukere={brukere} kolonneMapper={kolonneMapper}/>
        </div>
    )
}

function TabellHeader(props: {headerKonfig: {tittel: string, kolumneLengde: number}[]}) {
    const assigNewProperties = props.headerKonfig.reduce( (acc, konf, idx) => {
        if(idx === 0) {
            return [{...konf, kolStart: 1, kolEnd: konf.kolumneLengde + 1}]
        }
        const [lastElem, rest] = acc;
        const lastElemKolEnd = lastElem.kolEnd;
        return [{...konf, kolStart: lastElemKolEnd, kolEnd: lastElemKolEnd + konf.kolumneLengde },...acc]

    }, [] as any).reverse();

    return (
        assigNewProperties.map(elem => <span className="portefoljetabell__header" style={{gridColumnStart: elem.kolStart, gridColumnEnd: elem.kolEnd}}>{elem.tittel}</span>)
    )
}

interface TabellKolonneProps {
    id: Kolonne | undefined;
    kolonneProps: {tittel: string, sorterbar: boolean}[];
}

type TabellKolonnerProps = {kolonneKofig: TabellKolonneProps[], onSortChanged: (kolonne: Kolonne)=> void };

function TabellKolonner (props: TabellKolonnerProps) {
    return (
        <>
            {props.kolonneKofig.flatMap((kolonneKonfig) =>
                <div className="portefoljetabell__kolonne">
                    {kolonneKonfig.kolonneProps.map(kolonne =>
                        kolonne.sorterbar
                            ? <SorteringsHeader sorter={props.onSortChanged} kolonneId={kolonneKonfig.id} tittel={kolonne.tittel}/>
                            : <span>{kolonne.tittel}</span>

                    )}
                </div>
            )}
        </>
    )
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

function TabellBody (props: {brukere: BrukerModell[], kolonneMapper: any}) {
    return  (
        <>
            {props.brukere.map(bruker =>
                props.kolonneMapper.map(kolonneMap =>
                    <div className={classNames('portefoljetabell__rowcell', kolonneMap.id)}>{kolonneMap.mapper(bruker)}</div>))}
        </>
    );
}
