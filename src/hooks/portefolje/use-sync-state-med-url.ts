import {useEffect} from "react";
import * as queryString from "query-string";
import {useHistory, useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../reducer";
import {useSetEnhetIUrl} from "./use-set-enhet-i-url";

export function useSyncStateMedUrl() {

    const history = useHistory();
    const location = useLocation();
    const {side, seAlle } = useSelector((state: AppState) => state.paginering);
    const {sorteringsrekkefolge, sorteringsfelt} =  useSelector((state: AppState) => state.portefolje);

    const pathname = location.pathname;

    const dispatch = useDispatch();

    useEffect(()=> {
        if (side) {
            const parsed = queryString.parse(window.location.search);
            parsed.side = side;
            parsed.seAlle = seAlle;
            const stringified = queryString.stringify(parsed);
            history.replace({pathname, search:stringified});
        }
    },[history, side, pathname, seAlle, dispatch]);

    useEffect(()=> {
        if (sorteringsfelt) {
            const parsed = queryString.parse(window.location.search);
            parsed.sorteringsfelt = sorteringsfelt;
            parsed.sorteringsrekkefolge = sorteringsrekkefolge ? sorteringsrekkefolge : '';

            const stringified = queryString.stringify(parsed);
            history.replace({pathname, search: stringified});
        }
    },[sorteringsrekkefolge, sorteringsfelt, history, pathname]);

    useSetEnhetIUrl();

}