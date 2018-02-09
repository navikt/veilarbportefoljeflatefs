import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import DocumentTitle from 'react-document-title';
import { hentPortefoljeStorrelser } from '../ducks/portefoljestorrelser';
import { portefoljestorrelserShape, veiledereShape, enhetShape, filtervalgShape } from './../proptype-shapes';
import VeiledersideVisning from './veilederside-visning';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Lenker from './../lenker/lenker';
import { leggEnhetIUrl } from '../utils/url-utils';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import { lagLablerTilVeiledereMedIdenter } from '../filtrering/utils';


class VeiledereSide extends Component {
    componentWillMount() {
        const { hentPortefoljestorrelser, valgtEnhet } = this.props;
        hentPortefoljestorrelser(valgtEnhet.enhet.enhetId);
        leggEnhetIUrl(valgtEnhet.enhet.enhetId);
    }

    render() {
        const { veiledere, portefoljestorrelser, filtervalg, intl } = this.props;

        return (
            <DocumentTitle title={intl.formatMessage({ id: 'lenker.veiledere.oversikt' })}>
                <div className="veiledere-side">
                    <Lenker />
                    <div id="oversikt-sideinnhold" role="tabpanel">
                        <p className="typo-infotekst begrensetbredde blokk-l">
                            <FormattedMessage id="enhet.ingresstekst.veilederoversikt" />
                        </p>

                        <FiltreringLabelContainer
                            filtervalg={{
                                veiledere: lagLablerTilVeiledereMedIdenter(
                                    filtervalg.veiledere,
                                    veiledere.data.veilederListe)
                            }}
                            filtergruppe="veiledere"
                        />

                        <Undertittel tag="h1" type="undertittel" className="veiledere-undertittel blokk-xxs">
                            <FormattedMessage
                                id="enhet.veiledere.tittel"
                                values={{ antallVeiledere: veiledere.data.veilederListe.length }}
                            />
                        </Undertittel>
                        <Innholdslaster avhengigheter={[veiledere, portefoljestorrelser]}>
                            <VeiledersideVisning />
                        </Innholdslaster>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

VeiledereSide.propTypes = {
    filtervalg: filtervalgShape.isRequired,
    valgtEnhet: enhetShape.isRequired,
    hentPortefoljestorrelser: PT.func.isRequired,
    veiledere: PT.shape({
        data: veiledereShape.isRequired
    }).isRequired,
    portefoljestorrelser: PT.shape({
        status: PT.string.isRequired,
        data: portefoljestorrelserShape
    }).isRequired,
    intl: intlShape.isRequired
};

const mapStateToProps = (state) => ({
    veiledere: state.veiledere,
    filtervalg: state.filtreringVeilederoversikt,
    portefoljestorrelser: state.portefoljestorrelser,
    valgtEnhet: state.enheter.valgtEnhet
});

const mapDispatchToProps = (dispatch) => ({
    hentPortefoljestorrelser: (enhetId) => dispatch(hentPortefoljeStorrelser(enhetId))
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(VeiledereSide));
