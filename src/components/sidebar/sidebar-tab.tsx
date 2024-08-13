import React from 'react';
import {Button, Heading} from '@navikt/ds-react';
import {XMarkIcon} from '@navikt/aksel-icons';
import {SidebarTabs} from '../../store/sidebar/sidebar-view-store';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';

interface TabProps {
    tab: SidebarTabs;
    tittel: string;
    handleLukk: () => void;
    headingChildren?: React.ReactNode;
    children: React.ReactNode;
}

export const SidebarTab = ({tab, tittel, handleLukk, headingChildren, children}: TabProps) => {
    const lukkTab = () => {
        logEvent('portefolje.metrikker.lukk-pa-kryss', {
            tab: tab,
            sideNavn: finnSideNavn()
        });
        handleLukk();
    };

    return (
        <>
            <div className="sidebar-header" data-testid="sidebar-header">
                <Heading size="medium" level="2" className="sidebar-header__tekst">
                    {tittel}
                </Heading>

                {headingChildren}

                <Button
                    onClick={lukkTab}
                    variant="tertiary-neutral"
                    size="small"
                    icon={<XMarkIcon title="Lukk panel" fontSize="1.5rem" />}
                />
            </div>

            {children}
        </>
    );
};
