import {useEffect} from "react";
import * as queryString from "query-string";
import {useHistory, useLocation} from "react-router";
import {useSelector} from "react-redux";
import {AppState} from "../../reducer";

export function useSetSideIUrl() {

    const history = useHistory();
    const location = useLocation();
    const {side, seAlle, } = useSelector((state: AppState)=> state.paginering);

    useEffect(()=> {
        if (side) {
            const parsed = queryString.parse(window.location.search);
            parsed.side = side;

            const stringified = queryString.stringify(parsed);
            history.replace(`${window.location.pathname}?${stringified}`);
        }
    },[history, side]);

    useEffect(()=> {
        const parsed = queryString.parse(window.location.search);
        parsed.seAlle = seAlle;
        const stringified = queryString.stringify(parsed);
        history.replace(`${window.location.pathname}?${stringified}`);
    },[history, seAlle]);
}