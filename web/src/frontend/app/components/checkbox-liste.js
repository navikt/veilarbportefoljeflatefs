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
                        onClick={handleChange}
                        value={indeks}
                    />
                    <label htmlFor={`${indeks}-checkbox`}>{listeElement.value}</label>
                </li>
            ))}
        </ul>
    );
}

CheckboxListe.propTypes = {
    liste: PT.arrayOf(PT.shape({
        key: PT.string,
        value: PT.string
    })),
    handleChange: PT.func
};

export default CheckboxListe;
