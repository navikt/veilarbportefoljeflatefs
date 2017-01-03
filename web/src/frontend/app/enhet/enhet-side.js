import React, { PropTypes as PT, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { velgEnhetForSaksbehandler } from './../ducks/enheter';
import EnhetVelger from './enhet-velger';
import { enhetShape } from './../proptype-shapes';

class EnhetSide extends Component {

    componentWillMount() {
        if (!this.props.valgtEnhet) {
            this.props.velgEnhet(this.props.enheter[0]);
        }
    }

    render() {
        const { enheter, valgtEnhet, velgEnhet } = this.props;

        if (!valgtEnhet) {
            return <noscript />;
        }

        const enhetVelger = enheter.length === 1 ?
            <p>{valgtEnhet.enhetId}</p> :
            <EnhetVelger enheter={enheter} valgtEnhet={valgtEnhet} velgEnhet={velgEnhet} />;

        return (
            <div className="enhet-side panel">
                <h1 className="typo-innholdstittel">{`Enhet : ${valgtEnhet.enhetId} (${valgtEnhet.navn})`}</h1>
                <p className="typo-infotekst">
                    <FormattedMessage
                        id="enhet.valgt.infotekst"
                        values={{ enhetId: valgtEnhet.enhetId, enhetnavn: valgtEnhet.navn }}
                    />
                </p>
                {enhetVelger}
            </div>
        );
    }
}

EnhetSide.propTypes = {
    enheter: PT.arrayOf(enhetShape),
    valgtEnhet: PT.object,
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
