import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import Lukknapp from 'nav-frontend-lukknapp';

interface StatusTabProps {
    tittel: string;
    handleClick: () => void;
    children: React.ReactNode;
}

function SidebarTab({tittel, handleClick, children}: StatusTabProps) {
    return (
        <>
            <Systemtittel className="blokk-m">{tittel}</Systemtittel>
            <Lukknapp overstHjorne onClick={handleClick}/>
            {children}
        </>
    );
}

export default SidebarTab;
