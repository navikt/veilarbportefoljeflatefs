import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { Normaltekst } from 'nav-frontend-typografi';
import LenkerMinoversikt from './../lenker/lenker-minoversikt';
import FiltreringContainer from '../filtrering/filtrering-container';
import FiltreringLabelContainer from '../filtrering/filtrering-label-container';
import VeilederPortefoljeVisning from './minoversikt-portefolje-visning';
import { brukerShape, filtervalgShape, enhetShape } from '../proptype-shapes';
import { tildelVeileder, hentPortefoljeForVeileder } from '../ducks/portefolje';

function MinOversiktSide({ enheter, sorteringsrekkefolge, sorteringsfelt,
    veiledere, hentPortefolje, valgtEnhet, ...props }) {
    const veilederFraUrl = veiledere.data.veilederListe.find((veileder) => (veileder.ident === props.params.ident));
    const innloggetVeileder = { ident: enheter.ident };
    const gjeldendeVeileder = veilederFraUrl || innloggetVeileder;

    const visesAnnenVeiledersPortefolje = gjeldendeVeileder.ident !== innloggetVeileder.ident;

    const annenVeilederVarsel = (<Normaltekst tag="h1" className="blokk-s">
        <FormattedMessage
            id="annen.veileder.portefolje.advarsel"
            tagName="em"
            values={{
                fornavn: gjeldendeVeileder.fornavn,
                etternavn: gjeldendeVeileder.etternavn
            }}
        /></Normaltekst>);

    return (
        <div>
            {visesAnnenVeiledersPortefolje ?
                <Link to="veiledere" className="typo-normal tilbaketilveileder">
                    <i className="chevron--venstre" />
                    <span>Til veilederoversikt</span>
                </Link> : null}
            <section className={visesAnnenVeiledersPortefolje ? 'annen-veileder' : ''}>
                { visesAnnenVeiledersPortefolje ? annenVeilederVarsel : null}
                <div className="portefolje-side">
                    <LenkerMinoversikt
                        minOversiktOnClick={() =>
                        hentPortefolje(valgtEnhet.enhet.enhetId,
                            { ident: enheter.ident }, sorteringsrekkefolge, sorteringsfelt)}
                    />
                    <p className="typo-infotekst blokk-m">
                        <FormattedMessage id="ingresstekst.minoversikt" />
                    </p>
                    <FiltreringContainer
                        filtervalg={props.filtervalg}
                        filtergruppe="veileder"
                        veileder={gjeldendeVeileder}
                    />
                    <FiltreringLabelContainer
                        filtervalg={props.filtervalg}
                        filtergruppe="veileder"
                        veileder={gjeldendeVeileder}
                    />
                    <VeilederPortefoljeVisning veileder={gjeldendeVeileder} />
                </div>
            </section>
        </div>
    );
}

MinOversiktSide.propTypes = {
    enheter: PT.object.isRequired,
    veiledere: PT.object,
    brukere: PT.arrayOf(brukerShape).isRequired,
    velgVeileder: PT.func.isRequired,
    filtervalg: filtervalgShape.isRequired,
    params: PT.object.isRequired,
    hentPortefolje: PT.func.isRequired,
    valgtEnhet: enhetShape.isRequired,
    sorteringsfelt: PT.string.isRequired,
    sorteringsrekkefolge: PT.string.isRequired
};

const mapStateToProps = (state) => ({
    enheter: state.enheter,
    brukere: state.portefolje.data.brukere,
    veiledere: state.veiledere,
    filtervalg: state.filtreringVeileder,
    valgtEnhet: state.enheter.valgtEnhet,
    sorteringsfelt: state.portefolje.sorteringsfelt,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge
});

const mapDispatchToProps = (dispatch) => ({
    velgVeileder: (tildelinger, tilVeileder) => dispatch(tildelVeileder(tildelinger, tilVeileder)),
    hentPortefolje: (enhet, ident, rekkefolge, felt, fra = 0, antall = 20) =>
        dispatch(hentPortefoljeForVeileder(enhet, ident, rekkefolge, felt, fra, antall))
});

export default connect(mapStateToProps, mapDispatchToProps)(MinOversiktSide);

