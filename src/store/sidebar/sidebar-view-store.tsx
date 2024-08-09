import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {OversiktType} from '../../ducks/ui/listevisning';

export enum SidebarTabs {
    STATUS = 'STATUS',
    FILTER = 'FILTER',
    VEILEDERGRUPPER = 'VEILEDERGRUPPER',
    MINE_FILTER = 'MINE_FILTER'
}

export function sidebarSelector(state: AppState, oversiktType: OversiktType) {
    if (oversiktType === OversiktType.minOversikt) {
        return state.ui.sidebarMinOversikt;
    }
    return state.ui.sidebarEnhetensOversikt;
}

export const useSidebarViewStore = (oversiktType: OversiktType) => {
    return useSelector((state: AppState) => sidebarSelector(state, oversiktType));
};
