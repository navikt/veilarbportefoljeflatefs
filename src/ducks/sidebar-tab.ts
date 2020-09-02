import {SidebarTabInfo} from "../store/sidebar/sidebar-view-store";
import {finnSideNavn} from "../middleware/metrics-middleware";
import {logEvent} from "../utils/frontend-logger";

export const initialStateSidebar = {
    selectedTab: SidebarTabInfo.STATUS,
    isSidebarHidden: false
};


export default function sidebarReducer(state = initialStateSidebar, action) {
    switch (action.type) {
        case "sidebarTabEndret":
            return {...state, selectedTab: action.selectedTab};
        case "sidebarSkjult":
            return {...state, isSidebarHidden: true};
        case "sidebarVises":
            return {...state, isSidebarHidden: false};
        default:
            return state;
    }
}

export function skjulSidebar(listeoversikt: string) {
    logEvent('portefolje.metrikker.sidebar-synlig',
        {
            sideNavn: finnSideNavn(),
            erLukket: true
        });
    return {
        type: 'sidebarSkjult',
        name: listeoversikt
    };
}

export function visSidebar(listeoversikt: string) {
    logEvent('portefolje.metrikker.sidebar-synlig',
        {
            sideNavn: finnSideNavn(),
            erLukket: false
        });
    return {
        type: 'sidebarVises',
        name: listeoversikt
    };
}
