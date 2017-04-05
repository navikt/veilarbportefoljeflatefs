import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { brukerShape } from './../proptype-shapes';
import Dropdown from '../components/dropdown/dropdown';
import RadioFilterform from '../components/radio-filterform/radio-filterform';
import { resetSokeresultater } from '../ducks/veiledere';
import { visAlleVeiledereIListe } from '../veiledere/veiledersok-utils';
import VeiledereSokeliste from '../veiledere/veiledersok';

function TildelVeilederVelger({ veiledere, velgVeileder, brukere, resetSok }) {
    const veilederListe = veiledere.data.veilederListe;

    const velgNyVeileder = (name, tilVeileder) => {
        const tildelinger = brukere.filter((bruker) => bruker.markert)
                                                    .map((bruker) => ({
                                                        fraVeilederId: bruker.veilederId,
                                                        tilVeilederId: tilVeileder,
                                                        brukerFnr: bruker.fnr
                                                    }));
        velgVeileder(tildelinger, tilVeileder);
    };

    const sokeresultat = veiledere.sokeresultat;
    const veiledervalg = sokeresultat.sokIkkeStartet ?
        visAlleVeiledereIListe(veilederListe) :
        sokeresultat;

    return (
        <div className="tildelveileder_wrapper">
            <div className="col-sm-3">
                <Dropdown name="Tildel veileder" onLukk={resetSok}>
                    <VeiledereSokeliste
                        veiledere={veilederListe}
                    />
                    <RadioFilterform
                        form="veiledertildeling"
                        valg={veiledervalg}
                        filtervalg={{ veiledervisning: undefined }}
                        onSubmit={velgNyVeileder}
                    />
                </Dropdown>
            </div>
        </div>
    );
}


TildelVeilederVelger.propTypes = {
    brukere: PT.arrayOf(brukerShape).isRequired,
    veiledere: PT.object.isRequired,
    velgVeileder: PT.func.isRequired,
    resetSok: PT.func.isRequired

};

const mapDispatchToProps = (dispatch) => ({
    resetSok: () => dispatch(resetSokeresultater())

});

export default connect(undefined, mapDispatchToProps)(TildelVeilederVelger);
