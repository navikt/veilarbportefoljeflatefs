import {useHistory, useLocation} from "react-router";
import {useOnMount} from "./use-on-mount";

export function useRedirectOnMount() {
    const history = useHistory();
    const location = useLocation();
    const lastPath = localStorage.getItem('lastpath');
    const lastSearch = localStorage.getItem('lastsearch') || '';

    useOnMount(() => {
        if (location.pathname.includes("/tilbake")) {
            if(lastPath) {
                history.replace({pathname: lastPath, search: lastSearch});
            } else {
                history.replace({pathname: "/enhet"});
            }
        }
        else if (location.pathname === "/") {
            history.push("/enhet")
        }
    });
}