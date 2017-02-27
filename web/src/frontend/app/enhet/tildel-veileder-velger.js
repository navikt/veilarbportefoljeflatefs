import React, {PropTypes as PT} from "react";
import {FormattedMessage} from "react-intl";

function TildelVeilederVelger({veiledere, valgtVeileder, velgVeileder}) {

    const velgNyVeileder = (event) => {
        velgVeileder(veiledere[event.target.value]);
    };

    const indexTilValgtVeileder= veiledere.indexOf(valgtVeileder);

    const veilederListe = veiledere.map((veileder, index) =>
        <option value={index} key={`option-${veileder.ident}`}>{`${veileder.navn}`}</option>
    );

    return (
        <div className="TildelVeilederVelger">
            <label htmlFor="select-veileder">
                <FormattedMessage id="portefolje.tildel.veileder.label" />
            </label>
            <div className="select-container">
                <select // eslint-disable-line jsx-a11y/no-onchange
                    id="select-veileder"
                    name="valgtVeileder"
                    onChange={velgNyVeileder}
                    value={indexTilValgtVeileder}
                >
                    {veilederListe}
                </select>
            </div>
        </div>
    );
}

TildelVeilederVelger.propTypes = {
    veiledere: PT.arrayOf(PT.object).isRequired,
    valgtVeileder: PT.object.isRequired,
    velgVeileder: PT.func.isRequired
};

export default TildelVeilederVelger;
