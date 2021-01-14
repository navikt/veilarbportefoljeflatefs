import SidebarTab from './sidebar-tab';
import {FiltreringStatus} from '../../filtrering/filtrering-status/filtrering-status';
import FilteringVeiledergrupper from '../../filtrering/filtrering-veileder-grupper/filtrering-veiledergrupper';
import FiltreringMineFilter from '../../filtrering/filtrering-mine-filter/filtrering-mine-filter';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {OversiktType} from '../../ducks/ui/listevisning';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import {PopoverOrientering} from 'nav-frontend-popover';
import {skjulSidebar} from '../../ducks/sidebar-tab';
import Sidebar from './sidebar';
import {FiltervalgModell} from '../../model-interfaces';
import {OrNothing} from '../../utils/types/types';
import {Tiltak} from '../../ducks/enhettiltak';
import {LagretFilter} from '../../ducks/lagret-filter';
import ToggleSwitch from '../../filtrering/filtrering-mine-filter/toggle-switch/toggle-switch';
import FiltreringFilter from '../../filtrering/filtrering-filter/filtrering-filter';
import {pagineringSetup} from '../../ducks/paginering';
import {endreFiltervalg} from '../../ducks/filtrering';

function sortMineFilter(a: LagretFilter, b: LagretFilter) {
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

interface SidevelgerProps {
    selectedTabData: Sidebar;
    oversiktType: OversiktType;
    filtervalg: FiltervalgModell;
    enhettiltak: OrNothing<Tiltak>;
}

function Sidevelger({selectedTabData, oversiktType, filtervalg, enhettiltak}: SidevelgerProps) {
    const dispatch = useDispatch();
    const mineFilterState = useSelector((state: AppState) => state.mineFilter);
    const [isMinefiltereDraggable, setIsMinefiltereDraggable] = useState(false);

    const mineFilter = mineFilterState.data;
    const erPaMinOversikt = oversiktType === OversiktType.minOversikt;
    const erPaEnhetensOversikt = oversiktType === OversiktType.enhetensOversikt;

    const doEndreFiltervalg = (filterId: string, filterVerdi: any) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi, oversiktType));
    };

    const fjernUtilgjengeligeFilter = (elem: LagretFilter) => {
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
            <SidebarTab
                tittel="Status"
                handleLukk={() => dispatch(skjulSidebar(oversiktType))}
                tab={selectedTabData.type}
            >
                <FiltreringStatus oversiktType={oversiktType} filtervalg={filtervalg} />
            </SidebarTab>
        );
    } else if (selectedTabData.tittel === 'Filter') {
        return (
            <SidebarTab
                tittel="Filter"
                handleLukk={() => dispatch(skjulSidebar(oversiktType))}
                tab={selectedTabData.type}
            >
                <FiltreringFilter
                    endreFiltervalg={doEndreFiltervalg}
                    filtervalg={filtervalg}
                    enhettiltak={enhettiltak}
                />
            </SidebarTab>
        );
    } else if (selectedTabData.tittel === 'Veiledergrupper') {
        return (
            <SidebarTab
                tittel="Veiledergrupper"
                handleLukk={() => dispatch(skjulSidebar(oversiktType))}
                tab={selectedTabData.type}
            >
                <FilteringVeiledergrupper oversiktType={oversiktType} />
            </SidebarTab>
        );
    } else if (selectedTabData.tittel === 'Mine filter') {
        return (
            <SidebarTab
                tittel="Mine filter"
                handleLukk={() => dispatch(skjulSidebar(oversiktType))}
                tab={selectedTabData.type}
                meta={
                    <>
                        <Hjelpetekst type={PopoverOrientering.Hoyre}>
                            {oversiktType === OversiktType.minOversikt &&
                                'Filter som inneholder Veiledergrupper og Ufordelte brukere er ikke tilgjengelig i Min oversikt.'}
                            {oversiktType === OversiktType.enhetensOversikt &&
                                'Filter som inneholder Arbeidslisten og Nye brukere er ikke tilgjengelig i Enhetens oversikt.'}
                        </Hjelpetekst>
                        <ToggleSwitch
                            checked={isMinefiltereDraggable}
                            onChange={() => {
                                setIsMinefiltereDraggable(!isMinefiltereDraggable);
                            }}
                            ariaLabel="Endre rekkefølge"
                        />
                    </>
                }
            >
                <FiltreringMineFilter
                    oversiktType={oversiktType}
                    fjernUtilgjengeligeFilter={fjernUtilgjengeligeFilter}
                    sortertMineFilter={mineFilter.sort(sortMineFilter)}
                    isDraggable={isMinefiltereDraggable}
                    setisDraggable={setIsMinefiltereDraggable}
                />
            </SidebarTab>
        );
    }
    return null;
}

export default Sidevelger;
