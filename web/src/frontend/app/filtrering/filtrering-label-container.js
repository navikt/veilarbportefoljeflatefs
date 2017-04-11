import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import FiltreringLabel from './filtrering-label';
import FilterKonstanter from './filter-konstanter';
import { slettEnkeltFilter, clearFiltervalg } from '../ducks/filtrering';
import { filtervalgLabelShape, veilederShape } from '../proptype-shapes';

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
                        key={`${key}--${singleValue.key || singleValue}`}
                        label={singleValue.label || FilterKonstanter[key][singleValue]}
                        slettFilter={() => slettEnkelt(key, singleValue.key || singleValue)}
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
        <section className="filtrering-label-container blokk-s">
            {filterElementer}
            {filterElementer.length >= 3 ? fjernAlle : null }
        </section>
    );
}

FiltreringLabelContainer.defaultProps = {
    veileder: {
        ident: '',
        navn: '',
        fornavn: '',
        etternavn: ''
    }
};

FiltreringLabelContainer.propTypes = {
    actions: PT.shape({
        slettAlle: PT.func.isRequired,
        slettEnkelt: PT.func.isRequired
    }).isRequired,
    filtervalg: filtervalgLabelShape.isRequired,
    filtergruppe: PT.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    veileder: veilederShape // eslint-disable-line react/no-unused-prop-types
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: {
        slettAlle: () => dispatch(clearFiltervalg(ownProps.filtergruppe, ownProps.veileder)),
        slettEnkelt: (...args) => dispatch(slettEnkeltFilter(...args, ownProps.filtergruppe, ownProps.veileder))
    }
});

export default connect(null, mapDispatchToProps)(FiltreringLabelContainer);
