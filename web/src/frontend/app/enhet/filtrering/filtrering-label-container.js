import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FiltreringLabel from './filtrering-label';
import FilterKonstanter from './../filtrering/filter-konstanter';
import { slettEnkeltFilter, clearFiltervalg } from '../../ducks/filtrering';
import { filtervalgShape } from '../../proptype-shapes';

function FiltreringLabelContainer({ filtervalg, actions: { slettAlle, slettEnkelt } }) {
    const filterElementer = Object.entries(filtervalg)
        .map(([key, value]) => {
            if (value === true) {
                return [
                    <FiltreringLabel
                        key={key}
                        label={FilterKonstanter[key]}
                        slettFilter={() => slettEnkelt(key, false)}
                    />
                ];
            } else if (Array.isArray(value)) {
                return value.map((singleValue) => (
                    <FiltreringLabel
                        key={`${key}--${singleValue}`}
                        label={FilterKonstanter[key][singleValue]}
                        slettFilter={() => slettEnkelt(key, singleValue)}
                    />
                    ));
            } else if (value) {
                return [
                    <FiltreringLabel
                        key={`${key}--${value}`}
                        label={FilterKonstanter[key][value]}
                        slettFilter={() => slettEnkelt(key, null)}
                    />
                ];
            }
            return [];
        }).reduce((acc, l) => [...acc, ...l], []);

    const fjernAlle = <FiltreringLabel key="slett-alle" label="Slett alle filtervalg" slettFilter={slettAlle} />;

    return (
        <section className="filtrering-label-container">
            {filterElementer}
            {filterElementer.length >= 3 ? fjernAlle : null }
        </section>
    );
}

FiltreringLabelContainer.propTypes = {
    actions: PT.shape({
        slettAlle: PT.func.isRequired,
        slettEnkelt: PT.func.isRequired
    }).isRequired,
    filtervalg: filtervalgShape.isRequired
};

const mapStateToProps = (state) => ({
    filtervalg: state.filtrering
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ slettAlle: clearFiltervalg, slettEnkelt: slettEnkeltFilter }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringLabelContainer);
