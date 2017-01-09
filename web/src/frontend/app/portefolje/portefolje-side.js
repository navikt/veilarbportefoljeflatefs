import React, { Component, PropTypes as PT } from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { connect } from 'react-redux';
import { hentPortefoljeForEnhet } from '../ducks/portefolje';


class PortefoljeSide extends Component {
    componentWillMount(){
        const { valgtEnhet, hentPortefolje } = this.props;
        hentPortefolje(valgtEnhet.enhetId);
    }

    render() {
        const { portefolje } = this.props;
        console.log('portefolje', portefolje);
        return (
            <Innholdslaster avhengigheter={[portefolje]}>
                <div className="portefolje-side panel">
                    <h1 className="typo-innholdstittel">Portefølje</h1>
                    <ul>{portefolje.data.portefolje.brukere.map( bruker => <li>{bruker.fornavn}</li>)}</ul>
                </div>
                </Innholdslaster>
        );
    }
}

PortefoljeSide.propTypes = {};

const mapStateToProps = state => ({
    portefolje: state.portefolje,
    valgtEnhet: state.enheter.valgtEnhet
});

const mapDispatchToProps = dispatch => ({
    hentPortefolje: enhet => dispatch(hentPortefoljeForEnhet(enhet))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortefoljeSide);
