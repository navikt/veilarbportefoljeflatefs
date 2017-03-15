import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import VeilederPortefoljeVisning from './veileder-portefolje-visning';
import TildelVeilederVelger from './../enhet/tildel-veileder-velger';
import { veilederShape, brukerShape } from '../proptype-shapes';
import { tildelVeileder } from '../ducks/portefolje';

function PortefoljeSide({ ident, veileder, brukere, veiledere, velgVeileder }) {
    const annenVeilederVarsel = ident === veileder.ident ?
            (<noScript />) :
            (<FormattedMessage
                id="annen.veileder.portefolje.advarsel"
                values={{
                    fornavn: veileder.fornavn,
                    etternavn: veileder.etternavn
                }}
            />);

    const tildelVeilederVelger =
        (<TildelVeilederVelger
            veiledere={veiledere}
            brukere={brukere}
            velgVeileder={(tildelinger, tilVeileder) => velgVeileder(tildelinger, tilVeileder)}
        />);

    return (
        <div>
            {annenVeilederVarsel}
            <div className="portefolje-side panel">
                <h1 className="typo-innholdstittel">
                    <FormattedMessage
                        id="veileder.portefolje.tittel"
                    />
                </h1>
                <Ekspanderbartpanel tittel="Tildel veileder" tittelProps="systemtittel" >
                    {tildelVeilederVelger}
                </Ekspanderbartpanel>
                <VeilederPortefoljeVisning />
            </div>
        </div>
    );
}

PortefoljeSide.propTypes = {
    ident: PT.string.isRequired,
    veileder: veilederShape.isRequired,
    veiledere: PT.arrayOf(veilederShape).isRequired,
    brukere: PT.arrayOf(brukerShape).isRequired,
    velgVeileder: PT.func.isRequired
};

const mapStateToProps = state => ({
    ident: state.enheter.ident,
    veileder: state.portefolje.veileder,
    brukere: state.portefolje.data.brukere,
    veiledere: state.veiledere.data.veilederListe
});

const mapDispatchToProps = dispatch => ({
    velgVeileder: (tildelinger, tilVeileder) => dispatch(tildelVeileder(tildelinger, tilVeileder))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortefoljeSide);

