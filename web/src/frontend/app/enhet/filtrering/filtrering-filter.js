import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { endreFiltervalgMellomlagring } from '../../ducks/filtrering-mellomlagring';
import { endreFiltervalg } from '../../ducks/filtrering';
import FiltreringDemografi from './filtrering-demografi';
import FiltreringSituasjon from './filtrering-situasjon';
import { filtervalgMellomlagringShape, filtervalgShape } from '../../proptype-shapes';
import { erFiltervalgEndret } from '../../utils/utils';

class FiltreringFilter extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (erFiltervalgEndret(prevProps.filtervalg, this.props.filtervalg)) {
            this.props.oppdaterDatagrunnlag();
        }
    }

    handleChange(e, filter) {
        const { endreFilterMellomlagring, filtervalgMellomlagring } = this.props;

        const newArray = Array.from(filtervalgMellomlagring[filter]);
        if (e.target.checked === true) {
            newArray.push(Number(e.target.value));
        } else {
            newArray.splice(newArray.indexOf(Number(e.target.value)), 1);
        }

        endreFilterMellomlagring(filter, newArray);
    }

    render() {
        return (
            <div className="filtrering-filter">
                <FiltreringDemografi
                    filtervalg={this.props.filtervalg}
                    filtervalgMellomlagring={this.props.filtervalgMellomlagring}
                    handleChange={this.handleChange}
                    endreFilter={this.props.endreFilter}
                />
                <FiltreringSituasjon
                    filtervalg={this.props.filtervalg}
                    filtervalgMellomlagring={this.props.filtervalgMellomlagring}
                    handleChange={this.handleChange}
                    endreFilter={this.props.endreFilter}
                />
            </div>
        );
    }
}

FiltreringFilter.propTypes = {
    endreFilterMellomlagring: PT.func.isRequired,
    endreFilter: PT.func.isRequired,
    filtervalg: filtervalgShape.isRequired,
    filtervalgMellomlagring: filtervalgMellomlagringShape.isRequired,
    oppdaterDatagrunnlag: PT.func.isRequired
};

const mapStateToProps = state => ({
    filtervalg: state.filtrering.filtervalg,
    filtervalgMellomlagring: state.filtreringMellomlagring.filtervalg
});

const mapDispatchToProps = dispatch => ({
    endreFilterMellomlagring: (filterId, filtervalg) => dispatch(endreFiltervalgMellomlagring(filterId, filtervalg)),
    endreFilter: (filterId, filtervalg) => dispatch(endreFiltervalg(filterId, filtervalg))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringFilter);
