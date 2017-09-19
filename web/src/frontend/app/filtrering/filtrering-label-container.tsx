import * as React from 'react';
import { connect } from 'react-redux';
import FiltreringLabel from './filtrering-label';
import FilterKonstanter from './filter-konstanter';
import { slettEnkeltFilter, clearFiltervalg } from '../ducks/filtrering';
import { filtervalgLabelShape, veilederShape } from '../proptype-shapes';
import {EnhetModell, FiltervalgModell} from '../model-interfaces';

interface FiltreringLabelContainerProps {
    enhettiltak: EnhetModell;
    actions: {
      slettAlle: () => void;
      slettEnkelt: (filterNavn: string, filterValue: boolean | string | null) => void;
    };
    filtervalg: FiltervalgModell;
    filtergruppe: string;
}

function FiltreringLabelContainer({ filtervalg, enhettiltak, actions: { slettAlle, slettEnkelt } }: FiltreringLabelContainerProps) {
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
                        label={
                            key === 'tiltakstyper' ?
                            enhettiltak[singleValue] :
                            (singleValue.label || FilterKonstanter[key][singleValue])
                        }
                        slettFilter={() => slettEnkelt(key, singleValue.key || singleValue)}
                    />
                    ));
            } else if (value && typeof value === 'object') {
                return Object.entries(value)
                    .filter(([_, aktivitetvalue]) => aktivitetvalue !== 'NA')
                    .map(([aktivitetkey, aktivitetvalue]) => (
                        <FiltreringLabel
                            key={`aktivitet-${aktivitetkey}`}
                            label={`${FilterKonstanter[key][aktivitetkey]}: ${aktivitetvalue}`}
                            slettFilter={() => slettEnkelt(key, aktivitetkey)}
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

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: {
        slettAlle: () => dispatch(clearFiltervalg(ownProps.filtergruppe, ownProps.veileder)),
        slettEnkelt: (filterKey: string, filterValue: boolean | string | null) => dispatch(slettEnkeltFilter(filterKey, filterValue, ownProps.filtergruppe, ownProps.veileder))
    }
});

export default connect(null, mapDispatchToProps)(FiltreringLabelContainer);
