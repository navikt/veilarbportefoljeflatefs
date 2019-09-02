import { Redirect, Route, RouteProps } from 'react-router';
import React from 'react';

export function VeilarbPortefoljeRedirect(props: RouteProps) {
    return (
        <Route
            render={() => {
            const lastPath = localStorage.getItem('lastpath');
            const lastSearch = localStorage.getItem('lastsearch') || '';
            if (lastPath && props.location!.pathname === '/tilbake') {
                return (
                    <Redirect to={{pathname: lastPath, search: lastSearch}}/>);
            } else {
                return <Redirect to={'/enhet'}/>;
            }
        }}
    />);
}
