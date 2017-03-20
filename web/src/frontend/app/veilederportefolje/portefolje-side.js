import React, {Component, PropTypes as PT} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Normaltekst from 'nav-frontend-typografi';
import LenkerMinoversikt from './../lenker/lenker-minoversikt';
import VeilederPortefoljeVisning from './veileder-portefolje-visning';
import TildelVeilederVelger from './../enhet/tildel-veileder-velger';
import {veilederShape, brukerShape} from '../proptype-shapes';
import {tildelVeileder} from '../ducks/portefolje';

class PortefoljeSide extends Component {

    render() {
        const {ident, veileder, brukere, veiledere, velgVeileder, routes} = this.props;

        const erAnnenVeileder = ident !== veileder.ident;

        const annenVeilederVarsel = <Normaltekst tag="h1" type="normal" className="blokk-s">
            <FormattedMessage
                id="annen.veileder.portefolje.advarsel"
                tagName="em"
                values={{
                    fornavn: veileder.fornavn,
                    etternavn: veileder.etternavn
                }}
            /></Normaltekst>;


        const tildelVeilederVelger =
            (<TildelVeilederVelger
                veiledere={veiledere}
                brukere={brukere}
                velgVeileder={(tildelinger, tilVeileder) => velgVeileder(tildelinger, tilVeileder)}
            />);

        return (
            <div>
                {erAnnenVeileder ?
                <Link to="veiledere" className="typo-normal tilbaketilveileder">
                    <i className="chevron--venstre" />
                    <span>Til veilederoversikt</span>
                </Link> : null}
                <section className={erAnnenVeileder ? "annen-veileder" : ""}>
                    {erAnnenVeileder ? annenVeilederVarsel : null}
                    <div className="portefolje-side">
                        <LenkerMinoversikt routes={routes}/>
                        <Ekspanderbartpanel tittel="Tildel veileder" tittelProps="systemtittel">
                            {tildelVeilederVelger}
                        </Ekspanderbartpanel>
                        <VeilederPortefoljeVisning />
                    </div>
                </section>
            </div>
        );
    }
}

PortefoljeSide.propTypes = {
    ident: PT.string.isRequired,
    veileder: veilederShape.isRequired,
    routes: PT.arrayOf(PT.object),
    veiledere: PT.arrayOf(veilederShape).isRequired,
    brukere: PT.arrayOf(brukerShape).isRequired,
    velgVeileder: PT.func.isRequired
};

const mapStateToProps = state => ({
    ident: state.enheter.ident,
    veileder: state.portefolje.veileder,
    brukere: state.portefolje.data.brukere,
    veiledere: state.veiledere.data.veilederListe
});

const mapDispatchToProps = dispatch => ({
    velgVeileder: (tildelinger, tilVeileder) => dispatch(tildelVeileder(tildelinger, tilVeileder))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortefoljeSide);

