import * as React from 'react';
import {Element} from 'nav-frontend-typografi';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import '../filtrering/filtrering-skjema.less';
import {PopoverOrientering} from "nav-frontend-popover";

interface OverskriftMedHjelpeTekstProps {
    overskriftTekst: string;
    hjelpeTekst: string;
    orientering: PopoverOrientering;
}

export default function OverskriftMedHjelpetekst(props: OverskriftMedHjelpeTekstProps) {
    return (
        <div className="blokk-xxs filtrering--overskrift-med-hjelpetekst">
            <Element tag="h3">
                {props.overskriftTekst}
            </Element>
            <Hjelpetekst id={props.hjelpeTekst} type={props.orientering}>
                {props.hjelpeTekst}
            </Hjelpetekst>
        </div>
    );
}

