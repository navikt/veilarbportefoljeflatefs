import * as React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
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
import FiltreringMineFilter from "./filtrering-mine-filter/filtrering-mine-filter";
import {MINE_FILTER} from "../konstanter";
import {logEvent} from "../utils/frontend-logger";
import {finnSideNavn} from "../middleware/metrics-middleware";
import {useFeatureSelector} from "../hooks/redux/use-feature-selector";

interface FiltreringContainerProps {
    enhettiltak: OrNothing<Tiltak>;
    filtervalg: FiltervalgModell;
    filtergruppe: string;
}

function FiltreringContainer({filtergruppe, filtervalg, enhettiltak}: FiltreringContainerProps) {
    const dispatch = useDispatch();
    const erMineFilterFeatureTogglePa = useFeatureSelector()(MINE_FILTER)

    const doEndreFiltervalg = (filterId: string, filterVerdi: any) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi, filtergruppe));
    };

    const sessionConfig = {
        key: '@lagret-filter-lamell-apen',
    };

    const [erMineFilterApen, setErMineFilterApen] = useState<boolean>(sessionStorage.getItem(sessionConfig.key) === "true")
    const klikkPaMineFilter = () => {
        if (erMineFilterApen) {
            setErMineFilterApen(false)
            sessionStorage.setItem(sessionConfig.key, "false");
        } else {
            setErMineFilterApen(true)
            sessionStorage.setItem(sessionConfig.key, "true");
        }
        logEvent('portefolje.metrikker.lamell', {
            navn: "mine-filter",
            apen: !erMineFilterApen,
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
                apen={erMineFilterApen}
                lamellNavn="mine-filter"
                tittel="Mine filter"
                onClick={klikkPaMineFilter}
                hidden={!erMineFilterFeatureTogglePa}
                className="mine-filter-wrapper"
            >
                <FiltreringMineFilter filtergruppe={filtergruppe}/>
            </MetrikkEkspanderbartpanel>
            <MetrikkEkspanderbartpanel
                apen={false}
                tittel="Veiledergrupper"
                lamellNavn="veiledergrupper"
                hidden={filtergruppe === 'veileder'}
            >
                <FilteringVeilederGrupper filtergruppe={filtergruppe}/>
            </MetrikkEkspanderbartpanel>
            <MetrikkEkspanderbartpanel
                apen
                tittel="Status"
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
