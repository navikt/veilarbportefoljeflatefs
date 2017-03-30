import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst } from 'nav-frontend-typografi';
import LenkerMinoversikt from './../lenker/lenker-minoversikt';
import VeilederPortefoljeVisning from './minoversikt-portefolje-visning';
import TildelVeilederVelger from './../enhet/tildel-veileder-velger';
import { brukerShape } from '../proptype-shapes';
import { tildelVeileder } from '../ducks/portefolje';
import Innholdslaster from '../innholdslaster/innholdslaster';

function MinOversiktSide({ enheter, brukere, veiledere, velgVeileder, routes, ...props }) {
    document.title = 'Min oversikt';
    const veilederFraUrl = veiledere.data.veilederListe.find((veileder) => (veileder.ident === props.params.ident));
    const innloggetVeileder = { ident: enheter.ident };
    const gjeldendeVeileder = veilederFraUrl || innloggetVeileder;

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
            {veilederFraUrl ?
                <Link to="veiledere" className="typo-normal tilbaketilveileder">
                    <i className="chevron--venstre" />
                    <span>Til veilederoversikt</span>
                </Link> : null}
            <section className={veilederFraUrl ? 'annen-veileder' : ''}>
                {veilederFraUrl ? annenVeilederVarsel : null}
                <div className="portefolje-side">
                    <LenkerMinoversikt routes={routes} veileder={gjeldendeVeileder} />
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
    routes: PT.arrayOf(PT.object),
    veiledere: PT.object,
    brukere: PT.arrayOf(brukerShape).isRequired,
    velgVeileder: PT.func.isRequired,
    params: PT.object.isRequired
};

const mapStateToProps = (state) => ({
    enheter: state.enheter,
    brukere: state.portefolje.data.brukere,
    veiledere: state.veiledere
});

const mapDispatchToProps = (dispatch) => ({
    velgVeileder: (tildelinger, tilVeileder) => dispatch(tildelVeileder(tildelinger, tilVeileder))
});

export default connect(mapStateToProps, mapDispatchToProps)(MinOversiktSide);

