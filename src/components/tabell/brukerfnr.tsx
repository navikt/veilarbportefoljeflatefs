import {BodyShort, CopyButton, Tooltip} from '@navikt/ds-react';
import {BrukerModell} from '../../typer/bruker-modell';

interface BrukerFnrProps {
    className?: string;
    bruker: BrukerModell;
}

export function BrukerFnr({className, bruker}: BrukerFnrProps) {
    return (
        <BodyShort as="div" size="small" className={className}>
            {bruker.fnr && (
                <Tooltip content="Kopier fødselsnr" placement="right">
                    <CopyButton
                        copyText={bruker.fnr}
                        text={bruker.fnr}
                        title="Fødselsnummer"
                        size="xsmall"
                        iconPosition="right"
                    />
                </Tooltip>
            )}
        </BodyShort>
    );
}
