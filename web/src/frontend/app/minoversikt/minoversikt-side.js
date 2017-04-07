import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import { Normaltekst } from 'nav-frontend-typografi';
import LenkerMinoversikt from './../lenker/lenker-minoversikt';
import FiltreringContainer from '../filtrering/filtrering-container';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import VeilederPortefoljeVisning from './minoversikt-portefolje-visning';
import { filtervalgShape } from '../proptype-shapes';


function MinOversiktSide({ enheter, veiledere, intl, filtervalg, ...props }) {
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
            <div className="enhet-side blokk-xl">
                {visesAnnenVeiledersPortefolje ?
                    <Link to="veiledere" className="typo-normal tilbaketilveileder">
                        <i className="chevron--venstre" />
                        <span>Til veilederoversikt</span>
                    </Link> : null}
                <section className={visesAnnenVeiledersPortefolje ? 'annen-veileder' : ''}>
                    { visesAnnenVeiledersPortefolje ? annenVeilederVarsel : null}
                    <div className="portefolje-side">
                        <LenkerMinoversikt veilederident={veilederFraUrl ? veilederFraUrl.ident : null}
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
                            <VeilederPortefoljeVisning veileder={gjeldendeVeileder} />
                        </div>
                    </div>
                </section>
            </div>
        </DocumentTitle>
    );
}

MinOversiktSide.propTypes = {
    enheter: PT.object.isRequired,
    veiledere: PT.object,
    intl: intlShape.isRequired,
    filtervalg: filtervalgShape.isRequired,
};

const mapStateToProps = (state) => ({
    enheter: state.enheter,
    veiledere: state.veiledere,
    filtervalg: state.filtreringVeileder
});

export default injectIntl(connect(mapStateToProps)(MinOversiktSide));

