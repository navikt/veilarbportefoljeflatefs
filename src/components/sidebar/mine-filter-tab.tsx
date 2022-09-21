import SidebarTab from './sidebar-tab';
import {skjulSidebar} from '../../ducks/sidebar-tab';
import {OversiktType} from '../../ducks/ui/listevisning';
import ToggleSwitch from '../../filtrering/filtrering-mine-filter/toggle-switch/toggle-switch';
import FiltreringMineFilter from '../../filtrering/filtrering-mine-filter/filtrering-mine-filter';
import React, {useState} from 'react';
import {Sidebarelement} from './sidebar';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {LagretFilter} from '../../ducks/lagret-filter';
import {OrNothing} from '../../utils/types/types';
import {Tiltak} from '../../ducks/enhettiltak';
import {HelpText} from '@navikt/ds-react';

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
    selectedTabData: Sidebarelement;
    oversiktType: OversiktType;
    enhettiltak: OrNothing<Tiltak>;
}

function MineFilterTab({selectedTabData, oversiktType, enhettiltak}: SidevelgerProps) {
    const [isMinefiltereDraggable, setIsMinefiltereDraggable] = useState(false);
    const mineFilterState = useSelector((state: AppState) => state.mineFilter);
    const mineFilter = mineFilterState.data;
    const erPaMinOversikt = oversiktType === OversiktType.minOversikt;
    const erPaEnhetensOversikt = oversiktType === OversiktType.enhetensOversikt;
    const dispatch = useDispatch();

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

    return (
        <SidebarTab
            tittel="Mine filter"
            handleLukk={() => dispatch(skjulSidebar(oversiktType))}
            tab={selectedTabData.type}
            meta={
                <>
                    <HelpText placement="right">
                        {(() => {
                            switch (oversiktType) {
                                case OversiktType.minOversikt:
                                    return 'Filter som inneholder Veiledergrupper og Ufordelte brukere er ikke tilgjengelig i Min oversikt.';
                                case OversiktType.enhetensOversikt:
                                    return 'Filter som inneholder Veiledergrupper og Ufordelte brukere er ikke tilgjengelig i Min oversikt.';
                                default:
                                    return ' ';
                            }
                        })()}
                    </HelpText>
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
                enhettiltak={enhettiltak}
            />
        </SidebarTab>
    );
}
export default MineFilterTab;
