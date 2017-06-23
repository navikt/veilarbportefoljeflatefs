import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { veilederShape, filtervalgShape } from '../proptype-shapes';
import FiltreringStatus from './filtrering-status';
import FiltreringFilter from './filtrering-filter';
import { endreFiltervalg } from '../ducks/filtrering';


function FiltreringContainer({ filtergruppe, filtervalg, veileder, actions }) {
    return (
        <div className="blokk-m">
            <Ekspanderbartpanel
                apen
                className="blokk-xxxs"
                tittel="Status"
                tittelProps="systemtittel"
            >
                <FiltreringStatus filtergruppe={filtergruppe} veileder={veileder} filtervalg={filtervalg} />
            </Ekspanderbartpanel>
            <Ekspanderbartpanel
                apen
                className="blokk-xxxs"
                tittel="Filter"
                tittelProps="systemtittel"
            >
                <FiltreringFilter actions={actions} veileder={veileder} filtervalg={filtervalg} />
            </Ekspanderbartpanel>
        </div>
    );
}

FiltreringContainer.defaultProps = {
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
    filtergruppe: PT.string,
    veileder: veilederShape,
    actions: PT.shape({
        endreFiltervalg: PT.func
    }).isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: {
        endreFiltervalg: (...args) => dispatch(endreFiltervalg(...args, ownProps.filtergruppe, ownProps.veileder))
    }
});

export default connect(null, mapDispatchToProps)(FiltreringContainer);
