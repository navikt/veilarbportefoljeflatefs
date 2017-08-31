import React, { PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';


function Listeoverskrift({ id, skalVises, className, values }) {
    if (!skalVises) {
        return null;
    }
    return (
        <span className={className}>
            <FormattedMessage id={id} values={values} />
        </span>
    );
}

Listeoverskrift.propTypes = {
    id: PT.string.isRequired,
    skalVises: PT.bool,
    className: PT.string,
    values: PT.object
};

Listeoverskrift.defaultProps = {
    skalVises: true,
    className: '',
    values: {}
};

export default Listeoverskrift;
