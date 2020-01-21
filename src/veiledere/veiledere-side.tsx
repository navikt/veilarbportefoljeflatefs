import * as React from 'react';
import { connect } from 'react-redux';
import { Undertittel } from 'nav-frontend-typografi';
import DocumentTitle from 'react-document-title';
import VeiledersideVisning from './veilederside-visning';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { leggEnhetIUrl } from '../utils/url-utils';
import { VeiledereState } from '../ducks/veiledere';
import {FiltervalgModell, StatustallModell} from '../model-interfaces';
import { pagineringSetup } from '../ducks/paginering';
import FiltreringVeiledere from '../filtrering/filtrering-veiledere';
import PanelBase from 'nav-frontend-paneler';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import { lagLablerTilVeiledereMedIdenter } from '../filtrering/utils';
import { slettEnkeltFilter } from '../ducks/filtrering';
import { loggSkjermMetrikker, Side } from '../utils/metrikker/skjerm-metrikker';
import { hentPortefoljeStorrelser as fetchPortefoljeStorrelser } from '../ducks/portefoljestorrelser';
import { hentStatusTall as fetchStatusTall } from '../ducks/statustall';
import { RouterProps } from 'react-router';
import { defaultVeileder } from '../filtrering/filtrering-container';
import './veiledere.less';
import {AppState} from "../reducer";
import {OrNothing} from "../utils/types/types";

interface StateProps {
    veiledere: VeiledereState;
    portefoljestorrelser: any;
    filtervalg: FiltervalgModell;
    valgtEnhet: OrNothing<string>;
    statustall: {data: StatustallModell};
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
        const { valgtEnhet } = this.props;
        leggEnhetIUrl(valgtEnhet!);
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
        hentPortefoljestorrelser(valgtEnhet!);
        hentStatusTall(valgtEnhet!);
    }

    render() {
        const {veiledere, portefoljestorrelser, filtervalg, statustall, slettVeilederFilter} = this.props;

        return (
            <DocumentTitle title="Veilederoversikt">
                <div className="veiledere-side">
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
                                        <div className="sticky-container">
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

const mapStateToProps = (state: AppState) => ({
    veiledere: state.veiledere,
    filtervalg: state.filtreringVeilederoversikt,
    portefoljestorrelser: state.portefoljestorrelser,
    valgtEnhet: state.valgtEnhet.data.enhetId,
    statustall: state.statustall,
});

const mapDispatchToProps = (dispatch) => ({
    hentPortefoljestorrelser: (enhetId) => dispatch(fetchPortefoljeStorrelser(enhetId)),
    initalPaginering: (side, seAlle) => dispatch(pagineringSetup({side, seAlle})),
    hentStatusTall: (enhet) => dispatch(fetchStatusTall(enhet)),
    slettVeilederFilter: (ident: string) => dispatch(slettEnkeltFilter('veiledere', ident, 'veiledere', defaultVeileder))
});

export default connect(mapStateToProps, mapDispatchToProps)(VeiledereSide);
