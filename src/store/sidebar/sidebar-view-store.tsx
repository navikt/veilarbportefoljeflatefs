import { useState } from 'react';

export enum SidebarTabInfo {
    STATUS = 'STATUS',
    FILTER = 'FILTER',
    VEILEDERGRUPPER = 'VEILEDERGRUPPER',
    MINE_FILTER= 'MINE_FILTER'
}

export const useSidebarViewStore = () => {
    const [selectedTab, setSelectedTab] = useState<SidebarTabInfo>(SidebarTabInfo.STATUS);
    const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(false);
    return {selectedTab, setSelectedTab, isSidebarHidden, setIsSidebarHidden};
};
