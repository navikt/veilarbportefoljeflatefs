import {useEffect} from "react";
import {hentStatusTall} from "../../ducks/statustall";
import {hentEnhetTiltak} from "../../ducks/enhettiltak";
import {hentLagretFilterForEnhet} from "../../ducks/lagret-filter";
import {useDispatch, useSelector} from "react-redux";
import {useEnhetSelector} from "../redux/use-enhet-selector";
import {AppState} from "../../reducer";

export function useFetchEnhetData () {

    const dispatch = useDispatch();
    const enhet = useEnhetSelector();

    const statustall = useSelector((state: AppState) => state.statustall);
    const enhettiltak = useSelector((state: AppState) => state.enhettiltak);

    useEffect(()=> {
        if(enhet) {
            dispatch(hentStatusTall(enhet));
            dispatch(hentEnhetTiltak(enhet));
            dispatch(hentLagretFilterForEnhet(enhet));
        }
    },[enhet, dispatch]);

    return {statustall, enhettiltak}
}