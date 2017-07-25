import React, { PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';


function Listeoverskrift({ id, skalVises, className }) {
    if (!skalVises) {
        return null;
    }
    return (
        <span className={className}>
            <FormattedMessage id={id} />
        </span>
    );
}

Listeoverskrift.propTypes = {
    id: PT.string.isRequired,
    skalVises: PT.bool,
    className: PT.string
};

Listeoverskrift.defaultProps = {
    skalVises: true,
    className: ''
};

export default Listeoverskrift;
