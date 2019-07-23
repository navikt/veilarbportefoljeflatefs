import * as React from 'react';
import { connect } from 'react-redux';
import { Undertittel } from 'nav-frontend-typografi';
import DocumentTitle from 'react-document-title';
import VeiledersideVisning from './veilederside-visning';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Lenker from '../lenker/lenker';
import { getSeAlleFromUrl, getSideFromUrl, leggEnhetIUrl } from '../utils/url-utils';
import { VeiledereState } from '../ducks/veiledere';
import { StatustallModell, ValgtEnhetModell } from '../model-interfaces';
import { pagineringSetup } from '../ducks/paginering';
import './veiledere-side.less';
import FiltreringVeiledere from '../filtrering/filtrering-veiledere';
import PanelBase from 'nav-frontend-paneler';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import { lagLablerTilVeiledereMedIdenter } from '../filtrering/utils';
import { FiltreringState } from '../ducks/filtrering';
import { loggSkjermMetrikker, Side } from '../utils/metrikker/skjerm-metrikker';
import TomPortefoljeModal from '../modal/tom-portefolje-modal';
import { hentPortefoljeStorrelser as fetchPortefoljeStorrelser } from '../ducks/portefoljestorrelser';
import { hentStatusTall as fetchStatusTall } from '../ducks/statustall';
import { RouterProps } from 'react-router';

interface StateProps {
    veiledere: VeiledereState;
    portefoljestorrelser: any;
    filtervalg: FiltreringState;
    valgtEnhet: ValgtEnhetModell;
    statustall: {data: StatustallModell};
}

interface DispatchProps {
    hentPortefoljestorrelser: (enhetId: string) => void;
    initalPaginering: (side: number, seAlle: boolean) => void;
    hentStatusTall: (enhet: string) => void;
}

type VeiledereSideProps = StateProps & DispatchProps & RouterProps;

class VeiledereSide extends React.Component<VeiledereSideProps> {
    componentWillMount() {
        const { valgtEnhet } = this.props;
        leggEnhetIUrl(valgtEnhet.enhet!.enhetId);
        loggSkjermMetrikker(Side.VEILEDER_OVERSIKT);
        this.settInitalStateFraUrl();
    }

    settInitalStateFraUrl() {
        const side = getSideFromUrl();
        const seAlle = getSeAlleFromUrl();
        this.props.initalPaginering(side, seAlle);
    }

    componentDidMount() {
        const { hentPortefoljestorrelser, hentStatusTall, valgtEnhet } = this.props;
        hentPortefoljestorrelser(valgtEnhet.enhet!.enhetId);
        hentStatusTall(this.props.valgtEnhet.enhet!.enhetId);
    }

    render() {
        const { veiledere, portefoljestorrelser, filtervalg, statustall } = this.props;
        return (
            <DocumentTitle title="Veilederoversikt">
                <div className="veiledere-side">
                    <Lenker />
                    <Innholdslaster avhengigheter={[ statustall, veiledere, portefoljestorrelser]}>
                    <div id="oversikt-sideinnhold" role="tabpanel">
                        <p className="typo-infotekst begrensetbredde blokk-l">
                            Her får du oversikt over alle veiledere som er hører til den enheten du er logget inn på.
                            Du kan se hvor mange brukere den enkelte veileder har, du kan søke opp veiledere,
                            og du kan gå inn på én veileder for å se denne veilederens oversikt.
                        </p>
                        <div className="veiledere-side--cols">
                            <div className="veiledere-side--filter-col">
                                <PanelBase className="blokk-xxxs">
                                    <Undertittel>
                                        Søk veileder
                                    </Undertittel>
                                    <FiltreringVeiledere/>
                                </PanelBase>
                            </div>
                            <div className="veiledere-side--liste-col">
                                    <FiltreringLabelContainer
                                        filtervalg={{
                                            veiledere: lagLablerTilVeiledereMedIdenter(
                                                filtervalg.veiledere,
                                                veiledere.data.veilederListe)
                                        }}
                                        filtergruppe="veiledere"
                                    />
                                    <Undertittel tag="h1" className="veiledere-undertittel blokk-xxs">
                                        {`Totalt ${veiledere.data.veilederListe.length } veiledere`}
                                    </Undertittel>
                                    <VeiledersideVisning />
                                    <TomPortefoljeModal />
                            </div>
                        </div>
                    </div>
                    </Innholdslaster>
                </div>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = (state) => ({
    veiledere: state.veiledere,
    filtervalg: state.filtreringVeilederoversikt,
    portefoljestorrelser: state.portefoljestorrelser,
    valgtEnhet: state.enheter.valgtEnhet,
    statustall: state.statustall,
});

const mapDispatchToProps = (dispatch) => ({
    hentPortefoljestorrelser: (enhetId) => dispatch(fetchPortefoljeStorrelser(enhetId)),
    initalPaginering: (side, seAlle) => dispatch(pagineringSetup({side, seAlle})),
    hentStatusTall: (enhet) => dispatch(fetchStatusTall(enhet))
});

export default connect(mapStateToProps, mapDispatchToProps)(VeiledereSide);
