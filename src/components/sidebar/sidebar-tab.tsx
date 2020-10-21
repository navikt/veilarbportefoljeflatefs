import React from 'react';
import {Systemtittel} from 'nav-frontend-typografi';
import Lukknapp from 'nav-frontend-lukknapp';
import {SidebarTabInfo} from '../../store/sidebar/sidebar-view-store';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';

interface StatusTabProps {
    tittel: string;
    handleClick: () => void;
    children: React.ReactNode;
    tab: SidebarTabInfo;
    meta?: React.ReactNode;
}

function SidebarTab({tittel, handleClick, meta, children, tab}: StatusTabProps) {
    const lukkTab = () => {
        logEvent('portefolje.metrikker.lukk-pa-kryss', {
            tab: tab,
            sideNavn: finnSideNavn()
        });
        handleClick();
    };
    return (
        <>
            <div className="sidebar-header">
                <div className="sidebar-header__tekst">
                    <Systemtittel className="blokk-m">{tittel}</Systemtittel>
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
