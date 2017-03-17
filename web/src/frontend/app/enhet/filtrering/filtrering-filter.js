import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { endreFiltervalg } from '../../ducks/filtrering';
import Demografi from './demografi';

class FiltreringFilter extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, filter) {
        const { endreFilter, filtervalg } = this.props;

        const newArray = Array.from(filtervalg.alder);
        if (e.target.checked === true) {
            newArray.push(Number(e.target.value));
        } else {
            newArray.splice(newArray.indexOf(Number(e.target.value)), 1);
        }

        endreFilter(filter, newArray);
    }

    render() {
        return (
            <Demografi
                filtervalg={this.props.filtervalg}
                handleChange={this.handleChange}
                oppdaterDatagrunnlag={this.props.oppdaterDatagrunnlag}
            />
        );
    }
}

FiltreringFilter.propTypes = {
    endreFilter: PT.func.isRequired,
    filtervalg: PT.object,
    oppdaterDatagrunnlag: PT.func.isRequired
};

const mapStateToProps = state => ({
    filtervalg: state.filtrering.filtervalg
});

const mapDispatchToProps = dispatch => ({
    endreFilter: (filterId, filtervalg) => dispatch(endreFiltervalg(filterId, filtervalg))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringFilter);
