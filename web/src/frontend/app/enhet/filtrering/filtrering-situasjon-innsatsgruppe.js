import React, { PropTypes as PT } from 'react';
import Nedtrekksliste from '../../components/nedtrekksliste';
import { filtervalgMellomlagringShape, filtervalgShape } from '../../proptype-shapes';

const innsatsgrupper = [
    'Spesielt tilpasset innsats',
    'Situasjonsbestemt innsats',
    'Standardinnsats',
    'Varig tilpasset'
];

function FiltreringInnsatsgruppe({ filtervalg, filtervalgMellomlagring, handleChange, endreFilter }) {
    return (
        <div className="select-container">
            <Nedtrekksliste
                liste={[
                    ...innsatsgrupper.map(
                        (innsatsString, index) => ({
                            value: index,
                            label: innsatsString,
                            checked: filtervalgMellomlagring.innsatsgruppe.includes(index)
                        })
                    )
                ]}
                handleChange={e => handleChange(e, 'innsatsgruppe')}
                onSubmit={endreFilter}
                navnId={'filtrering.filtrer-brukere.situasjon-innsatsgruppe'}
                uniqueName="innsatsgruppe"
                filtervalgMellomlagring={filtervalg}
                filtervalg={filtervalg}
            />
        </div>
    );
}

FiltreringInnsatsgruppe.propTypes = {
    filtervalgMellomlagring: filtervalgMellomlagringShape.isRequired,
    filtervalg: filtervalgShape.isRequired,
    handleChange: PT.func.isRequired,
    endreFilter: PT.func.isRequired
};

export default FiltreringInnsatsgruppe;
