import {ReactNode} from 'react';
import {useDispatch} from 'react-redux';
import {SidebarTab} from './sidebar-tab';
import {FiltreringStatus, StatustallForStatusfane} from '../../filtrering/filtrering-status/filtrering-status';
import {oppdaterKolonneAlternativer, OversiktType} from '../../ducks/ui/listevisning';
import {FiltervalgModell} from '../../typer/filtervalg-modell';
import {OrNothing} from '../../utils/types/types';
import {Tiltak} from '../../ducks/enhettiltak';
import {pagineringSetup} from '../../ducks/paginering';
import {endreFiltervalg} from '../../ducks/filtrering';
import {MineFilterTab} from './mine-filter-tab';
import {SidebarTabs} from '../../store/sidebar/sidebar-view-store';
import {FiltreringFilter} from '../../filtrering/filtrering-filter/filtrering-filter';
import {FilteringVeiledergrupper} from '../../filtrering/filtrering-veileder-grupper/filtrering-veiledergrupper';

interface Props {
    valgtFane: SidebarTabs;
    fanetittel: string;
    oversiktType: OversiktType;
    filtervalg: FiltervalgModell;
    enhettiltak: OrNothing<Tiltak>;
    statustall: StatustallForStatusfane;
    lukkSidemeny: () => void;
}

export const Fanevelger = ({
    valgtFane,
    fanetittel,
    oversiktType,
    filtervalg,
    enhettiltak,
    statustall,
    lukkSidemeny
}: Props) => {
    const dispatch = useDispatch();

    const doEndreFiltervalg = (filterId: string, filterVerdi: ReactNode) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi, oversiktType));
        oppdaterKolonneAlternativer(dispatch, {...filtervalg, [filterId]: filterVerdi}, oversiktType);
    };

    switch (valgtFane) {
        case SidebarTabs.STATUS:
        case SidebarTabs.FILTER:
        case SidebarTabs.VEILEDERGRUPPER:
            return (
                <SidebarTab tittel={fanetittel} tab={valgtFane} oversiktType={oversiktType}>
                    {valgtFane === SidebarTabs.STATUS && (
                        <FiltreringStatus oversiktType={oversiktType} filtervalg={filtervalg} statustall={statustall} />
                    )}
                    {valgtFane === SidebarTabs.FILTER && (
                        <FiltreringFilter
                            endreFiltervalg={doEndreFiltervalg}
                            filtervalg={filtervalg}
                            enhettiltak={enhettiltak}
                            oversiktType={oversiktType}
                        />
                    )}
                    {valgtFane === SidebarTabs.VEILEDERGRUPPER && (
                        <FilteringVeiledergrupper oversiktType={oversiktType} />
                    )}
                </SidebarTab>
            );
        case SidebarTabs.MINE_FILTER:
            return (
                <MineFilterTab
                    valgtFane={valgtFane}
                    fanetittel={fanetittel}
                    enhettiltak={enhettiltak}
                    oversiktType={oversiktType}
                />
            );
        default:
            return null;
    }
};
