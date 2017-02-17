import React, { PropTypes as PT, Component } from 'react';
import queryString from 'query-string';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { velgEnhetForVeileder } from './../ducks/enheter';
import { leggEnhetIUrl } from '../utils/utils';
import EnhetVelger from './enhet-velger';
import { enhetShape } from './../proptype-shapes';
import PortefoljeVisning from '../enhetsportefolje/portefolje-visning';
import { hentPortefoljeForEnhet } from '../ducks/portefolje';


class EnhetSide extends Component {

    componentWillMount() {
        const { valgtEnhet, enheter, velgEnhet } = this.props;
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
        const { enheter, valgtEnhet, velgEnhet, hentPortefolje } = this.props;


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

        return (
            <div className="enhet-side panel">
                <h1 className="typo-innholdstittel">
                    <FormattedMessage
                        id="enhet.valgt.tittel"
                        values={{ enhetId: valgtEnhet.enhetId, enhetnavn: valgtEnhet.navn }}
                    /></h1>
                <p className="typo-infotekst">
                    <FormattedMessage
                        id="enhet.valgt.infotekst"
                        values={{ enhetId: valgtEnhet.enhetId, enhetnavn: valgtEnhet.navn }}
                    />
                </p>
                {enhetVelger}
                <PortefoljeVisning />
            </div>
        );
    }
}

EnhetSide.propTypes = {
    enheter: PT.arrayOf(enhetShape).isRequired,
    valgtEnhet: PT.object,
    velgEnhet: PT.func.isRequired,
    hentPortefolje: PT.func.isRequired
};

const mapStateToProps = state => ({
    enheter: state.enheter.data,
    valgtEnhet: state.enheter.valgtEnhet
});

const mapDispatchToProps = dispatch => ({
    velgEnhet: enhet => dispatch(velgEnhetForVeileder(enhet)),
    hentPortefolje: enhet => dispatch(hentPortefoljeForEnhet(enhet))
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetSide);
