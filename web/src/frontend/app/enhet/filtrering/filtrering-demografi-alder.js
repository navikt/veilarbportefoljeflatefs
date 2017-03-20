import React, { PropTypes as PT } from 'react';
import Nedtrekksliste from '../../components/nedtrekksliste';
import { filtervalgMellomlagringShape } from '../../proptype-shapes';

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

function FiltreringAlder({ filtervalg, handleChange, endreFilter }) {
    return (
        <div className="select-container">
            <Nedtrekksliste
                liste={[
                    ...aldersIntervaller.map(
                        (alderString, index) => ({
                            value: index + 1,
                            label: alderString,
                            checked: filtervalg.alder.includes(index + 1)
                        })
                    )
                ]}
                handleChange={e => handleChange(e, 'alder')}
                onSubmit={endreFilter}
                navnId={'filtrering.filtrer-brukere.demografi.alder'}
                uniqueName="alder"
            />
        </div>
    );
}

FiltreringAlder.propTypes = {
    filtervalg: filtervalgMellomlagringShape.isRequired,
    handleChange: PT.func.isRequired,
    endreFilter: PT.func.isRequired
};

export default FiltreringAlder;
