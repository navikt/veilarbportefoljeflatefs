import {loggSkjermMetrikker, Side} from "../../utils/metrikker/skjerm-metrikker";
import {loggSideVisning} from "../../utils/metrikker/side-visning-metrikker";
import { getInitialStateFromUrl  } from "../../utils/url-utils";
import {pagineringSetup} from "../../ducks/paginering";
import {settSortering} from "../../ducks/portefolje";
import {useIdentSelector} from "../redux/use-inlogget-ident";
import {useDispatch, useSelector} from "react-redux";
import {useEnhetSelector} from "../redux/use-enhet-selector";
import {useCallback, useEffect} from "react";
import {useHistory, useLocation, useParams} from "react-router";
import * as queryString from "query-string";
import {AppState} from "../../reducer";
import {useSetEnhetIUrl} from "./use-set-enhet-i-url";
import {useSetSideIUrl} from "./use-set-side-i-url";

export function useSetStateFromUrl() {
    const innloggetVeilederIdent = useIdentSelector();
    const dispatch = useDispatch();

    const enhet = useEnhetSelector();
    const location = useLocation();
    const {ident } = useParams();

    const history = useHistory();

    const sorteringsrekkefolge =  useSelector((state: AppState) => state.portefolje.sorteringsrekkefolge);
    const sorteringsfelt =  useSelector((state: AppState) => state.portefolje.sorteringsfelt);

    const pathname = location.pathname;

    const settInitalStateFraUrl = useCallback( ()=> {
        const {side, seAlle, sorteringsfelt, sorteringsrekkefolge} = getInitialStateFromUrl();
        dispatch(pagineringSetup({side, seAlle}));
        dispatch(settSortering(sorteringsrekkefolge , sorteringsfelt));
    },[dispatch]);


    useEffect(()=> {
        if (sorteringsfelt) {
            const parsed = queryString.parse(window.location.search);
            parsed.sorteringsfelt = sorteringsfelt;
            parsed.sorteringsrekkefolge = sorteringsrekkefolge ? sorteringsrekkefolge : '';

            const stringified = queryString.stringify(parsed);
            history.replace({pathname, search: stringified});
        }
    },[sorteringsrekkefolge, sorteringsfelt, history, pathname]);

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
    useSetEnhetIUrl();
    useSetSideIUrl();

    useEffect(()=> {
        loggSkjermMetrikker(side);
        loggSideVisning(innloggetVeilederIdent, side);
    },[side, innloggetVeilederIdent, enhet, settInitalStateFraUrl]);

}