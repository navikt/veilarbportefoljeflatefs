import React, { PropTypes as PT } from 'react';

function SimpleLink(fraIndeks, tilIndeks, child, func, className) {
    return (
        <button
            className={className}
            onClick={(e) => {
                e.preventDefault();
                func(fraIndeks, tilIndeks);
            }}
        >
            {child}
        </button>);
}

SimpleLink.defaultProps = {
    className: ''
};

SimpleLink.propTypes = {
    fraIndeks: PT.string.isRequired,
    tilIndeks: PT.string.isRequired,
    child: PT.element.isRequired,
    className: PT.string,
    func: PT.func.isRequired
};

export default SimpleLink;
