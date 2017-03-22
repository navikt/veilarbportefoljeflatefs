import React, { PropTypes as PT } from 'react';
import { filtervalgMellomlagringShape, filtervalgShape } from '../../proptype-shapes';
import Nedtrekksliste from '../../components/nedtrekksliste';
import { arraysHaveEqualContent } from '../../utils/utils';

function FiltreringKjonn({ filtervalg, filtervalgMellomlagring, handleChange, endreFilter }) {
    return (
        <div className="select-container">
            <Nedtrekksliste
                liste={
                    ['Kvinne', 'Mann'].map(
                        (kjonn, index) => ({
                            value: index,
                            label: kjonn,
                            checked: filtervalgMellomlagring.kjonn.includes(index)
                        })
                    )
                }
                handleChange={e => handleChange(e, 'kjonn')}
                onSubmit={endreFilter}
                navnId={'filtrering.filtrer-brukere.demografi.kjonn'}
                uniqueName="kjonn"
                renderVelgKnapp={!arraysHaveEqualContent(filtervalg.kjonn, filtervalgMellomlagring.kjonn)}
            />
        </div>
    );
}

FiltreringKjonn.propTypes = {
    filtervalg: filtervalgShape.isRequired,
    filtervalgMellomlagring: filtervalgMellomlagringShape.isRequired,
    handleChange: PT.func.isRequired,
    endreFilter: PT.func.isRequired
};

export default FiltreringKjonn;
