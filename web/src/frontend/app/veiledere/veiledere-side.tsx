import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
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
import {VeiledereState} from "../ducks/veiledere";
import {ValgtEnhetModell} from "../model-interfaces";
import {FiltreringState} from "../ducks/filtrering";

interface StateProps {
    veiledere: VeiledereState;
    filtervalg: FiltreringState;
    portefoljestorrelser: any;
    valgtEnhet: ValgtEnhetModell;
}

interface DispatchProps {
    hentPortefoljestorrelser: (enhetId: string) => void;
}

type VeiledereSideProps = StateProps & DispatchProps & InjectedIntlProps;


class VeiledereSide extends React.Component<VeiledereSideProps> {
    componentWillMount() {
        const { hentPortefoljestorrelser, valgtEnhet } = this.props;
        hentPortefoljestorrelser(valgtEnhet.enhet!.enhetId);
        leggEnhetIUrl(valgtEnhet.enhet!.enhetId);
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

                        <Undertittel tag="h1" className="veiledere-undertittel blokk-xxs">
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
