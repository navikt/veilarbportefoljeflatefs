import {Alert, Heading} from '@navikt/ds-react';
import {useSystemmeldingerSelector} from '../../hooks/redux/use-systemmeldinger';
import '../modal/feilmelding-brukere.css';
import {PortableText} from '@portabletext/react';

export const Systemmeldinger = () => {
    const systemmeldinger = useSystemmeldingerSelector();
    return (
        <>
            {systemmeldinger.map(systemmelding => (
                <Alert key={`tittel_${systemmelding.tittel}`} variant={systemmelding.type} size="medium" fullWidth>
                    <Heading spacing size="small" level="3">
                        {systemmelding.tittel}
                    </Heading>
                    <PortableText value={systemmelding.beskrivelse} />
                </Alert>
            ))}
        </>
    );
};
