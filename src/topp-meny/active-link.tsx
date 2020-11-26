import * as React from 'react';
import {NavLink} from 'react-router-dom';
import classNames from 'classnames';

interface ActiveLinkProps {
    className: string;
    activeClassName: string;
    children: React.ReactNode;
    to: string;
    id: string;
    title?: string;
    hidden?: boolean;
}

function ActiveLink({className, activeClassName, to, children, title, hidden, id}: ActiveLinkProps) {
    return (
        <NavLink
            to={to}
            className={className}
            activeClassName={classNames(className, activeClassName)}
            id={id}
            title={title}
            hidden={hidden}
            data-testid={id}
        >
            {children}
        </NavLink>
    );
}

export default ActiveLink;
