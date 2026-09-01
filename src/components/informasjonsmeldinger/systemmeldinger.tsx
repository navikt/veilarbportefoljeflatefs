import {InfoCard} from '@navikt/ds-react';
import {useSystemmeldingerSelector} from '../../hooks/redux/use-systemmeldinger';
import '../modal/feilmelding-brukere.css';
import {InformationSquareIcon} from '@navikt/aksel-icons';

export const Systemmeldinger = () => {
    const systemmeldinger = useSystemmeldingerSelector();
    return (
        <>
            {systemmeldinger.map(systemmelding => (
                <InfoCard data-color="warning" size={'small'}>
                    <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                        {systemmelding.beskrivelse}
                    </InfoCard.Message>
                </InfoCard>
            ))}
        </>
    );
};
