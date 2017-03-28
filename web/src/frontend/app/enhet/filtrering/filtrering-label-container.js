import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FiltreringLabel from './filtrering-label';
import FilterKonstanter from './../filtrering/filterKonstanter';
import { slettEnkeltFilter, clearFiltervalg } from '../../ducks/filtrering';
import { filtervalgShape } from '../../proptype-shapes';

function FiltreringLabelContainer({ filtervalg, actions:{ clearFiltervalg, slettEnkeltFilter } }) {
    const filterElementer = Object.entries(filtervalg)
        .map(([key, value]) => {
            if (value === true) {
                return [
                    <FiltreringLabel
                        key={key}
                        label={FilterKonstanter[key]}
                        slettFilter={() => slettEnkeltFilter(key, false)}
                    />
                ];
            } else if (Array.isArray(value)) {
                return value.map((singleValue) => {
                    return (
                        <FiltreringLabel
                            key={`${key}--${singleValue}`}
                            label={FilterKonstanter[key][singleValue]}
                            slettFilter={() => slettEnkeltFilter(key, singleValue)}
                        />
                    )
                });
            } else if (value) {
                return [
                    <FiltreringLabel
                        key={`${key}--${value}`}
                        label={FilterKonstanter[key][value]}
                        slettFilter={() => slettEnkeltFilter(key, null)}
                    />
                ];
            }
            return [];
        }).reduce((acc, l) => [...acc, ...l], []);

    const fjernAlle = <FiltreringLabel key="slett-alle" label="Slett alle filtervalg" slettFilter={clearFiltervalg}/>;

    return (
        <section className="filtrering-label-container">
            {filterElementer}
            {filterElementer.length >= 3 ? fjernAlle : null }
        </section>
    );
}

FiltreringLabelContainer.propTypes = {
    actions: PT.shape({
        clearFiltervalg: PT.func.isRequired,
        slettEnkeltFilter: PT.func.isRequired
    }).isRequired,
    filtervalg: filtervalgShape.isRequired
};

const mapStateToProps = state => ({
    filtervalg: state.filtrering
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ clearFiltervalg, slettEnkeltFilter }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringLabelContainer);
