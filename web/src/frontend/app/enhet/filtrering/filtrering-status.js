import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { endreFiltervalg } from '../../ducks/filtrering';

class FiltreringStatus extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate() {
        this.props.oppdaterDatagrunnlag();
    }

    handleChange(e) {
        const { endreFilter } = this.props;
        endreFilter(e.target.id, e.target.checked);
    }

    render() {
        const { nyeBrukere, inaktiveBrukere } = this.props;

        const checkboxNyeBrukere = (<div className="nav-input">
            <input
                className="nav-checkbox"
                id="checkbox-filtrering-oversikt-nye-brukere"
                type="checkbox"
                onChange={this.handleChange}
                checked={nyeBrukere}
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
                checked={inaktiveBrukere}
            />
            <label htmlFor="checkbox-filtrering-oversikt-inaktive-brukere">
                <FormattedMessage id="enhet.filtrering.filtrering.oversikt.inaktive.brukere.checkbox" />
            </label>
        </div>);

        return (
            <div className="filtrering-oversikt panel blokk-m">
                {checkboxNyeBrukere}
                {checkboxInaktiveBrukere}
            </div>
        );
    }
}

FiltreringStatus.propTypes = {
    endreFilter: PT.func.isRequired,
    oppdaterDatagrunnlag: PT.func.isRequired,
    nyeBrukere: PT.bool.isRequired,
    inaktiveBrukere: PT.bool.isRequired
};

const mapStateToProps = state => ({
    nyeBrukere: state.filtrering.filtervalg.nyeBrukere,
    inaktiveBrukere: state.filtrering.filtervalg.inaktiveBrukere
});

const mapDispatchToProps = dispatch => ({
    endreFilter: (filterId, filtervalg) => dispatch(endreFiltervalg(filterId, filtervalg))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringStatus);
