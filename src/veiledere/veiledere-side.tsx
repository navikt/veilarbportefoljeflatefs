import * as React from 'react';
import { connect } from 'react-redux';
import { Undertittel } from 'nav-frontend-typografi';
import DocumentTitle from 'react-document-title';
import VeiledersideVisning from './veilederside-visning';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Lenker from '../lenker/lenker';
import { getSeAlleFromUrl, getSideFromUrl, leggEnhetIUrl } from '../utils/url-utils';
import { VeiledereState } from '../ducks/veiledere';
import {FiltervalgModell, StatustallModell} from '../model-interfaces';
import { pagineringSetup } from '../ducks/paginering';
import './veiledere-side.less';
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
        //leggEnhetIUrl(valgtEnhet!);
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
                        <div id="oversikt-sideinnhold" role="tabpanel">
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
                                                veiledere.data.veilederListe,
                                                slettVeilederFilter
                                            )
                                        }}
                                        filtergruppe="veiledere"
                                    />
                                    <Undertittel tag="h1" className="veiledere-undertittel blokk-xxs">
                                        {`Totalt ${veiledere.data.veilederListe.length} veiledere`}
                                    </Undertittel>
                                    <VeiledersideVisning/>
                                </div>
                            </div>
                        </div>
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
