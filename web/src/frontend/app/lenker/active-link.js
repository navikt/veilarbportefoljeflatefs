import React, { PropTypes as PT } from 'react';
import { Link, withRouter } from 'react-router';

function ActiveLink({ router, ...props }) {
    if (router.isActive(props.to)) {
        return <span className={`${props.className} ${props.activeClassName}`} >{props.children}</span>;
    }

    return (
        <Link {...props} />
    );
}

ActiveLink.propTypes = {
    activeClassName: PT.string,
    className: PT.string,
    to: PT.string,
    children: PT.object,
    router: PT.object
};

export default withRouter(ActiveLink);
