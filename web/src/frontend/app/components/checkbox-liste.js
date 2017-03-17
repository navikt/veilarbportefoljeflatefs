import React, { PropTypes as PT } from 'react';

function CheckboxListe({ liste, handleChange }) {
    return (
        <ul className="nedtrekksliste-liste">
            {liste.map((listeElement, indeks) => (
                <li key={indeks}>
                    <input
                        id={`${indeks}-checkbox`}
                        type="checkbox"
                        className="nav-checkbox"
                        onChange={handleChange}
                        value={listeElement.value}
                        checked={listeElement.checked}
                    />
                    <label htmlFor={`${indeks}-checkbox`}>{listeElement.label}</label>
                </li>
            ))}
        </ul>
    );
}

CheckboxListe.propTypes = {
    liste: PT.arrayOf(PT.shape({
        key: PT.string,
        value: PT.oneOfType([PT.string, PT.number]),
        checked: PT.bool
    })),
    handleChange: PT.func
};

export default CheckboxListe;
