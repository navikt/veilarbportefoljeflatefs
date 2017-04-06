import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import DocumentTitle from 'react-document-title';
import Lenker from './../lenker/lenker';
import { filtervalgShape } from '../proptype-shapes';
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
        const { formatMessage } = this.props.intl;

        return (
            <DocumentTitle title={formatMessage({ id: 'lenker.enhet.oversikt' })}>
                <div className="enhet-side blokk-xl">
                    <Lenker />
                    <div id="oversikt-sideinnhold" role="tabpanel">
                        <p className="typo-infotekst begrensetbredde blokk-m">
                            <FormattedMessage id="enhet.ingresstekst.enhetoversikt" />
                        </p>
                        <FiltreringContainer filtervalg={this.props.filtervalg} />
                        <FiltreringLabelContainer filtervalg={this.props.filtervalg} filtergruppe="enhet" />
                        <EnhetsportefoljeVisning />
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

EnhetSide.propTypes = {
    valgtEnhet: PT.object.isRequired,
    filtervalg: filtervalgShape.isRequired,
    intl: intlShape.isRequired
};

const mapStateToProps = (state) => ({
    valgtEnhet: state.enheter.valgtEnhet,
    filtervalg: state.filtrering
});

export default injectIntl(connect(mapStateToProps)(EnhetSide));
