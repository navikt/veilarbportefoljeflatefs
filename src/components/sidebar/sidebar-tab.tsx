import React from 'react';
import {Systemtittel} from 'nav-frontend-typografi';
import Lukknapp from 'nav-frontend-lukknapp';
import hiddenIf from "../hidden-if/hidden-if";
import {PopoverOrientering} from "nav-frontend-popover";
import Hjelpetekst from "nav-frontend-hjelpetekst";
import {MineFilter} from "../../ducks/mine-filter";
import {ListevisningType} from "../../ducks/ui/listevisning";
import {logEvent} from "../../utils/frontend-logger";
import {finnSideNavn} from "../../middleware/metrics-middleware";
import {SidebarTabInfo} from "../../store/sidebar/sidebar-view-store";

interface StatusTabProps {
    tittel: string;
    handleClick: () => void;
    children: React.ReactNode;
    mineFilter?: MineFilter[];
    fjernUtilgjengeligeFilter?: (elem: MineFilter) => void;
    filtergruppe?: string;
    tab: SidebarTabInfo;
}

function SidebarTab({tittel, handleClick, children, mineFilter, fjernUtilgjengeligeFilter, filtergruppe, tab}: StatusTabProps) {
    const HiddenInfoIkon = hiddenIf(Hjelpetekst)

    const filtrertListe = () => {
        if (mineFilter && fjernUtilgjengeligeFilter) {
            return mineFilter.filter(elem => fjernUtilgjengeligeFilter(elem))
        }
    }

    const lukkTab = () => {
        logEvent('portefolje.metrikker.lukk-pa-kryss', {tab: tab, sideNavn: finnSideNavn()})
        handleClick();
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
                    {filtergruppe === ListevisningType.minOversikt && "Filter som inneholder Veiledergrupper og Ufordelte brukere er ikke tilgjengelig i Min oversikt."}
                    {filtergruppe === ListevisningType.enhetensOversikt && "Filter som inneholder Arbeidslisten og Nye brukere er ikke tilgjengelig i Enhetens oversikt."}
                </HiddenInfoIkon>
                }
                <div className="sidebar-header__lukknapp">
                    <Lukknapp overstHjorne onClick={lukkTab}/>
                </div>
            </div>
            {children}
        </>
    );
}

export default SidebarTab;
