import React, {Dispatch, useRef, useState} from 'react';
import classNames from 'classnames';
import {Tabs} from '@navikt/ds-react';
import {
    SidebarTabInfo as SidebarTabType,
    SidebarTabInfo,
    useSidebarViewStore
} from '../../store/sidebar/sidebar-view-store';
import {ReactComponent as StatusIkon} from '../ikoner/tab_status.svg';
import {ReactComponent as FilterIkon} from '../ikoner/tab_filter.svg';
import {ReactComponent as VeiledergruppeIkon} from '../ikoner/tab_veiledergrupper.svg';
import {ReactComponent as MineFilterIkon} from '../ikoner/tab_mine-filter.svg';
import {FiltervalgModell} from '../../model-interfaces';
import {OrNothing} from '../../utils/types/types';
import {Tiltak} from '../../ducks/enhettiltak';
import {useDispatch} from 'react-redux';
import {oppdaterKolonneAlternativer, OversiktType} from '../../ducks/ui/listevisning';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';
import outsideClick from '../../hooks/use-outside-click';
import {useWindowWidth} from '../../hooks/use-window-width';
import {SIDEBAR_TAB_ENDRET, skjulSidebar, visSidebar} from '../../ducks/sidebar-tab';
import {FiltreringStatus, Statustall} from '../../filtrering/filtrering-status/filtrering-status';
import SidebarTab from './sidebar-tab';
import './sidebar.css';
import FiltreringFilter from '../../filtrering/filtrering-filter/filtrering-filter';
import {pagineringSetup} from '../../ducks/paginering';
import {endreFiltervalg} from '../../ducks/filtrering';
import FilteringVeiledergrupper from '../../filtrering/filtrering-veileder-grupper/filtrering-veiledergrupper';
import MineFilterTab from './mine-filter-tab';

interface EndreSideBarProps {
    dispatch: Dispatch<any>;
    currentOversiktType: OversiktType;
    requestedTab: SidebarTabInfo;
}

export function endreSideBar({dispatch, currentOversiktType, requestedTab}: EndreSideBarProps) {
    dispatch({
        name: currentOversiktType,
        selectedTab: requestedTab,
        type: SIDEBAR_TAB_ENDRET
    });
}

export interface Sidebarelement {
    type: SidebarTabType;
    icon: React.ReactNode;
    tittel: string;
}

// function finnTab(viewType: SidebarTabType, tabs: Sidebarelement[]): Sidebarelement {
//     return tabs.find(t => t.type === viewType) as Sidebarelement;
// }
//
// const sidebar: Sidebarelement[] = [
//     {
//         type: SidebarTabType.STATUS,
//         icon: <StatusIkon />,
//         tittel: 'Status'
//     },
//     {
//         type: SidebarTabType.MINE_FILTER,
//         icon: <MineFilterIkon />,
//         tittel: 'Mine filter'
//     },
//     {
//         type: SidebarTabType.VEILEDERGRUPPER,
//         icon: <VeiledergruppeIkon />,
//         tittel: 'Veiledergrupper'
//     },
//     {
//         type: SidebarTabType.FILTER,
//         icon: <FilterIkon />,
//         tittel: 'Filter'
//     }
// ];

interface SidebarProps {
    filtervalg: FiltervalgModell;
    enhettiltak: OrNothing<Tiltak>;
    oversiktType: OversiktType;
    isSidebarHidden: boolean;
    statustall: Statustall;
}

function Sidebar(props: SidebarProps) {
    const erPaMinOversikt = props.oversiktType === OversiktType.minOversikt;
    const sidebarRef = useRef<HTMLDivElement>(null);
    // const selectedTab = useSidebarViewStore(erPaMinOversikt ? OversiktType.minOversikt : OversiktType.enhetensOversikt);
    // const selectedTabData = finnTab(selectedTab.selectedTab, sidebar);
    const dispatch = useDispatch();
    const windowWidth = useWindowWidth();
    const isSidebarHidden = useSidebarViewStore(props.oversiktType).isSidebarHidden;
    const [tab, setTab] = useState<string>('');

    const endreFane = (nyFane: string) => {
        setTab(nyFane);
        toggleSidemenyvisning();
    };

    // function handleOnTabClicked(e, tab: Sidebarelement, toggleSidebar: boolean = true) {
    //     endreSideBar({
    //         dispatch: dispatch,
    //         requestedTab: tab.type,
    //         currentOversiktType: erPaMinOversikt ? OversiktType.minOversikt : OversiktType.enhetensOversikt
    //     });
    //
    //     if (toggleSidebar) {
    //         if (isSidebarHidden) {
    //             dispatch(visSidebar(props.oversiktType));
    //         } else if (tab.type === selectedTab.selectedTab) {
    //             dispatch(skjulSidebar(props.oversiktType));
    //         }
    //     }
    //
    //     logEvent('portefolje.metrikker.sidebar-tab', {
    //         tab: tab.type,
    //         sideNavn: finnSideNavn(),
    //         isSidebarHidden: isSidebarHidden
    //     });
    // }

    const loggNavigasjon = (tab: SidebarTabType) => {
        logEvent('portefolje.metrikker.sidebar-tab', {
            tab: tab,
            sideNavn: finnSideNavn(),
            isSidebarHidden: isSidebarHidden
        });
    };

    const toggleSidemenyvisning = () => {
        const sideEndret = false; // TODO fikse logikk her?

        if (isSidebarHidden) {
            dispatch(visSidebar(props.oversiktType));
        } else if (sideEndret) {
            dispatch(skjulSidebar(props.oversiktType));
        }

        loggNavigasjon(tab as SidebarTabType);
    };

    // const tabFocus = () => {
    //     if (selectedTabData.type === 'STATUS') return 0;
    //     else if (selectedTabData.type === 'MINE_FILTER') return 1;
    //     else if (erPaMinOversikt && selectedTabData.type === 'FILTER') return 2;
    //     else if (!erPaMinOversikt && selectedTabData.type === 'VEILEDERGRUPPER') return 2;
    //     else if (!erPaMinOversikt && selectedTabData.type === 'FILTER') return 3;
    //     return 0;
    // };

    // let tabFoc = tabFocus();

    // const keyCode = e => e.which || e.keyCode;

    // function handleKeyUp(e, tab) {
    //     const sidebarTabs: NodeListOf<HTMLDivElement> = document.querySelectorAll('button.sidebar__tab');
    //     e.preventDefault();
    //
    //     if (keyCode(e) === keyCodes.space) {
    //         handleOnTabClicked(e, tab);
    //     } else if (keyCode(e) === keyCodes.right || keyCode(e) === keyCodes.left) {
    //         sidebarTabs[tabFoc].setAttribute('tabindex', '-1');
    //         sidebarTabs[tabFoc].setAttribute('className', 'sidebar__tab');
    //         sidebarTabs[tabFoc].setAttribute('aria-selected', 'false');
    //         if (keyCode(e) === keyCodes.right) {
    //             tabFoc++;
    //             // Hvis vi er i enden av tabpanelet, gå til starten
    //             if (tabFoc >= TabsHjemmelaget().length) {
    //                 tabFoc = 0;
    //             }
    //         } else if (keyCode(e) === keyCodes.left) {
    //             tabFoc--;
    //             // Hvis vi er i starten av tabpanelet, gå til enden
    //             if (tabFoc < 0) {
    //                 tabFoc = TabsHjemmelaget().length - 1;
    //             }
    //         }
    //         sidebarTabs[tabFoc].setAttribute('tabindex', '0');
    //         sidebarTabs[tabFoc].setAttribute('className', 'sidebar__tab sidebar__tab-valgt');
    //         sidebarTabs[tabFoc].setAttribute('aria-selected', 'true');
    //         sidebarTabs[tabFoc].focus();
    //
    //         if (erPaMinOversikt) {
    //             handleOnTabClicked(
    //                 e,
    //                 sidebar.filter(tab => tab.type !== SidebarTabType.VEILEDERGRUPPER)[tabFoc],
    //                 false
    //             );
    //         } else {
    //             handleOnTabClicked(e, sidebar[tabFoc], false);
    //         }
    //     }
    // }

    // function handleMouseClick(e, tab: Sidebarelement) {
    //     e.preventDefault();
    //     handleOnTabClicked(e, tab);
    // }

    // const mapTabTilView = (tab: Sidebarelement, isSelected: boolean, key: number) => {
    //     return (
    //         <button
    //             key={key}
    //             className={classNames('sidebar__tab', {
    //                 'sidebar__tab-valgt': isSelected
    //             })}
    //             onClick={e => handleMouseClick(e, tab)}
    //             role="tab"
    //             aria-selected={!isSidebarHidden && isSelected}
    //             aria-controls={kebabCase(`${tab.type}_tab`)}
    //             id={kebabCase(`${tab.type}_tab`)}
    //             tabIndex={(!isSelected && -1) || 0}
    //             onKeyUp={e => handleKeyUp(e, tab)}
    //             data-testid={`sidebar-tab_${tab.type}`}
    //             aria-label={tab.tittel}
    //         >
    //             <div className="sidebar__tab-ikon">{tab.icon}</div>
    //         </button>
    //     );
    // };

    outsideClick(sidebarRef, () => {
        if (windowWidth < 1200 && !props.isSidebarHidden && document.body.className !== 'navds-modal__document-body') {
            logEvent('portefolje.metrikker.klikk-utenfor', {
                sideNavn: finnSideNavn()
            });
            dispatch(skjulSidebar(props.oversiktType));
        }
    });

    const doEndreFiltervalg = (filterId: string, filterVerdi: React.ReactNode) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi, props.oversiktType));
        oppdaterKolonneAlternativer(dispatch, {...props.filtervalg, [filterId]: filterVerdi}, props.oversiktType);
    };

    // const TabsHjemmelaget = () => {
    //     const visVeiledergrupper = tab => tab.type === SidebarTabType.VEILEDERGRUPPER;
    //
    //     if (erPaMinOversikt) {
    //         return sidebar
    //             .filter(tab => !visVeiledergrupper(tab))
    //             .map((tab, key) => mapTabTilView(tab, tab.type === selectedTabData.type, key));
    //     }
    //     return sidebar.map((tab, key) => mapTabTilView(tab, tab.type === selectedTabData.type, key));
    // };

    return (
        <div
            ref={sidebarRef}
            aria-label={`Sidenavigasjon er nå ${props.isSidebarHidden ? 'lukket' : 'åpen'}`}
            aria-live="polite"
            className={classNames('sidebar', props.isSidebarHidden && 'sidebar__hidden', 'tabs')}
        >
            {/*
            <div
                className="sidebar__tab-container"
                role="tablist"
                aria-label="Faner for filtrering. Du kan bruke piltastene for å navigere mellom de ulike fanene."
                aria-labelledby={kebabCase(`${selectedTabData.type}_tab`)}
            >
                {TabsHjemmelaget()}
            </div>
            */}
            <Tabs value={tab} onChange={nyFane => endreFane(nyFane)} iconPosition="top">
                <Tabs.List className="filterfaneliste">
                    <Tabs.Tab value={SidebarTabType.STATUS} label="Status" icon={<StatusIkon />} />
                    <Tabs.Tab value={SidebarTabType.MINE_FILTER} label="Mine filter" icon={<MineFilterIkon />} />
                    {!erPaMinOversikt && (
                        <Tabs.Tab
                            value={SidebarTabType.VEILEDERGRUPPER}
                            label="Veiledergrupper"
                            icon={<VeiledergruppeIkon />}
                        />
                    )}
                    <Tabs.Tab value={SidebarTabType.FILTER} label="Filter" icon={<FilterIkon />} />
                </Tabs.List>

                {!isSidebarHidden && (
                    <>
                        <Tabs.Panel value={SidebarTabType.STATUS}>
                            <SidebarTab
                                tittel="Status"
                                handleLukk={() => dispatch(skjulSidebar(props.oversiktType))}
                                tab={SidebarTabType.STATUS}
                            >
                                <FiltreringStatus
                                    oversiktType={props.oversiktType}
                                    filtervalg={props.filtervalg}
                                    statustall={props.statustall}
                                />
                            </SidebarTab>
                        </Tabs.Panel>
                        <Tabs.Panel value={SidebarTabType.MINE_FILTER}>
                            <SidebarTab
                                tittel="Filter"
                                handleLukk={() => dispatch(skjulSidebar(props.oversiktType))}
                                tab={SidebarTabType.MINE_FILTER}
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
                            <Tabs.Panel value={SidebarTabType.VEILEDERGRUPPER}>
                                <SidebarTab
                                    tittel="Veiledergrupper"
                                    handleLukk={() => dispatch(skjulSidebar(props.oversiktType))}
                                    tab={SidebarTabType.VEILEDERGRUPPER}
                                >
                                    <FilteringVeiledergrupper oversiktType={props.oversiktType} />
                                </SidebarTab>
                            </Tabs.Panel>
                        )}
                        <Tabs.Panel value={SidebarTabType.FILTER}>
                            <MineFilterTab oversiktType={props.oversiktType} enhettiltak={props.enhettiltak} />
                        </Tabs.Panel>
                    </>
                )}
            </Tabs>

            {/*
                null && !isSidebarHidden && (
                    <div
                        className="sidebar__content-container"
                        role="tabpanel"
                        aria-labelledby={kebabCase(`${selectedTabData.type}_tab`)}
                        id={selectedTabData.type}
                        data-testid="sidebar_content-container"
                        tabIndex={0}
                    >
                        <Sidevelger
                            selectedTabData={selectedTabData}
                            oversiktType={props.oversiktType}
                            filtervalg={props.filtervalg}
                            enhettiltak={props.enhettiltak}
                            statustall={props.statustall}
                        />
                    </div>
                )
            */}
        </div>
    );
}

export default Sidebar;
