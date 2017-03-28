import React, { PropTypes as PT } from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

function getDisplayName(comp) {
    return comp.displayName || comp.name || 'Unknown';
}

function intlWrapper(Formatter) {
    const Wrapped = ({ id, values, tagName, className }) => (
        <Formatter id={id} values={values}>
            {(msg) => React.createElement(tagName, { className }, msg) }
        </Formatter>
    );

    Wrapped.propTypes = {
        id: PT.string.isRequired,
        values: PT.string,
        tagName: PT.string,
        className: PT.string
    };

    Wrapped.defaultProps = {
        values: {},
        tagName: 'span',
        className: undefined
    };

    Wrapped.displayName = `Custom${getDisplayName(Formatter)}`;

    return Wrapped;
}

export const IntlMessage = intlWrapper(FormattedMessage);
export const IntlHTMLMessage = intlWrapper(FormattedHTMLMessage);
