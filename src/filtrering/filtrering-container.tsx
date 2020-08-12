import * as React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {endreFiltervalg} from '../ducks/filtrering';
import {FiltervalgModell} from '../model-interfaces';
import FiltreringFilter from './filtrering-filter';
import FiltreringNavnellerfnr from './filtrering-navnellerfnr';
import MetrikkEkspanderbartpanel from '../components/ekspandertbart-panel/metrikk-ekspanderbartpanel';
import {FiltreringStatus} from './filtrering-status/filtrering-status';
import FilteringVeilederGrupper from './filtrering-veileder-grupper/filtrering-veileder-grupper';
import {OrNothing} from '../utils/types/types';
import {Tiltak} from '../ducks/enhettiltak';
import {pagineringSetup} from '../ducks/paginering';
import {hentLagredeFilterForVeileder} from "../ducks/lagret-filter";
import FilteringLagredeFilter from "./lagrede-filter/filtrering-lagrede-filter";
import {AppState} from "../reducer";
import {sjekkFeature} from "../ducks/features";
import {LAGREDE_FILTER} from "../konstanter";
import {logEvent} from "../utils/frontend-logger";
import {finnSideNavn} from "../middleware/metrics-middleware";

interface FiltreringContainerProps {
    enhettiltak: OrNothing<Tiltak>;
    filtervalg: FiltervalgModell;
    filtergruppe?: string;
}

function FiltreringContainer({filtergruppe, filtervalg, enhettiltak}: FiltreringContainerProps) {
    const dispatch = useDispatch();
    const lagredeFilterFeatureToggleErPa = useSelector((state: AppState) => sjekkFeature(state, LAGREDE_FILTER));

    useEffect(() => {
        if (filtergruppe === "veileder" && lagredeFilterFeatureToggleErPa) {
            dispatch(hentLagredeFilterForVeileder());
        }
    }, [filtergruppe, dispatch])


    const doEndreFiltervalg = (filterId: string, filterVerdi: any) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi, filtergruppe));
    };

    const sessionConfig = {
        key: '@lagret-filter-lamell-apen',
    };

    const [erLagredeFilterApen, setErLagredeFilterApen] = useState<boolean>(sessionStorage.getItem(sessionConfig.key) === "true")
    const klikkPaLagredeFilter = () => {
        if (erLagredeFilterApen) {
            setErLagredeFilterApen(false)
            sessionStorage.setItem(sessionConfig.key, "false");
        } else {
            setErLagredeFilterApen(true)
            sessionStorage.setItem(sessionConfig.key, "true");
        }
        logEvent('portefolje.metrikker.lamell', {
            navn: "mine-filter",
            apen: !erLagredeFilterApen,
            sideNavn: finnSideNavn(),
        });
    }

    return (
        <div className="blokk-m">
            <FiltreringNavnellerfnr
                filtervalg={filtervalg}
                endreFiltervalg={doEndreFiltervalg}
            />
            <MetrikkEkspanderbartpanel
                apen={erLagredeFilterApen}
                lamellNavn="mine-filter"
                tittel="Mine filter"
                tittelProps="undertittel"
                onClick={klikkPaLagredeFilter}
                hidden={!lagredeFilterFeatureToggleErPa || filtergruppe !== 'veileder'}
                className="lagrede-filter-wrapper"
            >
                <FilteringLagredeFilter/>
            </MetrikkEkspanderbartpanel>
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
