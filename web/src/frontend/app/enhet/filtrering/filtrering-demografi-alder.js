import React, { PropTypes as PT } from 'react';
import Nedtrekksliste from '../../components/nedtrekksliste';
import { filtervalgMellomlagringShape, filtervalgShape } from '../../proptype-shapes';

const aldersIntervaller = [
    '19 og under',
    '20-24',
    '25-29',
    '30-39',
    '40-49',
    '50-59',
    '60-66',
    '67-70'
];

function FiltreringAlder({ filtervalg, filtervalgMellomlagring, handleChange, endreFilter }) {
    return (
        <div className="select-container">
            <Nedtrekksliste
                liste={[
                    ...aldersIntervaller.map(
                        (alderString, index) => ({
                            value: index,
                            label: alderString,
                            checked: filtervalgMellomlagring.alder.includes(index)
                        })
                    )
                ]}
                handleChange={e => handleChange(e, 'alder')}
                onSubmit={endreFilter}
                navnId={'filtrering.filtrer-brukere.demografi.alder'}
                uniqueName="alder"
                filtervalgMellomlagring={filtervalgMellomlagring}
                filtervalg={filtervalg}
            />
        </div>
    );
}

FiltreringAlder.propTypes = {
    filtervalgMellomlagring: filtervalgMellomlagringShape.isRequired,
    filtervalg: filtervalgShape.isRequired,
    handleChange: PT.func.isRequired,
    endreFilter: PT.func.isRequired
};

export default FiltreringAlder;
