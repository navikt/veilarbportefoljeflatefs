import {BodyShort, CopyButton, Tooltip} from '@navikt/ds-react';
import {BrukerModell} from '../../../typer/bruker-modell';

interface Props {
    bruker: BrukerModell;
}

export function FnrData({bruker}: Props) {
    return (
        <BodyShort as="div" size="small" className="col col-xs-2-5 fnr-kolonne">
            {bruker.fnr && (
                <Tooltip
                    describesChild // Gjer at innhaldet vert lese opp, ikkje berre tooltip-teksten
                    content="Kopier fødselsnr"
                    placement="right"
                >
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
