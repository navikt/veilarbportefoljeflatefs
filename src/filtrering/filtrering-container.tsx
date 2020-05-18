import * as React from 'react';
import { useDispatch } from 'react-redux';
import { endreFiltervalg } from '../ducks/filtrering';
import { FiltervalgModell } from '../model-interfaces';
import FiltreringFilter from './filtrering-filter';
import FiltreringNavnellerfnr from './filtrering-navnellerfnr';
import MetrikkEkspanderbartpanel from '../components/toolbar/metrikk-ekspanderbartpanel';
import { FiltreringStatus } from './filtrering-status/filtrering-status';
import FilteringVeilederGrupper from './filtrering-veileder-grupper/filtrering-veileder-grupper';
import { OrNothing } from '../utils/types/types';
import { Tiltak } from '../ducks/enhettiltak';
import { pagineringSetup } from '../ducks/paginering';
import FiltreringInformasjonOmBruker from './filtrering-informasjon-fra-bruker/filtrering-informasjon-fra-bruker';
import { useFeatureSelector } from '../hooks/redux/use-feature-selector';
import { CVJOBBPROFIL } from '../konstanter';

interface FiltreringContainerProps {
    enhettiltak: OrNothing<Tiltak>;
    filtervalg: FiltervalgModell;
    filtergruppe?: string;
}

function FiltreringContainer({filtergruppe, filtervalg, enhettiltak}: FiltreringContainerProps) {

    const dispatch = useDispatch();
    const doEndreFiltervalg = (filterId: string, filterVerdi: any) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi, filtergruppe));
    };
    const erCvJobbprofilFeaturePa = useFeatureSelector()(CVJOBBPROFIL);

    return (
        <div className="blokk-m">
            <FiltreringNavnellerfnr
                filtervalg={filtervalg}
                endreFiltervalg={doEndreFiltervalg}
            />
            <MetrikkEkspanderbartpanel
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
            {erCvJobbprofilFeaturePa &&
            <MetrikkEkspanderbartpanel
                tittel="Informasjon fra bruker"
                tittelProps="undertittel"
                lamellNavn="informasjon-fra-bruker"
            >
                <FiltreringInformasjonOmBruker
                    filtervalg={filtervalg}
                    endreFiltervalg={doEndreFiltervalg}
                />
            </MetrikkEkspanderbartpanel>
            }
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
