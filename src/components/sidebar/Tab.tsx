import {Tabs} from '@navikt/ds-react';
import {SidebarTabs} from '../../store/sidebar/sidebar-view-store';
import {Fanedetaljer} from './sidebar';

interface Props {
    fane: SidebarTabs;
    fanedetaljer: Fanedetaljer;
}

export const Tab = ({fane, fanedetaljer}: Props) => {
    return (
        <Tabs.Tab
            value={fane}
            label={fanedetaljer.tittel}
            icon={fanedetaljer.icon}
            data-testid={`sidebar-tab_${fane}`}
        />
    );
};
