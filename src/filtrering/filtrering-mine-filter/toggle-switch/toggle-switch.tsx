import React from 'react';
import './toggle-switch.less';
import {ReactComponent as LasLukket} from './lock-close.svg';
import {ReactComponent as LasApen} from './lock-open.svg';

interface ToggleSwitchProps {
    onChange: () => void;
    defaultChecked?: boolean;
    checked?: boolean;
    ariaLabel?: string;
}

function ToggleSwitch({onChange, defaultChecked, checked, ariaLabel}: ToggleSwitchProps) {
    return (
        <label className="toggle-switch" data-testid="toggle-knapp">
            <input
                className="toggle-input"
                type="checkbox"
                aria-label={ariaLabel}
                defaultChecked={defaultChecked}
                checked={checked}
                onChange={onChange}
            />
            <span className="switch-slider" />
            <div className="toggle-switch-las__lukked">
                <LasLukket />
            </div>
            <div className="toggle-switch-las__apen">
                <LasApen />
            </div>
            <div className="toggle-switch-border" />
        </label>
    );
}

export default ToggleSwitch;
