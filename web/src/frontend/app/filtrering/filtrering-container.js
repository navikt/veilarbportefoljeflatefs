import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { veilederShape, brukerShape, filtervalgShape } from '../proptype-shapes';
import { tildelVeileder } from '../ducks/portefolje';
import FiltreringStatus from './filtrering-status';
import FiltreringFilter from './filtrering-filter';
import TildelVeilederVelger from '../enhet/tildel-veileder-velger';

function FiltreringContainer({ veiledere, valgtVeileder, velgVeileder, brukere, filtergruppe, veileder, filtervalg }) {
    return (
        <div className="blokk-m">
            <Ekspanderbartpanel
                className="custom-ekspanderbartpanel" tittel="Status"
                tittelProps={{ type: 'systemtittel', tag: 'span' }}
            >
                <FiltreringStatus filtergruppe={this.props.filtergruppe} veileder={veileder} filtervalg={filtervalg}/>
            </Ekspanderbartpanel>
            <Ekspanderbartpanel
                className="custom-ekspanderbartpanel" tittel="Filter" apen
                tittelProps={{ type: 'systemtittel', tag: 'span' }}
            >
                <FiltreringFilter filtergruppe={filtergruppe} veileder={veileder} />
            </Ekspanderbartpanel>
            <Ekspanderbartpanel
                className="custom-ekspanderbartpanel" tittel="Tildel veileder"
                tittelProps={{ type: 'systemtittel', tag: 'span' }}
            >
                <TildelVeilederVelger
                    valgtVeileder={valgtVeileder}
                    veiledere={veiledere}
                    brukere={brukere}
                    velgVeileder={(tildelinger, tilVeileder) => velgVeileder(tildelinger, tilVeileder)}
                />
            </Ekspanderbartpanel>
        </div>
    );
}

FiltreringContainer.defaultProps = {
    valgtVeileder: {},
    filtergruppe: 'enhet',
    veileder: {
        ident: '',
        navn: '',
        fornavn: '',
        etternavn: ''
    }
};

FiltreringContainer.propTypes = {
    filtervalg: filtervalgShape.isRequired,
    veiledere: PT.arrayOf(veilederShape).isRequired,
    brukere: PT.arrayOf(brukerShape).isRequired,
    valgtVeileder: PT.object,
    velgVeileder: PT.func.isRequired,
    filtergruppe: PT.string,
    veileder: veilederShape
};

const mapStateToProps = (state) => ({
    veiledere: state.veiledere.data.veilederListe,
    brukere: state.portefolje.data.brukere,
    valgtVeileder: state.enheter.valgtVeileder
});

const mapDispatchToProps = (dispatch) => ({
    velgVeileder: (tildelinger, tilVeileder) => dispatch(tildelVeileder(tildelinger, tilVeileder))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringContainer);
