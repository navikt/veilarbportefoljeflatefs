import React, {Dispatch, useRef} from 'react';
import {
    SidebarTabInfo as SidebarTabType,
    SidebarTabInfo,
    useSidebarViewStore
} from '../../store/sidebar/sidebar-view-store';
import classNames from 'classnames';
import './sidebar.css';
import {ReactComponent as StatusIkon} from '../ikoner/tab_status.svg';
import {ReactComponent as FilterIkon} from '../ikoner/tab_filter.svg';
import {ReactComponent as VeiledergruppeIkon} from '../ikoner/tab_veiledergrupper.svg';
import {ReactComponent as MineFilterIkon} from '../ikoner/tab_mine-filter.svg';
import {FiltervalgModell} from '../../model-interfaces';
import {OrNothing} from '../../utils/types/types';
import {Tiltak} from '../../ducks/enhettiltak';
import {useDispatch} from 'react-redux';
import {OversiktType} from '../../ducks/ui/listevisning';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';
import outsideClick from '../../hooks/use-outside-click';
import {useWindowWidth} from '../../hooks/use-window-width';
import {SIDEBAR_TAB_ENDRET, skjulSidebar, visSidebar} from '../../ducks/sidebar-tab';
import {kebabCase, keyCodes} from '../../utils/utils';
import Sidevelger from './sidevelger';
import {Statustall} from '../../filtrering/filtrering-status/filtrering-status';

export interface Sidebarelement {
    type: SidebarTabType;
    icon: React.ReactNode;
    tittel: string;
}

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

const sidebar: Sidebarelement[] = [
    {
        type: SidebarTabType.STATUS,
        icon: <StatusIkon />,
        tittel: 'Status'
    },
    {
        type: SidebarTabType.MINE_FILTER,
        icon: <MineFilterIkon />,
        tittel: 'Mine filter'
    },
    {
        type: SidebarTabType.VEILEDERGRUPPER,
        icon: <VeiledergruppeIkon />,
        tittel: 'Veiledergrupper'
    },
    {
        type: SidebarTabType.FILTER,
        icon: <FilterIkon />,
        tittel: 'Filter'
    }
];

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
    const selectedTab = useSidebarViewStore(erPaMinOversikt ? OversiktType.minOversikt : OversiktType.enhetensOversikt);
    const selectedTabData = finnTab(selectedTab.selectedTab, sidebar);
    const dispatch = useDispatch();
    const windowWidth = useWindowWidth();
    const isSidebarHidden = useSidebarViewStore(props.oversiktType).isSidebarHidden;

    const tabFocus = () => {
        if (erPaMinOversikt) {
            if (selectedTabData.type === 'STATUS') return 0;
            else if (selectedTabData.type === 'MINE_FILTER') return 1;
            else if (selectedTabData.type === 'FILTER') return 2;
        } else {
            if (selectedTabData.type === 'STATUS') return 0;
            else if (selectedTabData.type === 'MINE_FILTER') return 1;
            else if (selectedTabData.type === 'VEILEDERGRUPPER') return 2;
            else if (selectedTabData.type === 'FILTER') return 3;
        }
        return 0;
    };

    let tabFoc = tabFocus();

    const keyCode = e => e.which || e.keyCode;

    function finnTab(viewType: SidebarTabType, tabs: Sidebarelement[]): Sidebarelement {
        return tabs.find(t => t.type === viewType) as Sidebarelement;
    }

    const mapTabTilView = (tab: Sidebarelement, isSelected: boolean, key: number) => {
        return (
            <button
                key={key}
                className={classNames('sidebar__tab', {
                    'sidebar__tab-valgt': isSelected
                })}
                onClick={e => handleMouseClick(e, tab)}
                role="tab"
                aria-selected={!isSidebarHidden && isSelected}
                aria-controls={kebabCase(`${tab.type}_tab`)}
                id={kebabCase(`${tab.type}_tab`)}
                tabIndex={(!isSelected && -1) || 0}
                onKeyUp={e => handleKeyUp(e, tab)}
                data-testid={`sidebar-tab_${tab.type}`}
                aria-label={tab.tittel}
            >
                <div className="sidebar__tab-ikon">{tab.icon}</div>
            </button>
        );
    };

    function handleKeyUp(e, tab) {
        const sidebarTabs: NodeListOf<HTMLDivElement> = document.querySelectorAll('button.sidebar__tab');
        e.preventDefault();

        if (keyCode(e) === keyCodes.space) {
            handleOnTabClicked(e, tab);
        } else if (keyCode(e) === keyCodes.right || keyCode(e) === keyCodes.left) {
            sidebarTabs[tabFoc].setAttribute('tabindex', '-1');
            sidebarTabs[tabFoc].setAttribute('className', 'sidebar__tab');
            sidebarTabs[tabFoc].setAttribute('aria-selected', 'false');
            if (keyCode(e) === keyCodes.right) {
                tabFoc++;
                // Hvis vi er i enden av tabpanelet, gå til starten
                if (tabFoc >= Tabs().length) {
                    tabFoc = 0;
                }
            } else if (keyCode(e) === keyCodes.left) {
                tabFoc--;
                // Hvis vi er i starten av tabpanelet, gå til enden
                if (tabFoc < 0) {
                    tabFoc = Tabs().length - 1;
                }
            }
            sidebarTabs[tabFoc].setAttribute('tabindex', '0');
            sidebarTabs[tabFoc].setAttribute('className', 'sidebar__tab sidebar__tab-valgt');
            sidebarTabs[tabFoc].setAttribute('aria-selected', 'true');
            sidebarTabs[tabFoc].focus();

            if (erPaMinOversikt) {
                handleOnTabClicked(
                    e,
                    sidebar.filter(tab => tab.type !== SidebarTabType.VEILEDERGRUPPER)[tabFoc],
                    false
                );
            } else {
                handleOnTabClicked(e, sidebar[tabFoc], false);
            }
        }
    }

    function handleMouseClick(e, tab: Sidebarelement) {
        e.preventDefault();
        handleOnTabClicked(e, tab);
    }

    function handleOnTabClicked(e, tab: Sidebarelement, toggleSidebar: boolean = true) {
        endreSideBar({
            dispatch: dispatch,
            requestedTab: tab.type,
            currentOversiktType: erPaMinOversikt ? OversiktType.minOversikt : OversiktType.enhetensOversikt
        });

        if (toggleSidebar) {
            if (isSidebarHidden) {
                dispatch(visSidebar(props.oversiktType));
            } else if (tab.type === selectedTab.selectedTab) {
                dispatch(skjulSidebar(props.oversiktType));
            }
        }

        logEvent('portefolje.metrikker.sidebar-tab', {
            tab: tab.type,
            sideNavn: finnSideNavn(),
            isSidebarHidden: isSidebarHidden
        });
    }

    const Tabs = () => {
        const visVeiledergrupper = tab => tab.type === SidebarTabType.VEILEDERGRUPPER;
        if (erPaMinOversikt) {
            return sidebar
                .filter(tab => !visVeiledergrupper(tab))
                .map((tab, key) => mapTabTilView(tab, tab.type === selectedTabData.type, key));
        }
        return sidebar.map((tab, key) => mapTabTilView(tab, tab.type === selectedTabData.type, key));
    };

    outsideClick(sidebarRef, () => {
        if (windowWidth < 1200 && !props.isSidebarHidden && document.body.className !== 'ReactModal__Body--open') {
            logEvent('portefolje.metrikker.klikk-utenfor', {
                sideNavn: finnSideNavn()
            });
            dispatch(skjulSidebar(props.oversiktType));
        }
    });

    return (
        <div
            ref={sidebarRef}
            aria-label={`Sidenavigasjon er nå ${props.isSidebarHidden ? 'lukket' : 'åpen'}`}
            aria-live="polite"
            className={classNames('sidebar', props.isSidebarHidden && 'sidebar__hidden', 'tabs')}
        >
            <div
                className="sidebar__tab-container"
                role="tablist"
                aria-label="Faner for filtrering. Du kan bruke piltastene for å navigere mellom de ulike fanene."
                aria-labelledby={kebabCase(`${selectedTabData.type}_tab`)}
            >
                {Tabs()}
            </div>
            {!isSidebarHidden && (
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
            )}
        </div>
    );
}

export default Sidebar;
