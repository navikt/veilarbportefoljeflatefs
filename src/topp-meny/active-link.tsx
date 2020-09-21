import * as React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

interface ActiveLinkProps {
    className: string;
    activeClassName: string;
    children: React.ReactNode;
    to: string;
    ariaControls: string;
    title?: string;
    hidden?: boolean;
}

function ActiveLink({className, activeClassName, to, children, title, hidden, ariaControls}: ActiveLinkProps) {
    return (
        <NavLink
            to={to}
            className={className}
            activeClassName={classnames(className, activeClassName)}
            aria-controls={ariaControls}
            id={ariaControls}
            role="tab"
            title={title}
            hidden={hidden}
        >
            {children}
        </NavLink>
    );
}

export default ActiveLink;
