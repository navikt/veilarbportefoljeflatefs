import * as React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import Lenker from '../lenker/lenker';
import Innholdslaster from '../innholdslaster/innholdslaster';
import EnhetsportefoljeVisning from './enhetsportefolje-visning';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import { lagLablerTilVeiledereMedIdenter } from '../filtrering/utils';
import { getSeAlleFromUrl, getSideFromUrl, leggEnhetIUrl } from '../utils/url-utils';
import { hentStatusTall, StatustallState } from '../ducks/statustall';
import { EnhettiltakState, hentEnhetTiltak } from '../ducks/enhettiltak';
import TomPortefoljeModal from '../components/modal/tom-portefolje-modal';
import ListevisningInfoPanel from '../components/toolbar/listevisning/listevisning-infopanel';
import { AppState } from '../reducer';
import { FiltervalgModell, ValgtEnhetModell, VeilederModell } from '../model-interfaces';
import { ListevisningState, ListevisningType } from '../ducks/ui/listevisning';
import { pagineringSetup } from '../ducks/paginering';
import FiltreringContainer, {defaultVeileder} from '../filtrering/filtrering-container';
import { loggSkjermMetrikker, Side } from '../utils/metrikker/skjerm-metrikker';
import { loggSideVisning } from '../utils/metrikker/side-visning-metrikker';
import './enhet-side.less';
import Toasts from '../components/toast/toast';
import {slettEnkeltFilter} from "../ducks/filtrering";
import {sortTiltak} from "../filtrering/filtrering-status/filter-utils";

interface StateProps {
    valgtEnhet: ValgtEnhetModell;
    filtervalg: FiltervalgModell;
    veilederliste: VeilederModell[];
    statustall: StatustallState;
    enhettiltak: EnhettiltakState;
    listevisning: ListevisningState;
    innloggetVeilederIdent: string | undefined;
}

interface DispatchProps {
    hentStatusTall: (enhetId: string) => void;
    hentEnhetTiltak: (enhetId: string) => void;
    initalPaginering: (side: number, seAlle: boolean) => void;
    slettVeilederFilter: (ident: string) => void;
}

type EnhetSideProps = StateProps & DispatchProps;

class EnhetSide extends React.Component<EnhetSideProps> {

    componentWillMount() {
        const {valgtEnhet} = this.props;
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
        const {filtervalg, veilederliste, statustall, enhettiltak, listevisning, slettVeilederFilter} = this.props;
        const tiltak = sortTiltak(enhettiltak.data.tiltak);

        return (
            <DocumentTitle title="Enhetens oversikt">
                <div className="enhet-side blokk-xl">
                    <Lenker/>
                    <Toasts/>
                    <Innholdslaster avhengigheter={[statustall, enhettiltak]}>
                        <div id="oversikt-sideinnhold" role="tabpanel">
                            <div className="col-lg-3 col-lg-offset-0 col-md-offset-1 col-md-10 col-sm-12">
                                <FiltreringContainer
                                    filtervalg={filtervalg}
                                    enhettiltak={tiltak}
                                    filtergruppe="enhet"
                                />
                            </div>
                            <div className="col-lg-9 col-md-12 col-sm-12">
                                <FiltreringLabelContainer
                                    filtervalg={{
                                        ...filtervalg,
                                        veiledere: lagLablerTilVeiledereMedIdenter(filtervalg.veiledere, veilederliste, slettVeilederFilter)
                                    }}
                                    filtergruppe="enhet"
                                    enhettiltak={enhettiltak.data.tiltak}
                                    listevisning={listevisning}
                                />
                                <ListevisningInfoPanel name={ListevisningType.enhetensOversikt}/>
                                <EnhetsportefoljeVisning/>
                                <TomPortefoljeModal/>
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
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
    hentStatusTall: (enhet) => dispatch(hentStatusTall(enhet)),
    hentEnhetTiltak: (enhet) => dispatch(hentEnhetTiltak(enhet)),
    initalPaginering: (side, seAlle) => dispatch(pagineringSetup({side, seAlle})),
    slettVeilederFilter: (ident: string) => dispatch( slettEnkeltFilter("veiledere", ident,  'enhet', defaultVeileder))
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetSide);
