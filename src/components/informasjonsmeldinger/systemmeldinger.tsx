import {InfoCard} from '@navikt/ds-react';
import {useSystemmeldingerSelector} from '../../hooks/redux/use-systemmeldinger';
import '../modal/feilmelding-brukere.css';
import {PortableText} from '@portabletext/react';
import {InformationSquareIcon} from '@navikt/aksel-icons';

export const Systemmeldinger = () => {
    const systemmeldinger = useSystemmeldingerSelector();
    return (
        <>
            {systemmeldinger.map(systemmelding => (
                <InfoCard data-color="info">
                    <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                        <PortableText value={systemmelding.beskrivelse} />
                    </InfoCard.Message>
                </InfoCard>
            ))}
        </>
    );
};
