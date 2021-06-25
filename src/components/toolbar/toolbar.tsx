import * as React from 'react';
import Paginering from './paginering/paginering';
import {default as VelgKolonner} from './listevisning/listevisning';
import {OversiktType} from '../../ducks/ui/listevisning';
import './toolbar.less';
import '../../style.less';
import {useSelector} from 'react-redux';
import ArbeidslisteKnapp from './legg-til-arbeidsliste-knapp';
import {AppState} from '../../reducer';
import ToolbarKnapp from './toolbar-knapp';
import {ReactComponent as TildelVeilederIkon} from '../ikoner/person-add-1.svg';
import {ReactComponent as SokVeilederIkon} from '../ikoner/person-view-1.svg';
import {Undertittel} from 'nav-frontend-typografi';
import classNames from 'classnames';
import {useWindowWidth} from '../../hooks/use-window-width';

interface ToolbarProps {
    oversiktType: OversiktType;
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

function Toolbar(props: ToolbarProps) {
    const {
        id,
        oversiktType,
        visesAnnenVeiledersPortefolje,
        antallTotalt,
        onPaginering,
        scrolling = false,
        isSidebarHidden = false,
        antallVeiledere,
        sokVeilederSkalVises
    } = props;
    const brukere = useSelector((state: AppState) => state.portefolje.data.brukere);
    const valgteBrukere = brukere.filter(bruker => bruker.markert === true);
    const aktiv = valgteBrukere.length > 0;
    const veiledereGrammatikk = antallVeiledere === 1 ? 'veileder' : 'veiledere';

    const oversikt = side => {
        switch (side) {
            case OversiktType.minOversikt:
                return <ArbeidslisteKnapp visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje || false} />;
            case OversiktType.enhetensOversikt:
                return (
                    <div className="sok-veileder-wrapper">
                        <ToolbarKnapp
                            tittel="Søk veileder"
                            skalVises={sokVeilederSkalVises}
                            aktiv
                            tildelveileder={false}
                            ikon={<SokVeilederIkon className="toolbar-knapp__ikon" id="sok-veileder-ikon" />}
                            oversiktType={oversiktType}
                        />
                    </div>
                );
            case OversiktType.veilederOversikt:
                return <></>;
        }
    };

    const windowWidth = useWindowWidth() < 1200;
    return (
        <div
            className={classNames(
                'toolbar blokk-xs',
                ((scrolling && isSidebarHidden && !windowWidth) ||
                    (scrolling && windowWidth && !isSidebarHidden) ||
                    (!isSidebarHidden && windowWidth)) &&
                    'toolbar__hidden'
            )}
            id={id}
        >
            <div className="toolbar__element toolbar--skille-mellom-elementer toolbar__knapperad">
                {oversiktType === OversiktType.veilederOversikt && (
                    <Undertittel tag="h2" className="veiledere-undertittel blokk-xxs">
                        {antallVeiledere === 0 ? `Ingen veiledere` : `Totalt ${antallVeiledere} ${veiledereGrammatikk}`}
                    </Undertittel>
                )}
                {oversiktType !== OversiktType.veilederOversikt && (
                    <div className="tildel-veileder-wrapper">
                        <ToolbarKnapp
                            tittel="Tildel veileder"
                            skalVises={oversiktType in OversiktType}
                            aktiv={aktiv}
                            tildelveileder
                            ikon={<TildelVeilederIkon className="toolbar-knapp__ikon" id="tildel-veileder-ikon" />}
                            oversiktType={oversiktType}
                        />
                    </div>
                )}
                {oversikt(oversiktType)}
            </div>
            <div className="toolbar__element toolbar--skille-mellom-elementer toolbar__paginering">
                <VelgKolonner oversiktType={oversiktType} />
                <Paginering
                    className="toolbar--skille-mellom-elementer"
                    onChange={onPaginering}
                    antallTotalt={antallTotalt}
                />
            </div>
        </div>
    );
}

export default Toolbar;
