import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { endreFiltervalg } from '../../ducks/filtrering';

class FiltreringStatus extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.endreFilter(e.target.id, e.target.checked);
    }

    render() {
        const { nyeBrukere, inaktiveBrukere } = this.props;

        return (
            <div className="filtrering-oversikt panel">
                <div className="skjema__input">
                    <input
                        className="checkboks"
                        id="nyeBrukere"
                        type="checkbox"
                        onChange={this.handleChange}
                        checked={nyeBrukere}
                    />
                    <label htmlFor="nyeBrukere">
                        <FormattedMessage id="enhet.filtrering.filtrering.oversikt.nye.brukere.checkbox" />
                    </label>
                </div>
                <div className="skjema__input">
                    <input
                        className="checkboks"
                        id="inaktiveBrukere"
                        type="checkbox"
                        onChange={this.handleChange}
                        checked={inaktiveBrukere}
                    />
                    <label htmlFor="inaktiveBrukere">
                        <FormattedMessage id="enhet.filtrering.filtrering.oversikt.inaktive.brukere.checkbox" />
                    </label>
                </div>
            </div>
        );
    }
}

FiltreringStatus.propTypes = {
    endreFilter: PT.func.isRequired,
    nyeBrukere: PT.bool.isRequired,
    inaktiveBrukere: PT.bool.isRequired
};

const mapStateToProps = state => ({
    nyeBrukere: state.filtrering.nyeBrukere,
    inaktiveBrukere: state.filtrering.inaktiveBrukere
});

const mapDispatchToProps = dispatch => ({
    endreFilter: (filterId, filtervalg) => dispatch(endreFiltervalg(filterId, filtervalg))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringStatus);
