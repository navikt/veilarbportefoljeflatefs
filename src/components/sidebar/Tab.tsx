import {SidebarTabs} from '../../store/sidebar/sidebar-view-store';
import {Tabs} from '@navikt/ds-react';
import React from 'react';
import {Fanedetaljer} from './sidebar';

interface Props {
    fane: SidebarTabs;
    fanedetaljer: Fanedetaljer;
}

export const Tab = ({fane, fanedetaljer}: Props) => {
    return <Tabs.Tab value={fane} label={fanedetaljer.tittel} icon={fanedetaljer.icon} />;
};
