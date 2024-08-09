import React from 'react';
import {Button, Heading} from '@navikt/ds-react';
import {XMarkIcon} from '@navikt/aksel-icons';
import {SidebarTabs} from '../../store/sidebar/sidebar-view-store';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';

interface TabProps {
    tittel: string;
    handleLukk: () => void;
    children: React.ReactNode;
    tab: SidebarTabs;
    meta?: React.ReactNode;
}

function SidebarTab({tittel, handleLukk, meta, children, tab}: TabProps) {
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

                {meta && <div className="sidebar-header__meta">{meta}</div>}

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
}

export default SidebarTab;
