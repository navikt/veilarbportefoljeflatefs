import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { veilederShape, brukerShape } from './../../proptype-shapes';
import { hentPortefoljeForEnhet, tildelVeileder } from './../../ducks/portefolje';
import FiltreringStatus from './filtrering-status';
import FiltreringFilter from './filtrering-filter';
import { eksporterEnhetsportefoljeTilLocalStorage } from '../../ducks/utils';
import TildelVeilederVelger from './../tildel-veileder-velger';

class FiltreringContainer extends Component {
    constructor(props) {
        super(props);

        this.oppdaterDatagrunnlag = this.oppdaterDatagrunnlag.bind(this);
    }

    componentDidUpdate() {
        const { filtervalg, valgtEnhet } = this.props;
        eksporterEnhetsportefoljeTilLocalStorage(filtervalg, valgtEnhet, location.pathname);
    }

    oppdaterDatagrunnlag() {
        const { hentPortefolje, filtervalg, sorteringsrekkefolge, fraIndex, antall, valgtEnhet } = this.props;
        hentPortefolje(valgtEnhet, sorteringsrekkefolge, fraIndex, antall, filtervalg);
    }

    render() {
        const { veiledere, valgtVeileder, velgVeileder, brukere } = this.props;
        return (
            <div>
                <Ekspanderbartpanel className="custom-ekspanderbartpanel" tittel="Status"
                                    tittelProps={{ type: 'systemtittel', tag: 'span' }}>
                    <FiltreringStatus oppdaterDatagrunnlag={this.oppdaterDatagrunnlag}/>
                </Ekspanderbartpanel>
                <Ekspanderbartpanel className="custom-ekspanderbartpanel" tittel="Filter"
                                    tittelProps={{ type: 'systemtittel', tag: 'span' }}>
                    <FiltreringFilter oppdaterDatagrunnlag={this.oppdaterDatagrunnlag}/>
                </Ekspanderbartpanel>
                <Ekspanderbartpanel className="custom-ekspanderbartpanel" tittel="Tildel veileder"
                                    tittelProps={{ type: 'systemtittel', tag: 'span' }}>
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

FiltreringContainer.propTypes = {
    filtervalg: PT.object,
    sorteringsrekkefolge: PT.string,
    fraIndex: PT.number,
    antall: PT.number,
    valgtEnhet: PT.string,
    hentPortefolje: PT.func.isRequired,
    veiledere: PT.arrayOf(veilederShape).isRequired,
    brukere: PT.arrayOf(brukerShape).isRequired,
    routes: PT.arrayOf(PT.object),
    valgtVeileder: PT.object,
    velgVeileder: PT.func.isRequired,
};

const mapStateToProps = state => ({
    filtervalg: state.filtrering,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    fraIndex: state.portefolje.data.fraIndex,
    antall: state.paginering.sideStorrelse,
    valgtEnhet: state.enheter.valgtEnhet.enhet.enhetId,
    veiledere: state.veiledere.data.veilederListe,
    brukere: state.portefolje.data.brukere,
    valgtVeileder: state.enheter.valgtVeileder,
});

const mapDispatchToProps = dispatch => ({
    velgVeileder: (tildelinger, tilVeileder) => dispatch(tildelVeileder(tildelinger, tilVeileder)),
    hentPortefolje: (enhet, rekkefolge, fra, antall, filtervalg) =>
        dispatch(hentPortefoljeForEnhet(enhet, rekkefolge, fra, antall, filtervalg))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringContainer);
