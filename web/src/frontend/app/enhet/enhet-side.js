import React, { PropTypes as PT, Component } from 'react';
import queryString from 'query-string';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { velgEnhetForVeileder } from './../ducks/enheter';
import { hentVeiledereForEnhet } from './../ducks/veiledere';
import { leggEnhetIUrl } from '../utils/utils';
import EnhetVelger from './enhet-velger';
import TildelVeilederVelger from './tildel-veileder-velger';
import { enhetShape, veilederShape, brukerShape } from './../proptype-shapes';
import PortefoljeVisning from '../enhetsportefolje/portefolje-visning';
import FiltreringContainer from './filtrering/filtrering-container';
import { tildelVeileder } from '../ducks/portefolje';

class EnhetSide extends Component {

    componentWillMount() {
        const { valgtEnhet, enheter, velgEnhet, hentVeiledere } = this.props;
        const queryEnhet = queryString.parse(location.search).enhet;
        const queryEnhetFraGyldigeEnheter = enheter
            .filter(enhet => enhet.enhetId === queryEnhet);

        const queryEnhetErGyldig = queryEnhetFraGyldigeEnheter.length > 0;

        if (!valgtEnhet && !queryEnhetErGyldig) {
            velgEnhet(enheter[0]);
            hentVeiledere(enheter[0].enhetId);
        } else if (!valgtEnhet && queryEnhetErGyldig) {
            velgEnhet(queryEnhetFraGyldigeEnheter[0]);
        } else {
            leggEnhetIUrl(valgtEnhet);
        }
    }

    render() {
        const {
            enheter,
            valgtEnhet,
            velgEnhet,
            veiledere,
            valgtVeileder,
            hentVeiledere,
            velgVeileder,
            brukere
        } = this.props;


        if (!valgtEnhet) {
            return <noscript />;
        }


        const enhetVelger = enheter.length === 1 ?
            <p>{valgtEnhet.enhetId}</p> :
            (<EnhetVelger
                enheter={enheter} valgtEnhet={valgtEnhet} velgEnhet={(enhet) => {
                    velgEnhet(enhet);
                    hentVeiledere(enhet.enhetId);
                }}
            />);

        const tildelVeilederVelger =
            (<TildelVeilederVelger
                valgtVeileder={valgtVeileder}
                veiledere={veiledere}
                brukere={brukere}
                velgVeileder={(tildelinger, tilVeileder) => velgVeileder(tildelinger, tilVeileder)}
            />);

        return (
            <div className="enhet-side">
                <p className="typo-infotekst">
                    <FormattedMessage
                        id="enhet.valgt.infotekst"
                        values={{ enhetId: valgtEnhet.enhetId, enhetnavn: valgtEnhet.navn }}
                    />
                </p>
                <FiltreringContainer />
                <Ekspanderbartpanel tittel="Tildel veileder" tittelProps="systemtittel">
                    {tildelVeilederVelger}
                </Ekspanderbartpanel>
                {enhetVelger}
                <PortefoljeVisning />
            </div>
        );
    }
}

EnhetSide.propTypes = {
    enheter: PT.arrayOf(enhetShape).isRequired,
    veiledere: PT.arrayOf(veilederShape).isRequired,
    brukere: PT.arrayOf(brukerShape).isRequired,
    valgtEnhet: PT.object,
    valgtVeileder: PT.object,
    velgEnhet: PT.func.isRequired,
    velgVeileder: PT.func.isRequired,
    hentVeiledere: PT.func.isRequired
};

const mapStateToProps = state => ({
    enheter: state.enheter.data,
    veiledere: state.veiledere.data.veilederListe,
    brukere: state.portefolje.data.brukere,
    valgtVeileder: state.enheter.valgtVeileder,
    valgtEnhet: state.enheter.valgtEnhet
});

const mapDispatchToProps = dispatch => ({
    velgEnhet: enhet => dispatch(velgEnhetForVeileder(enhet)),
    velgVeileder: (tildelinger, tilVeileder) => dispatch(tildelVeileder(tildelinger, tilVeileder)),
    hentVeiledere: enhetId => dispatch(hentVeiledereForEnhet(enhetId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetSide);
