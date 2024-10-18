import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {OversiktType} from '../../ducks/ui/listevisning';
import {SidebarStateType} from '../../ducks/sidebar-tab';

export enum SidebarTabs {
    STATUS = 'STATUS',
    FILTER = 'FILTER',
    VEILEDERGRUPPER = 'VEILEDERGRUPPER',
    MINE_FILTER = 'MINE_FILTER'
}

export function sidebarSelector(state: AppState, oversiktType: OversiktType): SidebarStateType {
    if (oversiktType === OversiktType.minOversikt) {
        return state.ui.sidebarMinOversikt;
    }
    return state.ui.sidebarEnhetensOversikt;
}

export const useSidebarViewStore = (oversiktType: OversiktType) => {
    return useSelector((state: AppState) => sidebarSelector(state, oversiktType));
};
