import React, { PropTypes as PT } from 'react';
import Nedtrekksliste from '../../components/nedtrekksliste';
import { filtervalgMellomlagringShape } from '../../proptype-shapes';

import { range, lag2Sifret } from '../../utils/utils';

function FiltreringFodselsdag({ filtervalg, handleChange, endreFilter }) {
    return (
        <div className="select-container">
            <Nedtrekksliste
                liste={
                    range(1, 31, true).map((x, index) => ({
                        value: index,
                        label: lag2Sifret(x),
                        checked: filtervalg.fodselsdagIMnd.includes(index)
                    }))
                }
                handleChange={e => handleChange(e, 'fodselsdagIMnd')}
                onSubmit={endreFilter}
                navnId="filtrering.filtrer-brukere.demografi.fodselsdato"
                uniqueName="fodselsdagIMnd"
            />
        </div>
    );
}

FiltreringFodselsdag.propTypes = {
    filtervalg: filtervalgMellomlagringShape.isRequired,
    handleChange: PT.func.isRequired,
    endreFilter: PT.func.isRequired
};

export default FiltreringFodselsdag;
