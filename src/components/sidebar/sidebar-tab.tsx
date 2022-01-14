import React from 'react';
import Lukknapp from 'nav-frontend-lukknapp';
import {SidebarTabInfo} from '../../store/sidebar/sidebar-view-store';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';
import {Heading} from '@navikt/ds-react';

interface TabProps {
    tittel: string;
    handleLukk: () => void;
    children: React.ReactNode;
    tab: SidebarTabInfo;
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
                <div className="sidebar-header__tekst">
                    <Heading size="medium" level="2">
                        {tittel}
                    </Heading>
                </div>
                {meta && <div className="sidebar-header__meta">{meta}</div>}
                <div className="sidebar-header__lukknapp">
                    <Lukknapp overstHjorne onClick={lukkTab} />
                </div>
            </div>
            {children}
        </>
    );
}

export default SidebarTab;
