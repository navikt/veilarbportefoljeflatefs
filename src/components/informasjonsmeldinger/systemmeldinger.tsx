import {InfoCard} from '@navikt/ds-react';
import {useSystemmeldingerSelector} from '../../hooks/redux/use-systemmeldinger';
import '../modal/feilmelding-brukere.css';
import {toPlainText} from '@portabletext/react';
import {ExclamationmarkTriangleIcon} from '@navikt/aksel-icons';

export const Systemmeldinger = () => {
    const systemmeldinger = useSystemmeldingerSelector();
    return (
        <>
            {systemmeldinger.map((systemmelding, index) => (
                <InfoCard key={`infocard_${index}`} data-color="warning" size={'small'}>
                    <InfoCard.Message icon={<ExclamationmarkTriangleIcon aria-hidden />}>
                        {toPlainText(systemmelding.beskrivelse)}
                    </InfoCard.Message>
                </InfoCard>
            ))}
        </>
    );
};
