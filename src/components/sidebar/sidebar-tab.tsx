import {ReactNode} from 'react';
import {useDispatch} from 'react-redux';
import {Button, Heading} from '@navikt/ds-react';
import {XMarkIcon} from '@navikt/aksel-icons';
import {endreValgtSidebarTab} from './sidebar';
import {SidebarTabs} from '../../store/sidebar/sidebar-view-store';
import {skjulSidebar} from '../../ducks/sidebar-tab';
import {OversiktType} from '../../ducks/ui/listevisning';
import {AppDispatch} from '../../reducer';

interface TabProps {
    tab: SidebarTabs;
    tittel: string;
    oversiktType: OversiktType;
    headingChildren?: ReactNode;
    children: ReactNode;
}

export const SidebarTab = ({tab, tittel, oversiktType, headingChildren, children}: TabProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const lukkSidemenyOgNullstillValgtFane = () => {
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
