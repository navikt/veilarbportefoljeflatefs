import React from 'react';
import {useDispatch} from 'react-redux';
import SidebarTab from './sidebar-tab';
import {FiltreringStatus, Statustall} from '../../filtrering/filtrering-status/filtrering-status';
import FilteringVeiledergrupper from '../../filtrering/filtrering-veileder-grupper/filtrering-veiledergrupper';
import {oppdaterKolonneAlternativer, OversiktType} from '../../ducks/ui/listevisning';
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

    if (selectedTabElement.tittel === 'Status') {
        return (
            <SidebarTab
                tittel="Status"
                handleLukk={() => dispatch(skjulSidebar(oversiktType))}
                tab={selectedTabElement.type}
            >
                <FiltreringStatus oversiktType={oversiktType} filtervalg={filtervalg} statustall={statustall} />
            </SidebarTab>
        );
    } else if (selectedTabElement.tittel === 'Filter') {
        return (
            <SidebarTab
                tittel="Filter"
                handleLukk={() => dispatch(skjulSidebar(oversiktType))}
                tab={selectedTabElement.type}
            >
                <FiltreringFilter
                    endreFiltervalg={doEndreFiltervalg}
                    filtervalg={filtervalg}
                    enhettiltak={enhettiltak}
                    oversiktType={oversiktType}
                />
            </SidebarTab>
        );
    } else if (selectedTabElement.tittel === 'Veiledergrupper') {
        return (
            <SidebarTab
                tittel="Veiledergrupper"
                handleLukk={() => dispatch(skjulSidebar(oversiktType))}
                tab={selectedTabElement.type}
            >
                <FilteringVeiledergrupper oversiktType={oversiktType} />
            </SidebarTab>
        );
    } else if (selectedTabElement.tittel === 'Mine filter') {
        return (
            <MineFilterTab oversiktType={oversiktType} selectedTabData={selectedTabElement} enhettiltak={enhettiltak} />
        );
    }
    return null;
}

export default Sidevelger;
