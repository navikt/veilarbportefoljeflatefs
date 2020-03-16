import {useDispatch, useSelector} from "react-redux";
import {useEnhetSelector} from "../redux/use-enhet-selector";
import {AppState} from "../../reducer";
import {useEffect} from "react";
import {hentStatusTall} from "../../ducks/statustall";

export function useFetchStatusTall(gjeldendeVeileder?: string) {
    const dispatch = useDispatch();
    const enhet = useEnhetSelector();

    const statustall = useSelector((state: AppState)=> state.statustall);

    useEffect(()=> {
        if (enhet){
            dispatch(hentStatusTall(enhet, gjeldendeVeileder));
        }
    },[enhet, dispatch, gjeldendeVeileder]);

    return statustall
}