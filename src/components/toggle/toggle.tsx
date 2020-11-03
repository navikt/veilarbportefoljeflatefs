import React from 'react';
import './dark-mode-toggle.less';

const Toggle = ({checked, onChange}) => (
    <span className="toggle-control">
        <input className="dmcheck" type="checkbox" checked={checked} onChange={onChange} id="dmcheck" />
        <label htmlFor="dmcheck" />
    </span>
);

export default Toggle;
