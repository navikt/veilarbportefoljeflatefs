import SidebarTab from './sidebar-tab';
import {NyFiltreringStatus} from '../../filtrering/filtrering-status/ny_filtrering-status';
import NyFiltreringFilter from '../../filtrering/ny_filtrering-filter';
import NyFilteringVeilederGrupper from '../../filtrering/filtrering-veileder-grupper/ny_filtrering-veileder-grupper';
import NyFiltreringMineFilter from '../../filtrering/filtrering-mine-filter/ny_filtrering-mine-filter';
import React, {useState} from 'react';
import {pagineringSetup} from '../../ducks/paginering';
import {endreFiltervalg} from '../../ducks/filtrering';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {ListevisningType} from '../../ducks/ui/listevisning';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import {PopoverOrientering} from 'nav-frontend-popover';
import ToggleSwitch from '../../filtrering/filtrering-mine-filter/toggleSwitch/toggle-switch';
import {MineFilter} from '../../ducks/mine-filter';

function sortMineFilter(a: MineFilter, b: MineFilter) {
    if (a.sortOrder !== null) {
        if (b.sortOrder !== null) {
            return a.sortOrder - b.sortOrder;
        }
        return -1;
    }
    if (b.sortOrder !== null) {
        return 1;
    }
    return a.filterNavn.toLowerCase().localeCompare(b.filterNavn.toLowerCase(), undefined, {numeric: true});
}

function Sidevelger(selectedTabData, lukkTab, filtergruppe, filtervalg, enhettiltak) {
    const dispatch = useDispatch();
    const mineFilterState = useSelector((state: AppState) => state.mineFilter);
    const [isMinefiltereDraggable, setIsMinefiltereDraggable] = useState(false);
    const mineFilter = mineFilterState.data;
    const erPaMinOversikt = filtergruppe === ListevisningType.minOversikt;
    const erPaEnhetensOversikt = filtergruppe === ListevisningType.enhetensOversikt;
    const doEndreFiltervalg = (filterId: string, filterVerdi: any) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi, filtergruppe));
    };

    const fjernUtilgjengeligeFilter = (elem: MineFilter) => {
        const arbeidsliste = elem.filterValg.ferdigfilterListe.includes('MIN_ARBEIDSLISTE');
        const arbeidslisteKategori = elem.filterValg.arbeidslisteKategori.length > 0;
        const nyeBrukere = elem.filterValg.ferdigfilterListe.includes('NYE_BRUKERE_FOR_VEILEDER');

        const veiledergrupper = elem.filterValg.veiledere.length > 0;
        const ufordelteBrukere = elem.filterValg.ferdigfilterListe.includes('UFORDELTE_BRUKERE');

        return !(
            (erPaEnhetensOversikt && (arbeidsliste || arbeidslisteKategori || nyeBrukere)) ||
            (erPaMinOversikt && (veiledergrupper || ufordelteBrukere))
        );
    };
    if (!selectedTabData) {
        return null;
    }

    if (selectedTabData.tittel === 'Status') {
        return (
            <SidebarTab tittel="Status" handleClick={lukkTab} tab={selectedTabData.type}>
                <NyFiltreringStatus filtergruppe={filtergruppe} filtervalg={filtervalg} />
            </SidebarTab>
        );
    } else if (selectedTabData.tittel === 'Filter') {
        return (
            <SidebarTab tittel="Filter" handleClick={lukkTab} tab={selectedTabData.type}>
                <NyFiltreringFilter
                    endreFiltervalg={doEndreFiltervalg}
                    filtervalg={filtervalg}
                    enhettiltak={enhettiltak}
                />
            </SidebarTab>
        );
    } else if (selectedTabData.tittel === 'Veiledergrupper') {
        return (
            <SidebarTab tittel="Veiledergrupper" handleClick={lukkTab} tab={selectedTabData.type}>
                <NyFilteringVeilederGrupper filtergruppe={filtergruppe} />
            </SidebarTab>
        );
    } else if (selectedTabData.tittel === 'Mine filter') {
        return (
            <SidebarTab
                tittel="Mine filter"
                handleClick={lukkTab}
                tab={selectedTabData.type}
                meta={
                    <>
                        <Hjelpetekst type={PopoverOrientering.Venstre}>
                            {filtergruppe === ListevisningType.minOversikt &&
                                'Filter som inneholder Veiledergrupper og Ufordelte brukere er ikke tilgjengelig i Min oversikt.'}
                            {filtergruppe === ListevisningType.enhetensOversikt &&
                                'Filter som inneholder Arbeidslisten og Nye brukere er ikke tilgjengelig i Enhetens oversikt.'}
                        </Hjelpetekst>
                        <ToggleSwitch
                            checked={isMinefiltereDraggable}
                            onOpen={() => setIsMinefiltereDraggable(true)}
                            onClose={() => setIsMinefiltereDraggable(false)}
                            ariaLabel={'Endre rekkefølge'}
                        />
                    </>
                }
            >
                <NyFiltreringMineFilter
                    filtergruppe={filtergruppe}
                    fjernUtilgjengeligeFilter={fjernUtilgjengeligeFilter}
                    sortertMineFilter={mineFilter.sort(sortMineFilter)}
                    isDraggable={isMinefiltereDraggable}
                    setisDraggable={setIsMinefiltereDraggable}
                />
            </SidebarTab>
        );
    }
}

export default Sidevelger;
