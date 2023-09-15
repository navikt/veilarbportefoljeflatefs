import React, {useRef, useState} from 'react';
import {KnappOgPopover} from '../knapp-og-popover';
import {ReactComponent as XMarkOctagonIcon} from '../ikoner/x_mark_octagon_icon.svg';
import {BodyShort, Button, Tooltip} from '@navikt/ds-react';
import {useEventListener} from '../../hooks/use-event-listener';
import {vedKlikkUtenfor} from '../../utils/utils';
import {TabsIcon} from '@navikt/aksel-icons';
import classNames from 'classnames';
import './aksjon-knapp-med-popover-feilmelding.css';

type AksjonKnappMedPopoverFeilmeldingProps = {
    aksjon: (...args) => Promise<void>;
    aksjonNyFane?: (...args) => Promise<void>;
    knappStil?: string;
    knappTekst: string;
    inkluderKnappForApningINyFane?: boolean;
};

export const AksjonKnappMedPopoverFeilmelding = ({
    aksjon,
    aksjonNyFane,
    knappTekst,
    knappStil,
    inkluderKnappForApningINyFane
}: AksjonKnappMedPopoverFeilmeldingProps) => {
    const [lasterAksjon, setLasterAksjon] = useState(false);
    const [lasterAksjonNyFane, setLasterAksjonNyFane] = useState(false);
    const [harFeilAksjon, setHarFeilAksjon] = useState(false);
    const [harFeilAksjonNyFane, setHarFeilAksjonNyFane] = useState(false);

    const knappOgPopoverRef = useRef<HTMLDivElement>(null);

    useEventListener('mousedown', e =>
        vedKlikkUtenfor([knappOgPopoverRef], e.target, () => {
            if (harFeilAksjon) {
                setHarFeilAksjon(false);
            }

            if (harFeilAksjonNyFane) {
                setHarFeilAksjonNyFane(false);
            }
        })
    );

    const handterKlikkAksjon = async (aksjonVedKlikk?: () => Promise<any>) => {
        if (!aksjonVedKlikk) {
            return;
        }

        setHarFeilAksjon(false);
        setLasterAksjon(true);

        try {
            await aksjonVedKlikk();

            setHarFeilAksjon(false);
        } catch {
            setHarFeilAksjon(true);
        } finally {
            setLasterAksjon(false);
        }
    };

    const handterKlikkAksjonNyFane = async (aksjonVedKlikk?: () => Promise<any>) => {
        if (!aksjonVedKlikk) {
            return;
        }

        setHarFeilAksjonNyFane(false);
        setLasterAksjonNyFane(true);

        try {
            await aksjonVedKlikk();

            setHarFeilAksjonNyFane(false);
        } catch {
            setHarFeilAksjonNyFane(true);
        } finally {
            setLasterAksjonNyFane(false);
        }
    };

    return (
        <div className={classNames(['container--med-ny-fane-knapp', inkluderKnappForApningINyFane])}>
            <Button
                aria-label="Åpne brukeren i Aktivitetsplanen"
                className={knappStil}
                loading={lasterAksjon}
                onClick={() => handterKlikkAksjon(aksjon)}
                size="xsmall"
                variant="tertiary"
            >
                <BodyShort size="small">{knappTekst}</BodyShort>
            </Button>
            {inkluderKnappForApningINyFane && (
                <Tooltip content={'Åpne i ny fane'} placement="bottom">
                    <Button
                        aria-label="Åpne brukeren i Aktivitetsplanen (åpnes i ny fane)"
                        icon={<TabsIcon />}
                        loading={lasterAksjonNyFane}
                        onClick={() => handterKlikkAksjonNyFane(aksjonNyFane)}
                        size="xsmall"
                        variant="tertiary-neutral"
                    />
                </Tooltip>
            )}
            {(harFeilAksjon || harFeilAksjonNyFane) && (
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
