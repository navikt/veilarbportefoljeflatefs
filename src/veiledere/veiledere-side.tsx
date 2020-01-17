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
import { FiltreringState, slettEnkeltFilter } from '../ducks/filtrering';
import { loggSkjermMetrikker, Side } from '../utils/metrikker/skjerm-metrikker';
import { hentPortefoljeStorrelser as fetchPortefoljeStorrelser } from '../ducks/portefoljestorrelser';
import { hentStatusTall as fetchStatusTall } from '../ducks/statustall';
import { RouterProps } from 'react-router';
import { defaultVeileder } from '../filtrering/filtrering-container';

interface StateProps {
    veiledere: VeiledereState;
    portefoljestorrelser: any;
    filtervalg: FiltreringState;
    valgtEnhet: ValgtEnhetModell;
    statustall: { data: StatustallModell };
}

interface DispatchProps {
    hentPortefoljestorrelser: (enhetId: string) => void;
    initalPaginering: (side: number, seAlle: boolean) => void;
    hentStatusTall: (enhet: string) => void;
    slettVeilederFilter: (ident: string) => void;
}

type VeiledereSideProps = StateProps & DispatchProps & RouterProps;

class VeiledereSide extends React.Component<VeiledereSideProps> {
    componentWillMount() {
        const {valgtEnhet} = this.props;
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
        const {hentPortefoljestorrelser, hentStatusTall, valgtEnhet} = this.props;
        hentPortefoljestorrelser(valgtEnhet.enhet!.enhetId);
        hentStatusTall(this.props.valgtEnhet.enhet!.enhetId);
    }

    render() {
        const {veiledere, portefoljestorrelser, filtervalg, statustall, slettVeilederFilter} = this.props;

        return (
            <DocumentTitle title="Veilederoversikt">
                <div className="veiledere-side blokk-xl">
                    <Lenker/>
                    <Innholdslaster avhengigheter={[statustall, veiledere, portefoljestorrelser]}>
                        <section>
                            <div id="oversikt-sideinnhold" role="tabpanel">
                                <div className="row">
                                    <div className="col-lg-3 col-lg-offset-0 col-md-offset-1 col-md-10 col-sm-12">
                                        <PanelBase className="blokk-xxxs sok-veileder">
                                            <Undertittel>
                                                Søk veileder
                                            </Undertittel>
                                            <FiltreringVeiledere/>
                                        </PanelBase>
                                    </div>

                                    <div className="col-lg-9 col-md-12 col-sm-12">
                                        <div className="sticky-container">
                                            <FiltreringLabelContainer
                                                filtervalg={{
                                                    veiledere: lagLablerTilVeiledereMedIdenter(
                                                        filtervalg.veiledere,
                                                        veiledere.data.veilederListe,
                                                        slettVeilederFilter
                                                    )
                                                }}
                                                filtergruppe="veiledere"
                                                className="filtrering-label-container"
                                            />
                                            <Undertittel tag="h1" className="veiledere-undertittel blokk-xxs">
                                                {`Totalt ${veiledere.data.veilederListe.length} veiledere`}
                                            </Undertittel>
                                        </div>
                                        <VeiledersideVisning/>
                                    </div>
                                </div>
                            </div>
                        </section>
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
    hentStatusTall: (enhet) => dispatch(fetchStatusTall(enhet)),
    slettVeilederFilter: (ident: string) => dispatch(slettEnkeltFilter('veiledere', ident, 'veiledere', defaultVeileder))
});

export default connect(mapStateToProps, mapDispatchToProps)(VeiledereSide);
