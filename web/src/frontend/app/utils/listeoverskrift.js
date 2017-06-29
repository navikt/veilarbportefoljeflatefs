import React, { PropTypes as PT } from 'react';

function Listeoverskrift({ children, skalVises, className }) {
    if (!skalVises) {
        return null;
    }
    return (
        <span className={className}>
            {children}
        </span>
    );
}

Listeoverskrift.propTypes = {
    children: PT.node.isRequired,
    skalVises: PT.bool,
    className: PT.string
};

Listeoverskrift.defaultProps = {
    skalVises: true,
    className: ''
};

export default Listeoverskrift;
