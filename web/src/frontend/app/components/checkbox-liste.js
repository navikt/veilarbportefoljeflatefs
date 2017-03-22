import React, { PropTypes as PT } from 'react';

function CheckboxListe({ liste, handleChange, uniqueName }) {
    return (
        <ul className="nedtrekksliste-liste">
            {liste.map((listeElement, indeks) => (
                <li key={`${listeElement.value}-${uniqueName}`}>
                    <input
                        id={`${uniqueName}-${indeks}-checkbox`}
                        type="checkbox"
                        className="checkboks"
                        onChange={handleChange}
                        value={listeElement.value}
                        checked={listeElement.checked}
                    />
                    <label htmlFor={`${uniqueName}-${indeks}-checkbox`}>{listeElement.label}</label>
                </li>
            ))}
        </ul>
    );
}

CheckboxListe.propTypes = {
    liste: PT.arrayOf(PT.shape({
        key: PT.string.isRequired,
        value: PT.oneOfType([PT.string, PT.number]).isRequired,
        checked: PT.bool.isRequired
    })).isRequired,
    handleChange: PT.func.isRequired,
    uniqueName: PT.string.isRequired
};

export default CheckboxListe;
