import {useEffect} from "react";
import {hentStatusTall} from "../../ducks/statustall";
import {hentEnhetTiltak} from "../../ducks/enhettiltak";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../reducer";
import {useEnhetSelector} from "../redux/use-enhet-selector";
import {useSelectGjeldendeVeileder} from "./use-select-gjeldende-veileder";

export function useFetchMinOversiktData() {
    const dispatch = useDispatch();
    const enhet = useEnhetSelector();
    const gjeldendeVeileder = useSelectGjeldendeVeileder()
    const enhettiltak = useSelector((state: AppState)=> state.enhettiltak);
    const statustall = useSelector((state: AppState)=> state.statustall);

    useEffect(()=> {
        if (enhet){
            dispatch(hentStatusTall(enhet, gjeldendeVeileder));
            dispatch(hentEnhetTiltak(enhet));
        }
    },[enhet, dispatch, gjeldendeVeileder]);

    return {enhettiltak, statustall}

}