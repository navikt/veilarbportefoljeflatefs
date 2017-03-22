import React, { PropTypes as PT } from 'react';
import Nedtrekksliste from '../../components/nedtrekksliste';
import { filtervalgMellomlagringShape, filtervalgShape } from '../../proptype-shapes';

const formidlingsgrupper = [
    'Arbeidssøker',
    'Ikke arbeidssøker',
    'Ikke servicebehov',
    'Pre arbeidssøker',
    'Pre reaktivert arbeidssøker'
];

function FiltreringFormidlingsgruppe({ filtervalg, filtervalgMellomlagring, handleChange, endreFilter }) {
    return (
        <div className="select-container">
            <Nedtrekksliste
                liste={[
                    ...formidlingsgrupper.map(
                        (formidlingsString, index) => ({
                            value: index,
                            label: formidlingsString,
                            checked: filtervalgMellomlagring.formidlingsgruppe.includes(index)
                        })
                    )
                ]}
                handleChange={e => handleChange(e, 'formidlingsgruppe')}
                onSubmit={endreFilter}
                navnId={'filtrering.filtrer-brukere.situasjon-formidlingsgruppe'}
                uniqueName="formidlingsgruppe"
                filtervalgMellomlagring={filtervalgMellomlagring}
                filtervalg={filtervalg}
            />
        </div>
    );
}

FiltreringFormidlingsgruppe.propTypes = {
    filtervalgMellomlagring: filtervalgMellomlagringShape.isRequired,
    filtervalg: filtervalgShape.isRequired,
    handleChange: PT.func.isRequired,
    endreFilter: PT.func.isRequired
};

export default FiltreringFormidlingsgruppe;
