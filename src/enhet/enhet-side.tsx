import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl';
import DocumentTitle from 'react-document-title';
import Lenker from './../lenker/lenker';
import Innholdslaster from './../innholdslaster/innholdslaster';
import EnhetsportefoljeVisning from '../enhetsportefolje/enhetsportefolje-visning';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import { lagLablerTilVeiledereMedIdenter } from '../filtrering/utils';
import { getSeAlleFromUrl, getSideFromUrl, leggEnhetIUrl } from '../utils/url-utils';
import { hentStatusTall } from '../ducks/statustall';
import { EnhettiltakState, hentEnhetTiltak } from '../ducks/enhettiltak';
import TomPortefoljeModal from '../modal/tom-portefolje-modal';
import ListevisningInfoPanel from '../components/toolbar/listevisning/listevisning-infopanel';
import { AppState } from '../reducer';
import { StatustallModell, ValgtEnhetModell, VeilederModell } from '../model-interfaces';
import { ListevisningState, ListevisningType } from '../ducks/ui/listevisning';
import { FiltreringState } from '../ducks/filtrering';
import { pagineringSetup } from '../ducks/paginering';
import FiltreringContainer from '../filtrering/filtrering-container';

import './enhet-side.less';
import { loggSkjermMetrikker, Side } from '../utils/skjerm-metrikker';

interface StateProps {
    valgtEnhet: ValgtEnhetModell;
    filtervalg: FiltreringState;
    veilederliste: VeilederModell[];
    statustall: { data: StatustallModell };
    enhettiltak: EnhettiltakState;
    listevisning: ListevisningState;
}

interface DispatchProps {
    hentStatusTall: (enhetId: string) => void;
    hentEnhetTiltak: (enhetId: string) => void;
    initalPaginering: (side: number, seAlle: boolean) => void;
}

interface OwnProps {
    intl: InjectedIntl;
}

type EnhetSideProps = StateProps & DispatchProps & OwnProps;

class EnhetSide extends React.Component<EnhetSideProps, {}> {
    componentWillMount() {
        const { valgtEnhet } = this.props;
        leggEnhetIUrl(valgtEnhet.enhet!.enhetId);
        this.settInitalStateFraUrl();
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
        const { filtervalg, veilederliste, statustall, enhettiltak, listevisning, intl } = this.props;
        const { formatMessage } = intl;
        return (
            <DocumentTitle title={formatMessage({ id: 'lenker.enhet.oversikt' })}>
                <div className="enhet-side blokk-xl">
                    <Lenker />
                    <Innholdslaster avhengigheter={[statustall, enhettiltak]}>
                        <div id="oversikt-sideinnhold" role="tabpanel">
                            <p className="typo-infotekst begrensetbredde blokk-l">
                                <FormattedMessage id="enhet.ingresstekst.enhetoversikt" />
                            </p>
                            <div className="enhet-side--cols">
                                <div className="enhet-side--filter-col">
                                    <FiltreringContainer
                                        filtervalg={filtervalg}
                                        enhettiltak={enhettiltak.data.tiltak}
                                        filtergruppe="enhet"
                                    />
                                </div>
                                <div className="enhet-side--liste-col">
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
    listevisning: state.ui.listevisningEnhetensOversikt
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
    hentStatusTall: (enhet) => dispatch(hentStatusTall(enhet)),
    hentEnhetTiltak: (enhet) => dispatch(hentEnhetTiltak(enhet)),
    initalPaginering: (side, seAlle) => dispatch(pagineringSetup({side, seAlle}))
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(EnhetSide));
