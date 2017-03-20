import React, { PropTypes as PT } from 'react';
import { filtervalgMellomlagringShape, filtervalgShape } from '../../proptype-shapes';

import FiltreringAlder from './filtrering-demografi-alder';
import FiltreringKjonn from './filtrering-demografi-kjonn';
import FiltreringFodselsdag from './filtrering-demografi-fodselsdag';

function FiltreringDemografi({ filtervalg, handleChange, filtervalgMellomlagring, endreFilter }) {
    return (
        <div className="filtrering-demografi panel blokk-m">
            <FiltreringAlder
                filtervalg={filtervalgMellomlagring}
                handleChange={handleChange}
                endreFilter={() => endreFilter('alder', filtervalgMellomlagring.alder)}
            />
            <FiltreringKjonn
                filtervalg={filtervalg}
                handleChange={handleChange}
            />
            <FiltreringFodselsdag
                filtervalg={filtervalgMellomlagring}
                handleChange={handleChange}
                endreFilter={() => endreFilter('fodselsdagIMnd', filtervalgMellomlagring.fodselsdagIMnd)}
            />
        </div>
    );
}

FiltreringDemografi.propTypes = {
    filtervalg: filtervalgShape.isRequired,
    handleChange: PT.func.isRequired,
    filtervalgMellomlagring: filtervalgMellomlagringShape.isRequired,
    endreFilter: PT.func.isRequired
};

export default FiltreringDemografi;
