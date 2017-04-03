import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import DocumentTitle from 'react-document-title';
import Lenker from './../lenker/lenker';
import EnhetsportefoljeVisning from '../enhetsportefolje/enhetsportefolje-visning';
import FiltreringContainer from './filtrering/filtrering-container';
import FiltreringLabelContainer from './filtrering/filtrering-label-container';
import { eksporterEnhetsportefoljeTilLocalStorage } from '../ducks/utils';
import { leggEnhetIUrl } from '../utils/utils';

class EnhetSide extends Component {
    componentWillMount() {
        const { valgtEnhet } = this.props;
        leggEnhetIUrl(valgtEnhet.enhet.enhetId);
    }

    componentDidUpdate() {
        // TODO dette burde skje som en del av redux sin oppdatering av filter
        const { filtervalg, valgtEnhet } = this.props;
        eksporterEnhetsportefoljeTilLocalStorage(filtervalg, valgtEnhet.enhet, location.pathname);
    }

    render() {
        // TODO man må alltid ha en valgtEnhet, denne sjekken kan derfor flyttes ut til Application
        if (!this.props.valgtEnhet) {
            return null;
        }
        const { routes } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <DocumentTitle title={formatMessage({ id: 'lenker.enhet.oversikt' })} >
                <div className="enhet-side blokk-xl">
                    <Lenker routes={routes} />
                    <p className="typo-infotekst enhetsingress blokk-m">
                        <FormattedMessage id="enhet.ingresstekst.enhetoversikt" />
                    </p>
                    <FiltreringContainer />
                    <FiltreringLabelContainer />
                    <EnhetsportefoljeVisning />
                </div>
            </DocumentTitle>
        );
    }
}

EnhetSide.propTypes = {
    valgtEnhet: PT.object.isRequired,
    filtervalg: PT.object.isRequired,
    routes: PT.arrayOf(PT.object).isRequired,
    intl: intlShape.isRequired
};

const mapStateToProps = (state) => ({
    valgtEnhet: state.enheter.valgtEnhet,
    filtervalg: state.filtrering
});

export default injectIntl(connect(mapStateToProps)(EnhetSide));
