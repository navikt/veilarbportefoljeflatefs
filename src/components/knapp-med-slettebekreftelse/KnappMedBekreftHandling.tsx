import React, {useState} from 'react';
import {Alert, BodyShort, Button, Heading} from '@navikt/ds-react';
import './knapp-med-bekreft-handling.css';

interface KnappMedBekreftHandlingProps {
    handlingsknapptekst: string;
    variant?: 'secondary' | 'tertiary';
    ikon?: React.ReactNode;
    bekreftelsesmelding: {
        overskrift: string;
        beskrivelse: string;
        width?: string;
    };
    bekreftknapp: {
        tekst: string;
        onClick: () => Promise<any>;
        onClickThen?: () => any;
    };
    feilmelding: string;
}

export const KnappMedBekreftHandling = ({
    handlingsknapptekst,
    variant = 'tertiary',
    ikon,
    bekreftelsesmelding,
    bekreftknapp,
    feilmelding
}: KnappMedBekreftHandlingProps) => {
    const [visSlettebekreftelse, setVisSlettebekreftelse] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const bekreftHandling = () => {
        setLoading(true);

        bekreftknapp
            .onClick()
            .then(() => setLoading(false))
            .catch(() => setError(true))
            .then(() => setVisSlettebekreftelse(false))
            .then(() => bekreftknapp.onClickThen && bekreftknapp.onClickThen());
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
                    size="small"
                    variant={variant}
                    icon={ikon}
                >
                    {handlingsknapptekst}
                </Button>
            )}

            {visSlettebekreftelse && (
                <div className="bekreft-handling" style={{width: bekreftelsesmelding.width}}>
                    <Heading size="xsmall" level="3">
                        {bekreftelsesmelding.overskrift}
                    </Heading>
                    <BodyShort size="small">{bekreftelsesmelding.beskrivelse}</BodyShort>
                    <div className="bekreft-handling__knapper">
                        <Button
                            variant="tertiary"
                            size="small"
                            type="button"
                            onClick={() => setVisSlettebekreftelse(false)}
                        >
                            Avbryt
                        </Button>
                        <Button
                            loading={loading}
                            variant="secondary"
                            size="small"
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
