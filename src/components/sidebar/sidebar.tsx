import React, {useEffect, useRef} from 'react';
import {
    SidebarTabInfo,
    SidebarTabInfo as SidebarTabType,
    useSidebarViewStore,
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
import SidebarTab from './sidebar-tab';
import {useDispatch, useSelector} from 'react-redux';
import {pagineringSetup} from '../../ducks/paginering';
import {endreFiltervalg} from '../../ducks/filtrering';
import NyFiltreringMineFilter from "../../filtrering/filtrering-mine-filter/ny_filtrering-mine-filter";
import {AppState} from "../../reducer";
import {NyFiltreringStatus} from "../../filtrering/filtrering-status/ny_filtrering-status";
import NyFiltreringFilter from "../../filtrering/ny_filtrering-filter";
import NyFilteringVeilederGrupper from "../../filtrering/filtrering-veileder-grupper/ny_filtrering-veileder-grupper";
import {useFeatureSelector} from "../../hooks/redux/use-feature-selector";
import {MINE_FILTER} from "../../konstanter";
import {ListevisningType} from "../../ducks/ui/listevisning";
import {HandlingsType} from "../../ducks/mine-filter";
import {STATUS} from "../../ducks/utils";
import {logEvent} from "../../utils/frontend-logger";
import {finnSideNavn} from "../../middleware/metrics-middleware";

interface Sidebar {
    type: SidebarTabType;
    icon: React.ReactNode;
    tittel: string;
}

const sidebar: Sidebar[] = [
    {
        type: SidebarTabType.STATUS,
        icon: <StatusIkon/>,
        tittel: 'Status',
    }, {
        type: SidebarTabType.MINE_FILTER,
        icon: <MineFilterIkon/>,
        tittel: 'Mine filter',
    }, {
        type: SidebarTabType.VEILEDERGRUPPER,
        icon: <VeiledergruppeIkon/>,
        tittel: 'Veiledergrupper'
    }, {
        type: SidebarTabType.FILTER,
        icon: <FilterIkon/>,
        tittel: 'Filter'
    }
];

function finnTab(viewType: SidebarTabType, tabs: Sidebar[]): Sidebar | undefined {
    return tabs.find(t => t.type === viewType);
}

function mapTabTilView(tab: Sidebar, isSelected: boolean, onTabClicked: (tab: Sidebar) => void) {
    const classes = classNames('sidebar__tab', {'sidebar__tab-valgt': isSelected});
    return (
        <button className={classes} onClick={() => onTabClicked(tab)} key={tab.type}>
            <div className="sidebar__tab-ikon">{tab.icon}</div>
        </button>
    );
}

interface SidebarProps {
    filtervalg: FiltervalgModell;
    enhettiltak: OrNothing<Tiltak>;
    filtergruppe: string;
    isSidebarHidden: boolean;
    handleOnTabClicked: (tab: Sidebar, selectedTab: SidebarTabInfo) => void;
    lukkTab: () => void
}

function Sidebar(props: SidebarProps) {
    const erPaMinOversikt = props.filtergruppe === 'veileder';
    const erPaEnhetensOversikt = props.filtergruppe === 'enhet';
    const sidebarRef = useRef<HTMLDivElement>(null);
    const selectedTab = useSidebarViewStore(erPaMinOversikt ? ListevisningType.minOversikt : ListevisningType.enhetensOversikt)
    const selectedTabData = finnTab(selectedTab.selectedTab, sidebar);
    const mineFilterState = useSelector((state: AppState) => state.mineFilter);
    const sidebarTabEndret = 'sidebarTabEndret';
    const dispatch = useDispatch();
    const erMineFilterFeatureTogglePa = useFeatureSelector()(MINE_FILTER);
    const mineFilter = mineFilterState.data;
    const sortertMineFilter = mineFilter.sort((a, b) => a.filterNavn.toLowerCase()
        .localeCompare(b.filterNavn.toLowerCase(), undefined, {numeric: true}));

    useEffect(() => {
        const nyttLagretFilter = mineFilterState.handlingType === HandlingsType.NYTT && mineFilterState.status === STATUS.OK;
        const oppdatertLagretFilter = mineFilterState.handlingType === HandlingsType.REDIGERE && mineFilterState.status === STATUS.OK;

        if (nyttLagretFilter || oppdatertLagretFilter) {
            dispatch({
                type: sidebarTabEndret,
                selectedTab: SidebarTabInfo.MINE_FILTER,
                name: erPaMinOversikt ? ListevisningType.minOversikt : ListevisningType.enhetensOversikt
            })
        }
    }, [dispatch, erPaMinOversikt, mineFilterState.handlingType, mineFilterState.status])

    function handleOnTabClicked(tab: Sidebar) {
        dispatch({
            type: sidebarTabEndret,
            selectedTab: tab.type,
            name: erPaMinOversikt ? ListevisningType.minOversikt : ListevisningType.enhetensOversikt
        })
        props.handleOnTabClicked(tab, selectedTab);
        logEvent('portefolje.metrikker.sidebar-tab', {
            tab: tab.type,
            sideNavn: finnSideNavn()
        });
    }

    const doEndreFiltervalg = (filterId: string, filterVerdi: any) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi, props.filtergruppe));
    };

    const fjernUtilgjengeligeFilter = (elem) => {
        const arbeidsliste = elem.filterValg.ferdigfilterListe.includes("MIN_ARBEIDSLISTE");
        const arbeidslisteKategori = elem.filterValg.arbeidslisteKategori.length > 0;
        const nyeBrukere = elem.filterValg.ferdigfilterListe.includes("NYE_BRUKERE_FOR_VEILEDER");

        const veiledergrupper = elem.filterValg.veiledere.length > 0;
        const ufordelteBrukere = elem.filterValg.ferdigfilterListe.includes("UFORDELTE_BRUKERE");

        return !((erPaEnhetensOversikt && (arbeidsliste || arbeidslisteKategori || nyeBrukere))
            || (erPaMinOversikt && (veiledergrupper || ufordelteBrukere)));
    }

    function sidevelger(selectedTabData) {
        if ((selectedTabData as Sidebar).tittel === 'Status') {
            return <SidebarTab tittel="Status"
                               handleClick={props.lukkTab}
                               children={<NyFiltreringStatus
                                   filtergruppe={props.filtergruppe}
                                   filtervalg={props.filtervalg}/>
                               }/>;
        } else if ((selectedTabData as Sidebar).tittel === 'Filter') {
            return <SidebarTab tittel="Filter"
                               handleClick={props.lukkTab}
                               children={<NyFiltreringFilter
                                   endreFiltervalg={doEndreFiltervalg}
                                   filtervalg={props.filtervalg}
                                   enhettiltak={props.enhettiltak}/>
                               }/>;
        } else if ((selectedTabData as Sidebar).tittel === 'Veiledergrupper') {
            return <SidebarTab tittel="Veiledergrupper"
                               handleClick={props.lukkTab}
                               children={<NyFilteringVeilederGrupper
                                   filtergruppe={props.filtergruppe}/>
                               }/>;
        } else if ((selectedTabData as Sidebar).tittel === 'Mine filter') {
            return <SidebarTab tittel="Mine filter"
                               handleClick={props.lukkTab}
                               children={
                                   <NyFiltreringMineFilter filtergruppe={props.filtergruppe}
                                                           fjernUtilgjengeligeFilter={fjernUtilgjengeligeFilter}
                                                           sortertMineFilter={sortertMineFilter}/>
                               }
                               mineFilter={sortertMineFilter}
                               fjernUtilgjengeligeFilter={fjernUtilgjengeligeFilter}
                               filtergruppe={props.filtergruppe}
            />
        }
    }

    const tabs = () => {
        const visVeiledergrupper = tab => tab.type === SidebarTabType.VEILEDERGRUPPER;
        const visMineFilter = tab => tab.type === SidebarTabType.MINE_FILTER;

        if (erPaMinOversikt) {
            if (!erMineFilterFeatureTogglePa) {
                return sidebar.filter(tab => !visVeiledergrupper(tab) && !visMineFilter(tab))
                    .map(tab => mapTabTilView(tab, tab.type === (selectedTabData as Sidebar).type, handleOnTabClicked));
            } else {
                return sidebar.filter(tab => !visVeiledergrupper(tab))
                    .map(tab => mapTabTilView(tab, tab.type === (selectedTabData as Sidebar).type, handleOnTabClicked));
            }

        } else if (erPaEnhetensOversikt) {
            if (!erMineFilterFeatureTogglePa) {
                return sidebar.filter(tab => !visMineFilter(tab))
                    .map(tab => mapTabTilView(tab, tab.type === (selectedTabData as Sidebar).type, handleOnTabClicked));
            } else {
                return sidebar.map(tab => mapTabTilView(tab, tab.type === (selectedTabData as Sidebar).type, handleOnTabClicked));
            }
        }
    };

    return (
        <div ref={sidebarRef}
             className={classNames('sidebar', props.isSidebarHidden && 'sidebar__hidden')}>
            <div className="sidebar__tab-container">
                {tabs()}
            </div>
            <div
                className='sidebar__content-container'
                hidden={props.isSidebarHidden}
            >
                {sidevelger(selectedTabData)}
            </div>
        </div>
    );
}

export default Sidebar;
