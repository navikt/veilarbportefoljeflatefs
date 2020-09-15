import React from 'react';
import {Systemtittel} from 'nav-frontend-typografi';
import Lukknapp from 'nav-frontend-lukknapp';

interface StatusTabProps {
    tittel: string;
    handleClick: () => void;
    children: React.ReactNode;
    meta?: React.ReactNode;
}

function SidebarTab(props: StatusTabProps) {
    const {tittel, handleClick, meta, children} = props;
    return (
        <>
            <div className="sidebar-header">
                <div className="sidebar-header__tekst">
                    <Systemtittel className="blokk-m">{tittel}</Systemtittel>
                </div>
                <div className="sidebar-header__meta">{meta}</div>
                <div className="sidebar-header__lukknapp">
                    <Lukknapp overstHjorne onClick={handleClick} />
                </div>
            </div>
            {children}
        </>
    );
}

export default SidebarTab;
