import {ReactNode} from 'react';
import {useDispatch} from 'react-redux';
import {Button, Heading} from '@navikt/ds-react';
import {XMarkIcon} from '@navikt/aksel-icons';
import {endreValgtSidebarTab} from './sidebar';
import {SidebarTabs} from '../../store/sidebar/sidebar-view-store';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';
import {skjulSidebar} from '../../ducks/sidebar-tab';
import {OversiktType} from '../../ducks/ui/listevisning';

interface TabProps {
    tab: SidebarTabs;
    tittel: string;
    oversiktType: OversiktType;
    headingChildren?: ReactNode;
    children: ReactNode;
}

export const SidebarTab = ({tab, tittel, oversiktType, headingChildren, children}: TabProps) => {
    const dispatch = useDispatch();

    const lukkSidemenyOgNullstillValgtFane = () => {
        logEvent('portefolje.metrikker.lukk-pa-kryss', {
            tab: tab,
            sideNavn: finnSideNavn()
        });

        dispatch(skjulSidebar(oversiktType));
        endreValgtSidebarTab({
            dispatch: dispatch,
            currentOversiktType: oversiktType,
            requestedTab: ''
        });
    };

    return (
        <>
            <div className="sidebar-header" data-testid="sidebar-header">
                <Heading size="medium" level="2" className="sidebar-header__tekst">
                    {tittel}
                </Heading>

                {headingChildren}

                <Button
                    onClick={lukkSidemenyOgNullstillValgtFane}
                    variant="tertiary-neutral"
                    size="small"
                    icon={<XMarkIcon title="Lukk panel" fontSize="1.5rem" />}
                />
            </div>

            {children}
        </>
    );
};
