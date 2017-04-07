import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { veilederShape, brukerShape, filtervalgShape } from '../proptype-shapes';
import { tildelVeileder } from '../ducks/portefolje';
import FiltreringStatus from './filtrering-status';
import FiltreringFilter from './filtrering-filter';
import TildelVeilederVelger from '../enhet/tildel-veileder-velger';
import { endreFiltervalg } from '../ducks/filtrering';


function FiltreringContainer({ veiledere, valgtVeileder, velgVeileder,
        brukere, filtergruppe, veileder, filtervalg, actions }) {
    return (
        <div className="blokk-m">
            <Ekspanderbartpanel
                apen
                className="blokk-xxxs"
                tittel="Status"
                tittelProps={{ type: 'systemtittel', tag: 'span' }}
            >
                <FiltreringStatus filtergruppe={filtergruppe} veileder={veileder} filtervalg={filtervalg} />
            </Ekspanderbartpanel>
            <Ekspanderbartpanel
                apen
                className="blokk-xxxs"
                tittel="Filter"
                tittelProps={{ type: 'systemtittel', tag: 'span' }}
            >
                <FiltreringFilter actions={actions} veileder={veileder} filtervalg={filtervalg} />
            </Ekspanderbartpanel>
            <Ekspanderbartpanel
                className="blokk-xxxs"
                tittel="Tildel veileder"
                tittelProps={{ type: 'systemtittel', tag: 'span' }}
            >
                <TildelVeilederVelger
                    skjulVeilederfilter={filtergruppe !== 'enhet'}
                    valgtVeileder={valgtVeileder}
                    veiledere={veiledere}
                    brukere={brukere}
                    velgVeileder={(tildelinger, tilVeileder) => velgVeileder(tildelinger, tilVeileder)}
                    actions={actions}
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
    veiledere: PT.object.isRequired,
    brukere: PT.arrayOf(brukerShape).isRequired,
    valgtVeileder: PT.object,
    velgVeileder: PT.func.isRequired,
    filtergruppe: PT.string,
    veileder: veilederShape,
    actions: PT.shape({
        endreFiltervalg: PT.func
    }).isRequired
};

const mapStateToProps = (state) => ({
    veiledere: state.veiledere,
    brukere: state.portefolje.data.brukere,
    valgtVeileder: state.enheter.valgtVeileder
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    velgVeileder: (tildelinger, tilVeileder) => dispatch(tildelVeileder(tildelinger, tilVeileder)),
    actions: {
        endreFiltervalg: (...args) => dispatch(endreFiltervalg(...args, ownProps.filtergruppe, ownProps.veileder))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringContainer);
