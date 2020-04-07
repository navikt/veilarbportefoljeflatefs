import {useQueryParams} from "../use-query-params";
import {velgEnhetForVeileder} from "../../ducks/valgt-enhet";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../reducer";

export function useSetInitalEnhet() {

    const inloggetVeilederInfo = useSelector((state :AppState ) => state.inloggetVeileder.data);

    const dispatch = useDispatch();
    const enhetId = useQueryParams().enhet;

    if(!inloggetVeilederInfo) {
        return { hasError: true }
    }

    const enheter = inloggetVeilederInfo.enheter;

    if(enheter.length === 0) {
        return { hasError: true }
    }

    if(enhetId) {
        if (enheter.findIndex(enhet => enhet.enhetId === enhetId) >= 0) {
            dispatch(velgEnhetForVeileder(enhetId));
        }
    }

    return { hasError: false }

}