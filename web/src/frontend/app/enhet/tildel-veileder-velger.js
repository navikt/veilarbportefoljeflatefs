import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { brukerShape, filtervalgShape } from './../proptype-shapes';
import Dropdown from '../components/dropdown/dropdown';
import RadioFilterform from '../components/radio-filterform/radio-filterform';
import { resetSokeresultater } from '../ducks/veiledere';
import { visAlleVeiledereIListe } from '../veiledere/veiledersok-utils';
import VeiledereSokeliste from '../veiledere/veiledersok';
import CheckboxFilterform from '../components/checkbox-filterform/checkbox-filterform';

function TildelVeilederVelger({ veiledere, velgVeileder, brukere,
    resetSok, filtervalg, actions, skjulVeilederfilter = false }) {
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

    const tildelveilederComponent = skjulVeilederfilter ? null : (
        <div className="col-sm-3">
            <Dropdown name="Søk på veileder" className="dropdown--130bredde" onLukk={resetSok}>
                <VeiledereSokeliste
                    veiledere={veilederListe}
                />
                <CheckboxFilterform
                    form="veiledere"
                    valg={veiledervalg}
                    filtervalg={filtervalg}
                    onSubmit={actions.endreFiltervalg}
                />
            </Dropdown>
        </div>);

    return (
        <div className="tildelveileder_wrapper row">
            <div className="row">
                {tildelveilederComponent}
                <div className="col-sm-3">
                    <Dropdown name="Tildel veileder" className="dropdown--130bredde" onLukk={resetSok}>
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
        </div>
    );
}


TildelVeilederVelger.propTypes = {
    brukere: PT.arrayOf(brukerShape).isRequired,
    veiledere: PT.object.isRequired,
    velgVeileder: PT.func.isRequired,
    resetSok: PT.func.isRequired,
    filtervalg: filtervalgShape.isRequired,
    actions: PT.shape({
        endreFiltervalg: PT.func
    }).isRequired,
    skjulVeilederfilter: PT.bool

};

const mapStateToProps = (state) => ({
    filtervalg: state.filtrering
});

const mapDispatchToProps = (dispatch) => ({
    resetSok: () => dispatch(resetSokeresultater())

});

export default connect(mapStateToProps, mapDispatchToProps)(TildelVeilederVelger);
