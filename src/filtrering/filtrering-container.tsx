import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {endreFiltervalg} from '../ducks/filtrering';
import {FiltervalgModell} from '../model-interfaces';
import FiltreringFilter from './filtrering-filter';
import FiltreringNavnellerfnr from './filtrering-navnellerfnr';
import MetrikkEkspanderbartpanel from '../components/toolbar/metrikk-ekspanderbartpanel';
import {FiltreringStatus} from './filtrering-status/filtrering-status';
import FilteringVeilederGrupper from './filtrering-veileder-grupper/filtrering-veileder-grupper';
import {OrNothing} from '../utils/types/types';
import {Tiltak} from '../ducks/enhettiltak';
import {pagineringSetup} from '../ducks/paginering';
import {hentLagredeFilterForVeileder} from "../ducks/lagret-filter";
import {MinoversiktExpanderbarpanel} from "../minoversikt/minoversikt-expanderbarpanel";

interface FiltreringContainerProps {
    enhettiltak: OrNothing<Tiltak>;
    filtervalg: FiltervalgModell;
    filtergruppe?: string;
}

function FiltreringContainer({filtergruppe, filtervalg, enhettiltak}: FiltreringContainerProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (filtergruppe === "veileder") {
            dispatch(hentLagredeFilterForVeileder());
        }
    }, [filtergruppe, dispatch])


    const doEndreFiltervalg = (filterId: string, filterVerdi: any) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi, filtergruppe));
    };

    return (
        <div className="blokk-m">
            <FiltreringNavnellerfnr
                filtervalg={filtervalg}
                endreFiltervalg={doEndreFiltervalg}
            />
            <MinoversiktExpanderbarpanel filtergruppe={filtergruppe}/>
            <MetrikkEkspanderbartpanel
                apen={false}
                tittel="Veiledergrupper"
                tittelProps="undertittel"
                lamellNavn="veiledergrupper"
                hidden={filtergruppe === 'veileder'}
            >
                <FilteringVeilederGrupper filtergruppe={filtergruppe}/>
            </MetrikkEkspanderbartpanel>
            <MetrikkEkspanderbartpanel
                apen
                tittel="Status"
                tittelProps="undertittel"
                lamellNavn="status"
            >
                <FiltreringStatus
                    filtergruppe={filtergruppe}
                    filtervalg={filtervalg}
                />
            </MetrikkEkspanderbartpanel>
            <MetrikkEkspanderbartpanel
                apen={filtergruppe !== 'veileder'}
                tittel="Filter"
                tittelProps="undertittel"
                lamellNavn="filtergruppe"
            >
                <FiltreringFilter
                    endreFiltervalg={doEndreFiltervalg}
                    filtervalg={filtervalg}
                    enhettiltak={enhettiltak}
                />
            </MetrikkEkspanderbartpanel>
        </div>
    );
}

export default FiltreringContainer;
