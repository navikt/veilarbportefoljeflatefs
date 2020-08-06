import FilteringLagredeFilter from "../filtrering/lagrede-filter/filtrering-lagrede-filter";
import MetrikkEkspanderbartpanel from "../components/toolbar/metrikk-ekspanderbartpanel";
import * as React from "react";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AppState} from "../reducer";
import {sjekkFeature} from "../ducks/features";
import {LAGREDE_FILTER} from "../konstanter";
import {HandlingsType} from "../ducks/lagret-filter";


export function MinoversiktExpanderbarpanel(props: {filtergruppe}){
    const lagredeFilterFeatureToggleErPa = useSelector((state: AppState) => sjekkFeature(state, LAGREDE_FILTER));
    const sisteHandlingType = useSelector((state: AppState) => state.lagretFilter.handlingType);

    const [erApen, setErApen] = useState(false)

    useEffect(() => {
        if (sisteHandlingType === HandlingsType.NYTT) {
            setErApen(true)
        }
    }, [sisteHandlingType])

    return(
        <MetrikkEkspanderbartpanel
            apen={erApen}
            tittel="Mine filter"
            tittelProps="undertittel"
            lamellNavn="lagredefilter"
            hidden={props.filtergruppe !== 'veileder' || !lagredeFilterFeatureToggleErPa}
        >
            <FilteringLagredeFilter/>
        </MetrikkEkspanderbartpanel>
    )
}