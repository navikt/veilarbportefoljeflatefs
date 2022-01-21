import * as React from 'react';
import './barlabel.less';
import {BodyShort, Label} from '@navikt/ds-react';

export interface BarlabelProps {
    labelTekst: React.ReactNode;
    antall: number;
}

function Barlabel({labelTekst, antall}: BarlabelProps) {
    return (
        <>
            <BodyShort className="barlabel__labeltext">{labelTekst}</BodyShort>
            <Label className="barlabel__antall">{antall}</Label>
        </>
    );
}

export default Barlabel;
