import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { endreFiltervalg } from '../../ducks/filtrering';
import { eksporterEnhetsportefoljeTilLocalStorage } from '../../ducks/utils';

class FiltreringOversikt extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate() {
        eksporterEnhetsportefoljeTilLocalStorage(filtervalg, valgtEnhet, location.pathname);
    }

    handleChange(e) {
        const { endreFilter } = this.props;
        endreFilter(e.target.id, e.target.checked);
    }

    render() {
        const { filtervalg } = this.props;

        const checkboxNyeBrukere = (<div className="nav-input">
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
        </div>);

        const checkboxInaktiveBrukere = (<div className="nav-input">
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
        </div>);

        return (
            <div className="filtrering-oversikt panel panel-ramme blokk-m">
                {checkboxNyeBrukere}
                {checkboxInaktiveBrukere}
            </div>
        );
    }
}

FiltreringOversikt.propTypes = {
    endreFilter: PT.func.isRequired,
    filtervalg: PT.object
};

const mapStateToProps = state => ({
    filtervalg: state.filtrering.filtervalg,
    valgtEnhet: state.enheter.valgtEnhet.enhet.enhetId
});

const mapDispatchToProps = dispatch => ({
    endreFilter: (filterId, filtervalg) => dispatch(endreFiltervalg(filterId, filtervalg))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringOversikt);
