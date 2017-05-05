import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import DocumentTitle from 'react-document-title';
import Lenker from './../lenker/lenker';
import { filtervalgShape, veilederShape, statustallShape } from '../proptype-shapes';
import Innholdslaster from './../innholdslaster/innholdslaster';
import EnhetsportefoljeVisning from '../enhetsportefolje/enhetsportefolje-visning';
import FiltreringContainer from '../filtrering/filtrering-container';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import { leggEnhetIUrl } from '../utils/utils';
import { hentStatusTall } from './../ducks/statustall';
import TomPortefoljeModal from '../modal/tom-portefolje-modal';


class EnhetSide extends Component {
    componentWillMount() {
        const { valgtEnhet } = this.props;
        leggEnhetIUrl(valgtEnhet.enhet.enhetId);
    }

    componentDidMount() {
        this.props.hentStatusTall(this.props.valgtEnhet.enhet.enhetId);
    }

    render() {
        // TODO man må alltid ha en valgtEnhet, denne sjekken kan derfor flyttes ut til Application
        if (!this.props.valgtEnhet) {
            return null;
        }
        const { formatMessage } = this.props.intl;
        const { filtervalg, veilederliste, statustall } = this.props;

        const leggTilNavn = (identer, veiledere) => identer.map((ident) => {
            const veileder = veiledere.find((v) => v.ident === ident);
            return { label: `${veileder.etternavn}, ${veileder.fornavn} (${ident})`, key: ident };
        });

        return (
            <DocumentTitle title={formatMessage({ id: 'lenker.enhet.oversikt' })}>
                <div className="enhet-side blokk-xl">
                    <Lenker />
                    <Innholdslaster avhengigheter={[statustall]}>
                        <div id="oversikt-sideinnhold" role="tabpanel">
                            <p className="typo-infotekst begrensetbredde blokk-m">
                                <FormattedMessage id="enhet.ingresstekst.enhetoversikt" />
                            </p>
                            <FiltreringContainer filtervalg={filtervalg} />
                            <FiltreringLabelContainer
                                filtervalg={{
                                    ...filtervalg,
                                    veiledere: leggTilNavn(filtervalg.veiledere, veilederliste)
                                }}
                                filtergruppe="enhet"
                            />
                            <EnhetsportefoljeVisning />
                            <TomPortefoljeModal isOpen={statustall.data.totalt === 0} />
                        </div>
                    </Innholdslaster>
                </div>
            </DocumentTitle>
        );
    }
}

EnhetSide.propTypes = {
    valgtEnhet: PT.object.isRequired,
    filtervalg: filtervalgShape.isRequired,
    veilederliste: PT.arrayOf(veilederShape).isRequired,
    hentStatusTall: PT.func.isRequired,
    statustall: PT.shape({ data: statustallShape }),
    intl: intlShape.isRequired
};

const mapStateToProps = (state) => ({
    valgtEnhet: state.enheter.valgtEnhet,
    filtervalg: state.filtrering,
    veilederliste: state.veiledere.data.veilederListe,
    statustall: state.statustall
});

const mapDispatchToProps = (dispatch) => ({
    hentStatusTall: (enhet) => dispatch(hentStatusTall(enhet))
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(EnhetSide));
