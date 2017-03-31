import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Lenker from './../lenker/lenker';
import EnhetsportefoljeVisning from '../enhetsportefolje/enhetsportefolje-visning';
import FiltreringContainer from '../filtrering/filtrering-container';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import { leggEnhetIUrl } from '../utils/utils';

class EnhetSide extends Component {
    componentWillMount() {
        const { valgtEnhet } = this.props;
        leggEnhetIUrl(valgtEnhet.enhet.enhetId);
    }

    render() {
        // TODO man må alltid ha en valgtEnhet, denne sjekken kan derfor flyttes ut til Application
        if (!this.props.valgtEnhet) {
            return null;
        }

        return (
            <div className="enhet-side blokk-xl">
                <Lenker />
                <p className="typo-infotekst enhetsingress blokk-m">
                    <FormattedMessage id="enhet.ingresstekst.enhetoversikt" />
                </p>
                <FiltreringContainer filtervalg={this.props.filtervalg} />
                <FiltreringLabelContainer filtervalg={this.props.filtervalg} filtergruppe="enhet" />
                <EnhetsportefoljeVisning />
            </div>
        );
    }
}

EnhetSide.propTypes = {
    valgtEnhet: PT.object
};

const mapStateToProps = (state) => ({
    valgtEnhet: state.enheter.valgtEnhet
});

export default connect(mapStateToProps)(EnhetSide);
