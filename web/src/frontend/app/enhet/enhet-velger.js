import React, { PropTypes as PT } from 'react';

function EnhetVelger({ enheter, velgEnhet }) {
    if (enheter.length === 1) {
        return <noscript />;
    }
    const velgNyEnhet = (event) => {
        velgEnhet(event.target.value);
    };

    const enhetsliste = enheter.map(element => <option value={element}>{element}</option>);

    return (
        <div className="EnhetVelger">
            <label htmlFor="select-enhet">
                Velg enhet
            </label>
            <div className="select-container">
                <select
                    id="select-enhet"
                    name="valgtEnhet"
                    onBlur={velgNyEnhet}
                    onChange={velgNyEnhet}
                >
                    {enhetsliste}
                </select>
            </div>
        </div>
    );
}

EnhetVelger.propTypes = {
    enheter: PT.arrayOf(PT.string),
    // valgtEnhet: PT.string.isRequired,
    velgEnhet: PT.func.isRequired
};

export default EnhetVelger;
