import * as React from 'react';
import {ReactComponent as BlaPrikk} from '../ikoner/bla-prikk.svg';
import './bla-prikk-ikon.less'

interface BlaPrikkVisningProps {
    skalVises: boolean;
    dataTestid?: string;
}

export default function BlaPrikkVisning({skalVises, dataTestid}: BlaPrikkVisningProps) {
    return (
        <span className="bla-prikk-ikon" data-testid="brukerliste_span_bla-prikk">
            {skalVises && <BlaPrikk/>}
        </span>
    );
}
