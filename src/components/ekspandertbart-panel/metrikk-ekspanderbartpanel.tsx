import {PropsWithChildren, useState} from 'react';
import {ExpansionCard} from '@navikt/ds-react';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';
import '../toolbar/toolbar.css';

interface Props {
    tittel: string;
    lamellNavnForLogging: string;
}

export function MetrikkEkspanderbartpanel({tittel, lamellNavnForLogging, children}: PropsWithChildren<Props>) {
    const [isApen, setIsApen] = useState(true);

    const handleOnClick = () => {
        setIsApen(prevState => !prevState);
        logEvent('portefolje.metrikker.lamell', {
            navn: lamellNavnForLogging,
            apen: !isApen,
            sideNavn: finnSideNavn()
        });
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
