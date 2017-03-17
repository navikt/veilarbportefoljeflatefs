import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import TildelVeilederVelger from './tildel-veileder-velger';
import { veilederShape, brukerShape } from './../proptype-shapes';
import PortefoljeVisning from '../enhetsportefolje/portefolje-visning';
import Nedtrekksliste from '../components/nedtrekksliste';
import FiltreringContainer from './filtrering/filtrering-container';
import { tildelVeileder } from '../ducks/portefolje';
import { hentVeiledereForEnhet } from '../ducks/veiledere';
import { eksporterEnhetsportefoljeTilLocalStorage } from '../ducks/utils';

class EnhetSide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liste: [
                { key: '1', value: 'Arne And', checked: false },
                { key: '2', value: 'Tore Tang', checked: false },
                { key: '3', value: 'Else Koss', checked: false }
            ]
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        const { valgtEnhet, hentVeiledere } = this.props;
        hentVeiledere(valgtEnhet.enhet.enhetId);
    }
    componentDidUpdate() {
        const { filtervalg, valgtEnhet } = this.props;
        eksporterEnhetsportefoljeTilLocalStorage(filtervalg, valgtEnhet.enhet, location.pathname);
    }

    onSubmit() {
        this.state.liste.filter(listeElement => listeElement.checked === true);
    }

    handleChange(e) {
        this.setState({
            liste: this.state.liste.map((el, i) => {
                if (i === Number(e.target.value)) {
                    return { ...el, checked: e.target.checked };
                }
                return el;
            })
        });
    }

    render() {
        const {
            valgtEnhet,
            veiledere,
            valgtVeileder,
            velgVeileder,
            brukere
        } = this.props;


        if (!valgtEnhet) {
            return <noscript />;
        }

        const tildelVeilederVelger =
            (<TildelVeilederVelger
                valgtVeileder={valgtVeileder}
                veiledere={veiledere}
                brukere={brukere}
                velgVeileder={(tildelinger, tilVeileder) => velgVeileder(tildelinger, tilVeileder)}
            />);

        return (
            <div className="enhet-side">
                <FiltreringContainer />
                <Nedtrekksliste
                    liste={this.state.liste}
                    handleChange={this.handleChange}
                    onSubmit={this.onSubmit}
                />
                <Ekspanderbartpanel tittel="Tildel veileder" tittelProps="systemtittel">
                    {tildelVeilederVelger}
                </Ekspanderbartpanel>
                <PortefoljeVisning />
            </div>
        );
    }
}

EnhetSide.propTypes = {
    veiledere: PT.arrayOf(veilederShape).isRequired,
    brukere: PT.arrayOf(brukerShape).isRequired,
    valgtEnhet: PT.object,
    filtervalg: PT.object,
    valgtVeileder: PT.object,
    velgVeileder: PT.func.isRequired,
    hentVeiledere: PT.func.isRequired
};

const mapStateToProps = state => ({
    veiledere: state.veiledere.data.veilederListe,
    brukere: state.portefolje.data.brukere,
    valgtVeileder: state.enheter.valgtVeileder,
    valgtEnhet: state.enheter.valgtEnhet,
    filtervalg: state.filtrering.filtervalg
});

const mapDispatchToProps = dispatch => ({
    velgVeileder: (tildelinger, tilVeileder) => dispatch(tildelVeileder(tildelinger, tilVeileder)),
    hentVeiledere: enhetId => dispatch(hentVeiledereForEnhet(enhetId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetSide);
