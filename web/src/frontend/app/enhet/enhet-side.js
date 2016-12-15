import React, { PropTypes as PT, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { velgEnhetForSaksbehandler } from './../ducks/enheter';
import EnhetVelger from './enhet-velger';

class EnhetSide extends Component {

    componentWillMount() {
        // this.props.hentEnheter();
    }

    render() {
        const { enheter, valgtEnhet, velgEnhet } = this.props;

        const enhetVelger = enheter.length === 1 ?
            <p>{valgtEnhet}</p> :
            <EnhetVelger enheter={enheter} valgtEnhet={valgtEnhet} velgEnhet={velgEnhet} />;

        return (
            <div className="enhet-side">
                <h1 className="typo-sidetittel">Enhet</h1>
                <p className="typo-infotekst"><FormattedMessage id="enhet.valgt.infotekst" /></p>
                {valgtEnhet}
                {enhetVelger}
            </div>
        );
    }
}

EnhetSide.propTypes = {
    enheter: PT.arrayOf(PT.string),
    valgtEnhet: PT.string.isRequired,
    velgEnhet: PT.func.isRequired
};

const mapStateToProps = state => ({
    enheter: state.enheter.data,
    valgtEnhet: state.enheter.valgtEnhet
});

const mapDispatchToProps = dispatch => ({
    velgEnhet: enhet => dispatch(velgEnhetForSaksbehandler(enhet))
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetSide);
