import React, {useEffect, useRef} from 'react';
import {
    SidebarTabInfo,
    SidebarTabInfo as SidebarTabType,
    useSidebarViewStore
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
import {FiltreringStatus} from '../../filtrering/filtrering-status/filtrering-status';
import FiltreringFilter from '../../filtrering/filtrering-filter';
import {useDispatch, useSelector} from 'react-redux';
import {pagineringSetup} from '../../ducks/paginering';
import {endreFiltervalg} from '../../ducks/filtrering';
import FilteringVeilederGrupper from '../../filtrering/filtrering-veileder-grupper/filtrering-veileder-grupper';
import NyFiltreringLagredeFilter from "../../filtrering/filtrering-lagrede-filter/ny_filtrering-lagrede-filter";
import {AppState} from "../../reducer";
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
        tittel: 'Status'
    }, {
        type: SidebarTabType.MINE_FILTER,
        icon: <MineFilterIkon/>,
        tittel: 'Mine filter'
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
    const {selectedTab, setSelectedTab} = useSidebarViewStore();
    const sidebarRef = useRef<HTMLDivElement>(null);
    const selectedTabData = finnTab(selectedTab, sidebar);
    const lagretFilterState = useSelector((state: AppState) => state.lagretFilter);
    const dispatch = useDispatch();

    useEffect(() => {
        const nyttLagretFilter = lagretFilterState.handlingType === HandlingsType.NYTT && lagretFilterState.status === STATUS.OK;
        const oppdatertLagretFilter = lagretFilterState.handlingType === HandlingsType.REDIGERE && lagretFilterState.status === STATUS.OK;

        if (nyttLagretFilter || oppdatertLagretFilter) {
            return setSelectedTab(SidebarTabInfo.MINE_FILTER);
        }
    }, [setSelectedTab, lagretFilterState.handlingType, lagretFilterState.status])

    function handleOnTabClicked(tab: Sidebar) {
        setSelectedTab(tab.type);
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
                               children={<FiltreringStatus
                                   filtergruppe={props.filtergruppe}
                                   filtervalg={props.filtervalg}/>
                               }/>;
        } else if ((selectedTabData as Sidebar).tittel === 'Filter') {
            return <SidebarTab tittel="Filter"
                               handleClick={props.lukkTab}
                               children={<FiltreringFilter
                                   endreFiltervalg={doEndreFiltervalg}
                                   filtervalg={props.filtervalg}
                                   enhettiltak={props.enhettiltak}/>
                               }/>;
        } else if ((selectedTabData as Sidebar).tittel === 'Veiledergrupper') {
            return <SidebarTab tittel="Veiledergrupper"
                               handleClick={props.lukkTab}
                               children={<FilteringVeilederGrupper
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

    useEffect(() => {
        setSelectedTab(selectedTab);
    }, [setSelectedTab, selectedTab]);

    const tabs = () => {
        const visVeiledergrupper = tab => tab.type === SidebarTabType.VEILEDERGRUPPER;
        const visLagredeFilter = tab => tab.type === SidebarTabType.MINE_FILTER;

        const erPaMinOversikt = props.filtergruppe === 'veileder';
        const erPaEnhetensOversikt = props.filtergruppe === 'enhet';

        if (erPaMinOversikt) {
            return sidebar.filter(tab => erPaMinOversikt && !visVeiledergrupper(tab))
                .map(tab => mapTabTilView(tab, tab.type === (selectedTabData as Sidebar).type, handleOnTabClicked));
        } else if (erPaEnhetensOversikt) {
            return sidebar.filter(tab => erPaEnhetensOversikt && !visLagredeFilter(tab))
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
