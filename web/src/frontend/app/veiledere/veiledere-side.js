import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { veilederShape, enhetShape } from './../proptype-shapes';
import VeiledereTabell from './veiledere-tabell';
import { hentVeiledereForEnhet } from './../ducks/veiledere';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { velgEnhetForVeileder } from './../ducks/enheter';
import EnhetVelger from './../enhet/enhet-velger';
import PagineringForvalter from '../paginering/pagineringforvalter';

class VeiledereSide extends Component {

    componentWillMount() {
        this.props.hentVeiledere(this.props.valgtEnhet.enhetId);
    }

    render() {
        const { ident, veiledere, enhetsListe, valgtEnhet,
                hentVeiledere, velgEnhet, veiledereSomSkalVises } = this.props;
        const { veilederListe } = veiledere.data;

        return (
            <div className="veiledere-side panel">
                <EnhetVelger
                    enheter={enhetsListe} valgtEnhet={valgtEnhet} velgEnhet={(enhet) => {
                        velgEnhet(enhet);
                        hentVeiledere(enhet.enhetId);
                    }}
                />
                <Innholdslaster avhengigheter={[veiledere]}>
                    <PagineringForvalter
                        liste={veilederListe}
                        pagineringTekstId="enhet.veiledere.paginering.tekst"
                    />
                    <VeiledereTabell veiledere={veiledereSomSkalVises} ident={ident} />
                </Innholdslaster>
            </div>
        );
    }
}

VeiledereSide.propTypes = {
    ident: PT.string.isRequired,
    veiledere: PT.shape({
        data: PT.shape({
            enhet: enhetShape.isRequired,
            veilederListe: PT.arrayOf(veilederShape).isRequired
        }).isRequired
    }).isRequired,
    hentVeiledere: PT.func.isRequired,
    enhetsListe: PT.arrayOf(enhetShape).isRequired,
    valgtEnhet: enhetShape.isRequired,
    velgEnhet: PT.func.isRequired,
    veiledereSomSkalVises: PT.arrayOf(veilederShape).isRequired
};

const mapStateToProps = state => ({
    ident: state.enheter.ident,
    veiledere: state.veiledere,
    enhetsListe: state.enheter.data,
    valgtEnhet: state.enheter.valgtEnhet,
    veiledereSomSkalVises: state.paginering.subListe
});

const mapDispatchToProps = dispatch => ({
    hentVeiledere: enhetId => dispatch(hentVeiledereForEnhet(enhetId)),
    velgEnhet: enhet => dispatch(velgEnhetForVeileder(enhet))
});

export default connect(mapStateToProps, mapDispatchToProps)(VeiledereSide);

