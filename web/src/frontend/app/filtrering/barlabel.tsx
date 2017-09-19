import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import * as classNames from 'classnames';

function calcWidth(antall: number, max: number): number {
    if (antall === 0) {
        return 0;
    }

    const width = Math.round(Math.min(antall / max, 1) * 100);
    return Math.max(width, 6);
}

interface BarlabelProps {
    htmlFor: string;
    tekstId: string;
    antall: number;
    max: number;
    className?: string;
}

function Barlabel({ htmlFor, tekstId, antall, max, className }: BarlabelProps) {
    const style = { width: `${calcWidth(antall, max)}%` };

    return (
        <label htmlFor={htmlFor} className={classNames('barlabel', className)}>
            <span className="barlabel__labeltext" >
                <FormattedMessage id={tekstId} />
            </span>
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

export default Barlabel;
