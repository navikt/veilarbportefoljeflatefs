import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Lenker from './../lenker/lenker';
import EnhetsportefoljeVisning from '../enhetsportefolje/enhetsportefolje-visning';
import FiltreringContainer from './filtrering/filtrering-container';
import FiltreringLabelContainer from './filtrering/filtrering-label-container';
import { eksporterEnhetsportefoljeTilLocalStorage } from '../ducks/utils';
import { leggEnhetIUrl } from '../utils/utils';

class EnhetSide extends Component {
    componentWillMount() {
        document.title = 'Enhetens oversikt';
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

        return (
            <div className="enhet-side">
                <Lenker routes={routes} />
                <p className="typo-infotekst enhetsingress blokk-m">
                    <FormattedMessage id="enhet.ingresstekst" />
                </p>
                <FiltreringContainer />
                <FiltreringLabelContainer />
                <EnhetsportefoljeVisning />
            </div>
        );
    }
}

EnhetSide.propTypes = {
    valgtEnhet: PT.object,
    filtervalg: PT.object,
    routes: PT.arrayOf(PT.object)
};

const mapStateToProps = (state) => ({
    valgtEnhet: state.enheter.valgtEnhet,
    filtervalg: state.filtrering
});

export default connect(mapStateToProps)(EnhetSide);
