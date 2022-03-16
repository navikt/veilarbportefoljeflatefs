import * as React from 'react';
import './bar.less';
import {Label} from '@navikt/ds-react';

export interface BarlabelProps {
    htmlFor: string;
    labelTekst: React.ReactNode;
    antall?: number;
}

function Barlabel({antall}: BarlabelProps) {
    return (
        <>
            {(antall || antall === 0) && (
                <Label className="barlabel__antall" size="small">
                    {antall}
                </Label>
            )}
        </>
    );
}

export default Barlabel;
