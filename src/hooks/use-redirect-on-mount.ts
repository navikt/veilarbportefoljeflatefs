import {useHistory, useLocation} from "react-router";
import {useOnMount} from "./use-on-mount";
import * as queryString from "query-string";
import {settSortering} from "../ducks/portefolje";
import {useDispatch} from "react-redux";

export function useRedirectOnMount() {
    const history = useHistory();
    const location = useLocation();
    const lastPath = localStorage.getItem('lastpath');
    const lastSearch = localStorage.getItem('lastsearch') || '';
    const pathname = location.pathname;
    const dispatch = useDispatch();

    const parsed = queryString.parse(location.search);

    useOnMount(() => {
        if (pathname.includes("/tilbake")) {
            if(lastPath) {
                history.replace({pathname: lastPath, search: lastSearch});
                const sorteringsfelt  = queryString.parse(lastSearch).sorteringsfelt;
                const sortDirection  = queryString.parse(lastSearch).sorteringsrekkefolge;
                dispatch(settSortering(sortDirection, sorteringsfelt))
            } else {
                history.replace({pathname: "/enhet"});
            }
        }
        else if (Object.keys(parsed).includes('clean')){
            delete parsed.clean;
            const stringified = queryString.stringify(parsed);
            history.replace(`${pathname}?${stringified}`);
        }
        else if (location.pathname === "/") {
            history.push("/enhet")
            dispatch(settSortering('ikke_satt', 'ikke_satt'))
        }
    });
}