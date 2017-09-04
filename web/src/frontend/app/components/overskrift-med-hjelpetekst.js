import React, { PropTypes as PT } from 'react';

import { FormattedMessage } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import { HjelpetekstAuto } from 'nav-frontend-hjelpetekst';

const OverskriftMedHjelpeTekst = ({ overskriftId, hjelpetekstId }) => (
    <div className="blokk-xxs filtrering--overskrift-med-hjelpetekst">
        <Element tag="h3">
            <FormattedMessage id={overskriftId} />
        </Element>
        <HjelpetekstAuto size="16px">
            <FormattedMessage id={hjelpetekstId} />
        </HjelpetekstAuto>
    </div>
);

OverskriftMedHjelpeTekst.propTypes = {
    overskriftId: PT.string.isRequired,
    hjelpetekstId: PT.string.isRequired
};

export default OverskriftMedHjelpeTekst;
