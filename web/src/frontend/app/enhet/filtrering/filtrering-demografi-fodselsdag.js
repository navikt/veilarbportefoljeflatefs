import React, { PropTypes as PT } from 'react';
import Nedtrekksliste from '../../components/nedtrekksliste';
import { filtervalgMellomlagringShape, filtervalgShape } from '../../proptype-shapes';
import { range, lag2Sifret, arraysHaveEqualContent } from '../../utils/utils';

function FiltreringFodselsdag({ filtervalg, filtervalgMellomlagring, handleChange, endreFilter }) {
    return (
        <Nedtrekksliste
            liste={
                range(1, 31, true).map((x, index) => ({
                    value: index,
                    label: lag2Sifret(x),
                    checked: filtervalgMellomlagring.fodselsdagIMnd.includes(index)
                }))
            }
            handleChange={e => handleChange(e, 'fodselsdagIMnd')}
            onSubmit={endreFilter}
            navnId="filtrering.filtrer-brukere.demografi.fodselsdato"
            uniqueName="fodselsdagIMnd"
            renderVelgKnapp={
                !arraysHaveEqualContent(filtervalg.fodselsdagIMnd, filtervalgMellomlagring.fodselsdagIMnd)
            }
        />
    );
}

FiltreringFodselsdag.propTypes = {
    filtervalgMellomlagring: filtervalgMellomlagringShape.isRequired,
    filtervalg: filtervalgShape.isRequired,
    handleChange: PT.func.isRequired,
    endreFilter: PT.func.isRequired
};

export default FiltreringFodselsdag;
