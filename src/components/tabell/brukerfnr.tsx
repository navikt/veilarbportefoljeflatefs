import * as React from 'react';
import {BrukerModell} from '../../model-interfaces';
import {BodyShort} from '@navikt/ds-react';
import { CopyToClipboard } from "@navikt/ds-react-internal";

interface BrukerFnrProps {
    className?: string;
    bruker: BrukerModell;
}

function BrukerFnr({className, bruker}: BrukerFnrProps) {
    return (
        <BodyShort size="small" className={className}>
            {bruker.fnr}
            {bruker.fnr &&
              <CopyToClipboard copyText={bruker.fnr} popoverText="Kopiert" size="xsmall" />}
        </BodyShort>
    );
}

export default BrukerFnr;
