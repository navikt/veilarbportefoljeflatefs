import {SidebarTabInfo} from "../store/sidebar/sidebar-view-store";
import {logEvent} from "../utils/frontend-logger";
import {finnSideNavn} from "../middleware/metrics-middleware";

export const initialStateSidebar = {
    selectedTab: SidebarTabInfo.STATUS,
    isSidebarHidden: false
};

export const SIDEBAR_TAB_ENDRET = 'sidebarTabEndret';
export const SIDEBAR_SKJULT = 'sidebarSkjult';
export const SIDEBAR_VISES = 'sidebarVises';

export default function sidebarReducer(state = initialStateSidebar, action) {
    switch (action.type) {
        case SIDEBAR_TAB_ENDRET:
            return {selectedTab: action.selectedTab};
        case SIDEBAR_SKJULT:
            return {...state, isSidebarHidden: true};
        case SIDEBAR_VISES:
            return {...state, isSidebarHidden: false};
        default:
            return state;
    }
}

export function visSidebar(filtergruppe: string) {
    logEvent('portefolje.metrikker.sidebar-synlig',
        {
            sideNavn: finnSideNavn(),
            isSidebarHidden: false
        });
    return {
        type: SIDEBAR_VISES,
        name: filtergruppe,
        isSidebarHidden: false
    };
}

export function skjulSidebar(filtergruppe: string) {
    logEvent('portefolje.metrikker.sidebar-synlig',
        {
            sideNavn: finnSideNavn(),
            isSidebarHidden: true
        });
    return {
        type: SIDEBAR_SKJULT,
        name: filtergruppe,
        isSidebarHidden: true
    };
}