import React, {useRef, useState} from 'react';
import {KnappOgPopover} from './knapp-og-popover';
import {ReactComponent as XMarkOctagonIcon} from '../components/ikoner/x_mark_octagon_icon.svg';
import {BodyShort, Button} from '@navikt/ds-react';
import {useEventListener} from '../hooks/use-event-listener';
import {vedKlikkUtenfor} from '../utils/utils';

type AksjonKnappMedPopoverFeilmeldingProps = {
    aksjon: (...args) => Promise<void>;
    knappStil?: string;
    knappTekst: string;
};

export const AksjonKnappMedPopoverFeilmelding = ({
    aksjon,
    knappTekst,
    knappStil
}: AksjonKnappMedPopoverFeilmeldingProps) => {
    const [laster, setLaster] = useState(false);
    const [harFeil, setHarFeil] = useState(false);

    const knappOgPopoverRef = useRef<HTMLDivElement>(null);

    useEventListener('mousedown', e =>
        vedKlikkUtenfor([knappOgPopoverRef], e.target, () => {
            if (harFeil) {
                setHarFeil(false);
            }
        })
    );

    const handterKlikkAksjon = async () => {
        setHarFeil(false);
        setLaster(true);

        try {
            await aksjon();

            setHarFeil(false);
        } catch {
            setHarFeil(true);
        } finally {
            setLaster(false);
        }
    };

    return (
        <div>
            <Button
                className={knappStil}
                loading={laster}
                onClick={handterKlikkAksjon}
                size="xsmall"
                variant="tertiary"
            >
                <BodyShort size="small">{knappTekst}</BodyShort>
            </Button>
            {harFeil && (
                <KnappOgPopover
                    ikon={<XMarkOctagonIcon />}
                    knappTekst="Feil i baksystem"
                    popoverInnhold={
                        <>
                            Fikk ikke kontakt med baksystemet. <br /> Prøv å åpne aktivitetsplanen og søk opp personen.
                        </>
                    }
                    innerRef={knappOgPopoverRef}
                />
            )}
        </div>
    );
};
