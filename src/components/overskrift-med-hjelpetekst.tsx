import * as React from 'react';

import { FormattedMessage } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import { HjelpetekstAuto } from 'nav-frontend-hjelpetekst';

interface OverskriftMedHjelpeTekstProps {
    overskriftId: string;
    hjelpetekstId: string;
}

const OverskriftMedHjelpeTekst = ({ overskriftId, hjelpetekstId }: OverskriftMedHjelpeTekstProps) => (
    <div className="blokk-xxs filtrering--overskrift-med-hjelpetekst">
        <Element tag="h3">
            <FormattedMessage id={overskriftId} />
        </Element>
        <HjelpetekstAuto id={hjelpetekstId}>
            <FormattedMessage id={hjelpetekstId} />
        </HjelpetekstAuto>
    </div>
);

export default OverskriftMedHjelpeTekst;
