import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import DocumentTitle from 'react-document-title';
import { hentPortefoljeStorrelser } from '../ducks/portefoljestorrelser';
import VeiledersideVisning from './veilederside-visning';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Lenker from './../lenker/lenker';
import { getSeAlleFromUrl, getSideFromUrl, leggEnhetIUrl } from '../utils/url-utils';
import { VeiledereState } from '../ducks/veiledere';
import { ValgtEnhetModell } from '../model-interfaces';
import { pagineringSetup } from '../ducks/paginering';
import './veiledere-side.less';
import FiltreringVeiledere from '../filtrering/filtrering-veiledere';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import PanelBase from 'nav-frontend-paneler';

interface StateProps {
    veiledere: VeiledereState;
    portefoljestorrelser: any;
    valgtEnhet: ValgtEnhetModell;
}

interface DispatchProps {
    hentPortefoljestorrelser: (enhetId: string) => void;
    initalPaginering: (side: number, seAlle: boolean) => void;
}

type VeiledereSideProps = StateProps & DispatchProps & InjectedIntlProps;

class VeiledereSideVenstreToggle extends React.Component<VeiledereSideProps> {
    componentWillMount() {
        const { hentPortefoljestorrelser, valgtEnhet } = this.props;
        hentPortefoljestorrelser(valgtEnhet.enhet!.enhetId);
        leggEnhetIUrl(valgtEnhet.enhet!.enhetId);
        this.settInitalStateFraUrl();
    }

    settInitalStateFraUrl() {
        const side = getSideFromUrl();
        const seAlle = getSeAlleFromUrl();
        this.props.initalPaginering(side, seAlle);
    }

    render() {
        const { veiledere, portefoljestorrelser, intl } = this.props;

        return (
            <DocumentTitle title={intl.formatMessage({ id: 'lenker.veiledere.oversikt' })}>
                <div className="veiledere-side">
                    <Lenker />
                    <div id="oversikt-sideinnhold" role="tabpanel">
                        <p className="typo-infotekst begrensetbredde blokk-l">
                            <FormattedMessage id="enhet.ingresstekst.veilederoversikt" />
                        </p>
                        <div className="veiledere-side--cols">
                            <div className="veiledere-side--filter-col">
                                <PanelBase className="blokk-xxxs">
                                    <Undertittel>
                                        <FormattedMessage id={'filtrering-sok-tittel'}/>
                                    </Undertittel>
                                    <FiltreringVeiledere intl={intl} />
                                </PanelBase>
                            </div>
                            <div className="veiledere-side--liste-col">
                                <Innholdslaster avhengigheter={[veiledere, portefoljestorrelser]}>
                                    <Undertittel tag="h1" className="veiledere-undertittel blokk-xxs">
                                        <FormattedMessage
                                            id="enhet.veiledere.tittel"
                                            values={{ antallVeiledere: veiledere.data.veilederListe.length }}
                                        />
                                    </Undertittel>
                                    <VeiledersideVisning />
                                </Innholdslaster>
                            </div>
                        </div>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = (state) => ({
    veiledere: state.veiledere,
    portefoljestorrelser: state.portefoljestorrelser,
    valgtEnhet: state.enheter.valgtEnhet
});

const mapDispatchToProps = (dispatch) => ({
    hentPortefoljestorrelser: (enhetId) => dispatch(hentPortefoljeStorrelser(enhetId)),
    initalPaginering: (side, seAlle) => dispatch(pagineringSetup({side, seAlle})),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(VeiledereSideVenstreToggle));
