import React, {useState} from 'react';
import {Alert, BodyShort, Button, Heading} from '@navikt/ds-react';

interface KnappMedBekreftHandlingProps {
    handlingsknapptekst: string;
    bekreftelsesmelding: {
        overskrift: string;
        beskrivelse: string;
    };
    bekreftknapp: {
        tekst: string;
        onClick: () => Promise<any>;
        onClickThen?: () => any;
    };
    feilmelding: string;
    ikon?: React.ReactNode;
}

export const KnappMedBekreftHandling = ({
    handlingsknapptekst,
    bekreftelsesmelding,
    bekreftknapp,
    feilmelding,
    ikon
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
        <>
            {error && (
                <Alert variant="error" size="small" className="sletting-av-arbeidsliste-feilet">
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
                    variant="tertiary"
                    icon={ikon}
                >
                    {handlingsknapptekst}
                </Button>
            )}

            {visSlettebekreftelse && (
                <div>
                    <Heading size="xsmall" level="3">
                        {bekreftelsesmelding.overskrift}
                    </Heading>
                    <BodyShort size="small">{bekreftelsesmelding.beskrivelse}</BodyShort>
                    <div className="slett-arbeidsliste__knappevalg">
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
        </>
    );
};
