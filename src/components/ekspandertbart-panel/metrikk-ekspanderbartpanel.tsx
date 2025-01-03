import {PropsWithChildren, useState} from 'react';
import {ExpansionCard} from '@navikt/ds-react';
import {trackAmplitude} from '../../amplitude/amplitude';

interface Props {
    tittel: string;
}

export function MetrikkEkspanderbartpanel({tittel, children}: PropsWithChildren<Props>) {
    const [isApen, setIsApen] = useState(true);

    const handleOnClick = () => {
        trackAmplitude({
            name: isApen ? 'accordion lukket' : 'accordion åpnet',
            data: {
                tekst: tittel
            }
        });

        setIsApen(prevState => !prevState);
    };

    return (
        <ExpansionCard aria-labelledby="expancion-card-title" size="small" open={isApen}>
            <ExpansionCard.Header onClick={handleOnClick}>
                <ExpansionCard.Title id="expancion-card-title" size="small">
                    {tittel}
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>{children}</ExpansionCard.Content>
        </ExpansionCard>
    );
}
