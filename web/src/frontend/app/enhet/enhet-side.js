import React, {PropTypes as PT, Component} from "react";
import queryString from "query-string";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {velgEnhetForVeileder} from "./../ducks/enheter";
import {hentVeiledereForEnhet} from "./../ducks/veiledere";
import {leggEnhetIUrl} from "../utils/utils";
import EnhetVelger from "./enhet-velger";
import TildelVeilederVelger from "./tildel-veileder-velger";
import {enhetShape, veilederShape} from "./../proptype-shapes";
import PortefoljeVisning from "../enhetsportefolje/portefolje-visning";
import {hentPortefoljeForEnhet} from "../ducks/portefolje";


class EnhetSide extends Component {

    componentWillMount() {
        const {valgtEnhet, enheter, velgEnhet} = this.props;
        const queryEnhet = queryString.parse(location.search).enhet;
        const queryEnhetFraGyldigeEnhter = enheter
            .filter(enhet => enhet.enhetId === queryEnhet);

        const queryEnhetErGyldig = queryEnhetFraGyldigeEnhter.length > 0;

        if (!valgtEnhet && !queryEnhetErGyldig) {
            velgEnhet(enheter[0]);
        } else if (!valgtEnhet && queryEnhetErGyldig) {
            velgEnhet(queryEnhetFraGyldigeEnhter[0]);
        } else {
            leggEnhetIUrl(valgtEnhet);
        }
    }

    render() {
        const {enheter, valgtEnhet, velgEnhet, hentPortefolje, veiledere, valgtVeileder, hentVeiledere} = this.props;


        if (!valgtEnhet) {
            return <noscript />;
        }


        const enhetVelger = enheter.length === 1 ?
            <p>{valgtEnhet.enhetId}</p> :
            (<EnhetVelger
                enheter={enheter} valgtEnhet={valgtEnhet} velgEnhet={(enhet) => {
                velgEnhet(enhet);
                hentPortefolje(enhet.enhetId);
            }}
            />);

        if (valgtEnhet) {
            hentVeiledere(valgtEnhet.enhetId);
        }

        const tildelVeilederVelger = veiledere.length === 1 ?
            <p>{valgtVeileder.ident}</p> :
            (<TildelVeilederVelger
                veiledere={veiledere}
                valgtVeileder={valgtVeileder}
                velgVeileder={(veileder) => velgVeileder(veileder)}
            />);

        return (
            <div className="enhet-side panel">
                <h1 className="typo-innholdstittel">
                    <FormattedMessage
                        id="enhet.valgt.tittel"
                        values={{enhetId: valgtEnhet.enhetId, enhetnavn: valgtEnhet.navn}}
                    /></h1>
                <p className="typo-infotekst">
                    <FormattedMessage
                        id="enhet.valgt.infotekst"
                        values={{enhetId: valgtEnhet.enhetId, enhetnavn: valgtEnhet.navn}}
                    />
                </p>
                {tildelVeilederVelger}
                {enhetVelger}
                <PortefoljeVisning />
            </div>
        );
    }
}

EnhetSide.propTypes = {
    enheter: PT.arrayOf(enhetShape).isRequired,
    veiledere: PT.arrayOf(veilederShape).isRequired,
    valgtEnhet: PT.object,
    valgtVeileder: PT.object,
    velgEnhet: PT.func.isRequired,
    settVeileder: PT.func.isRequired,
    hentPortefolje: PT.func.isRequired,
    hentVeiledere: PT.func.isRequired
};

const mapStateToProps = state => ({
    enheter: state.enheter.data,
    veiledere: state.veiledere.data.veilederListe,
    valgtVeileder: state.veiledere.valgtVeileder,
    valgtEnhet: state.enheter.valgtEnhet
});

const mapDispatchToProps = dispatch => ({
    velgEnhet: enhet => dispatch(velgEnhetForVeileder(enhet)),
    settVeileder: veileder => dispatch(settValgtVeileder(veileder)),
    hentPortefolje: enhet => dispatch(hentPortefoljeForEnhet(enhet)),
    hentVeiledere: enhetId => dispatch(hentVeiledereForEnhet(enhetId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetSide);
