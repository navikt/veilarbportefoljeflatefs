import * as React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import {ReactHTML, StatelessComponent} from 'react';

function getDisplayName(comp) {
    return comp.displayName || comp.name || 'Unknown';
}

interface WrappedProps {
    id: string;
    values?: {[key: string]: string};
    tagName?: keyof ReactHTML;
    className?: string;
}

function intlWrapper(Formatter) {
    const Wrapped: StatelessComponent<WrappedProps> = ({ id, values = {}, tagName = 'span', className }) => (
        <Formatter id={id} values={values}>
            {(msg) => React.createElement(tagName, { className }, msg) }
        </Formatter>
    );

    Wrapped.displayName = `Custom${getDisplayName(Formatter)}`;

    return Wrapped;
}

export const IntlMessage = intlWrapper(FormattedMessage);
export const IntlHTMLMessage = intlWrapper(FormattedHTMLMessage);
