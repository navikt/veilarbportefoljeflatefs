import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import { Normaltekst } from 'nav-frontend-typografi';
import Innholdslaster from './../innholdslaster/innholdslaster';
import LenkerMinoversikt from './../lenker/lenker-minoversikt';
import FiltreringContainer from '../filtrering/filtrering-container';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import VeilederPortefoljeVisning from './minoversikt-portefolje-visning';
import { filtervalgShape, statustallShape } from '../proptype-shapes';
import { hentStatusTall } from './../ducks/statustall';
import { hentEnhetTiltak } from './../ducks/enhettiltak';

class MinOversiktSide extends Component {
    componentDidMount() {
        const { veiledere, enheter, ...props } = this.props;
        const veilederFraUrl = veiledere.data.veilederListe.find((veileder) => (veileder.ident === props.params.ident));
        const innloggetVeileder = { ident: enheter.ident };
        const gjeldendeVeileder = veilederFraUrl || innloggetVeileder;
        this.props.hentStatusTall(this.props.valgtEnhet.enhet.enhetId, gjeldendeVeileder.ident);
        this.props.hentEnhetTiltak(this.props.valgtEnhet.enhet.enhetId);
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
                    fornavn: gjeldendeVeileder.fornavn,
                    etternavn: gjeldendeVeileder.etternavn
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

MinOversiktSide.propTypes = {
    hentStatusTall: PT.func.isRequired,
    hentEnhetTiltak: PT.func.isRequired,
    valgtEnhet: PT.object.isRequired, // eslint-disable-line react/forbid-prop-types
    enheter: PT.object.isRequired, // eslint-disable-line react/forbid-prop-types
    veiledere: PT.object, // eslint-disable-line react/forbid-prop-types
    intl: intlShape.isRequired,
    filtervalg: filtervalgShape.isRequired,
    statustall: PT.shape({ data: statustallShape }),
    enhettiltak: PT.object.isRequired, // eslint-disable-line react/forbid-prop-types
    params: PT.object.isRequired, // eslint-disable-line react/forbid-prop-types
    listevisning: PT.object.isRequired
};

const mapStateToProps = (state) => ({
    valgtEnhet: state.enheter.valgtEnhet,
    enheter: state.enheter,
    veiledere: state.veiledere,
    filtervalg: state.filtreringMinoversikt,
    statustall: state.statustall,
    enhettiltak: state.enhettiltak,
    listevisning: state.ui.listevisningMinOversikt
});

const mapDispatchToProps = (dispatch) => ({
    hentStatusTall: (enhet, veileder) => dispatch(hentStatusTall(enhet, veileder)),
    hentEnhetTiltak: (enhet) => dispatch(hentEnhetTiltak(enhet))
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(MinOversiktSide));

