import {useEffect} from "react";
import * as queryString from "query-string";
import {useEnhetSelector} from "../redux/use-enhet-selector";
import {useHistory, useLocation} from "react-router";

export function useSetEnhetIUrl() {

    const enhet = useEnhetSelector();
    const history = useHistory();
    const location = useLocation();

    const pathname = location.pathname;

    useEffect(()=> {
        if (enhet) {
            const parsed = queryString.parse(window.location.search);
            parsed.enhet = enhet;
            const stringified = queryString.stringify(parsed);
            history.replace({pathname, search: stringified});
        }
    },[history, enhet, pathname]);
}