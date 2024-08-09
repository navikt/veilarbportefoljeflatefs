import React, {Dispatch, useRef} from 'react';
import {useDispatch} from 'react-redux';
import classNames from 'classnames';
import {SidebarTabs, useSidebarViewStore} from '../../store/sidebar/sidebar-view-store';
import {ReactComponent as StatusIkon} from '../ikoner/tab_status.svg';
import {ReactComponent as FilterIkon} from '../ikoner/tab_filter.svg';
import {ReactComponent as VeiledergruppeIkon} from '../ikoner/tab_veiledergrupper.svg';
import {ReactComponent as MineFilterIkon} from '../ikoner/tab_mine-filter.svg';
import {FiltervalgModell} from '../../model-interfaces';
import {OrNothing} from '../../utils/types/types';
import {Tiltak} from '../../ducks/enhettiltak';
import {OversiktType} from '../../ducks/ui/listevisning';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';
import outsideClick from '../../hooks/use-outside-click';
import {useWindowWidth} from '../../hooks/use-window-width';
import {SIDEBAR_TAB_ENDRET, skjulSidebar, visSidebar} from '../../ducks/sidebar-tab';
import {kebabCase, keyCodes} from '../../utils/utils';
import Sidevelger from './sidevelger';
import {Statustall} from '../../filtrering/filtrering-status/filtrering-status';
import './sidebar.css';

export interface Sidebarelement {
    type: SidebarTabs;
    icon: React.ReactNode;
    tittel: string;
}

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

const sidebarTabElements: Sidebarelement[] = [
    {
        type: SidebarTabs.STATUS,
        icon: <StatusIkon />,
        tittel: 'Status'
    },
    {
        type: SidebarTabs.MINE_FILTER,
        icon: <MineFilterIkon />,
        tittel: 'Mine filter'
    },
    {
        type: SidebarTabs.VEILEDERGRUPPER,
        icon: <VeiledergruppeIkon />,
        tittel: 'Veiledergrupper'
    },
    {
        type: SidebarTabs.FILTER,
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
    const dispatch = useDispatch();
    const erPaMinOversikt = props.oversiktType === OversiktType.minOversikt;
    const windowWidth = useWindowWidth();
    const sidebarRef = useRef<HTMLDivElement>(null);
    const sidebarState = useSidebarViewStore(
        erPaMinOversikt ? OversiktType.minOversikt : OversiktType.enhetensOversikt
    );

    const isSidebarHidden = useSidebarViewStore(props.oversiktType).isSidebarHidden;
    function finnTabElement(viewType: SidebarTabs, tabs: Sidebarelement[]): Sidebarelement {
        return tabs.find(t => t.type === viewType) as Sidebarelement;
    }

    const selectedTabElement = finnTabElement(sidebarState.selectedTab, sidebarTabElements);

    const tabFocus = () => {
        if (sidebarState.selectedTab === 'STATUS') return 0;
        else if (sidebarState.selectedTab === 'MINE_FILTER') return 1;
        else if (erPaMinOversikt && sidebarState.selectedTab === 'FILTER') return 2;
        else if (!erPaMinOversikt && sidebarState.selectedTab === 'VEILEDERGRUPPER') return 2;
        else if (!erPaMinOversikt && sidebarState.selectedTab === 'FILTER') return 3;
        return 0;
    };
    let tabFoc = tabFocus();

    function handleOnTabClicked(tab: Sidebarelement) {
        endreValgtSidebarTab({
            dispatch: dispatch,
            requestedTab: tab.type,
            currentOversiktType: erPaMinOversikt ? OversiktType.minOversikt : OversiktType.enhetensOversikt
        });

        if (isSidebarHidden) {
            dispatch(visSidebar(props.oversiktType));
        }

        logEvent('portefolje.metrikker.sidebar-tab', {
            tab: tab.type,
            sideNavn: finnSideNavn(),
            isSidebarHidden: isSidebarHidden
        });
    }

    function handleMouseClick(e, tab: Sidebarelement) {
        e.preventDefault();
        handleOnTabClicked(tab);
    }

    function handleKeyUp(e, tab) {
        const keyCode = e => e.which || e.keyCode;
        const sidebarTabsIDom: NodeListOf<HTMLDivElement> = document.querySelectorAll('button.sidebar__tab');
        e.preventDefault();

        if (keyCode(e) === keyCodes.space) {
            handleOnTabClicked(tab);
        } else if (keyCode(e) === keyCodes.right || keyCode(e) === keyCodes.left) {
            sidebarTabsIDom[tabFoc].setAttribute('tabindex', '-1');
            sidebarTabsIDom[tabFoc].setAttribute('className', 'sidebar__tab');
            sidebarTabsIDom[tabFoc].setAttribute('aria-selected', 'false');
            if (keyCode(e) === keyCodes.right) {
                tabFoc++;
                // Hvis vi er i enden av tabpanelet, gå til starten
                if (tabFoc >= TabsForOversiktstype().length) {
                    tabFoc = 0;
                }
            } else if (keyCode(e) === keyCodes.left) {
                tabFoc--;
                // Hvis vi er i starten av tabpanelet, gå til enden
                if (tabFoc < 0) {
                    tabFoc = TabsForOversiktstype().length - 1;
                }
            }
            sidebarTabsIDom[tabFoc].setAttribute('tabindex', '0');
            sidebarTabsIDom[tabFoc].setAttribute('className', 'sidebar__tab sidebar__tab-valgt');
            sidebarTabsIDom[tabFoc].setAttribute('aria-selected', 'true');
            sidebarTabsIDom[tabFoc].focus();

            if (erPaMinOversikt) {
                handleOnTabClicked(sidebarTabElements.filter(tab => tab.type !== SidebarTabs.VEILEDERGRUPPER)[tabFoc]);
            } else {
                handleOnTabClicked(sidebarTabElements[tabFoc]);
            }
        }
    }

    const knappForTab = (tab: Sidebarelement, isSelected: boolean, key: number) => {
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

    const TabsForOversiktstype = () => {
        const visVeiledergrupper = tab => tab.type === SidebarTabs.VEILEDERGRUPPER;
        if (erPaMinOversikt) {
            return sidebarTabElements
                .filter(tab => !visVeiledergrupper(tab))
                .map((tab, key) => knappForTab(tab, tab.type === sidebarState.selectedTab, key));
        }
        return sidebarTabElements.map((tab, key) => knappForTab(tab, tab.type === sidebarState.selectedTab, key));
    };

    outsideClick(sidebarRef, () => {
        if (windowWidth < 1200 && !props.isSidebarHidden && document.body.className !== 'navds-modal__document-body') {
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
                aria-labelledby={kebabCase(`${sidebarState.selectedTab}_tab`)}
            >
                {TabsForOversiktstype()}
            </div>
            {!isSidebarHidden && (
                <div
                    className="sidebar__content-container"
                    role="tabpanel"
                    aria-labelledby={kebabCase(`${sidebarState.selectedTab}_tab`)}
                    id={sidebarState.selectedTab}
                    data-testid="sidebar_content-container"
                    tabIndex={0}
                >
                    <Sidevelger
                        selectedTabElement={selectedTabElement}
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
