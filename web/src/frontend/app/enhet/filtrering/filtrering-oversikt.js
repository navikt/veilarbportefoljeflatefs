import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { endreFiltervalg, hentPortefoljeForEnhet } from '../../ducks/filtrering';

class FiltreringOversikt extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate() {
        this.oppdaterDatagrunnlag();
    }

    handleChange(e) {
        const { endreFilter } = this.props;
        endreFilter(e.target.id, e.target.checked);
    }

    oppdaterDatagrunnlag() {
        const { hentPortefolje, filtervalg, sorteringsrekkefolge, fraIndex, antall, valgtEnhet } = this.props;
        hentPortefolje(
            valgtEnhet, sorteringsrekkefolge, fraIndex, antall, filtervalg.nyeBrukere, filtervalg.inaktiveBrukere
        );
    }

    render() {
        const { filtervalg } = this.props;
        return (
            <div className="filtrering-oversikt panel panel-ramme blokk-m">
                <div className="nav-input">
                    <input
                        className="nav-checkbox"
                        id="checkbox-filtrering-oversikt-nye-brukere"
                        type="checkbox"
                        onChange={this.handleChange}
                        checked={filtervalg.nyeBrukere}
                    />
                    <label htmlFor="checkbox-filtrering-oversikt-nye-brukere">
                        <FormattedMessage id="enhet.filtrering.filtrering.oversikt.nye.brukere.checkbox" />
                    </label>
                </div>
                <div className="nav-input">
                    <input
                        className="nav-checkbox"
                        id="checkbox-filtrering-oversikt-inaktive-brukere"
                        type="checkbox"
                        onChange={this.handleChange}
                        checked={filtervalg.inaktiveBrukere}
                    />
                    <label htmlFor="checkbox-filtrering-oversikt-inaktive-brukere">
                        <FormattedMessage id="enhet.filtrering.filtrering.oversikt.inaktive.brukere.checkbox" />
                    </label>
                </div>
            </div>
        );
    }
}

FiltreringOversikt.propTypes = {
    endreFilter: PT.func.isRequired,
    filtervalg: PT.object,
    sorteringsrekkefolge: PT.string,
    fraIndex: PT.number,
    antall: PT.number,
    valgtEnhet: PT.string,
    hentPortefolje: PT.func.isRequired
};

const mapStateToProps = state => ({
    filtervalg: state.filtrering.filtervalg,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    fraIndex: state.portefolje.data.fraIndex,
    antall: state.paginering.sideStorrelse,
    valgtEnhet: state.enheter.valgtEnhet.enhetId
});

const mapDispatchToProps = dispatch => ({
    endreFilter: (filterId, filtervalg) => dispatch(endreFiltervalg(filterId, filtervalg)),
    hentPortefolje: (enhet, rekkefolge, fra, antall, nyeBrukere, inaktiveBrukere) =>
        dispatch(hentPortefoljeForEnhet(enhet, rekkefolge, fra, antall, nyeBrukere, inaktiveBrukere))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringOversikt);
