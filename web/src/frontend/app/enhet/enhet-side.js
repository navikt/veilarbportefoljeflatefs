import React, { PropTypes as PT, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { velgEnhetForSaksbehandler } from './../ducks/enheter';
import { leggEnhetIUrl } from '../utils/utils';
import EnhetVelger from './enhet-velger';
import { enhetShape } from './../proptype-shapes';
import PortefoljeVisning from '../portefolje/portefolje-visning';
import { hentPortefoljeForEnhet } from '../ducks/portefolje';


class EnhetSide extends Component {

    componentWillMount() {
        if (!this.props.valgtEnhet) {
            this.props.velgEnhet(this.props.enheter[0]);
        } else {
            leggEnhetIUrl(this.props.valgtEnhet);
        }
    }

    render() {
        const { enheter, ident, valgtEnhet, velgEnhet, hentPortefolje } = this.props;


        if (!valgtEnhet) {
            return <noscript />;
        }


        const enhetVelger = enheter.length === 1 ?
            <p>{valgtEnhet.enhetId}</p> :
            (<EnhetVelger
                enheter={enheter} valgtEnhet={valgtEnhet} velgEnhet={(enhet) => {
                    velgEnhet(enhet);
                    hentPortefolje(enhet.enhetId, ident);
                }}
            />);

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
                <PortefoljeVisning />
            </div>
        );
    }
}

EnhetSide.propTypes = {
    enheter: PT.arrayOf(enhetShape).isRequired,
    ident: PT.string.isRequired,
    valgtEnhet: PT.object,
    velgEnhet: PT.func.isRequired,
    hentPortefolje: PT.func.isRequired
};

const mapStateToProps = state => ({
    enheter: state.enheter.data,
    ident: state.enheter.ident,
    valgtEnhet: state.enheter.valgtEnhet
});

const mapDispatchToProps = dispatch => ({
    velgEnhet: enhet => dispatch(velgEnhetForSaksbehandler(enhet)),
    hentPortefolje: (enhet, ident) => dispatch(hentPortefoljeForEnhet(enhet, ident))
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetSide);
