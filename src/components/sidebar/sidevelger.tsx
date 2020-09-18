import SidebarTab from "./sidebar-tab";
import {NyFiltreringStatus} from "../../filtrering/filtrering-status/ny_filtrering-status";
import NyFiltreringFilter from "../../filtrering/ny_filtrering-filter";
import NyFilteringVeilederGrupper from "../../filtrering/filtrering-veileder-grupper/ny_filtrering-veileder-grupper";
import NyFiltreringMineFilter from "../../filtrering/filtrering-mine-filter/ny_filtrering-mine-filter";
import React from "react";
import Sidebar from "./sidebar";
import {pagineringSetup} from "../../ducks/paginering";
import {endreFiltervalg} from "../../ducks/filtrering";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../reducer";
import {ListevisningType} from "../../ducks/ui/listevisning";

export default function Sidevelger(selectedTabData, lukkTab, filtergruppe, filtervalg, enhettiltak) {
    const mineFilterState = useSelector((state: AppState) => state.mineFilter);
    const mineFilter = mineFilterState.data;
    const sortertMineFilter = mineFilter.sort((a, b) => a.filterNavn.toLowerCase()
        .localeCompare(b.filterNavn.toLowerCase(), undefined, {numeric: true}));
    const dispatch = useDispatch();
    const erPaMinOversikt = filtergruppe === ListevisningType.minOversikt;
    const erPaEnhetensOversikt = filtergruppe === ListevisningType.enhetensOversikt;

    const doEndreFiltervalg = (filterId: string, filterVerdi: any) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi, filtergruppe));
    };

    const fjernUtilgjengeligeFilter = (elem) => {
        const arbeidsliste = elem.filterValg.ferdigfilterListe.includes("MIN_ARBEIDSLISTE");
        const arbeidslisteKategori = elem.filterValg.arbeidslisteKategori.length > 0;
        const nyeBrukere = elem.filterValg.ferdigfilterListe.includes("NYE_BRUKERE_FOR_VEILEDER");

        const veiledergrupper = elem.filterValg.veiledere.length > 0;
        const ufordelteBrukere = elem.filterValg.ferdigfilterListe.includes("UFORDELTE_BRUKERE");

        return !((erPaEnhetensOversikt && (arbeidsliste || arbeidslisteKategori || nyeBrukere))
            || (erPaMinOversikt && (veiledergrupper || ufordelteBrukere)));
    }

    if ((selectedTabData as Sidebar).tittel === 'Status') {
        return <SidebarTab tittel="Status"
                           handleClick={lukkTab}
                           tab={selectedTabData.type}
                           children={<NyFiltreringStatus
                               filtergruppe={filtergruppe}
                               filtervalg={filtervalg}/>
                           }/>;
    } else if ((selectedTabData as Sidebar).tittel === 'Filter') {
        return <SidebarTab tittel="Filter"
                           handleClick={lukkTab}
                           tab={selectedTabData.type}
                           children={<NyFiltreringFilter
                               endreFiltervalg={doEndreFiltervalg}
                               filtervalg={filtervalg}
                               enhettiltak={enhettiltak}/>
                           }/>;
    } else if ((selectedTabData as Sidebar).tittel === 'Veiledergrupper') {
        return <SidebarTab tittel="Veiledergrupper"
                           handleClick={lukkTab}
                           tab={selectedTabData.type}
                           children={<NyFilteringVeilederGrupper
                               filtergruppe={filtergruppe}/>
                           }/>;
    } else if ((selectedTabData as Sidebar).tittel === 'Mine filter') {
        return <SidebarTab tittel="Mine filter"
                           handleClick={lukkTab}
                           tab={selectedTabData.type}
                           children={
                               <NyFiltreringMineFilter
                                   filtergruppe={filtergruppe}
                                   fjernUtilgjengeligeFilter={fjernUtilgjengeligeFilter}
                                   sortertMineFilter={sortertMineFilter}/>
                           }
                           mineFilter={sortertMineFilter}
                           fjernUtilgjengeligeFilter={fjernUtilgjengeligeFilter}
                           filtergruppe={filtergruppe}
        />
    }
}
