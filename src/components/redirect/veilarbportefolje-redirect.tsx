import React, {PropsWithChildren, useEffect} from 'react';
import {useHistory, useLocation} from "react-router";

export function CustomRedirect(props: PropsWithChildren<{}>) {
    const history = useHistory();
    const pathname = useLocation().pathname;


    const lastPath = localStorage.getItem('lastpath');
    const lastSearch = localStorage.getItem('lastsearch') || '';

    useEffect(()=> {
        if (lastPath && pathname === '/tilbake') {
            history.replace({pathname: lastPath, search: lastSearch});
        }
    },[history, lastSearch, lastPath, pathname]);

    return (
        <>
            {props.children}
        </>
    )

}
