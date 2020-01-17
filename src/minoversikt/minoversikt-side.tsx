import * as React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { Normaltekst } from 'nav-frontend-typografi';
import Innholdslaster from './../innholdslaster/innholdslaster';
import FiltreringContainer from '../filtrering/filtrering-container';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import { hentStatusTall, StatustallState } from '../ducks/statustall';
import { EnhettiltakState, hentEnhetTiltak } from '../ducks/enhettiltak';
import { hentPortefoljeForVeileder, settSortering, settValgtVeileder } from '../ducks/portefolje';
import { EnheterState } from '../ducks/enheter';
import { VeiledereState } from '../ducks/veiledere';
import { FiltervalgModell, ValgtEnhetModell, VeilederModell } from '../model-interfaces';
import { ListevisningState, ListevisningType } from '../ducks/ui/listevisning';
import {
    getSeAlleFromUrl, getSideFromUrl, getSorteringsFeltFromUrl,
    getSorteringsRekkefolgeFromUrl, leggEnhetIUrl
} from '../utils/url-utils';
import { pagineringSetup } from '../ducks/paginering';
import { loggSkjermMetrikker, Side } from '../utils/metrikker/skjerm-metrikker';
import { loggSideVisning } from '../utils/metrikker/side-visning-metrikker';
import './minoversikt-side.less';
import { sortTiltak } from '../filtrering/filtrering-status/filter-utils';
import Lenker from '../lenker/lenker';
import TabellOverskrift from '../components/tabell-overskrift';
import Toolbar from '../components/toolbar/toolbar';
import MinoversiktTabellOverskrift from './minoversikt-portefolje-tabelloverskrift';
import MinoversiktTabell from './minoversikt-portefolje-tabell';
import { MinOversiktModalController } from '../components/modal/modal-min-oversikt-controller';
import { STATUS } from '../ducks/utils';
import { ASCENDING, DESCENDING } from '../konstanter';

interface StateProps {
    valgtEnhet: ValgtEnhetModell;
    enheter: EnheterState;
    veiledere: VeiledereState;
    filtervalg: FiltervalgModell;
    statustall: StatustallState;
    enhettiltak: EnhettiltakState;
    listevisning: ListevisningState;
    sorteringsfelt: string;
    sorteringsrekkefolge: string;
    innloggetVeilederIdent: string;
    portefolje: any;
}

interface IdentProps {
    ident?: string;
}

interface DispatchProps {
    hentStatusTall: (enhet: string, ident: string | undefined) => void;
    hentEnhetTiltak: (enhet: string) => void;
    doSettValgtVeileder: (ident: IdentProps) => void;
    doSettSortering: (rekkefolge: string, felt: string) => void;
    hentPortefolje: (...args) => void;
    initalPaginering: (side: number, seAlle: boolean) => void;
}

interface OwnProps {
    match:
        {
            params:
                { ident: string; }
        };
    gjeldendeVeileder: VeilederModell;
    visesAnnenVeiledersPortefolje: boolean;
}

type MinoversiktSideProps = StateProps & DispatchProps & OwnProps;

class MinoversiktSide extends React.Component<MinoversiktSideProps> {
    componentWillMount() {
        const {
            valgtEnhet,
        } = this.props;

        leggEnhetIUrl(valgtEnhet.enhet!.enhetId!);
        this.settSorteringOgHentPortefolje = this.settSorteringOgHentPortefolje.bind(this);
    }

    settSorteringOgHentPortefolje(felt) {
        const {
            sorteringsrekkefolge,
            sorteringsfelt,
            doSettSortering,
            hentPortefolje,
            gjeldendeVeileder,
            valgtEnhet,
            filtervalg
        } = this.props;
        let valgtRekkefolge: string;
        if (felt !== sorteringsfelt) {
            valgtRekkefolge = ASCENDING;
        } else {
            valgtRekkefolge = sorteringsrekkefolge === ASCENDING ? DESCENDING : ASCENDING;
        }
        doSettSortering(valgtRekkefolge, felt);
        hentPortefolje(valgtEnhet.enhet!.enhetId, gjeldendeVeileder.ident, valgtRekkefolge, felt, filtervalg);
    }

    componentDidMount() {
        const {veiledere, enheter, valgtEnhet, filtervalg, hentPortefolje, ...props} = this.props;
        const veilederFraUrl = veiledere.data.veilederListe.find((veileder) => (veileder.ident === props.match.params.ident));
        const innloggetVeileder = {ident: enheter.ident};
        const gjeldendeVeileder = veilederFraUrl || innloggetVeileder;

        this.settInitalStateFraUrl();
        loggSkjermMetrikker(Side.MIN_OVERSIKT);
        loggSideVisning(props.innloggetVeilederIdent, Side.MIN_OVERSIKT);

        this.props.hentStatusTall(valgtEnhet.enhet!.enhetId, gjeldendeVeileder.ident);
        this.props.hentEnhetTiltak(valgtEnhet.enhet!.enhetId);
        this.props.doSettValgtVeileder(gjeldendeVeileder);

        const sorteringsfelt = getSorteringsFeltFromUrl();
        const sorteringsrekkefolge = getSorteringsRekkefolgeFromUrl();
        this.props.doSettSortering(sorteringsrekkefolge, sorteringsfelt);

        hentPortefolje(
            valgtEnhet.enhet!.enhetId, gjeldendeVeileder.ident, sorteringsrekkefolge, sorteringsfelt, filtervalg
        );
    }

    settInitalStateFraUrl() {
        const side = getSideFromUrl();
        const seAlle = getSeAlleFromUrl();
        this.props.initalPaginering(side, seAlle);
    }

    render() {
        const {
            enheter,
            veiledere,
            filtervalg,
            statustall,
            enhettiltak,
            listevisning,
            portefolje,
            hentPortefolje,
            sorteringsrekkefolge,
            sorteringsfelt,
            valgtEnhet,
            innloggetVeilederIdent,
            ...props
        } = this.props;

        const veilederFraUrl = veiledere.data.veilederListe.find((veileder) => (veileder.ident === props.match.params.ident));
        const innloggetVeileder = {ident: enheter.ident || '', fornavn: '', etternavn: '', navn: ''};
        const gjeldendeVeileder = veilederFraUrl || innloggetVeileder;
        const visesAnnenVeiledersPortefolje = gjeldendeVeileder.ident !== innloggetVeileder.ident;
        const annenVeilederVarsel = (
            <Normaltekst tag="h1" className="blokk-s annen-veileder-varsel">
                {`Du er inne på ${gjeldendeVeileder.fornavn} ${gjeldendeVeileder.etternavn} sin oversikt`}
            </Normaltekst>
        );
        const tiltak = sortTiltak(enhettiltak.data.tiltak);
        const {antallTotalt, antallReturnert, fraIndex, brukere} = portefolje.data;
        const antallValgt = brukere.filter((bruker) => bruker.markert).length;
        const tilordningerStatus = portefolje.tilordningerstatus !== STATUS.RELOADING ? STATUS.OK : STATUS.RELOADING;
        return (
            <DocumentTitle title="Min oversikt">
                <div className="minoversikt-side blokk-xl">
                    <Lenker/>
                    <Innholdslaster avhengigheter={[statustall, enhettiltak]}>
                        <section className={visesAnnenVeiledersPortefolje ? 'annen-veileder' : ''}>
                            {visesAnnenVeiledersPortefolje ? annenVeilederVarsel : null}
                            <div className="portefolje-side">
                                <div id="oversikt-sideinnhold" role="tabpanel">
                                    <div className="row">
                                        <div className="col-lg-3 col-lg-offset-0 col-md-offset-1 col-md-10 col-sm-12">
                                            <FiltreringContainer
                                                filtervalg={filtervalg}
                                                filtergruppe="veileder"
                                                veileder={gjeldendeVeileder}
                                                enhettiltak={tiltak}
                                            />
                                        </div>
                                        <div className="col-lg-9 col-md-12 col-sm-12">
                                            <div className="sticky-container">
                                                <FiltreringLabelContainer
                                                    filtervalg={filtervalg}
                                                    filtergruppe="veileder"
                                                    veileder={gjeldendeVeileder}
                                                    enhettiltak={enhettiltak.data.tiltak}
                                                    listevisning={listevisning}
                                                    className={visesAnnenVeiledersPortefolje ? 'filtrering-label-container__annen-veileder' : 'filtrering-label-container'}
                                                />
                                                <TabellOverskrift
                                                    fraIndex={fraIndex}
                                                    antallIVisning={antallReturnert}
                                                    antallTotalt={antallTotalt}
                                                    antallValgt={antallValgt}
                                                    className={visesAnnenVeiledersPortefolje ? 'tabelloverskrift__annen-veileder blokk-xxs' : 'tabelloverskrift blokk-xxs'} //tabelloverskrift blokk-xxs
                                                />
                                                <div className="sticky-container__skygge">
                                                    <Toolbar
                                                        filtergruppe={ListevisningType.minOversikt}
                                                        onPaginering={() => hentPortefolje(
                                                            valgtEnhet.enhet!.enhetId,
                                                            gjeldendeVeileder.ident,
                                                            sorteringsrekkefolge,
                                                            sorteringsfelt,
                                                            filtervalg
                                                        )}
                                                        gjeldendeVeileder={gjeldendeVeileder}
                                                        visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje}
                                                        sokVeilederSkalVises={false}
                                                        antallTotalt={antallTotalt}
                                                    />
                                                    <MinoversiktTabellOverskrift
                                                        innloggetVeileder={innloggetVeilederIdent}
                                                        settSorteringOgHentPortefolje={this.settSorteringOgHentPortefolje}
                                                    />
                                                </div>
                                            </div>
                                            <Innholdslaster
                                                avhengigheter={[portefolje, {status: tilordningerStatus}]}>
                                                <div className="portefolje__container">
                                                    <MinoversiktTabell
                                                        innloggetVeileder={innloggetVeilederIdent}
                                                        settSorteringOgHentPortefolje={this.settSorteringOgHentPortefolje}
                                                    />
                                                </div>
                                            </Innholdslaster>
                                            <MinOversiktModalController/>
                                        </div>
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

const mapStateToProps = (state): StateProps => ({
    valgtEnhet: state.enheter.valgtEnhet,
    enheter: state.enheter,
    veiledere: state.veiledere,
    filtervalg: state.filtreringMinoversikt,
    statustall: state.statustall,
    enhettiltak: state.enhettiltak,
    listevisning: state.ui.listevisningMinOversikt,
    sorteringsfelt: state.portefolje.sorteringsfelt,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    innloggetVeilederIdent: state.enheter.ident,
    portefolje: state.portefolje,
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
    hentPortefolje: (enhet, veileder, rekkefolge, felt, filtervalg, fra = 0, antall = 20) =>
        dispatch(hentPortefoljeForVeileder(enhet, veileder, rekkefolge, felt, filtervalg)),
    hentStatusTall: (enhet: string, veileder: string | undefined) => dispatch(hentStatusTall(enhet, veileder)),
    hentEnhetTiltak: (enhet: string) => dispatch(hentEnhetTiltak(enhet)),
    doSettSortering: (rekkefolge, felt) => dispatch(settSortering(rekkefolge, felt)),
    doSettValgtVeileder: (identProps: IdentProps) => dispatch(settValgtVeileder(identProps)),
    initalPaginering: (side, seAlle) => dispatch(pagineringSetup({side, seAlle}))
});

export default connect(mapStateToProps, mapDispatchToProps)(MinoversiktSide);
