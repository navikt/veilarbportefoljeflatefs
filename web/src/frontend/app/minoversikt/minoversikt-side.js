import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst } from 'nav-frontend-typografi';
import LenkerMinoversikt from './../lenker/lenker-minoversikt';
import VeilederPortefoljeVisning from './minoversikt-portefolje-visning';
import TildelVeilederVelger from './../enhet/tildel-veileder-velger';
import { brukerShape, enhetShape } from '../proptype-shapes';
import { tildelVeileder, hentPortefoljeForVeileder } from '../ducks/portefolje';
import Innholdslaster from '../innholdslaster/innholdslaster';

function MinOversiktSide({ enheter, sorteringsrekkefolge, sorteringsfelt,
    brukere, veiledere, hentPortefolje, valgtEnhet, velgVeileder, ...props }) {
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


    const tildelVeilederVelger =
        (<TildelVeilederVelger
            veiledere={veiledere.data.veilederListe}
            brukere={brukere}
            velgVeileder={(tildelinger, tilVeileder) => velgVeileder(tildelinger, tilVeileder)}
        />);

    return (
        <div>
            <DocumentTitle title="Min oversikt" />
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
                    <Ekspanderbartpanel tittel="Tildel veileder" tittelProps="undertittel">
                        {tildelVeilederVelger}
                    </Ekspanderbartpanel>
                    <Innholdslaster avhengigheter={[veiledere, enheter]}>
                        <VeilederPortefoljeVisning veileder={gjeldendeVeileder} />
                    </Innholdslaster>
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
    params: PT.object.isRequired,
    hentPortefolje: PT.func.isRequired,
    valgtEnhet: enhetShape.isRequired,
    filtervalg: PT.object,
    sorteringsfelt: PT.string.isRequired,
    sorteringsrekkefolge: PT.string.isRequired
};

const mapStateToProps = (state) => ({
    enheter: state.enheter,
    brukere: state.portefolje.data.brukere,
    veiledere: state.veiledere,
    valgtEnhet: state.enheter.valgtEnhet,
    filtervalg: state.filtrering,
    sorteringsfelt: state.portefolje.sorteringsfelt,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge
});

const mapDispatchToProps = (dispatch) => ({
    velgVeileder: (tildelinger, tilVeileder) => dispatch(tildelVeileder(tildelinger, tilVeileder)),
    hentPortefolje: (enhet, ident, rekkefolge, felt, fra = 0, antall = 20) =>
        dispatch(hentPortefoljeForVeileder(enhet, ident, rekkefolge, felt, fra, antall))
});

export default connect(mapStateToProps, mapDispatchToProps)(MinOversiktSide);

