import { useState } from 'react';

export enum SidebarTabInfo {
    VEILEDERGRUPPER = 'VEILEDERGRUPPER',
    STATUS = 'STATUS',
    FILTER = 'FILTER'
}

export const useSidebarViewStore = () => {
    const [selectedTab, setSelectedTab] = useState<SidebarTabInfo>(SidebarTabInfo.STATUS);
    const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(false);
    return {selectedTab, setSelectedTab, isSidebarHidden, setIsSidebarHidden};
};
