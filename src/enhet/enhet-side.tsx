import * as React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import Lenker from '../lenker/lenker';
import Innholdslaster from '../innholdslaster/innholdslaster';
import EnhetsportefoljeVisning from '../enhetsportefolje/enhetsportefolje-visning';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import { lagLablerTilVeiledereMedIdenter } from '../filtrering/utils';
import { getSeAlleFromUrl, getSideFromUrl, leggEnhetIUrl } from '../utils/url-utils';
import { hentStatusTall, StatustallState } from '../ducks/statustall';
import { EnhettiltakState, hentEnhetTiltak } from '../ducks/enhettiltak';
import TomPortefoljeModal from '../modal/tom-portefolje-modal';
import ListevisningInfoPanel from '../components/toolbar/listevisning/listevisning-infopanel';
import { AppState } from '../reducer';
import { FiltervalgModell, ValgtEnhetModell, VeilederModell } from '../model-interfaces';
import { ListevisningState, ListevisningType } from '../ducks/ui/listevisning';
import { pagineringSetup } from '../ducks/paginering';
import FiltreringContainer, {defaultVeileder} from '../filtrering/filtrering-container';
import { loggSkjermMetrikker, Side } from '../utils/metrikker/skjerm-metrikker';
import { loggSideVisning } from '../utils/metrikker/side-visning-metrikker';
import './enhet-side.less';
import {sjekkFeature} from "../ducks/features";
import {FLYTT_STATUSFILTER} from "../konstanter";
import {FiltreringStatusNy} from "../filtrering/filtrering-status/filtrering-status-ny";
import MetrikkEkspanderbartpanel from "../components/toolbar/metrikk-ekspanderbartpanel";

interface StateProps {
    valgtEnhet: ValgtEnhetModell;
    filtervalg: FiltervalgModell;
    veilederliste: VeilederModell[];
    statustall: StatustallState;
    enhettiltak: EnhettiltakState;
    listevisning: ListevisningState;
    innloggetVeilederIdent: string | undefined;
    harFeature: (feature: string) => boolean;
}

interface DispatchProps {
    hentStatusTall: (enhetId: string) => void;
    hentEnhetTiltak: (enhetId: string) => void;
    initalPaginering: (side: number, seAlle: boolean) => void;
}

type EnhetSideProps = StateProps & DispatchProps;

class EnhetSide extends React.Component<EnhetSideProps> {

    componentWillMount() {
        const { valgtEnhet } = this.props;
        leggEnhetIUrl(valgtEnhet.enhet!.enhetId);
        this.settInitalStateFraUrl();
        loggSkjermMetrikker(Side.ENHETENS_OVERSIKT);
        loggSideVisning(this.props.innloggetVeilederIdent, Side.ENHETENS_OVERSIKT);
    }

    settInitalStateFraUrl() {
        const side = getSideFromUrl();
        const seAlle = getSeAlleFromUrl();
        this.props.initalPaginering(side, seAlle);
    }

    componentDidMount() {
        this.props.hentStatusTall(this.props.valgtEnhet.enhet!.enhetId);
        this.props.hentEnhetTiltak(this.props.valgtEnhet.enhet!.enhetId);
    }

    render() {
        const { filtervalg, veilederliste, statustall, enhettiltak, listevisning, harFeature } = this.props;
        const harFlyttStatusFeature = harFeature(FLYTT_STATUSFILTER);
        return (
            <DocumentTitle title="Enhetens oversikt">
                <div className="blokk-xl">
                    <Lenker />
                    <Innholdslaster avhengigheter={[statustall, enhettiltak]}>
                        <div className="enhet-side">
                            <div className="col-lg-3 col-lg-offset-0 col-md-offset-1 col-md-10 col-sm-12">
                                <FiltreringContainer
                                    filtervalg={filtervalg}
                                    enhettiltak={enhettiltak.data.tiltak}
                                    filtergruppe="enhet"
                                    harFlyttStatusFeature={harFlyttStatusFeature}
                                />
                            </div>
                            <div className="col-lg-9 col-md-12 col-sm-12">
                                <MetrikkEkspanderbartpanel
                                    apen
                                    tittel="Status"
                                    tittelProps="undertittel"
                                    lamellNavn="status"
                                    hidden={!harFlyttStatusFeature}
                                >
                                    <FiltreringStatusNy
                                        filtervalg={filtervalg}
                                        veileder={defaultVeileder}
                                    />
                                </MetrikkEkspanderbartpanel>
                                <FiltreringLabelContainer
                                    filtervalg={{
                                        ...filtervalg,
                                        veiledere: lagLablerTilVeiledereMedIdenter(filtervalg.veiledere, veilederliste)
                                    }}
                                    filtergruppe="enhet"
                                    enhettiltak={enhettiltak.data.tiltak}
                                    listevisning={listevisning}
                                />
                                <ListevisningInfoPanel name={ListevisningType.enhetensOversikt} />
                                <EnhetsportefoljeVisning />
                                <TomPortefoljeModal />
                            </div>
                        </div>
                    </Innholdslaster>
                </div>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    valgtEnhet: state.enheter.valgtEnhet,
    filtervalg: state.filtrering,
    veilederliste: state.veiledere.data.veilederListe,
    statustall: state.statustall,
    enhettiltak: state.enhettiltak,
    listevisning: state.ui.listevisningEnhetensOversikt,
    innloggetVeilederIdent: state.enheter.ident,
    harFeature: (feature: string) => sjekkFeature(state, feature)
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
    hentStatusTall: (enhet) => dispatch(hentStatusTall(enhet)),
    hentEnhetTiltak: (enhet) => dispatch(hentEnhetTiltak(enhet)),
    initalPaginering: (side, seAlle) => dispatch(pagineringSetup({side, seAlle}))
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetSide);
