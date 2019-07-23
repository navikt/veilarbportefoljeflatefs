import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toolbar, { ToolbarPosisjon } from './../components/toolbar/toolbar';
import VeiledereTabell from './veiledere-tabell';
import { PageringOppdatering, pagineringSetup } from '../ducks/paginering';
import { sortBy } from '../ducks/sortering';
import { sorter } from './../utils/sortering';
import { settSide } from '../ducks/ui/side';
import { selectFraIndex, selectSeAlle, selectSideStorrelse } from '../components/toolbar/paginering/paginering-selector';
import { ListevisningType } from '../ducks/ui/listevisning';
import { VeiledereState } from '../ducks/veiledere';
import { PortefoljeStorrelser } from '../ducks/portefoljestorrelser';

function erValgtHvisFiltrering(veiledere: string[]) {
    if (veiledere && veiledere.length > 0) {
        return (veileder) => veiledere.includes(veileder.ident);
    }
    return () => true; // Ikke valgt noe filter, så alle skal være med.
}

function medPortefoljestorrelse(portefoljeStorrelse) {
    if (portefoljeStorrelse.status !== 'OK') {
        // Før vi har fått portefoljestorrele har alle 0
        return (veileder) => ({ ...veileder, portefoljestorrelse: 0 });
    }
    const storrelseMap = portefoljeStorrelse.data.facetResults
        .reduce((acc, { value: ident, count }) => ({ ...acc, [ident]: count }), {});

    return (veileder) => ({ ...veileder, portefoljestorrelse: storrelseMap[veileder.ident] || 0 });
}

function propertySort({ property, direction }) {
    return sorter(property, direction);
}

interface VeilederesideVisningProps {
    settSide: (side: string) => void;
    sideStorrelse: number;
    fra: number;
    sortering: {
        property: string;
        direction: string;
    };
    sortBy: (sorterEtter: string) => void;
    veilederFilter: string[];
    veiledere: VeiledereState;
    portefoljestorrelser: PortefoljeStorrelser;
    seAlle: boolean;
    pagineringSetup: (data: PageringOppdatering) => void;
}

interface VeilederesideVisningState {
    veiledere: string[];
}

class VeilederesideVisning extends Component<VeilederesideVisningProps, VeilederesideVisningState> {
    constructor(props) {
        super(props);

        this.state = {
            veiledere: []
        };

        this.oppdaterVeilederListe = this.oppdaterVeilederListe.bind(this);
    }

    componentWillMount() {
        this.props.settSide('enhet');
    }

    componentDidMount() {
        this.oppdaterVeilederListe();
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.veiledere !== prevProps.veiledere ||
            this.props.veilederFilter !== prevProps.veilederFilter ||
            this.props.portefoljestorrelser !== prevProps.portefoljestorrelser ||
            this.props.sortering !== prevProps.sortering
        ) {
            this.oppdaterVeilederListe();
        }
    }

    getVeiledere() {
        if (this.props.seAlle) {
            return this.state.veiledere;
        }

        return this.state.veiledere.slice(this.props.fra, this.props.fra + this.props.sideStorrelse);
    }

    oppdaterVeilederListe() {
        const veiledere = this.props.veiledere.data.veilederListe
            .filter(erValgtHvisFiltrering(this.props.veilederFilter))
            .map(medPortefoljestorrelse(this.props.portefoljestorrelser))
            .sort(propertySort(this.props.sortering));

        this.props.pagineringSetup({
            side: 1
        });

        this.setState({ veiledere });
    }

    lagToolbar(posisjon) {
        return (
            <Toolbar
                filtergruppe={ListevisningType.veilederOversikt}
                antallTotalt={this.state.veiledere.length}
                sokVeilederSkalVises={false}
                posisjon={posisjon}
            />
        );
    }

    render() {
        const veiledere = this.getVeiledere();
        return (
            <div>
                {this.lagToolbar(ToolbarPosisjon.OVER)}
                <VeiledereTabell
                    veiledere={veiledere}
                    sorterPaaEtternavn={() => this.props.sortBy('etternavn')}
                    sorterPaaPortefoljestorrelse={() => this.props.sortBy('portefoljestorrelse')}
                />
                {veiledere.length >= this.props.sideStorrelse && this.lagToolbar(ToolbarPosisjon.UNDER)}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    veiledere: state.veiledere,
    portefoljestorrelser: state.portefoljestorrelser,
    sortering: state.sortering,
    veilederFilter: state.filtreringVeilederoversikt.veiledere,
    fra: selectFraIndex(state),
    sideStorrelse: selectSideStorrelse(state),
    seAlle: selectSeAlle(state)
});

const mapDispatchToProps = (dispatch) => ({
    pagineringSetup: (data: PageringOppdatering) => dispatch(pagineringSetup(data)),
    sortBy: (...args) => dispatch(sortBy(...args)),
    settSide: (side) => dispatch(settSide(side))
});

export default connect(mapStateToProps, mapDispatchToProps)(VeilederesideVisning);
