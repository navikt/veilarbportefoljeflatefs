import React, {Dispatch, useRef} from 'react';
import {useDispatch} from 'react-redux';
import classNames from 'classnames';
import {Tabs} from '@navikt/ds-react';
import {SidebarTabs, useSidebarViewStore} from '../../store/sidebar/sidebar-view-store';
import {ReactComponent as StatusIkon} from '../ikoner/tab_status.svg';
import {ReactComponent as FilterIkon} from '../ikoner/tab_filter.svg';
import {ReactComponent as VeiledergruppeIkon} from '../ikoner/tab_veiledergrupper.svg';
import {ReactComponent as MineFilterIkon} from '../ikoner/tab_mine-filter.svg';
import {FiltervalgModell} from '../../model-interfaces';
import {OrNothing} from '../../utils/types/types';
import {Tiltak} from '../../ducks/enhettiltak';
import {oppdaterKolonneAlternativer, OversiktType} from '../../ducks/ui/listevisning';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';
import outsideClick from '../../hooks/use-outside-click';
import {useWindowWidth} from '../../hooks/use-window-width';
import {SIDEBAR_TAB_ENDRET, skjulSidebar, visSidebar} from '../../ducks/sidebar-tab';
import {FiltreringStatus, Statustall} from '../../filtrering/filtrering-status/filtrering-status';
import FiltreringFilter from '../../filtrering/filtrering-filter/filtrering-filter';
import {pagineringSetup} from '../../ducks/paginering';
import {endreFiltervalg} from '../../ducks/filtrering';
import FilteringVeiledergrupper from '../../filtrering/filtrering-veileder-grupper/filtrering-veiledergrupper';
import MineFilterTab from './mine-filter-tab';
import SidebarTab from './sidebar-tab';
import './sidebar.css';

interface EndreSideBarProps {
    dispatch: Dispatch<any>;
    currentOversiktType: OversiktType;
    requestedTab: SidebarTabs;
}

export function endreValgtSidebarTab({dispatch, currentOversiktType, requestedTab}: EndreSideBarProps) {
    dispatch({
        name: currentOversiktType,
        selectedTab: requestedTab,
        type: SIDEBAR_TAB_ENDRET
    });
}

interface Fane {
    icon: React.ReactNode;
    tittel: string;
}

const faner: {[key in SidebarTabs]: Fane} = {
    [SidebarTabs.STATUS]: {
        icon: <StatusIkon />,
        tittel: 'Status'
    },
    [SidebarTabs.MINE_FILTER]: {
        icon: <MineFilterIkon />,
        tittel: 'Mine filter'
    },
    [SidebarTabs.VEILEDERGRUPPER]: {
        icon: <VeiledergruppeIkon />,
        tittel: 'Veiledergrupper'
    },
    [SidebarTabs.FILTER]: {
        icon: <FilterIkon />,
        tittel: 'Filter'
    }
};

interface SidebarProps {
    filtervalg: FiltervalgModell;
    enhettiltak: OrNothing<Tiltak>;
    oversiktType: OversiktType;
    isSidebarHidden: boolean;
    statustall: Statustall;
}

function Sidebar(props: SidebarProps) {
    const dispatch = useDispatch();
    const erPaMinOversikt = props.oversiktType === OversiktType.minOversikt;
    const windowWidth = useWindowWidth();
    const sidebarRef = useRef<HTMLDivElement>(null);
    const sidebarState = useSidebarViewStore(
        erPaMinOversikt ? OversiktType.minOversikt : OversiktType.enhetensOversikt
    );

    const isSidebarHidden = useSidebarViewStore(props.oversiktType).isSidebarHidden;

    outsideClick(sidebarRef, () => {
        if (windowWidth < 1200 && !props.isSidebarHidden && document.body.className !== 'navds-modal__document-body') {
            logEvent('portefolje.metrikker.klikk-utenfor', {
                sideNavn: finnSideNavn()
            });
            dispatch(skjulSidebar(props.oversiktType));
        }
    });

    const onTabsChange = (valgtFane: string) => {
        const fane: SidebarTabs = SidebarTabs[valgtFane];

        endreValgtSidebarTab({
            dispatch: dispatch,
            currentOversiktType: props.oversiktType,
            requestedTab: fane
        });

        if (isSidebarHidden) {
            dispatch(visSidebar(props.oversiktType));
        }

        logEvent('portefolje.metrikker.sidebar-tab', {
            tab: valgtFane,
            sideNavn: finnSideNavn(),
            isSidebarHidden: isSidebarHidden
        });
    };

    // TODO Gje betre namn (flytta frå sidevelger.tsx)
    const doEndreFiltervalg = (filterId: string, filterVerdi: React.ReactNode) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi, props.oversiktType));
        oppdaterKolonneAlternativer(dispatch, {...props.filtervalg, [filterId]: filterVerdi}, props.oversiktType);
    };

    return (
        <div
            ref={sidebarRef}
            aria-label={`Sidenavigasjon er nå ${props.isSidebarHidden ? 'lukket' : 'åpen'}`}
            aria-live="polite"
            className={classNames('sidebar', props.isSidebarHidden && 'sidebar__hidden', 'tabs')}
        >
            {
                <Tabs value={sidebarState.selectedTab} onChange={onTabsChange}>
                    <Tabs.List className="sidebar__tab-container">
                        <Tabs.Tab
                            value={SidebarTabs.STATUS}
                            title={faner[SidebarTabs.STATUS].tittel}
                            icon={faner[SidebarTabs.STATUS].icon}
                        />
                        <Tabs.Tab
                            value={SidebarTabs.MINE_FILTER}
                            title={faner[SidebarTabs.MINE_FILTER].tittel}
                            icon={faner[SidebarTabs.MINE_FILTER].icon}
                        />
                        {!erPaMinOversikt && (
                            <Tabs.Tab
                                value={SidebarTabs.VEILEDERGRUPPER}
                                title={faner[SidebarTabs.VEILEDERGRUPPER].tittel}
                                icon={faner[SidebarTabs.VEILEDERGRUPPER].icon}
                            />
                        )}
                        <Tabs.Tab
                            value={SidebarTabs.FILTER}
                            title={faner[SidebarTabs.FILTER].tittel}
                            icon={faner[SidebarTabs.FILTER].icon}
                        />
                    </Tabs.List>
                    {!isSidebarHidden && (
                        <div
                            className="sidebar__content-container"
                            data-testid="sidebar_content-container"
                            // id={sidebarState.selectedTab} // TODO: sjekk om id vert brukt nokon stad
                        >
                            <Tabs.Panel value={SidebarTabs.STATUS}>
                                <SidebarTab
                                    tittel={faner[SidebarTabs.STATUS].tittel}
                                    handleLukk={() => dispatch(skjulSidebar(props.oversiktType))}
                                    tab={SidebarTabs.STATUS}
                                >
                                    <FiltreringStatus
                                        oversiktType={props.oversiktType}
                                        filtervalg={props.filtervalg}
                                        statustall={props.statustall}
                                    />
                                </SidebarTab>
                            </Tabs.Panel>
                            <Tabs.Panel value={SidebarTabs.MINE_FILTER}>
                                <SidebarTab
                                    tittel={faner[SidebarTabs.MINE_FILTER].tittel}
                                    handleLukk={() => dispatch(skjulSidebar(props.oversiktType))}
                                    tab={SidebarTabs.MINE_FILTER}
                                >
                                    <FiltreringFilter
                                        endreFiltervalg={doEndreFiltervalg}
                                        filtervalg={props.filtervalg}
                                        enhettiltak={props.enhettiltak}
                                        oversiktType={props.oversiktType}
                                    />
                                </SidebarTab>
                            </Tabs.Panel>
                            {!erPaMinOversikt && (
                                <Tabs.Panel value={SidebarTabs.VEILEDERGRUPPER}>
                                    <SidebarTab
                                        tittel={faner[SidebarTabs.VEILEDERGRUPPER].tittel}
                                        handleLukk={() => dispatch(skjulSidebar(props.oversiktType))}
                                        tab={SidebarTabs.VEILEDERGRUPPER}
                                    >
                                        <FilteringVeiledergrupper oversiktType={props.oversiktType} />
                                    </SidebarTab>
                                </Tabs.Panel>
                            )}
                            <Tabs.Panel value={SidebarTabs.FILTER}>
                                <MineFilterTab
                                    valgtFane={sidebarState.selectedTab}
                                    fanetittel={faner[SidebarTabs.FILTER].tittel}
                                    enhettiltak={props.enhettiltak}
                                    oversiktType={props.oversiktType}
                                />
                            </Tabs.Panel>
                        </div>
                    )}
                </Tabs>
            }
        </div>
    );
}

export default Sidebar;
