import React, { PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';

function EnhetVelger({ enheter, velgEnhet, valgtEnhet }) {
    if (enheter.length === 1) {
        return <noscript />;
    }
    const velgNyEnhet = (event) => {
        velgEnhet(enheter[event.target.value]);
    };

    const enhetsliste = enheter.map((enhet, index) =>
        <option value={index} key={`option-${enhet.enhetId}`}>{`${enhet.enhetId} (${enhet.navn})`}</option>
    );

    const indexTilValgtEnhet = enheter.indexOf(valgtEnhet);
    return (
        <div className="EnhetVelger">
            <label htmlFor="select-enhet">
                <FormattedMessage id="enhet.velg.enhet.label" />
            </label>
            <div className="select-container">
                <select
                    id="select-enhet"
                    name="valgtEnhet"
                    onChange={velgNyEnhet}
                    onBlur={velgNyEnhet}
                    value={indexTilValgtEnhet}
                >
                    {enhetsliste}
                </select>
            </div>
        </div>
    );
}

EnhetVelger.propTypes = {
    enheter: PT.arrayOf(PT.object),
    velgEnhet: PT.func.isRequired
};

export default EnhetVelger;
