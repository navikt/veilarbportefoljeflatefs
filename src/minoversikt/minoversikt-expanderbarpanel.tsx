import FilteringLagredeFilter from "../filtrering/lagrede-filter/filtrering-lagrede-filter";
import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../reducer";
import {sjekkFeature} from "../ducks/features";
import {LAGREDE_FILTER} from "../konstanter";
import {apenLagreFilterLamell, HandlingsType, lukkLagreFilterLamell} from "../ducks/lagret-filter";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import hiddenIf from "../components/hidden-if/hidden-if";


export const HiddenIfEkspanderbartpanel = hiddenIf(Ekspanderbartpanel)

export function MinoversiktExpanderbarpanel(props: {filtergruppe}){
    const dispatch = useDispatch()
    const lagredeFilterFeatureToggleErPa = useSelector((state: AppState) => sjekkFeature(state, LAGREDE_FILTER));
    const sisteHandlingType = useSelector((state: AppState) => state.lagretFilter.handlingType);
    const erLamellApen = useSelector((state: AppState) => state.lagretFilter.erLamellApen);

    const [erApen, setErApen] = useState(erLamellApen)

    const handleOnClick = () => {
        if (erApen){
            dispatch(lukkLagreFilterLamell())
        }else{
            dispatch(apenLagreFilterLamell())
        }
    }

    useEffect(() => {
        if (sisteHandlingType === HandlingsType.NYTT) {
            dispatch(apenLagreFilterLamell())
        }
    }, [sisteHandlingType, dispatch])

    useEffect(()=>{
        setErApen(erLamellApen)
    },[erLamellApen])

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