import React, { PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import { brukerShape } from './../proptype-shapes';

function TildelVeilederVelger({ veiledere, valgtVeileder, velgVeileder, brukere }) {
    const velgNyVeileder = (event) => {
        const tilVeileder = veiledere[event.target.value - 1].ident;
        const tildelinger = brukere.filter((bruker) => bruker.markert)
                                                    .map((bruker) => ({
                                                        fraVeilederId: bruker.veilederId,
                                                        tilVeilederId: tilVeileder,
                                                        brukerFnr: bruker.fnr
                                                    }));
        velgVeileder(tildelinger, tilVeileder);
    };
    const indexTilValgtVeileder = valgtVeileder === undefined ? 0 : veiledere.indexOf(valgtVeileder);

    const defaultOption = (
        <FormattedMessage id="portefolje.tildel.veileder.label" key="default">
            {(text) => <option value={0}>{text}</option>}
        </FormattedMessage>);

    const veilederListe = veiledere.map((veileder, index) =>
        <option value={index + 1} key={`option-${veileder.ident}`}>{`${veileder.navn}`}</option>
    );
    veilederListe.unshift(defaultOption);

    return (
        <div className="TildelVeilederVelger">
            <div className="selectContainer">
                <label htmlFor="select-veileder" className="text-hide">Velg veileder</label>
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

TildelVeilederVelger.defaultProps = {
    valgtVeileder: {}
};

TildelVeilederVelger.propTypes = {
    brukere: PT.arrayOf(brukerShape).isRequired,
    veiledere: PT.arrayOf(PT.object).isRequired,
    valgtVeileder: PT.object,
    velgVeileder: PT.func.isRequired
};

export default TildelVeilederVelger;
