import * as React from 'react';
import {BrukerModell} from '../../model-interfaces';
import {BodyShort, Tooltip} from '@navikt/ds-react';
import {CopyToClipboard} from '@navikt/ds-react-internal';
import '../../enhetsportefolje/brukerliste.css';
interface BrukerFnrProps {
    className?: string;
    bruker: BrukerModell;
}

function BrukerFnr({className, bruker}: BrukerFnrProps) {
    return (
        <BodyShort as="div" size="small" className={className}>
            {bruker.fnr && (
                <Tooltip content="Kopier fødselsnr" placement="right">
                    <CopyToClipboard
                        copyText={bruker.fnr}
                        popoverText="Kopiert"
                        popoverPlacement="top"
                        iconPosition="right"
                        size="xsmall"
                        title="Fødselsnummer"
                    >
                        {bruker.fnr}
                    </CopyToClipboard>
                </Tooltip>
            )}
        </BodyShort>
    );
}

export default BrukerFnr;
