import React, {useRef, useState} from 'react';
import {KnappOgPopover} from '../knapp-og-popover';
import {ReactComponent as XMarkOctagonIcon} from '../ikoner/x_mark_octagon_icon.svg';
import {BodyShort, Button, Tooltip} from '@navikt/ds-react';
import {useEventListener} from '../../hooks/use-event-listener';
import {vedKlikkUtenfor} from '../../utils/utils';
import {ExternalLink} from '@navikt/ds-icons';
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

    const handterKlikk = async (aksjonSomSkalUtforesVedKlikk?: () => Promise<any>) => {
        if (!aksjonSomSkalUtforesVedKlikk) {
            return;
        }

        setHarFeil(false);
        setLaster(true);

        try {
            await aksjonSomSkalUtforesVedKlikk();

            setHarFeil(false);
        } catch {
            setHarFeil(true);
        } finally {
            setLaster(false);
        }
    };

    return (
        <div className={classNames(['container--med-ny-fane-knapp', inkluderKnappForApningINyFane])}>
            <Button
                aria-label="Åpne brukeren i Aktivitetsplanen"
                className={knappStil}
                loading={laster}
                onClick={() => handterKlikk(aksjon)}
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
            {inkluderKnappForApningINyFane && (
                <Tooltip content={'Åpne i ny fane'} placement="bottom">
                    <Button
                        aria-label="Åpne brukeren i Aktivitetsplanen (åpnes i ny fane)"
                        icon={<ExternalLink />}
                        onClick={() => handterKlikk(aksjonNyFane)}
                        size="xsmall"
                        variant="tertiary-neutral"
                    />
                </Tooltip>
            )}
        </div>
    );
};
