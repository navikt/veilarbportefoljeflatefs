import * as React from 'react';
import Paginering from './paginering/paginering';
import Listevisning from './listevisning/listevisning';
import {OversiktType} from '../../ducks/ui/listevisning';
import './toolbar.less';
import '../../style.less';
import {useSelector} from 'react-redux';
import ArbeidslisteKnapp from './legg-til-arbeidsliste-knapp';
import {AppState} from '../../reducer';
import ToolbarKnapp from './toolbar-knapp';
import classNames from 'classnames';
import {useWindowWidth} from '../../hooks/use-window-width';
import {AddPerson, Search} from '@navikt/ds-icons';
import {Heading} from '@navikt/ds-react';

interface ToolbarProps {
    oversiktType: OversiktType;
    onPaginering?: (fra?: number, antall?: number) => void;
    sokVeilederSkalVises?: boolean;
    visesAnnenVeiledersPortefolje?: boolean;
    children?: React.ReactNode;
    gjeldendeVeileder?: string;
    antallTotalt: number;
    id?: string;
    antallValgteVeiledere?: number;
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
        antallValgteVeiledere,
        sokVeilederSkalVises
    } = props;
    const brukere = useSelector((state: AppState) => state.portefolje.data.brukere);
    const valgteBrukere = brukere.filter(bruker => bruker.markert === true);
    const aktiv = valgteBrukere.length > 0;

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
                            ikon={<Search className="toolbar-knapp__ikon" id="sok-veileder-ikon" />}
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
                'toolbar',
                ((scrolling && isSidebarHidden && !windowWidth) ||
                    (scrolling && windowWidth && !isSidebarHidden) ||
                    (!isSidebarHidden && windowWidth)) &&
                    'toolbar__hidden'
            )}
            id={id}
        >
            <div className="toolbar__element toolbar--skille-mellom-elementer toolbar__knapperad">
                {oversiktType === OversiktType.veilederOversikt && (
                    <Heading size="small" level="2">
                        {antallTotalt === 0
                            ? `Ingen veiledere`
                            : `Viser ${antallValgteVeiledere} av totalt ${antallTotalt} veiledere.`}
                    </Heading>
                )}
                {oversiktType !== OversiktType.veilederOversikt && (
                    <div className="tildel-veileder-wrapper">
                        <ToolbarKnapp
                            tittel="Tildel veileder"
                            skalVises={oversiktType in OversiktType}
                            aktiv={aktiv}
                            tildelveileder
                            ikon={<AddPerson className="toolbar-knapp__ikon" id="tildel-veileder-ikon" />}
                            oversiktType={oversiktType}
                        />
                    </div>
                )}
                {oversikt(oversiktType)}
            </div>
            <div className="toolbar__element toolbar--skille-mellom-elementer toolbar__paginering">
                <Listevisning oversiktType={oversiktType} />
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
