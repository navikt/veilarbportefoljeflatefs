import React, {Dispatch, useRef} from 'react';
import {
    SidebarTabInfo as SidebarTabType,
    SidebarTabInfo,
    useSidebarViewStore
} from '../../store/sidebar/sidebar-view-store';
import classNames from 'classnames';
import './sidebar.less';
import {ReactComponent as StatusIkon} from '../ikoner/tab_status.svg';
import {ReactComponent as FilterIkon} from '../ikoner/tab_filter.svg';
import {ReactComponent as VeiledergruppeIkon} from '../ikoner/tab_veiledergrupper.svg';
import {ReactComponent as MineFilterIkon} from '../ikoner/tab_mine-filter.svg';
import {FiltervalgModell} from '../../model-interfaces';
import {OrNothing} from '../../utils/types/types';
import {Tiltak} from '../../ducks/enhettiltak';
import {useDispatch} from 'react-redux';
import {ListevisningType} from '../../ducks/ui/listevisning';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';
import outsideClick from '../../hooks/use-outside-click';
import {useWindowWidth} from '../../hooks/use-window-width';
import {SIDEBAR_TAB_ENDRET, skjulSidebar, visSidebar} from '../../ducks/sidebar-tab';
import {keyCodes} from '../../utils/utils';
import Sidevelger from './sidevelger';

interface Sidebar {
    type: SidebarTabType;
    icon: React.ReactNode;
    tittel: string;
}

interface EndreSideBarProps {
    dispatch: Dispatch<any>;
    currentListevisningsType: ListevisningType | string;
    requestedTab: SidebarTabInfo;
}

export function endreSideBar({dispatch, currentListevisningsType, requestedTab}: EndreSideBarProps) {
    dispatch({
        name: currentListevisningsType,
        selectedTab: requestedTab,
        type: SIDEBAR_TAB_ENDRET
    });
}

const sidebar: Sidebar[] = [
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
    filtergruppe: ListevisningType;
    isSidebarHidden: boolean;
}

function Sidebar(props: SidebarProps) {
    const erPaMinOversikt = props.filtergruppe === ListevisningType.minOversikt;
    const sidebarRef = useRef<HTMLDivElement>(null);
    const selectedTab = useSidebarViewStore(
        erPaMinOversikt ? ListevisningType.minOversikt : ListevisningType.enhetensOversikt
    );
    const selectedTabData = finnTab(selectedTab.selectedTab, sidebar);
    const dispatch = useDispatch();
    const windowWidth = useWindowWidth();
    const isSidebarHidden = useSidebarViewStore(props.filtergruppe).isSidebarHidden;

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

    function finnTab(viewType: SidebarTabType, tabs: Sidebar[]): Sidebar {
        return tabs.find(t => t.type === viewType) as Sidebar;
    }

    const mapTabTilView = (tab: Sidebar, isSelected: boolean, key: number) => {
        const ariaFaneTekst = isSidebarHidden ? 'Tab lukket.' : 'Tab åpen.';
        return (
            <button
                key={key}
                className={classNames('sidebar__tab', {
                    'sidebar__tab-valgt': isSelected
                })}
                onClick={e => handleMouseClick(e, tab)}
                role="tab"
                aria-selected={!isSidebarHidden && isSelected}
                aria-controls={tab.type}
                id={tab.type}
                tabIndex={(!isSelected && -1) || 0}
                onKeyUp={e => handleKeyUp(e, tab)}
                title={ariaFaneTekst}
                data-testid={`sidebar-tab_${tab.type}`}
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
        }
    }

    function handleMouseClick(e, tab: Sidebar) {
        e.preventDefault();
        handleOnTabClicked(e, tab);
    }

    function handleOnTabClicked(e, tab: Sidebar) {
        endreSideBar({
            dispatch: dispatch,
            requestedTab: tab.type,
            currentListevisningsType: erPaMinOversikt ? ListevisningType.minOversikt : ListevisningType.enhetensOversikt
        });

        if (isSidebarHidden) {
            dispatch(visSidebar(props.filtergruppe));
        } else if (tab.type === selectedTab.selectedTab) {
            dispatch(skjulSidebar(props.filtergruppe));
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
        if (windowWidth < 1200 && !props.isSidebarHidden) {
            logEvent('portefolje.metrikker.klikk-utenfor', {
                sideNavn: finnSideNavn()
            });
            dispatch(skjulSidebar(props.filtergruppe));
        }
    });

    return (
        <div ref={sidebarRef} className={classNames('sidebar', props.isSidebarHidden && 'sidebar__hidden', 'tabs')}>
            <div
                className="sidebar__tab-container"
                role="tablist"
                aria-label="Faner for filtrering"
                aria-labelledby={selectedTabData.type}
            >
                {Tabs()}
            </div>
            <div
                className="sidebar__content-container"
                role="tabpanel"
                hidden={isSidebarHidden}
                aria-labelledby={selectedTabData.type}
                id={selectedTabData.type}
                tabIndex={0}
                data-testid="sidebar_content-container"
            >
                <Sidevelger
                    selectedTabData={selectedTabData}
                    filtergruppe={props.filtergruppe}
                    filtervalg={props.filtervalg}
                    enhettiltak={props.enhettiltak}
                />
            </div>
        </div>
    );
}

export default Sidebar;
