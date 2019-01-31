import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import Toolbar from '../components/toolbar/toolbar';
import VeiledereTabell from './veiledere-tabell';
import { portefoljestorrelserShape, veiledereShape } from '../proptype-shapes';
import { pagineringSetup } from '../ducks/paginering';
import { sortBy } from '../ducks/sortering';
import { nameToStateSliceMap } from '../ducks/utils';
import { sorter } from '../utils/sortering';
import { settSide } from '../ducks/ui/side';
import {
    selectFraIndex,
    selectSeAlle,
    selectSideStorrelse
} from '../components/toolbar/paginering/paginering-selector';
import { sjekkFeature } from '../ducks/features';
import { FLYTT_FILTER_VENSTRE } from '../konstanter';

function erValgtHvisFiltrering(veiledere) {
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

class VeilederesideVisning extends Component {
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

    render() {
        const veiledere = this.getVeiledere();
        const toolbar = (<Toolbar
            filtergruppe="veiledere"
            onPaginering={() => {
            }}
            sokVeilederSkalVises={!this.props.flyttFilterTilVenstre}
            antallTotalt={this.state.veiledere.length}
        />);

        return (
            <div>
                {toolbar}
                <VeiledereTabell
                    veiledere={veiledere}
                    sorterPaaEtternavn={() => this.props.sortBy('etternavn')}
                    sorterPaaPortefoljestorrelse={() => this.props.sortBy('portefoljestorrelse')}
                />
                {veiledere.length >= this.props.sideStorrelse && toolbar}
            </div>
        );
    }
}

VeilederesideVisning.propTypes = {
    pagineringSetup: PT.func.isRequired,
    veilederFilter: PT.array.isRequired, // eslint-disable-line react/forbid-prop-types
    sortBy: PT.func.isRequired,
    settSide: PT.func.isRequired,
    flyttFilterTilVenstre: PT.bool,
    veiledere: PT.shape({
        data: veiledereShape.isRequired
    }).isRequired,
    portefoljestorrelser: PT.shape({
        data: portefoljestorrelserShape.isRequired
    }).isRequired,
    sortering: PT.shape({
        property: PT.string,
        direction: PT.string
    }).isRequired,
    fra: PT.number.isRequired,
    sideStorrelse: PT.number.isRequired,
    seAlle: PT.bool.isRequired
};

const mapStateToProps = (state) => ({
    veiledere: state.veiledere,
    portefoljestorrelser: state.portefoljestorrelser,
    sortering: state.sortering,
    veilederFilter: state[nameToStateSliceMap.veiledere].veiledere,
    fra: selectFraIndex(state),
    sideStorrelse: selectSideStorrelse(state),
    seAlle: selectSeAlle(state),
    flyttFilterTilVenstre: sjekkFeature(state, FLYTT_FILTER_VENSTRE)
});

const mapDispatchToProps = (dispatch) => ({
    pagineringSetup: (...args) => dispatch(pagineringSetup(...args)),
    sortBy: (...args) => dispatch(sortBy(...args)),
    settSide: (side) => dispatch(settSide(side))
});

export default connect(mapStateToProps, mapDispatchToProps)(VeilederesideVisning);
