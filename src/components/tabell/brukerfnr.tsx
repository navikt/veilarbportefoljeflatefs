import * as React from 'react';
import {BrukerModell} from '../../model-interfaces';
import {BodyShort} from '@navikt/ds-react';
import Kopiknapp from '../knapper/kopiknapp';

interface BrukerFnrProps {
    className?: string;
    bruker: BrukerModell;
}

function BrukerFnr({className, bruker}: BrukerFnrProps) {
    return (
        <BodyShort size="small" className={className}>
            {bruker.fnr}
            {bruker.fnr && (
            <Kopiknapp kopitekst={bruker.fnr} type="fødselsnummer" />)}
        </BodyShort>
    );
}

export default BrukerFnr;
