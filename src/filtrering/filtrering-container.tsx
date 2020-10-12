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
import {logEvent} from "../utils/frontend-logger";
import {finnSideNavn} from "../middleware/metrics-middleware";
import {ListevisningType} from "../ducks/ui/listevisning";

interface FiltreringContainerProps {
    enhettiltak: OrNothing<Tiltak>;
    filtervalg: FiltervalgModell;
    filtergruppe: ListevisningType;
}

function FiltreringContainer({filtergruppe, filtervalg, enhettiltak}: FiltreringContainerProps) {
    const dispatch = useDispatch();

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
                onClick={klikkPaLagredeFilter}
                className="mine-filter-wrapper"
            >
                <FiltreringMineFilter filtergruppe={filtergruppe}/>
            </MetrikkEkspanderbartpanel>
            <MetrikkEkspanderbartpanel
                apen={false}
                tittel="Veiledergrupper"
                lamellNavn="veiledergrupper"
                hidden={filtergruppe === ListevisningType.minOversikt}
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
                apen={filtergruppe !== ListevisningType.minOversikt}
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
