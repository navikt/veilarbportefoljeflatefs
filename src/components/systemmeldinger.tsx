import * as React from 'react';
import './modal/feilmelding-brukere.less';
import {Alert} from '@navikt/ds-react';
import PortableText from 'react-portable-text';
import {useSystemmeldingerSelector} from '../hooks/redux/use-systemmeldinger';

export const Systemmeldinger = () => {
    const systemmeldinger = useSystemmeldingerSelector();
    return (
        <section>
            {systemmeldinger.map(systemmelding => (
                <Alert variant={systemmelding.type} className="stor-feil-modal" size="small">
                    <b>{`${systemmelding.tittel} `}</b>
                    <PortableText content={systemmelding.beskrivelse} />
                </Alert>
            ))}
        </section>
    );
};
