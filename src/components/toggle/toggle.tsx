import React from 'react';
import './dark-mode-toggle.css';

const Toggle = ({checked, onChange}) => (
    <span className="toggle-control">
        <input
            className="dmcheck"
            type="checkbox"
            checked={checked}
            onChange={onChange}
            id="dmcheck"
            aria-label="dmcheck"
        />
        <label htmlFor="dmcheck" />
    </span>
);

export default Toggle;
