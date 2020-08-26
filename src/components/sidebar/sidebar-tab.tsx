import React from 'react';
import {Systemtittel} from 'nav-frontend-typografi';
import Lukknapp from 'nav-frontend-lukknapp';
import hiddenIf from "../hidden-if/hidden-if";
import {PopoverOrientering} from "nav-frontend-popover";
import Hjelpetekst from "nav-frontend-hjelpetekst";
import {LagretFilter} from "../../ducks/lagret-filter";

interface StatusTabProps {
    tittel: string;
    handleClick: () => void;
    children: React.ReactNode;
    lagretFilter?: LagretFilter[];
    fjernUtilgjengeligeFilter?: (elem: LagretFilter) => void;
    filtergruppe?: string;
}

function SidebarTab({tittel, handleClick, children, lagretFilter, fjernUtilgjengeligeFilter, filtergruppe}: StatusTabProps) {
    const HiddenInfoIkon = hiddenIf(Hjelpetekst)

    const filtrertListe = () => {
        if (lagretFilter && fjernUtilgjengeligeFilter) {
            return lagretFilter.filter(elem => fjernUtilgjengeligeFilter(elem))
        }
    }
    return (
        <>
            <Systemtittel className="blokk-m">
                {tittel}
                {lagretFilter && fjernUtilgjengeligeFilter &&
                <HiddenInfoIkon type={PopoverOrientering.Venstre}
                                hidden={filtrertListe()!.length === lagretFilter.length}>
                    {filtergruppe === 'veileder' && "Filter som inneholder Veiledergrupper og Ufordelte brukere er ikke tilgjengelig i Min oversikt."}
                    {filtergruppe === 'enhet' && "Filter som inneholder Arbeidslisten og Nye brukere er ikke tilgjengelig i Enhetens oversikt."}
                </HiddenInfoIkon>}
            </Systemtittel>
            <Lukknapp overstHjorne onClick={handleClick}/>
            {children}
        </>
    );
}

export default SidebarTab;
