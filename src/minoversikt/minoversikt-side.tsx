import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { Normaltekst } from 'nav-frontend-typografi';
import Innholdslaster from './../innholdslaster/innholdslaster';
import LenkerMinoversikt from './../lenker/lenker-minoversikt';
import FiltreringContainer from '../filtrering/filtrering-container';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import VeilederPortefoljeVisning from './minoversikt-portefolje-visning';
import { hentStatusTall, StatustallState } from '../ducks/statustall';
import { EnhettiltakState, hentEnhetTiltak } from '../ducks/enhettiltak';
import { hentPortefoljeForVeileder, settSortering, settValgtVeileder } from '../ducks/portefolje';
import { EnheterState } from '../ducks/enheter';
import { VeiledereState } from '../ducks/veiledere';
import { FiltervalgModell, ValgtEnhetModell, VeilederModell, } from '../model-interfaces';
import { ListevisningState, ListevisningType } from '../ducks/ui/listevisning';
import ListevisningInfoPanel from '../components/toolbar/listevisning/listevisning-infopanel';
import {
    getSeAlleFromUrl, getSideFromUrl, getSorteringsFeltFromUrl,
    getSorteringsRekkefolgeFromUrl
} from '../utils/url-utils';
import { pagineringSetup } from '../ducks/paginering';
import './minoversikt-side.less';
import { loggSkjermMetrikker, Side } from '../utils/skjerm-metrikker';

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
}

interface IdentProps {
    ident?: string;
}

interface DispatchProps {
    hentStatusTall: (enhet: string, ident: string|undefined) => void;
    hentEnhetTiltak: (enhet: string) => void;
    doSettValgtVeileder: (ident: IdentProps) => void;
    doSettSortering: (rekkefolge: string, felt: string) => void;
    hentPortefolje: (...args) => void;
    initalPaginering: (side: number, seAlle: boolean) => void;
}

interface OwnProps {
    match:
        {params:
                { ident: string; }
        };
}

type MinoversiktSideProps = StateProps & DispatchProps & OwnProps & InjectedIntlProps;

class MinoversiktSide extends React.Component<MinoversiktSideProps> {
    componentDidMount() {
        const { veiledere, enheter, valgtEnhet, filtervalg, hentPortefolje, ...props } = this.props;
        const veilederFraUrl = veiledere.data.veilederListe.find((veileder) => (veileder.ident === props.match.params.ident));
        const innloggetVeileder = { ident: enheter.ident };
        const gjeldendeVeileder = veilederFraUrl || innloggetVeileder;

        this.settInitalStateFraUrl();
        loggSkjermMetrikker(Side.MIN_OVERSIKT);

        this.props.hentStatusTall(valgtEnhet.enhet!.enhetId, gjeldendeVeileder.ident );
        this.props.hentEnhetTiltak(valgtEnhet.enhet!.enhetId);

        this.props.doSettValgtVeileder(gjeldendeVeileder);

        const sorteringsfelt = getSorteringsFeltFromUrl();
        const sorteringsrekkefolge = getSorteringsRekkefolgeFromUrl();
        this.props.doSettSortering(sorteringsrekkefolge,sorteringsfelt);

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
        const { enheter, veiledere, intl, filtervalg, statustall, enhettiltak, listevisning, ...props } = this.props;
        const veilederFraUrl = veiledere.data.veilederListe.find((veileder) => (veileder.ident === props.match.params.ident));
        const innloggetVeileder = { ident: enheter.ident|| '', fornavn: '', etternavn: '', navn: ''};
        const gjeldendeVeileder = veilederFraUrl || innloggetVeileder;
        const { formatMessage } = intl;

        const visesAnnenVeiledersPortefolje = gjeldendeVeileder.ident !== innloggetVeileder.ident;

        const annenVeilederVarsel = (<Normaltekst tag="h1" className="blokk-s annen-veileder-varsel">
            <FormattedMessage
                id="annen.veileder.portefolje.advarsel"
                tagName="em"
                values={{
                    fornavn: gjeldendeVeileder.fornavn || '',
                    etternavn: gjeldendeVeileder.etternavn || ''
                }}
            /></Normaltekst>);

        return (
            <DocumentTitle title={formatMessage({ id: 'lenker.min.oversikt' })}>
                <Innholdslaster avhengigheter={[statustall, enhettiltak]}>
                    <div className="minoversikt-side blokk-xl">
                        {visesAnnenVeiledersPortefolje ?
                            <Link to="/veiledere" className="typo-normal tilbaketilveileder">
                                <i className="chevron--venstre" />
                                <span>
                                    <FormattedMessage id="minoversikt.link.til.veilederoversikt" />
                                </span>
                            </Link> : null}
                        <section className={visesAnnenVeiledersPortefolje ? 'annen-veileder' : ''}>
                            { visesAnnenVeiledersPortefolje ? annenVeilederVarsel : null}
                            <div className="portefolje-side">
                                <LenkerMinoversikt
                                    veilederident={veilederFraUrl ? veilederFraUrl.ident : null}
                                />
                                <div id="oversikt-sideinnhold" role="tabpanel">
                                    <p className="typo-infotekst begrensetbredde blokk-l">
                                        <FormattedMessage id="ingresstekst.minoversikt" />
                                    </p>
                                    <div className="row">
                                        <div className="col-lg-3 col-lg-offset-0 col-md-offset-1 col-md-10 col-sm-12">
                                            <FiltreringContainer
                                                filtervalg={filtervalg}
                                                filtergruppe="veileder"
                                                veileder={gjeldendeVeileder}
                                                enhettiltak={enhettiltak.data.tiltak}
                                            />
                                        </div>
                                        <div className="col-lg-9 col-md-12 col-sm-12">
                                            <FiltreringLabelContainer
                                                filtervalg={filtervalg}
                                                filtergruppe="veileder"
                                                veileder={gjeldendeVeileder}
                                                enhettiltak={enhettiltak.data.tiltak}
                                                listevisning={listevisning}
                                            />
                                            <ListevisningInfoPanel name={ListevisningType.minOversikt} />
                                            <VeilederPortefoljeVisning
                                                gjeldendeVeileder={gjeldendeVeileder}
                                                visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </Innholdslaster>
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
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
    hentPortefolje: (enhet, veileder, rekkefolge, felt, filtervalg, fra = 0, antall = 20) =>
        dispatch(hentPortefoljeForVeileder(enhet, veileder, rekkefolge, felt, filtervalg)),
    hentStatusTall: (enhet: string, veileder: string|undefined) => dispatch(hentStatusTall(enhet, veileder)),
    hentEnhetTiltak: (enhet: string) => dispatch(hentEnhetTiltak(enhet)),
    doSettSortering: (rekkefolge, felt) => dispatch(settSortering(rekkefolge, felt)),
    doSettValgtVeileder: (identProps: IdentProps) => dispatch(settValgtVeileder(identProps)),
    initalPaginering: (side, seAlle) => dispatch(pagineringSetup({side, seAlle}))
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MinoversiktSide));
