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
import {ReactComponent as MineFilterIkon} from '../ikoner/tab_lagrede-filter.svg';
import {FiltervalgModell} from '../../model-interfaces';
import {OrNothing} from '../../utils/types/types';
import {Tiltak} from '../../ducks/enhettiltak';
import {logEvent} from '../../utils/frontend-logger';
import SidebarTab from './sidebar-tab';
import {useDispatch, useSelector} from 'react-redux';
import {pagineringSetup} from '../../ducks/paginering';
import {endreFiltervalg} from '../../ducks/filtrering';
import NyFiltreringLagredeFilter from "../../filtrering/filtrering-lagrede-filter/ny_filtrering-lagrede-filter";
import {AppState} from "../../reducer";
import {NyFiltreringStatus} from "../../filtrering/filtrering-status/ny_filtrering-status";
import NyFiltreringFilter from "../../filtrering/ny_filtrering-filter";
import NyFilteringVeilederGrupper from "../../filtrering/filtrering-veileder-grupper/ny_filtrering-veileder-grupper";
import {useFeatureSelector} from "../../hooks/redux/use-feature-selector";
import {LAGREDE_FILTER} from "../../konstanter";
import {ListevisningType} from "../../ducks/ui/listevisning";
import {HandlingsType} from "../../ducks/lagret-filter";
import {STATUS} from "../../ducks/utils";

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
    const lagretFilterState = useSelector((state: AppState) => state.lagretFilter);
    const dispatch = useDispatch();
    const erLagredeFilterFeatureTogglePa = useFeatureSelector()(LAGREDE_FILTER);

    useEffect(() => {
        const nyttLagretFilter = lagretFilterState.handlingType === HandlingsType.NYTT && lagretFilterState.status === STATUS.OK;
        const oppdatertLagretFilter = lagretFilterState.handlingType === HandlingsType.REDIGERE && lagretFilterState.status === STATUS.OK;

        if (nyttLagretFilter || oppdatertLagretFilter) {
            dispatch({
                type: 'sidebarTabEndret',
                selectedTab: SidebarTabInfo.MINE_FILTER,
                name: erPaMinOversikt ? ListevisningType.minOversikt : ListevisningType.enhetensOversikt
            })
        }
    }, [dispatch, erPaMinOversikt, lagretFilterState.handlingType, lagretFilterState.status])

    function handleOnTabClicked(tab: Sidebar) {
        dispatch({
            type: 'sidebarTabEndret',
            selectedTab: tab.type,
            name: erPaMinOversikt ? ListevisningType.minOversikt : ListevisningType.enhetensOversikt
        })
        props.handleOnTabClicked(tab, selectedTab);
        logEvent('portefolje.metrikker.sidebar-tab', {tab: tab.type,});
    }

    const doEndreFiltervalg = (filterId: string, filterVerdi: any) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi, props.filtergruppe));
    };

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
                                   <NyFiltreringLagredeFilter/>
                               }/>;
        }
    }

    const tabs = () => {
        const visVeiledergrupper = tab => tab.type === SidebarTabType.VEILEDERGRUPPER;
        const visLagredeFilter = tab => tab.type === SidebarTabType.MINE_FILTER;

        if (erPaMinOversikt) {
            if (!erLagredeFilterFeatureTogglePa) {
                return sidebar.filter(tab => !visVeiledergrupper(tab) && !visLagredeFilter(tab))
                    .map(tab => mapTabTilView(tab, tab.type === (selectedTabData as Sidebar).type, handleOnTabClicked));
            } else {
                return sidebar.filter(tab => !visVeiledergrupper(tab))
                    .map(tab => mapTabTilView(tab, tab.type === (selectedTabData as Sidebar).type, handleOnTabClicked));
            }

        } else if (erPaEnhetensOversikt) {
            return sidebar.filter(tab => !visLagredeFilter(tab))
                .map(tab => mapTabTilView(tab, tab.type === (selectedTabData as Sidebar).type, handleOnTabClicked));
        } else {
            return sidebar.map(tab => mapTabTilView(tab, tab.type === (selectedTabData as Sidebar).type, handleOnTabClicked));
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
