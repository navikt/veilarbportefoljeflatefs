import * as React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

function ActiveLink({className, activeClassName, to, ...children }) {
    return (
        <NavLink
        to={`${to}`}
        className={className}
        activeClassName={classnames(className, activeClassName)}
        aria-controls="oversikt-sideinnhold"
        role="tab"
        {...children}
    />);
}

/*

ActiveLink.propTypes = {
    router: PT.object,
    className: PT.string,
    activeClassName: PT.string,
    to: PT.string
};
*/

export default ActiveLink;
