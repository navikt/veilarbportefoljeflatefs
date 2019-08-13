import React, {useState} from 'react';
import {BrukerModell, Sorteringsrekkefolge} from '../../model-interfaces';
import {Kolonne} from '../../ducks/ui/listevisning';
import classNames from 'classnames';
import {useSorteringSelector} from '../../hooks/redux/use-sortering-selector';
import ArbeidslistePanel from "../../minoversikt/minoversikt-arbeidslistepanel";
import Collapse from 'react-collapse';

type KolonneMapper = (bruker: BrukerModell, apen?: boolean, onClick?: ()=> void) => React.ReactNode;

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
    onSortChanged: (kolonne: Kolonne) => void;
    forrigebruker: string | undefined;
    innloggetVeileder: string;
}


export function EkspanderbarTabell({ konfig, brukere, onSortChanged, forrigebruker, innloggetVeileder}: TabellProps) {

    const kolonneMapper = konfig.flatMap(kolonnegruppeKonfig =>
        kolonnegruppeKonfig.kolonner.map(kolonne => ({mapper: kolonne.mapper, id: kolonne.id})));

    const headerKonfig = konfig.map(kolonnegruppeKonfig =>
        ({tittel: kolonnegruppeKonfig.tittel, kolumneLengde: kolonnegruppeKonfig.kolonner.length}));

    const kolonneKofig = konfig.flatMap(kolonnegruppeKonfig =>
        kolonnegruppeKonfig.kolonner.map(kolonne =>
            ({id: kolonne.id, kolonneProps: kolonne.kolonneProps})));

    const gridTemplateColumns = konfig.flatMap(kolonneKofig =>
        kolonneKofig.kolonner.map(kol => kol.kolonneStorrelse || '1fr')).join(' ');

    return (
        <div className="portefoljetabell" style={{display: 'grid', gridTemplateColumns: gridTemplateColumns}}>
            <TabellHeader headerKonfig={headerKonfig}/>
            <TabellKolonner kolonneKofig={kolonneKofig} onSortChanged={onSortChanged}/>
            <TabellBody
                brukere={brukere}
                kolonneMapper={kolonneMapper}
                forrigebruker={forrigebruker}
                innloggetVeileder={innloggetVeileder}
            />
        </div>
    )
}

function TabellHeader(props: {headerKonfig: {tittel: string, kolumneLengde: number}[]})  {
    const leggTilKolStartogKolEndPaKonfig = props.headerKonfig
        .reduce( (acc, konf, idx) => {
            if(idx === 0) {
                return [{...konf, kolStart: 1, kolEnd: konf.kolumneLengde + 1}]
            }
            const [lastElem, rest] = acc;
            const lastElemKolEnd = lastElem.kolEnd;
            return [{...konf, kolStart: lastElemKolEnd, kolEnd: lastElemKolEnd + konf.kolumneLengde },...acc]

        }, [] as {tittel: string, kolumneLengde: number, kolEnd: number, kolStart: number}[])
        .reverse();

    return (
        <>
            {leggTilKolStartogKolEndPaKonfig
                .map(elem =>
                    <span key ={elem.tittel} className="portefoljetabell__header" style={{gridColumnStart: elem.kolStart, gridColumnEnd: elem.kolEnd}}>
                        {elem.tittel}
                        </span>
                )}
        </>
    )
}

interface TabellKolonneProps {
    id: Kolonne | undefined;
    kolonneProps: {tittel: string, sorterbar: boolean}[];
}

type TabellKolonnerProps = {kolonneKofig: TabellKolonneProps[], onSortChanged: (kolonne: Kolonne) => void };

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

interface TabellBodyProps {
    forrigebruker: string | undefined,
    brukere: BrukerModell[],
    kolonneMapper: {mapper: KolonneMapper, id: Kolonne} [],
    innloggetVeileder: string;
}

function TabellBody (props: TabellBodyProps ) {
    return  (
        <>
            {props.brukere.map(bruker =>
                props.kolonneMapper.map(kolonneMap =>
                    <TabellRad
                        bruker={bruker}
                        kolonneMap={kolonneMap}
                        forrigebruker={props.forrigebruker}
                        innloggetVeileder={props.innloggetVeileder}
                    />

                ))}
        </>
    );
}


function TabellRad (props: {bruker: BrukerModell, kolonneMap: {mapper: KolonneMapper, id: Kolonne}, forrigebruker: string | undefined, innloggetVeileder: string}) {
    const [apen, setApen] = useState(false);
    const onClick = ()=> setApen(prevState => !prevState);
    return (
        <div className="portefoljetabell__rowcell">
            <div className={classNames(props.kolonneMap.id,  {'brukerliste--forrigeBruker': props.forrigebruker === props.bruker.fnr})}>
                {props.kolonneMap.mapper(props.bruker, apen, onClick)}
            </div>
            <Collapse isOpened={apen}>
                <ArbeidslistePanel
                    bruker={props.bruker}
                    innloggetVeileder={props.innloggetVeileder}
                />
            </Collapse>
        </div>

    )
}
