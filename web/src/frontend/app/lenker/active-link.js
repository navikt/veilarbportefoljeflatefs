import React, { PropTypes as PT } from 'react';
import { Link, withRouter } from 'react-router';
import classnames from 'classnames';
import { omit } from './../utils/utils';

function ActiveLink({ router, className, activeClassName, to, ...props }) {
    const isActive = router.isActive(to);
    const domProps = omit(props, 'params', 'location', 'routes');

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
