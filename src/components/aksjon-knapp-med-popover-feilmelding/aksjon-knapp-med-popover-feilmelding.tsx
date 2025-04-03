import {MouseEvent, useRef, useState} from 'react';
import {BodyShort, Button} from '@navikt/ds-react';
import {KnappOgPopover} from '../knapp-og-popover';
import {ReactComponent as XMarkOctagonIcon} from '../ikoner/x_mark_octagon_icon.svg';
import {useEventListener} from '../../hooks/use-event-listener';
import {vedKlikkUtenfor} from '../../utils/utils';
import './aksjon-knapp-med-popover-feilmelding.css';

type AksjonKnappMedPopoverFeilmeldingProps = {
    klikkAksjon: (...args) => Promise<void>;
    ctrlklikkAksjon?: (...args) => Promise<void>;
    knappStil?: string;
    knappTekst: string;
};

export const AksjonKnappMedPopoverFeilmelding = ({
    klikkAksjon,
    ctrlklikkAksjon,
    knappTekst,
    knappStil
}: AksjonKnappMedPopoverFeilmeldingProps) => {
    const [lasterAksjon, setLasterAksjon] = useState(false);
    const [harFeilAksjon, setHarFeilAksjon] = useState(false);

    const knappOgPopoverRef = useRef<HTMLDivElement>(null);

    useEventListener('mousedown', e =>
        vedKlikkUtenfor([knappOgPopoverRef], e.target, () => {
            if (harFeilAksjon) {
                setHarFeilAksjon(false);
            }
        })
    );

    const setXYScrollPosition = () => {
        localStorage.setItem('xScrollPos', window.scrollX.toString());
        localStorage.setItem('yScrollPos', window.scrollY.toString());
    };

    const handterKlikkAksjon = async (e: MouseEvent<HTMLButtonElement>) => {
        setXYScrollPosition();
        setHarFeilAksjon(false);
        setLasterAksjon(true);

        try {
            if ((e.ctrlKey || e.metaKey) && ctrlklikkAksjon) {
                await ctrlklikkAksjon();
            } else {
                await klikkAksjon();
            }

            setHarFeilAksjon(false);
        } catch {
            setHarFeilAksjon(true);
        } finally {
            setLasterAksjon(false);
        }
    };

    return (
        <div>
            <Button
                aria-label={knappTekst}
                className={knappStil}
                loading={lasterAksjon}
                onClick={handterKlikkAksjon}
                size="xsmall"
                variant="tertiary"
            >
                <BodyShort size="small">{knappTekst}</BodyShort>
            </Button>
            {harFeilAksjon && (
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
