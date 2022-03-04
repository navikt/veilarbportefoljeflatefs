import * as React from 'react';
import '../filtrering/filtrering-skjema.less';
import {HelpText, Label} from '@navikt/ds-react';

interface OverskriftMedHjelpeTekstProps {
    overskriftTekst: string;
    hjelpeTekst: string;
}

export default function OverskriftMedHjelpetekst(props: OverskriftMedHjelpeTekstProps) {
    return (
        <div className="filtrering--overskrift-med-hjelpetekst">
            <Label size="small">{props.overskriftTekst}</Label>
            <HelpText placement="right" strategy="fixed">
                {props.hjelpeTekst}
            </HelpText>
        </div>
    );
}
