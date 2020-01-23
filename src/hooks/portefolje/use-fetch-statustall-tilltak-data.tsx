import {useEffect} from "react";
import {hentStatusTall} from "../../ducks/statustall";
import {hentEnhetTiltak} from "../../ducks/enhettiltak";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../reducer";
import {useEnhetSelector} from "../redux/use-enhet-selector";
import {hentPortefoljeStorrelser} from "../../ducks/portefoljestorrelser";
import {hentVeiledereForEnhet} from "../../ducks/veiledere";
import {hentLagretFilterForEnhet} from "../../ducks/lagret-filter";

export function useFetchStatustallTilltakData(gjeldendeVeileder?: string) {
    const dispatch = useDispatch();
    const enhet = useEnhetSelector();

    const enhettiltak = useSelector((state: AppState)=> state.enhettiltak);
    const statustall = useSelector((state: AppState)=> state.statustall);
    const portefoljestorrelser = useSelector((state: AppState)=> state.portefoljestorrelser);
    const veiledere = useSelector((state:AppState) => state.veiledere);

    useEffect(()=> {
        if (enhet){
            dispatch(hentStatusTall(enhet, gjeldendeVeileder));
            dispatch(hentPortefoljeStorrelser(enhet));
            dispatch(hentVeiledereForEnhet(enhet));
            dispatch(hentEnhetTiltak(enhet));
            dispatch(hentLagretFilterForEnhet(enhet));
        }
    },[enhet, dispatch, gjeldendeVeileder]);

    return {enhettiltak, statustall, portefoljestorrelser, veiledere}

}