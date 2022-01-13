import * as React from 'react';
import {Element} from 'nav-frontend-typografi';
import '../filtrering/filtrering-skjema.less';
import {HelpText} from '@navikt/ds-react';

interface OverskriftMedHjelpeTekstProps {
    overskriftTekst: string;
    hjelpeTekst: string;
}

export default function OverskriftMedHjelpetekst(props: OverskriftMedHjelpeTekstProps) {
    return (
        <div className="blokk-xxs filtrering--overskrift-med-hjelpetekst">
            <Element>{props.overskriftTekst}</Element>
            <HelpText id={props.hjelpeTekst} placement="right">
                {props.hjelpeTekst}
            </HelpText>
        </div>
    );
}
