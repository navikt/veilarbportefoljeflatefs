import React, { PropTypes as PT } from 'react';
import { Link, withRouter } from 'react-router';

function ActiveLink({ router, ...props }) {
    const isActive = router.isActive(props.to);
    const className = isActive ? `${props.className} ${props.activeClassName}` : props.className;

    return (<Link
        to={props.to}
        className={className}
        onClick={props.onClick}
        aria-controls="oversikt-sideinnhold"
        aria-selected={isActive}
        role="tab"
    >
        {props.children}
    </Link>);
}

ActiveLink.propTypes = {
    activeClassName: PT.string,
    className: PT.string,
    to: PT.string,
    children: PT.object,
    onClick: PT.func,
    router: PT.object
};

export default withRouter(ActiveLink);
