import React, { useEffect, useRef } from 'react';
import { SidebarTabInfo, SidebarTabInfo as SidebarTabType, useSidebarViewStore } from '../../store/sidebar/sidebar-view-store';
import classNames from 'classnames';
import './sidebar.less';
import { ReactComponent as StatusIkon } from '../ikoner/settings.svg';
import { ReactComponent as VeiledergruppeIkon } from '../ikoner/person-view-1.svg';
import { ReactComponent as FilterIkon } from '../ikoner/info-ikon.svg';
import { FiltervalgModell } from '../../model-interfaces';
import { OrNothing } from '../../utils/types/types';
import { Tiltak } from '../../ducks/enhettiltak';
import { logEvent } from '../../utils/frontend-logger';
import SidebarTab from './sidebar-tab';
import { FiltreringStatus } from '../../filtrering/filtrering-status/filtrering-status';
import FiltreringFilter from '../../filtrering/filtrering-filter';
import { useDispatch } from 'react-redux';
import { pagineringSetup } from '../../ducks/paginering';
import { endreFiltervalg } from '../../ducks/filtrering';
import FilteringVeilederGrupper from '../../filtrering/filtrering-veileder-grupper/filtrering-veileder-grupper';

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
        type: SidebarTabType.FILTER,
        icon: <FilterIkon/>,
        tittel: 'Filter'
    }, {
        type: SidebarTabType.VEILEDERGRUPPER,
        icon: <VeiledergruppeIkon/>,
        tittel: 'Veiledergrupper'
    },
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

export const Sidebar = (props: { filtervalg: FiltervalgModell, enhettiltak: OrNothing<Tiltak>, filtergruppe?: string, isSidebarHidden: boolean, handleOnTabClicked: (tab: Sidebar, selectedTab: SidebarTabInfo) => void, lukkTab: () => void }) => {
    const {selectedTab, setSelectedTab} = useSidebarViewStore();
    const sidebarRef = useRef<HTMLDivElement>(null);
    const selectedTabData = finnTab(selectedTab, sidebar);

    function handleOnTabClicked(tab: Sidebar) {
        setSelectedTab(tab.type);
        props.handleOnTabClicked(tab, selectedTab);
        logEvent('portefolje.metrikker.sidebar-tab', {tab: tab.type,});
    }

    const dispatch = useDispatch();

    const doEndreFiltervalg = (filterId: string, filterVerdi: any) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi, props.filtergruppe));
    };

    function sidevelger(selectedTabData) {
        if ((selectedTabData as Sidebar).tittel === 'Status') {
            return <SidebarTab tittel="Status"
                               handleClick={props.lukkTab}
                               children={
                            <FiltreringStatus
                                filtergruppe={props.filtergruppe}
                                filtervalg={props.filtervalg}
                            />
                        }/>;
        } else if ((selectedTabData as Sidebar).tittel === 'Filter') {
            return <SidebarTab tittel="Filter"
                               handleClick={props.lukkTab}
                               children={
                            <FiltreringFilter
                                endreFiltervalg={doEndreFiltervalg}
                                filtervalg={props.filtervalg}
                                enhettiltak={props.enhettiltak}
                            />
                        }/>;
        } else if ((selectedTabData as Sidebar).tittel === 'Veiledergrupper') {
            return <SidebarTab tittel="Veiledergrupper"
                               handleClick={props.lukkTab}
                               children={
                            <FilteringVeilederGrupper filtergruppe={props.filtergruppe}
                            />
                        }/>;
        }
    }

    useEffect(() => {
        setSelectedTab(selectedTab);
    }, [setSelectedTab, selectedTab]);

    return (
        <div ref={sidebarRef}
             className={classNames('sidebar', props.isSidebarHidden && 'sidebar__hidden')}>
            <div className="sidebar__tab-container">
                {sidebar.map(tab => mapTabTilView(tab, tab.type === (selectedTabData as Sidebar).type, handleOnTabClicked))}
            </div>
            <div
                className='sidebar__content-container'
                hidden={props.isSidebarHidden}>
                {sidevelger(selectedTabData)}
            </div>
        </div>
    );
};
