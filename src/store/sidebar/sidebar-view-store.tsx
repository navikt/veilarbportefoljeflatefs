import { useState } from 'react';

export enum SidebarTabInfo {
    STATUS = 'STATUS',
    FILTER = 'FILTER',
    INFORMASJON_OM_BRUKER = 'INFORMASJON_OM_BRUKER',
    VEILEDERGRUPPER = 'VEILEDERGRUPPER',
}

export const useSidebarViewStore = () => {
    const [selectedTab, setSelectedTab] = useState<SidebarTabInfo>(SidebarTabInfo.STATUS);
    const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(false);
    return {selectedTab, setSelectedTab, isSidebarHidden, setIsSidebarHidden};
};
