import * as React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

interface ActiveLinkProps {
    className: string;
    activeClassName: string;
    children: React.ReactNode;
    to: string;
    title?: string;
    hidden?: boolean
}

function ActiveLink({className, activeClassName, to, children, title, hidden}: ActiveLinkProps) {
    return (
        <NavLink
            to={to}
            className={className}
            activeClassName={classnames(className, activeClassName)}
            aria-controls="oversikt-sideinnhold"
            role="tab"
            title={title}
            hidden={hidden}
        >
            {children}
        </NavLink>
    );
}

export default ActiveLink;
