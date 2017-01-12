import React, { PropTypes as PT } from 'react';

function EnhetVelger({ enheter, velgEnhet }) {
    if (enheter.length === 1) {
        return <noscript />;
    }
    const velgNyEnhet = (event) => {
        velgEnhet(enheter[event.target.value]);
    };

    const enhetsliste = enheter.map((enhet, index) =>
        <option value={index} key={`option-${enhet.enhetId}`}>{`${enhet.enhetId} (${enhet.navn})`}</option>
    );

    return (
        <div className="EnhetVelger">
            <label htmlFor="select-enhet">
                Velg enhet
            </label>
            <div className="select-container">
                <select
                    id="select-enhet"
                    name="valgtEnhet"
                    onChange={velgNyEnhet}
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
