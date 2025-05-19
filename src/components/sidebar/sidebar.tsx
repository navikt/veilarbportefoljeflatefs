import {Dispatch, ReactNode, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {Tabs} from '@navikt/ds-react';
import {FunnelIcon, PersonGroupIcon, StarIcon, VitalsIcon} from '@navikt/aksel-icons';
import {SidebarTabs, useSidebarViewStore} from '../../store/sidebar/sidebar-view-store';
import {FiltervalgModell} from '../../typer/filtervalg-modell';
import {OrNothing} from '../../utils/types/types';
import {Tiltak} from '../../ducks/enhettiltak';
import {OversiktType} from '../../ducks/ui/listevisning';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';
import {useOutsideClick} from '../../hooks/use-outside-click';
import {useWindowWidth} from '../../hooks/use-window-width';
import {SIDEBAR_TAB_ENDRET, skjulSidebar, visSidebar} from '../../ducks/sidebar-tab';
import {StatustallForStatusfane} from '../../filtrering/filtrering-status/filtrering-status';
import {Fanevelger} from './fanevelger';
import {Tab} from './Tab';
import './sidebar.css';

interface EndreSideBarProps {
    dispatch: Dispatch<any>;
    currentOversiktType: OversiktType;
    requestedTab: SidebarTabs | '';
}

export function endreValgtSidebarTab({dispatch, currentOversiktType, requestedTab}: EndreSideBarProps) {
    dispatch({
        name: currentOversiktType,
        selectedTab: requestedTab,
        type: SIDEBAR_TAB_ENDRET
    });
}

export interface Fanedetaljer {
    icon: ReactNode;
    tittel: string;
}

const faner: {[key in SidebarTabs]: Fanedetaljer} = {
    [SidebarTabs.STATUS]: {
        icon: <VitalsIcon aria-hidden={true} fontSize="1.5rem" />,
        tittel: 'Status'
    },
    [SidebarTabs.MINE_FILTER]: {
        icon: <StarIcon aria-hidden={true} fontSize="1.5rem" />,
        tittel: 'Mine filter'
    },
    [SidebarTabs.VEILEDERGRUPPER]: {
        icon: <PersonGroupIcon aria-hidden={true} fontSize="1.5rem" />,
        tittel: 'Veiledergrupper'
    },
    [SidebarTabs.FILTER]: {
        icon: <FunnelIcon aria-hidden={true} fontSize="1.5rem" />,
        tittel: 'Filter'
    }
};

interface SidebarProps {
    filtervalg: FiltervalgModell;
    enhettiltak: OrNothing<Tiltak>;
    oversiktType: OversiktType;
    statustall: StatustallForStatusfane;
}

export const Sidebar = ({filtervalg, enhettiltak, oversiktType, statustall}: SidebarProps) => {
    const dispatch = useDispatch();
    const erPaMinOversikt = oversiktType === OversiktType.minOversikt;
    const windowWidth = useWindowWidth();
    const sidebarRef = useRef<HTMLDivElement>(null);
    const sidebarState = useSidebarViewStore(
        erPaMinOversikt ? OversiktType.minOversikt : OversiktType.enhetensOversikt
    );

    const taBortVeiledergrupperPaMinOversikt = (fane: SidebarTabs) =>
        !(erPaMinOversikt && fane === SidebarTabs.VEILEDERGRUPPER);
    const fanerForSide: SidebarTabs[] = [
        SidebarTabs.STATUS,
        SidebarTabs.MINE_FILTER,
        SidebarTabs.VEILEDERGRUPPER,
        SidebarTabs.FILTER
    ].filter(taBortVeiledergrupperPaMinOversikt);

    const isSidebarHidden = useSidebarViewStore(oversiktType).isSidebarHidden;

    const lukkSidemeny = () => {
        dispatch(skjulSidebar(oversiktType));
        endreValgtSidebarTab({
            dispatch: dispatch,
            currentOversiktType: oversiktType,
            requestedTab: ''
        });
    };

    useOutsideClick(sidebarRef, () => {
        if (windowWidth < 1200 && !isSidebarHidden && document.body.className !== 'navds-modal__document-body') {
            logEvent('portefolje.metrikker.klikk-utenfor', {
                sideNavn: finnSideNavn()
            });
            lukkSidemeny();
        }
    });

    const onTabsChange = (valgtFane: string) => {
        const fane: SidebarTabs = SidebarTabs[valgtFane];

        endreValgtSidebarTab({
            dispatch: dispatch,
            currentOversiktType: oversiktType,
            requestedTab: fane
        });

        if (isSidebarHidden) {
            dispatch(visSidebar(oversiktType));
        }

        logEvent('portefolje.metrikker.sidebar-tab', {
            tab: valgtFane,
            sideNavn: finnSideNavn(),
            isSidebarHidden: isSidebarHidden
        });
    };

    return (
        <div
            ref={sidebarRef}
            aria-label={`Sidenavigasjon er nå ${isSidebarHidden ? 'lukket' : 'åpen'}`}
            aria-live="polite"
            className="sidebar"
        >
            {
                <Tabs value={sidebarState.selectedTab} onChange={onTabsChange} iconPosition="top" size="small">
                    <Tabs.List className="sidebar__tab-container">
                        {fanerForSide.map(fane => (
                            <Tab fane={fane} fanedetaljer={faner[fane]} key={fane} />
                        ))}
                    </Tabs.List>
                    {!isSidebarHidden && (
                        <div className="sidebar__content-container" data-testid="sidebar_content-container">
                            {fanerForSide.map(fane => (
                                <Tabs.Panel value={fane} data-testid={`sidebar__tabinnhold-${fane}`} key={fane}>
                                    <Fanevelger
                                        valgtFane={fane}
                                        fanetittel={faner[fane].tittel}
                                        oversiktType={oversiktType}
                                        filtervalg={filtervalg}
                                        enhettiltak={enhettiltak}
                                        statustall={statustall}
                                        lukkSidemeny={lukkSidemeny}
                                    />
                                </Tabs.Panel>
                            ))}
                        </div>
                    )}
                </Tabs>
            }
        </div>
    );
};
