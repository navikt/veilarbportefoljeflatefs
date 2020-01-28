import {useHistory, useLocation} from "react-router";
import {useOnMount} from "./use-on-mount";

export function useRedirectOnMount() {
    const history = useHistory();
    const location = useLocation();
    const lastPath = localStorage.getItem('lastpath');
    const lastSearch = localStorage.getItem('lastsearch') || '';
    const pathname = location.pathname;

    useOnMount(() => {
        if (lastPath && pathname === "/tilbake") {
            console.log("kjører tilbake");
            console.log("pathname", pathname);
            history.replace({pathname: lastPath, search: lastSearch});
        }
        else if (pathname === "/") {
            console.log("kjører redirect");
            console.log("pathname", pathname);
            history.push("/enhet")
        }
    });
}