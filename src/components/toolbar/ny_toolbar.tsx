import * as React from 'react';
import Paginering from './paginering/paginering';
import Listevisning from './listevisning/listevisning';
import {ListevisningType} from '../../ducks/ui/listevisning';
import './toolbar.less';
import '../../ny_style.less'
import {useSelector} from 'react-redux';
import LeggTilArbeidsliste from './legg-til-arbeidsliste-knapp';
import {AppState} from '../../reducer';
import ToolbarKnapp from './toolbar-knapp';
import {ReactComponent as TildelVeilederIkon} from '../ikoner/person-add-1.svg';
import {ReactComponent as SokVeilederIkon} from '../ikoner/person-view-1.svg';
import {Undertittel} from 'nav-frontend-typografi';
import classNames from "classnames";
import {useWindowWidth} from "../../hooks/use-window-width";

interface ToolbarProps {
    filtergruppe: ListevisningType;
    onPaginering?: (fra?: number, antall?: number) => void;
    sokVeilederSkalVises?: boolean;
    visesAnnenVeiledersPortefolje?: boolean;
    children?: React.ReactNode;
    gjeldendeVeileder?: string;
    antallTotalt: number;
    id?: string;
    antallVeiledere?: number;
    scrolling?: boolean;
    isSidebarHidden?: boolean;
}

function NyToolbar(props: ToolbarProps) {
    const {id, filtergruppe, visesAnnenVeiledersPortefolje, antallTotalt, onPaginering, scrolling = false, isSidebarHidden = false} = props;
    const brukere = useSelector((state: AppState) => state.portefolje.data.brukere);
    const valgteBrukere = brukere.filter((bruker) => bruker.markert === true);
    const aktiv = valgteBrukere.length > 0;
    const veiledereGrammatikk = props.antallVeiledere === 1 ? 'veileder' : 'veiledere';

    const oversikt = (side) => {
        switch (side) {
            case ListevisningType.minOversikt:
                return (
                    <LeggTilArbeidsliste visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje || false}/>
                );
            case ListevisningType.enhetensOversikt:
                return (
                    <div className="sok-veileder-wrapper">
                        <ToolbarKnapp
                            tittel="Søk veileder"
                            skalVises={props.sokVeilederSkalVises}
                            aktiv={true}
                            tildelveileder={false}
                            ikon={<SokVeilederIkon className="toolbar-knapp__ikon" id="sok-veileder-ikon"/>}
                            filtergruppe={filtergruppe}
                        />
                    </div>
                );
            case ListevisningType.veilederOversikt:
                return (<></>);
        }
    };

    const windowWidth = useWindowWidth() < 1200;
    return (
        <div className={classNames("toolbar blokk-xs",
            ((
                (scrolling && isSidebarHidden && !windowWidth) ||
                (scrolling && windowWidth && !isSidebarHidden) ||
                (!isSidebarHidden && windowWidth))
                && "toolbar__hidden"),
            isSidebarHidden && windowWidth && scrolling && "toolbar__extra")}
             id={id}>
            <div className="toolbar__element toolbar--skille-mellom-elementer toolbar__knapperad">
                {props.filtergruppe === ListevisningType.veilederOversikt &&
                <Undertittel tag="h1" className="veiledere-undertittel blokk-xxs">
                    {props.antallVeiledere === 0 ? `Ingen veiledere` : `Totalt ${props.antallVeiledere} ${veiledereGrammatikk}`}
                </Undertittel>}
                {props.filtergruppe !== ListevisningType.veilederOversikt &&
                <div className="tildel-veileder-wrapper">
                    <ToolbarKnapp
                        tittel="Tildel veileder"
                        skalVises={filtergruppe in ListevisningType}
                        aktiv={aktiv}
                        tildelveileder={true}
                        ikon={<TildelVeilederIkon className="toolbar-knapp__ikon" id="tildel-veileder-ikon"/>}
                        filtergruppe={filtergruppe}
                    />
                </div>}
                {oversikt(props.filtergruppe)}
            </div>
            <div className="toolbar__element toolbar--skille-mellom-elementer toolbar__paginering">
                <Listevisning filtergruppe={filtergruppe}/>
                <Paginering
                    className="toolbar--skille-mellom-elementer"
                    onChange={onPaginering}
                    antallTotalt={antallTotalt}
                />
            </div>
        </div>
    );
}

export default NyToolbar;
