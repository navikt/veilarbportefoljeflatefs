import * as React from 'react';
import '../modal/feilmelding-brukere.css';
import {Alert, Heading} from '@navikt/ds-react';
import BlockContent from '@sanity/block-content-to-react';
import {useSystemmeldingerSelector} from '../../hooks/redux/use-systemmeldinger';

export const Systemmeldinger = () => {
    const systemmeldinger = useSystemmeldingerSelector();
    return (
        <>
            {systemmeldinger.map(systemmelding => (
                <Alert key={`tittel_${systemmelding.tittel}`} variant={systemmelding.type} size="medium" fullWidth>
                    <Heading spacing size="small" level="3">
                        {systemmelding.tittel}
                    </Heading>
                    <BlockContent blocks={systemmelding.beskrivelse} />
                </Alert>
            ))}
        </>
    );
};
