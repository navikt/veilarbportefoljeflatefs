import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { veilederShape, brukerShape } from './../../proptype-shapes';
import { tildelVeileder } from './../../ducks/portefolje';
import FiltreringStatus from './filtrering-status';
import FiltreringFilter from './filtrering-filter';
import { eksporterEnhetsportefoljeTilLocalStorage } from '../../ducks/utils';
import TildelVeilederVelger from './../tildel-veileder-velger';

class FiltreringContainer extends Component {
    componentDidUpdate() {
        const { filtervalg, valgtEnhet } = this.props;
        eksporterEnhetsportefoljeTilLocalStorage(filtervalg, valgtEnhet, location.pathname);
    }

    render() {
        const { veiledere, valgtVeileder, velgVeileder, brukere } = this.props;
        return (
            <div className="blokk-m">
                <Ekspanderbartpanel
                    className="custom-ekspanderbartpanel" tittel="Status"
                    tittelProps={{ type: 'systemtittel', tag: 'span' }}
                >
                    <FiltreringStatus />
                </Ekspanderbartpanel>
                <Ekspanderbartpanel
                    className="custom-ekspanderbartpanel" tittel="Filter" apen
                    tittelProps={{ type: 'systemtittel', tag: 'span' }}
                >
                    <FiltreringFilter />
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
}

FiltreringContainer.defaultProps = {
    valgtVeileder: {}
};

FiltreringContainer.propTypes = {
    filtervalg: PT.object.isRequired,
    valgtEnhet: PT.string.isRequired,
    veiledere: PT.arrayOf(veilederShape).isRequired,
    brukere: PT.arrayOf(brukerShape).isRequired,
    valgtVeileder: PT.object,
    velgVeileder: PT.func.isRequired
};

const mapStateToProps = (state) => ({
    filtervalg: state.filtrering,
    valgtEnhet: state.enheter.valgtEnhet.enhet.enhetId,
    veiledere: state.veiledere.data.veilederListe,
    brukere: state.portefolje.data.brukere,
    valgtVeileder: state.enheter.valgtVeileder
});

const mapDispatchToProps = (dispatch) => ({
    velgVeileder: (tildelinger, tilVeileder) => dispatch(tildelVeileder(tildelinger, tilVeileder))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringContainer);
