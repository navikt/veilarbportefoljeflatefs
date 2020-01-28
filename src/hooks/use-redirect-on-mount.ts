import {useHistory, useLocation} from "react-router";
import {useOnMount} from "./use-on-mount";

export function useRedirectOnMount() {
    const history = useHistory();
    const location = useLocation();
    const lastPath = localStorage.getItem('lastpath');
    const lastSearch = localStorage.getItem('lastsearch') || '';

    useOnMount(() => {
        if (lastPath && location.pathname === "/tilbake") {
            history.replace({pathname: lastPath, search: lastSearch});
        }
        else if (location.pathname === "/") {
            history.push("/enhet")
        }
    });
}