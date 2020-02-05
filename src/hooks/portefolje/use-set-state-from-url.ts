import {loggSkjermMetrikker, Side} from "../../utils/metrikker/skjerm-metrikker";
import {loggSideVisning} from "../../utils/metrikker/side-visning-metrikker";
import { getInitialStateFromUrl  } from "../../utils/url-utils";
import {pagineringSetup} from "../../ducks/paginering";
import {settSortering} from "../../ducks/portefolje";
import {useIdentSelector} from "../redux/use-inlogget-ident";
import {useDispatch } from "react-redux";
import {useCallback } from "react";
import { useLocation, useParams } from "react-router";
import {useOnMount} from "../use-on-mount";

export function useSetStateFromUrl() {
    const innloggetVeilederIdent = useIdentSelector();
    const dispatch = useDispatch();

    const location = useLocation();
    const {ident } = useParams();

    const pathname = location.pathname;

    const settInitalStateFraUrl = useCallback( ()=> {
        const {side, seAlle, sorteringsfelt, sorteringsrekkefolge} = getInitialStateFromUrl();
        dispatch(pagineringSetup({side, seAlle}));
        dispatch(settSortering(sorteringsrekkefolge , sorteringsfelt));
    },[dispatch]);



    function getSideFromPathName(pathName) {
        switch (pathName) {
            case `/portefolje/${ident}`:
                return Side.VEILEDER_PORTEFOLJE_OVERSIKT;
            case "/portefolje":
                return Side.MIN_OVERSIKT;
            case "/enhet":
                return Side.ENHETENS_OVERSIKT;
            default:
                return Side.MIN_OVERSIKT;
        }
    }
    const side = useCallback(getSideFromPathName,[pathname])(pathname);


    useOnMount(()=> {
        loggSkjermMetrikker(side);
        loggSideVisning(innloggetVeilederIdent, side);
        settInitalStateFraUrl()
    });

}