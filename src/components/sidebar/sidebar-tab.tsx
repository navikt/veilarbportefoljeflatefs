import React from 'react';
import {Systemtittel} from 'nav-frontend-typografi';
import Lukknapp from 'nav-frontend-lukknapp';
import hiddenIf from "../hidden-if/hidden-if";
import {PopoverOrientering} from "nav-frontend-popover";
import Hjelpetekst from "nav-frontend-hjelpetekst";
import {MineFilter} from "../../ducks/mine-filter";

interface StatusTabProps {
    tittel: string;
    handleClick: () => void;
    children: React.ReactNode;
    mineFilter?: MineFilter[];
    fjernUtilgjengeligeFilter?: (elem: MineFilter) => void;
    filtergruppe?: string;
}

function SidebarTab({tittel, handleClick, children, mineFilter, fjernUtilgjengeligeFilter, filtergruppe}: StatusTabProps) {
    const HiddenInfoIkon = hiddenIf(Hjelpetekst)

    const filtrertListe = () => {
        if (mineFilter && fjernUtilgjengeligeFilter) {
            return mineFilter.filter(elem => fjernUtilgjengeligeFilter(elem))
        }
    }
    return (
        <>
            <div className="sidebar-header">
                <div className="sidebar-header__tekst">
                    <Systemtittel className="blokk-m" title={tittel}>
                        {tittel}
                    </Systemtittel>
                </div>
                {mineFilter && fjernUtilgjengeligeFilter &&
                <HiddenInfoIkon type={PopoverOrientering.Venstre}
                                hidden={filtrertListe()!.length === mineFilter.length}
                >
                    {filtergruppe === 'veileder' && "Filter som inneholder Veiledergrupper og Ufordelte brukere er ikke tilgjengelig i Min oversikt."}
                    {filtergruppe === 'enhet' && "Filter som inneholder Arbeidslisten og Nye brukere er ikke tilgjengelig i Enhetens oversikt."}
                </HiddenInfoIkon>
                }
                <div className="sidebar-header__lukknapp">
                    <Lukknapp overstHjorne onClick={handleClick}/>
                </div>
            </div>
            {children}
        </>
    );
}

export default SidebarTab;
