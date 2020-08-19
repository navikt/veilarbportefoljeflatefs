import {useSelector} from "react-redux";
import {AppState} from "../../reducer";
import {ListevisningType} from "../../ducks/ui/listevisning";

export enum SidebarTabInfo {
    STATUS = 'STATUS',
    FILTER = 'FILTER',
    VEILEDERGRUPPER = 'VEILEDERGRUPPER',
    MINE_FILTER = 'MINE_FILTER'
}

export function sidebarSelector(state: AppState, name: string) {
    if (name === ListevisningType.minOversikt) {
        return state.ui.sidebarMinOversikt;
    }
    return state.ui.sidebarEnhetensOversikt;
}

export const useSidebarViewStore = (name: string) => {
    return useSelector((state: AppState) => sidebarSelector(state, name));
};

