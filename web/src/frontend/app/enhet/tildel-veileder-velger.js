import React, {PropTypes as PT} from "react";
import {FormattedMessage} from "react-intl";

function TildelVeilederVelger({veiledere, valgtVeileder, velgVeileder}) {

    const velgNyVeileder = (event) => {
        velgVeileder(veiledere[event.target.value]);
    };

    const indexTilValgtVeileder = valgtVeileder ? veiledere.indexOf(valgtVeileder) : 0;

    const defaultOption =
        <option value={0} key={ "default" }>
            <FormattedMessage id="portefolje.tildel.veileder.label"/>
        </option>;

    const veilederListe = veiledere.map((veileder, index) =>
        <option value={index + 1} key={`option-${veileder.ident}`}>{`${veileder.navn}`}</option>
    );
    veilederListe.unshift(defaultOption);

    return (
        <div className="TildelVeilederVelger">
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
