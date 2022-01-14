import * as React from 'react';
import classNames from 'classnames';
import {tekstAntallBrukere} from '../../utils/tekst-utils';
import './barlabel.less';
import {Label} from '@navikt/ds-react';

export interface BarlabelProps {
    htmlFor: string;
    labelTekst: React.ReactNode;
    antall: number;
    className?: string;
}

function Barlabel({htmlFor, labelTekst, antall, className}: BarlabelProps) {
    return (
        <label htmlFor={htmlFor} className={classNames('barlabel', className)}>
            <div className="barlabel__labeltext">{labelTekst}</div>
            <div className="barlabel__barwrapper barlabel__barwrapper">
                {htmlFor === 'minArbeidsliste' ? (
                    <div className="arbeidsliste">
                        <span className="text-hide" aria-live="polite" aria-atomic="true">
                            {`Det er ${tekstAntallBrukere(antall)} i Min arbeidsliste`}
                        </span>
                        <Label className="barlabel__antall">{antall}</Label>
                    </div>
                ) : (
                    <Label className="barlabel__antall">{antall}</Label>
                )}
            </div>
        </label>
    );
}

export default Barlabel;
