import React, {PropTypes as PT} from "react";
import {FormattedMessage} from "react-intl";
import {brukerShape} from "./../proptype-shapes";

function TildelVeilederVelger({ veiledere, valgtVeileder, velgVeileder, brukere }) {
    const velgNyVeileder = (event) => {
        const tilVeileder = veiledere[event.target.value].ident;
        const tildelinger = brukere.filter(bruker => bruker.markert)
                                                    .map(bruker => ({
                                                        fraVeilederId: bruker.veilederId,
                                                        tilVeilederId: tilVeileder,
                                                        brukerFnr: bruker.fnr
                                                    }));
        velgVeileder(tildelinger);
    };
    const indexTilValgtVeileder = valgtVeileder === undefined ? 0 : veiledere.indexOf(valgtVeileder);

    const defaultOption =
        (<option value={0} key={'default'}>
            <FormattedMessage id="portefolje.tildel.veileder.label" />
        </option>);

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
    brukere: PT.arrayOf(brukerShape).isRequired,
    veiledere: PT.arrayOf(PT.object).isRequired,
    valgtVeileder: PT.object,
    velgVeileder: PT.func.isRequired
};

export default TildelVeilederVelger;
