import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import FiltreringLabel from './filtrering-label';
import filtreringsLister from './filtrering-lister';
import { endreFiltervalg, settFiltervalg, initialState } from '../../ducks/filtrering';
import { filtervalgShape } from '../../proptype-shapes';

const FiltreringLabelContainer = ({ filtervalg, endreFilter, slettAlleFiltervalg }) => {
    const fjernFilter = (filterId, filtervalgTilSletting) => {
        if (filterId === 'nyeBrukere' || filterId === 'inaktiveBrukere') {
            endreFilter(filterId, false);
        } else {
            const nyFiltervalg = filtervalg[filterId].filter(filter => filter !== filtervalgTilSletting);
            endreFilter(filterId, nyFiltervalg);
        }
    };

    function filtreringLabelForBoolean(id, callback) {
        return (<FormattedMessage id={id} key={id}>
            {label => (
                <FiltreringLabel label={label} slettFilter={callback} />
            )}
        </FormattedMessage>);
    }

    const arrayOfArrays = Object.keys(filtervalg).map((key) => {
        if (typeof filtervalg[key] === 'boolean' && filtervalg[key] === true) {
            if (key === 'nyeBrukere') {
                return filtreringLabelForBoolean(
                    'enhet.filtrering.filtrering.oversikt.nye.brukere.checkbox',
                    () => fjernFilter(key)
                );
            } else if (key === 'inaktiveBrukere') {
                return filtreringLabelForBoolean(
                    'enhet.filtrering.filtrering.oversikt.inaktive.brukere.checkbox',
                    () => fjernFilter(key)
                );
            }
        } else if (filtervalg[key].constructor === Array) {
            return filtervalg[key].map(index =>
                <FiltreringLabel
                    label={filtreringsLister[key][index].label}
                    slettFilter={() => { fjernFilter(key, index); }}
                    key={`${key}-${index}`}
                />
            );
        }
        return [];
    });

    const filterElementer = [].concat(...arrayOfArrays);
    const fjernAlleFilterLabel = <FiltreringLabel label="Slett alle filtervalg" slettFilter={slettAlleFiltervalg} />;

    return (
        <section className="filtrering-label-container">
            {filterElementer.map(el => el)}
            {filterElementer.length >= 3 ? fjernAlleFilterLabel : <noscript /> }
        </section>
    );
};

FiltreringLabelContainer.propTypes = {
    endreFilter: PT.func.isRequired,
    filtervalg: filtervalgShape.isRequired,
    slettAlleFiltervalg: PT.func.isRequired
};

const mapStateToProps = state => ({
    filtervalg: state.filtrering.filtervalg
});

const mapDispatchToProps = dispatch => ({
    endreFilter: (filterId, filtervalg) => dispatch(endreFiltervalg(filterId, filtervalg)),
    slettAlleFiltervalg: () => dispatch(settFiltervalg(initialState.filtervalg))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringLabelContainer);
