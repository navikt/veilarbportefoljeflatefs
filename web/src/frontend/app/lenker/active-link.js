import React, { PropTypes as PT } from 'react';
import { Link, withRouter } from 'react-router';
import classnames from 'classnames';

function ActiveLink({ router, className, activeClassName, to, ...props }) {
    const isActive = router.isActive(to);
    const { params: _params, location: _location, routes: _routes, ...domProps } = props;

    return (<Link
        to={to}
        className={classnames(className, { [activeClassName]: isActive })}
        aria-controls="oversikt-sideinnhold"
        aria-selected={isActive}
        role="tab"
        {...domProps}
    />);
}

ActiveLink.propTypes = {
    router: PT.object,
    className: PT.string,
    activeClassName: PT.string,
    to: PT.string
};

export default withRouter(ActiveLink);
