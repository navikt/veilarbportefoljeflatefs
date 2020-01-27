import * as React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import Lenker from '../lenker/lenker';
import Innholdslaster from '../innholdslaster/innholdslaster';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import { lagLablerTilVeiledereMedIdenter } from '../filtrering/utils';
import {
    getSeAlleFromUrl,
    getSideFromUrl,
    getSorteringsFeltFromUrl,
    getSorteringsRekkefolgeFromUrl,
    leggEnhetIUrl, updateLastPath
} from '../utils/url-utils';
import { hentStatusTall, StatustallState } from '../ducks/statustall';
import { EnhettiltakState, hentEnhetTiltak } from '../ducks/enhettiltak';
import { FiltervalgModell, ValgtEnhetModell, VeilederModell } from '../model-interfaces';
import { ListevisningState, ListevisningType } from '../ducks/ui/listevisning';
import { pagineringSetup } from '../ducks/paginering';
import FiltreringContainer, { defaultVeileder } from '../filtrering/filtrering-container';
import { loggSkjermMetrikker, Side } from '../utils/metrikker/skjerm-metrikker';
import { loggSideVisning } from '../utils/metrikker/side-visning-metrikker';
import Toasts from '../components/toast/toast';
import { slettEnkeltFilter } from '../ducks/filtrering';
import { sortTiltak } from '../filtrering/filtrering-status/filter-utils';
import TabellOverskrift from '../components/tabell-overskrift';
import Toolbar from '../components/toolbar/toolbar';
import { ASCENDING, DESCENDING } from '../konstanter';
import { hentPortefoljeForEnhet, settSortering } from '../ducks/portefolje';
import { selectSideStorrelse } from '../components/toolbar/paginering/paginering-selector';
import { ModalEnhetSideController } from '../components/modal/modal-enhet-side-controller';
import EnhetTabell from './enhetsportefolje-tabell';
import { STATUS } from '../ducks/utils';
import EnhetTabellOverskrift from './enhetsportefolje-tabelloverskrift';
import './enhetsportefolje.less';
import './brukerliste.less';

interface StateProps {
    valgtEnhet: ValgtEnhetModell;
    filtervalg: FiltervalgModell;
    veilederliste: VeilederModell[];
    statustall: StatustallState;
    enhettiltak: EnhettiltakState;
    listevisning: ListevisningState;
    innloggetVeilederIdent: string | undefined;
    portefolje: any;
    sorteringsrekkefolge: string;
    sorteringsfelt: string;
    veiledere: any;
}

interface DispatchProps {
    hentStatusTall: (enhetId: string) => void;
    hentEnhetTiltak: (enhetId: string) => void;
    initalPaginering: (side: number, seAlle: boolean) => void;
    slettVeilederFilter: (ident: string) => void;
    doSettSortering: (sorteringsrekkefolge: string, felt: string) => void;
    hentPortefolje: (enhetid: string | undefined, sorteringsrekkefolge: string, sorteringsfelt: string, filtervalg: FiltervalgModell) => any;
}

type EnhetSideProps = StateProps & DispatchProps;

class EnhetSide extends React.Component<EnhetSideProps> {

    componentWillMount() {
        const {valgtEnhet, hentPortefolje, filtervalg} = this.props;
        leggEnhetIUrl(valgtEnhet.enhet!.enhetId);
        this.settInitalStateFraUrl();
        loggSkjermMetrikker(Side.ENHETENS_OVERSIKT);
        loggSideVisning(this.props.innloggetVeilederIdent, Side.ENHETENS_OVERSIKT);

        const sorteringsfelt = getSorteringsFeltFromUrl();
        const sorteringsrekkefolge = getSorteringsRekkefolgeFromUrl();
        this.props.doSettSortering(sorteringsrekkefolge, sorteringsfelt);

        hentPortefolje(
            valgtEnhet.enhet!.enhetId,
            sorteringsrekkefolge,
            sorteringsfelt,
            filtervalg
        );
        this.settSorteringOgHentPortefolje = this.settSorteringOgHentPortefolje.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<EnhetSideProps>, prevState: Readonly<{}>, snapshot?: any): void {
        updateLastPath();
    }

    settSorteringOgHentPortefolje(felt) {
        const {
            sorteringsrekkefolge,
            sorteringsfelt,
            doSettSortering,
            valgtEnhet,
            hentPortefolje,
            filtervalg
        } = this.props;

        let valgtRekkefolge: string;

        if (felt !== sorteringsfelt) {
            valgtRekkefolge = ASCENDING;
        } else {
            valgtRekkefolge = sorteringsrekkefolge === ASCENDING ? DESCENDING : ASCENDING;
        }
        doSettSortering(valgtRekkefolge, felt);
        hentPortefolje(
            valgtEnhet.enhet!.enhetId,
            valgtRekkefolge,
            felt,
            filtervalg,
        );
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
        const {
            filtervalg,
            veilederliste,
            statustall,
            enhettiltak,
            listevisning,
            slettVeilederFilter,
            portefolje,
            hentPortefolje,
            valgtEnhet,
            sorteringsrekkefolge,
            sorteringsfelt,
            veiledere
        } = this.props;

        const tiltak = sortTiltak(enhettiltak.data.tiltak);
        const {antallTotalt, antallReturnert, fraIndex, brukere} = portefolje.data;
        const antallValgt = brukere.filter((bruker) => bruker.markert).length;
        const tilordningerStatus = portefolje.tilordningerstatus !== STATUS.RELOADING ? STATUS.OK : STATUS.RELOADING;
        const antallBrukere = antallReturnert > antallTotalt ? antallTotalt : antallReturnert;
        const stickyWrapper = antallBrukere >= 5 ? 'col-lg-9 col-md-12 col-sm-12' : 'sticky-div col-lg-9 col-md-12 col-sm-12';
        const stickyContainer = antallBrukere >= 5 ? 'sticky-container' : 'sticky-container__fjernet';

        return (
            <DocumentTitle title="Enhetens oversikt">
                <div className="enhet-side blokk-xl">
                    <Lenker/>
                    <Toasts/>
                    <Innholdslaster avhengigheter={[statustall, enhettiltak]}>
                        <section>
                            <div id="oversikt-sideinnhold" role="tabpanel">
                                <div className="row">
                                    <div className="col-lg-3 col-lg-offset-0 col-md-offset-1 col-md-10 col-sm-12">
                                        <FiltreringContainer
                                            filtervalg={filtervalg}
                                            enhettiltak={tiltak}
                                            filtergruppe="enhet"
                                        />
                                    </div>
                                    <FiltreringLabelContainer
                                        filtervalg={{
                                            ...filtervalg,
                                            veiledere: lagLablerTilVeiledereMedIdenter(filtervalg.veiledere, veilederliste, slettVeilederFilter)
                                        }}
                                        filtergruppe="enhet"
                                        enhettiltak={enhettiltak.data.tiltak}
                                        listevisning={listevisning}
                                        className="filtrering-label-container"
                                    />
                                    <div className={stickyWrapper}>
                                        <div className={stickyContainer}>
                                            <TabellOverskrift
                                                fraIndex={fraIndex}
                                                antallIVisning={antallReturnert}
                                                antallValgt={antallValgt}
                                                antallTotalt={antallTotalt}
                                                className="tabelloverskrift blokk-xxs"
                                            />
                                            <div className="sticky-container__skygge">
                                                <Toolbar
                                                    filtergruppe={ListevisningType.enhetensOversikt}
                                                    onPaginering={() => hentPortefolje(
                                                        valgtEnhet.enhet!.enhetId,
                                                        sorteringsrekkefolge,
                                                        sorteringsfelt,
                                                        filtervalg
                                                    )}
                                                    sokVeilederSkalVises
                                                    antallTotalt={antallTotalt}
                                                />
                                                <EnhetTabellOverskrift
                                                    settSorteringOgHentPortefolje={this.settSorteringOgHentPortefolje}
                                                />
                                            </div>
                                        </div>
                                        <Innholdslaster
                                            avhengigheter={[portefolje, veiledere, {status: tilordningerStatus}]}>
                                            <div className="portefolje__container">
                                                <EnhetTabell
                                                    veiledere={veiledere.data.veilederListe}
                                                />
                                            </div>
                                        </Innholdslaster>
                                        <ModalEnhetSideController/>
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
    valgtEnhet: state.enheter.valgtEnhet,
    filtervalg: state.filtrering,
    veilederliste: state.veiledere.data.veilederListe,
    statustall: state.statustall,
    enhettiltak: state.enhettiltak,
    listevisning: state.ui.listevisningEnhetensOversikt,
    innloggetVeilederIdent: state.enheter.ident,
    portefolje: state.portefolje,
    veiledere: state.veiledere,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    sorteringsfelt: state.portefolje.sorteringsfelt,
    sideStorrelse: selectSideStorrelse(state),
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
    hentStatusTall: (enhet) => dispatch(hentStatusTall(enhet)),
    hentEnhetTiltak: (enhet) => dispatch(hentEnhetTiltak(enhet)),
    initalPaginering: (side, seAlle) => dispatch(pagineringSetup({side, seAlle})),
    slettVeilederFilter: (ident: string) => dispatch(slettEnkeltFilter('veiledere', ident, 'enhet', defaultVeileder)),

    hentPortefolje: (enhet, rekkefolge, sorteringsfelt, filtervalg) =>
        dispatch(hentPortefoljeForEnhet(enhet, rekkefolge, sorteringsfelt, filtervalg)),
    doSettSortering: (rekkefolge, felt) => dispatch(settSortering(rekkefolge, felt)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetSide);
