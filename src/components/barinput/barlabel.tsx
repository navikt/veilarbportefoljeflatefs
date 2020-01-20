import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import classNames from 'classnames';
import { tekstAntallBrukere } from '../../utils/tekst-utils';
import "./barlabel.less";

function calcWidth(antall: number, max: number): number {
    if (antall === 0) {
        return 0;
    }

    const width = Math.round(Math.min(antall / max, 1) * 100);
    return Math.max(width, 6);
}

export interface BarlabelProps {
    htmlFor: string;
    labelTekst: string;
    antall: number;
    max: number;
    className?: string;
}

function Barlabel({htmlFor, labelTekst, antall, max, className}: BarlabelProps) {
    const style = {width: `${calcWidth(antall, max)}%`};

    return (
        <label htmlFor={htmlFor} className={classNames('barlabel', className)}>
            <span className="barlabel__labeltext">
                {labelTekst}
            </span>
            &nbsp;
            <div className="barlabel__barwrapper">
                {htmlFor === 'minArbeidsliste' && <div className="arbeidsliste">
                <span className="text-hide" aria-live="polite" aria-atomic="true">
                    {`Det er ${tekstAntallBrukere(antall)} i Min arbeidsliste`}
                </span>
                    <Element className="barlabel__antall" aria-hidden="true">{antall}</Element>
                </div>
                }
                {htmlFor !== 'minArbeidsliste' &&
                <Element className="barlabel__antall">{antall}</Element>
                }
                <div className="barlabel__bar">
                    <span className="barlabel__bartrack" aria-hidden="true"/>
                    <span className="barlabel__barface" aria-hidden="true" style={style}/>
                </div>
            </div>
        </label>
    );
}

export default Barlabel;
