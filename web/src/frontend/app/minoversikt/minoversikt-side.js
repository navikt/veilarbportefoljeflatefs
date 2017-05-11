import React, { PropTypes as PT, Component } from 'react';
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


class MinOversiktSide extends Component {
        componentDidMount() {
        console.log('MinOversiktSide::componentDidMount',this.props.valgtEnhet.enhet.enhetId);
        this.props.hentStatusTall(this.props.valgtEnhet.enhet.enhetId);
    }

    render() {
        const { enheter, veiledere, intl, filtervalg, statustall, ...props } = this.props;

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
                <Innholdslaster avhengigheter={[statustall]}>
                    <div className="enhet-side blokk-xl">
                        {visesAnnenVeiledersPortefolje ?
                            <Link to="veiledere" className="typo-normal tilbaketilveileder">
                                <i className="chevron--venstre"/>
                                <span>
                            <FormattedMessage id="minoversikt.link.til.veilederoversikt"/>
                        </span>
                            </Link> : null}
                        <section className={visesAnnenVeiledersPortefolje ? 'annen-veileder' : ''}>
                            { visesAnnenVeiledersPortefolje ? annenVeilederVarsel : null}
                            <div className="portefolje-side">
                                <LenkerMinoversikt
                                    veilederident={veilederFraUrl ? veilederFraUrl.ident : null}
                                />
                                <div id="oversikt-sideinnhold" role="tabpanel">
                                    <p className="typo-infotekst begrensetbredde blokk-m">
                                        <FormattedMessage id="ingresstekst.minoversikt"/>
                                    </p>
                                    <FiltreringContainer
                                        filtervalg={filtervalg}
                                        filtergruppe="veileder"
                                        veileder={gjeldendeVeileder}
                                    />
                                    <FiltreringLabelContainer
                                        filtervalg={filtervalg}
                                        filtergruppe="veileder"
                                        veileder={gjeldendeVeileder}
                                    />
                                    <VeilederPortefoljeVisning veileder={gjeldendeVeileder}/>
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
    valgtEnhet: PT.object.isRequired,
    enheter: PT.object.isRequired,
    veiledere: PT.object,
    intl: intlShape.isRequired,
    filtervalg: filtervalgShape.isRequired,
    statustall: PT.shape({ data: statustallShape }),
    params: PT.object.isRequired
};

const mapStateToProps = (state) => ({
    valgtEnhet: state.enheter.valgtEnhet,
    enheter: state.enheter,
    veiledere: state.veiledere,
    filtervalg: state.filtreringVeileder,
    statustall: state.statustall
});

const mapDispatchToProps = (dispatch) => ({
    hentStatusTall: (enhet) => dispatch(hentStatusTall(enhet))
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(MinOversiktSide));

