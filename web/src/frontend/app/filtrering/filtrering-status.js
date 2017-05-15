import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import { endreFiltervalg } from '../ducks/filtrering';
import { statustallShape, veilederShape, filtervalgShape } from '../proptype-shapes';
import Barlabel from './barlabel';

class FiltreringStatus extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.endreFilter('brukerstatus', e.target.value);
    }

    render() {
        const { brukerstatus } = this.props.filtervalg;

        const nyeBrukereCheckbox = (
            <div className="skjema__input">
                <input
                    className="radioknapp"
                    id="nyeBrukere"
                    type="radio"
                    name="brukerstatus"
                    value="NYE_BRUKERE"
                    onChange={this.handleChange}
                    checked={brukerstatus === 'NYE_BRUKERE'}
                />
                <Barlabel
                    htmlFor="nyeBrukere"
                    tekstId="enhet.filtrering.filtrering.oversikt.nye.brukere.checkbox"
                    antall={this.props.statustall.data.nyeBrukere}
                    max={this.props.statustall.data.totalt}
                />
            </div>
        );
        return (
            <div className="filtrering-oversikt panel">
                <div className="typo-element blokk-m">
                    <Element className="blokk-xxs" tag="h3">
                        <FormattedMessage
                            id="filtrering.status.totalt-antall-brukere"
                            values={{ antall: this.props.statustall.data.totalt }}
                        />
                    </Element>
                </div>
                { this.props.filtergruppe === 'enhet' ? nyeBrukereCheckbox : null }
                <div className="skjema__input">
                    <input
                        className="radioknapp"
                        id="inaktiveBrukere"
                        type="radio"
                        name="brukerstatus"
                        value="INAKTIVE_BRUKERE"
                        onChange={this.handleChange}
                        checked={brukerstatus === 'INAKTIVE_BRUKERE'}
                    />
                    <Barlabel
                        className="inaktiveBrukere"
                        htmlFor="inaktiveBrukere"
                        tekstId="enhet.filtrering.filtrering.oversikt.inaktive.brukere.checkbox"
                        antall={this.props.statustall.data.inaktiveBrukere}
                        max={this.props.statustall.data.totalt}
                    />
                </div>
            </div>
        );
    }
}

FiltreringStatus.defaultProps = {
    veileder: {
        ident: '',
        navn: '',
        fornavn: '',
        etternavn: ''
    }
};

FiltreringStatus.propTypes = {
    endreFilter: PT.func.isRequired,
    statustall: PT.shape({ data: statustallShape.isRequired }).isRequired,
    filtergruppe: PT.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    veileder: veilederShape, // eslint-disable-line react/no-unused-prop-types
    filtervalg: filtervalgShape.isRequired
};

const mapStateToProps = (state) => ({
    enhet: state.enheter.valgtEnhet.enhet.enhetId,
    statustall: state.statustall
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    endreFilter: (filterId, filtervalg) => dispatch(endreFiltervalg(
        filterId, filtervalg, ownProps.filtergruppe, ownProps.veileder))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringStatus);
