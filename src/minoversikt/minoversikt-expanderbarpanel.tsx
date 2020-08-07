import FilteringLagredeFilter from "../filtrering/lagrede-filter/filtrering-lagrede-filter";
import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../reducer";
import {sjekkFeature} from "../ducks/features";
import {LAGREDE_FILTER} from "../konstanter";
import {HandlingsType} from "../ducks/lagret-filter";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import hiddenIf from "../components/hidden-if/hidden-if";


export const HiddenIfEkspanderbartpanel = hiddenIf(Ekspanderbartpanel)

export function MinoversiktExpanderbarpanel(props: {filtergruppe}){
    const sessionConfig = {
        key: '@lagret-filter-lamell-apen',
    };

    const dispatch = useDispatch()
    const lagredeFilterFeatureToggleErPa = useSelector((state: AppState) => sjekkFeature(state, LAGREDE_FILTER));
    const sisteHandlingType = useSelector((state: AppState) => state.lagretFilter.handlingType);
    const [erApen, setErApen] = useState<boolean>(sessionStorage.getItem(sessionConfig.key) === "true")

    const handleOnClick = () => {
        if (erApen){
            setErApen(false)
            sessionStorage.setItem(sessionConfig.key, "false");
        }else{
            setErApen(true)
            sessionStorage.setItem(sessionConfig.key, "true");
        }
    }

    useEffect(() => {
        if (sisteHandlingType === HandlingsType.NYTT) {
            setErApen(true)
        }
    }, [sisteHandlingType, dispatch])

    return(
        <div className="blokk-xxs portefolje__ekspanderbarpanel">
        <HiddenIfEkspanderbartpanel
            apen={erApen}
            tittel="Mine filter"
            tittelProps="undertittel"
            hidden={props.filtergruppe !== 'veileder' || !lagredeFilterFeatureToggleErPa}
            border={true}
            onClick={handleOnClick}
        >
            <FilteringLagredeFilter/>
        </HiddenIfEkspanderbartpanel>
        </div>
    )
}