import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Lenker from './../lenker/lenker';
import { hentVeiledereForEnhet } from './../ducks/veiledere';
import EnhetsportefoljeVisning from '../enhetsportefolje/enhetsportefolje-visning';
import FiltreringContainer from './filtrering/filtrering-container';
import FiltreringLabelContainer from './filtrering/filtrering-label-container';
import { eksporterEnhetsportefoljeTilLocalStorage } from '../ducks/utils';
import { leggEnhetIUrl } from '../utils/utils';

class EnhetSide extends Component {
    componentWillMount() {
        const { valgtEnhet, hentVeiledere } = this.props;

        // TODO hent enhet, og veiledere for enhet kan skje i Application
        hentVeiledere(valgtEnhet.enhet.enhetId);
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

        return (
            <div className="enhet-side">
                <Lenker />
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
    hentVeiledere: PT.func.isRequired
};

const mapStateToProps = (state) => ({
    valgtEnhet: state.enheter.valgtEnhet,
    filtervalg: state.filtrering
});

const mapDispatchToProps = (dispatch) => ({
    hentVeiledere: (enhetId) => dispatch(hentVeiledereForEnhet(enhetId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetSide);
