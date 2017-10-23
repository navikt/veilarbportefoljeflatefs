import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import { Normaltekst } from 'nav-frontend-typografi';
import Innholdslaster from './../innholdslaster/innholdslaster';
import LenkerMinoversikt from './../lenker/lenker-minoversikt';
import FiltreringContainer from '../filtrering/filtrering-container';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import VeilederPortefoljeVisning from './minoversikt-portefolje-visning';
import { filtervalgShape, statustallShape } from '../proptype-shapes';
import { hentStatusTall, StatustallState } from '../ducks/statustall';
import { EnhettiltakState, hentEnhetTiltak } from '../ducks/enhettiltak';
import { settValgtVeileder } from '../ducks/portefolje';
import { EnheterState } from '../ducks/enheter';
import { VeiledereState } from '../ducks/veiledere';
import { FiltervalgModell, ValgtEnhetModell, } from '../model-interfaces';
import { ListevisningState } from '../ducks/ui/listevisning';

interface StateProps {
    valgtEnhet: ValgtEnhetModell;
    enheter: EnheterState;
    veiledere: VeiledereState;
    filtervalg: FiltervalgModell;
    statustall: StatustallState;
    enhettiltak: EnhettiltakState;
    listevisning: ListevisningState;
}

interface DispatchProps {
    hentStatusTall: (enhet: string, veileder?: string) => void;
    hentEnhetTiltak: (enhet: string) => void;
    doSettValgtVeileder: (veileder: string) => void;
}

interface OwnProps {
    params: {
        ident: string;
    };
}

type MinoversiktSideProps = StateProps & DispatchProps & OwnProps & InjectedIntlProps;

class MinOversiktSide extends React.Component<MinoversiktSideProps> {
    componentDidMount() {
        const { veiledere, enheter, ...props } = this.props;
        const veilederFraUrl = veiledere.data.veilederListe.find((veileder) => (veileder.ident === props.params.ident));
        const innloggetVeileder = { ident: enheter.ident };
        const gjeldendeVeileder = veilederFraUrl || innloggetVeileder;
        this.props.hentStatusTall(this.props.valgtEnhet.enhet!.enhetId, gjeldendeVeileder.ident);
        this.props.hentEnhetTiltak(this.props.valgtEnhet.enhet!.enhetId);

        if (veilederFraUrl != null && veilederFraUrl.ident != null) {
            this.props.doSettValgtVeileder(veilederFraUrl.ident);
        }
    }

    render() {
        const { enheter, veiledere, intl, filtervalg, statustall, enhettiltak, listevisning, ...props } = this.props;

        const veilederFraUrl = veiledere.data.veilederListe.find((veileder) => (veileder.ident === props.params.ident));
        const innloggetVeileder = { ident: enheter.ident };
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
                    <div className="enhet-side blokk-xl">
                        {visesAnnenVeiledersPortefolje ?
                            <Link to="veiledere" className="typo-normal tilbaketilveileder">
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
                                    <FiltreringContainer
                                        filtervalg={filtervalg}
                                        filtergruppe="veileder"
                                        veileder={gjeldendeVeileder}
                                        enhettiltak={enhettiltak.data.tiltak}
                                    />
                                    <FiltreringLabelContainer
                                        filtervalg={filtervalg}
                                        filtergruppe="veileder"
                                        veileder={gjeldendeVeileder}
                                        enhettiltak={enhettiltak.data.tiltak}
                                        listevisning={listevisning}
                                    />
                                    <VeilederPortefoljeVisning
                                        gjeldendeVeileder={gjeldendeVeileder}
                                        visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje}
                                    />
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
    listevisning: state.ui.listevisningMinOversikt
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
    hentStatusTall: (enhet: string, veileder: string) => dispatch(hentStatusTall(enhet, veileder)),
    hentEnhetTiltak: (enhet: string) => dispatch(hentEnhetTiltak(enhet)),
    doSettValgtVeileder: (veileder: string) => dispatch(settValgtVeileder(veileder))
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(MinOversiktSide));
