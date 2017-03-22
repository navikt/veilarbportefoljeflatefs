import React, { PropTypes as PT } from 'react';
import { filtervalgMellomlagringShape, filtervalgShape } from '../../proptype-shapes';
import FiltreringInnsatsgruppe from './filtrering-situasjon-innsatsgruppe';
import FiltreringFormidlingsgruppe from './filtrering-situasjon-formidlingsgruppe';

function FiltreringSituasjon({ filtervalg, handleChange, filtervalgMellomlagring, endreFilter }) {
    return (
        <div className="filtrering-situasjon panel blokk-m">
            <FiltreringInnsatsgruppe
                filtervalgMellomlagring={filtervalgMellomlagring}
                handleChange={handleChange}
                endreFilter={() => endreFilter('innsatsgruppe', filtervalgMellomlagring.innsatsgruppe)}
                filtervalg={filtervalg}
            />
            <FiltreringFormidlingsgruppe
                filtervalgMellomlagring={filtervalgMellomlagring}
                handleChange={handleChange}
                endreFilter={() => endreFilter('formidlingsgruppe', filtervalgMellomlagring.formidlingsgruppe)}
                filtervalg={filtervalg}
            />
        </div>
    );
}

FiltreringSituasjon.propTypes = {
    filtervalg: filtervalgShape.isRequired,
    handleChange: PT.func.isRequired,
    filtervalgMellomlagring: filtervalgMellomlagringShape.isRequired,
    endreFilter: PT.func.isRequired
};

export default FiltreringSituasjon;
