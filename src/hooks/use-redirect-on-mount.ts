import {useHistory, useLocation} from "react-router";
import {useOnMount} from "./use-on-mount";
import * as queryString from "query-string";

export function useRedirectOnMount() {
    const history = useHistory();
    const location = useLocation();
    const lastPath = localStorage.getItem('lastpath');
    const lastSearch = localStorage.getItem('lastsearch') || '';
    const pathname = location.pathname;

    const parsed = queryString.parse(location.search);

    useOnMount(() => {
        if (pathname.includes("/tilbake")) {
            if(lastPath) {
                history.replace({pathname: lastPath, search: lastSearch});
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
        }
    });
}