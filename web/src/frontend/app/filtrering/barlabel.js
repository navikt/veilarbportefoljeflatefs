import React, { PropTypes as PT } from 'react';
import { Element } from 'nav-frontend-typografi';
import classNames from 'classnames';

function calcWidth(antall, max) {
    if (antall === 0) {
        return 0;
    }

    const width = Math.round(Math.min(antall / max, 1) * 100);
    return Math.max(width, 6);
}

function Barlabel({ htmlFor, tekstId, antall, max, className }) {
    const style = { width: `${calcWidth(antall, max)}%` };

    return (
        <label htmlFor={htmlFor} className={classNames('barlabel', className)}>
            <FormattedMessage id={tekstId} />
            &nbsp;
            <div className="barlabel__barwrapper">
                <Element className="barlabel__antall">{antall}</Element>
                <div className="barlabel__bar">
                    <span className="barlabel__bartrack" aria-hidden="true" />
                    <span className="barlabel__barface" aria-hidden="true" style={style} />
                </div>
            </div>
        </label>
    );
}

Barlabel.propTypes = {
    htmlFor: PT.string.isRequired,
    tekstId: PT.string.isRequired,
    antall: PT.number.isRequired,
    max: PT.number.isRequired,
    className: PT.string
};

Barlabel.defaultProps = {
    className: undefined
};

export default Barlabel;
