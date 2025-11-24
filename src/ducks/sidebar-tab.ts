import {SidebarTabs} from '../store/sidebar/sidebar-view-store';
import {OversiktType} from './ui/listevisning';

export interface SidebarStateType {
    selectedTab: SidebarTabs;
    isSidebarHidden: boolean;
}

export const initialStateSidebar: SidebarStateType = {
    selectedTab: SidebarTabs.STATUS,
    isSidebarHidden: false
};

export const SIDEBAR_TAB_ENDRET = 'sidebarTabEndret';
export const SIDEBAR_SKJULT = 'sidebarSkjult';
export const SIDEBAR_VISES = 'sidebarVises';

export function sidebarReducer(state = initialStateSidebar, action) {
    switch (action.type) {
        case SIDEBAR_TAB_ENDRET:
            return {...state, selectedTab: action.selectedTab};
        case SIDEBAR_SKJULT:
            return {...state, isSidebarHidden: true};
        case SIDEBAR_VISES:
            return {...state, isSidebarHidden: false};
        default:
            return state;
    }
}

export function visSidebar(oversiktType: OversiktType) {
    return {
        type: SIDEBAR_VISES,
        name: oversiktType,
        isSidebarHidden: false
    };
}

export function skjulSidebar(oversiktType: OversiktType) {
    return {
        type: SIDEBAR_SKJULT,
        name: oversiktType,
        isSidebarHidden: true
    };
}
