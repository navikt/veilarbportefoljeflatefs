import * as React from 'react';
import './bar.less';
import {BodyShort, Label} from '@navikt/ds-react';

export interface BarlabelProps {
    htmlFor: string;
    labelTekst: React.ReactNode;
    antall?: number;
}

function Barlabel({htmlFor, labelTekst, antall}: BarlabelProps) {
    return (
        <>
            <label htmlFor={htmlFor} className="barlabel__labeltext">
                <BodyShort size="small">{labelTekst}</BodyShort>
            </label>
            {(antall || antall === 0) && (
                <Label className="barlabel__antall" size="small">
                    {antall}
                </Label>
            )}
        </>
    );
}

export default Barlabel;
