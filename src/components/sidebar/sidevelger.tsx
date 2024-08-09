import React from 'react';
import {useDispatch} from 'react-redux';
import SidebarTab from './sidebar-tab';
import {FiltreringStatus, Statustall} from '../../filtrering/filtrering-status/filtrering-status';
import {oppdaterKolonneAlternativer, OversiktType} from '../../ducks/ui/listevisning';
import {skjulSidebar} from '../../ducks/sidebar-tab';
import {Sidebarelement} from './sidebar';
import {FiltervalgModell} from '../../model-interfaces';
import {OrNothing} from '../../utils/types/types';
import {Tiltak} from '../../ducks/enhettiltak';
import {pagineringSetup} from '../../ducks/paginering';
import {endreFiltervalg} from '../../ducks/filtrering';
import MineFilterTab from './mine-filter-tab';
import {SidebarTabs} from '../../store/sidebar/sidebar-view-store';
import FiltreringFilter from '../../filtrering/filtrering-filter/filtrering-filter';
import FilteringVeiledergrupper from '../../filtrering/filtrering-veileder-grupper/filtrering-veiledergrupper';

interface SidevelgerProps {
    selectedTabElement: Sidebarelement;
    oversiktType: OversiktType;
    filtervalg: FiltervalgModell;
    enhettiltak: OrNothing<Tiltak>;
    statustall: Statustall;
}

function Sidevelger({selectedTabElement, oversiktType, filtervalg, enhettiltak, statustall}: SidevelgerProps) {
    const dispatch = useDispatch();
    const doEndreFiltervalg = (filterId: string, filterVerdi: React.ReactNode) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi, oversiktType));
        oppdaterKolonneAlternativer(dispatch, {...filtervalg, [filterId]: filterVerdi}, oversiktType);
    };

    if (!selectedTabElement) {
        return null;
    }

    switch (selectedTabElement.type) {
        case SidebarTabs.STATUS:
        case SidebarTabs.FILTER:
        case SidebarTabs.VEILEDERGRUPPER:
            return (
                <SidebarTab
                    tittel={selectedTabElement.tittel}
                    handleLukk={() => dispatch(skjulSidebar(oversiktType))}
                    tab={selectedTabElement.type}
                >
                    {selectedTabElement.type === SidebarTabs.STATUS && (
                        <FiltreringStatus oversiktType={oversiktType} filtervalg={filtervalg} statustall={statustall} />
                    )}
                    {selectedTabElement.type === SidebarTabs.FILTER && (
                        <FiltreringFilter
                            endreFiltervalg={doEndreFiltervalg}
                            filtervalg={filtervalg}
                            enhettiltak={enhettiltak}
                            oversiktType={oversiktType}
                        />
                    )}
                    {selectedTabElement.type === SidebarTabs.VEILEDERGRUPPER && (
                        <FilteringVeiledergrupper oversiktType={oversiktType} />
                    )}
                </SidebarTab>
            );
        case SidebarTabs.MINE_FILTER:
            return (
                <MineFilterTab
                    oversiktType={oversiktType}
                    selectedTabData={selectedTabElement}
                    enhettiltak={enhettiltak}
                />
            );
        default:
            return null;
    }
}

export default Sidevelger;
