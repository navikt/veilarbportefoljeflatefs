import * as React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

interface ActiveLinkProps {
    className: string;
    activeClassName: string;
    children: React.ReactNode;
    to: string;
}

function ActiveLink({className, activeClassName, to, children}: ActiveLinkProps) {
    return (
        <NavLink
            to={to}
            className={className}
            activeClassName={classnames(className, activeClassName)}
            aria-controls="oversikt-sideinnhold"
            role="tab"
         >
            {children}
        </NavLink>
    );
}

export default ActiveLink;
