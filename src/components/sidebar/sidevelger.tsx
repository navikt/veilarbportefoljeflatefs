import SidebarTab from './sidebar-tab';
import {FiltreringStatus, Statustall} from '../../filtrering/filtrering-status/filtrering-status';
import FilteringVeiledergrupper from '../../filtrering/filtrering-veileder-grupper/filtrering-veiledergrupper';
import React from 'react';
import {useDispatch} from 'react-redux';
import {OversiktType} from '../../ducks/ui/listevisning';
import {skjulSidebar} from '../../ducks/sidebar-tab';
import {Sidebarelement} from './sidebar';
import {FiltervalgModell} from '../../model-interfaces';
import {OrNothing} from '../../utils/types/types';
import {Tiltak} from '../../ducks/enhettiltak';
import FiltreringFilter from '../../filtrering/filtrering-filter/filtrering-filter';
import {pagineringSetup} from '../../ducks/paginering';
import {endreFiltervalg} from '../../ducks/filtrering';
import MineFilterTab from './mine-filter-tab';

interface SidevelgerProps {
    selectedTabData: Sidebarelement;
    oversiktType: OversiktType;
    filtervalg: FiltervalgModell;
    enhettiltak: OrNothing<Tiltak>;
    statustall: Statustall;
}

function Sidevelger({selectedTabData, oversiktType, filtervalg, enhettiltak, statustall}: SidevelgerProps) {
    const dispatch = useDispatch();
    const doEndreFiltervalg = (filterId: string, filterVerdi: React.ReactNode) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi, oversiktType));
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
                <FiltreringStatus oversiktType={oversiktType} filtervalg={filtervalg} statustall={statustall} />
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
                    oversiktType={oversiktType}
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
            <MineFilterTab oversiktType={oversiktType} selectedTabData={selectedTabData} enhettiltak={enhettiltak} />
        );
    }
    return null;
}

export default Sidevelger;
