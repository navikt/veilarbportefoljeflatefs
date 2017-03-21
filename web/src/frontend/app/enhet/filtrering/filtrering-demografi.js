import React, { PropTypes as PT } from 'react';
import { filtervalgMellomlagringShape, filtervalgShape } from '../../proptype-shapes';

import FiltreringAlder from './filtrering-demografi-alder';
import FiltreringKjonn from './filtrering-demografi-kjonn';
import FiltreringFodselsdag from './filtrering-demografi-fodselsdag';

function FiltreringDemografi({ filtervalg, handleChange, filtervalgMellomlagring, endreFilter }) {
    return (
        <div className="filtrering-demografi panel blokk-m">
            <FiltreringAlder
                filtervalgMellomlagring={filtervalgMellomlagring}
                handleChange={handleChange}
                endreFilter={() => endreFilter('alder', filtervalgMellomlagring.alder)}
                filtervalg={filtervalg}
            />
            <FiltreringKjonn
                filtervalgMellomlagring={filtervalgMellomlagring}
                handleChange={handleChange}
                endreFilter={() => endreFilter('kjonn', filtervalgMellomlagring.kjonn)}
                filtervalg={filtervalg}
            />
            <FiltreringFodselsdag
                filtervalgMellomlagring={filtervalgMellomlagring}
                handleChange={handleChange}
                endreFilter={() => endreFilter('fodselsdagIMnd', filtervalgMellomlagring.fodselsdagIMnd)}
                filtervalg={filtervalg}
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
