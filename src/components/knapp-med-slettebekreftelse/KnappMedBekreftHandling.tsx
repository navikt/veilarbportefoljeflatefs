import {ReactNode, useState} from 'react';
import {Alert, BodyShort, Button, Heading} from '@navikt/ds-react';
import './knapp-med-bekreft-handling.css';

interface KnappMedBekreftHandlingProps {
    handlingsknapptekst: string;
    variant?: 'secondary' | 'tertiary';
    size?: 'small' | 'xsmall';
    icon?: ReactNode;
    bekreftelsesmelding: {
        overskrift: string;
        overskriftsnivaa?: '1' | '2' | '3' | '4' | '5' | '6';
        beskrivelse: string;
        width?: string;
    };
    bekreftknapp: {
        tekst: string;
        onClick: () => void | Promise<void>;
        onClickThen?: () => void | Promise<void>;
    };
    feilmelding: string;
}

export const KnappMedBekreftHandling = ({
    handlingsknapptekst,
    variant = 'tertiary',
    size = 'small',
    icon,
    bekreftelsesmelding,
    bekreftknapp,
    feilmelding
}: KnappMedBekreftHandlingProps) => {
    const [visSlettebekreftelse, setVisSlettebekreftelse] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const bekreftHandling = async () => {
        setLoading(true);

        try {
            await bekreftknapp.onClick();
            await bekreftknapp.onClickThen?.();
        } catch {
            setError(true);
        } finally {
            setLoading(false);
            setVisSlettebekreftelse(false);
        }
    };

    return (
        <div className="knapp-med-bekreft-handling">
            {error && (
                <Alert variant="error" size="small" className="bekreft-handling-feilet">
                    {feilmelding}
                </Alert>
            )}

            {!visSlettebekreftelse && (
                <Button
                    onClick={() => {
                        setVisSlettebekreftelse(true);
                        setError(false);
                    }}
                    size={size}
                    variant={variant}
                    icon={icon}
                >
                    {handlingsknapptekst}
                </Button>
            )}

            {visSlettebekreftelse && (
                <div className="bekreft-handling" style={{width: bekreftelsesmelding.width}}>
                    <Heading size="xsmall" level={bekreftelsesmelding.overskriftsnivaa ?? '3'}>
                        {bekreftelsesmelding.overskrift}
                    </Heading>
                    <BodyShort size="small">{bekreftelsesmelding.beskrivelse}</BodyShort>
                    <div className="bekreft-handling__knapper">
                        <Button
                            variant="tertiary"
                            size={size}
                            type="button"
                            onClick={() => setVisSlettebekreftelse(false)}
                        >
                            Avbryt
                        </Button>
                        <Button
                            loading={loading}
                            variant="secondary"
                            size={size}
                            type="button"
                            onClick={bekreftHandling}
                        >
                            {bekreftknapp.tekst}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
