import React, { PropTypes as PT } from 'react';
import { injectIntl } from 'react-intl';

function MultiFormattedMessage({ id, intl, children }) {
    return children(id.map((i) => intl.formatMessage({ id: i })));
}

MultiFormattedMessage.propTypes = {
    id: PT.arrayOf(PT.string).isRequired,
    children: PT.func.isRequired,
    intl: PT.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default injectIntl(MultiFormattedMessage);
