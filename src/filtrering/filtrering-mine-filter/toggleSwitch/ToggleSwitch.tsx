import React from 'react';
import './toggle-switch.less';
import {ReactComponent as LåsLukket} from './lock-close.svg';
import {ReactComponent as LåsÅpen} from './lock-open.svg';

interface ToggleSwitchProps {
    onOpen?: () => void;
    onClose?: () => void;
    defaultChecked?: boolean;
    checked?: boolean;
}

function ToggleSwitch({onOpen, onClose, defaultChecked, checked}: ToggleSwitchProps) {
    return (
        <label className="toggle-switch">
            <input
                className="toggle-input"
                type="checkbox"
                defaultChecked={defaultChecked}
                checked={checked}
                onChange={(e) => {
                    const checkbox = e.target;
                    if (checkbox.checked) {
                        if (onOpen) onOpen();
                    } else {
                        if (onClose) onClose();
                    }
                }}
            />
            <span className="switch-slider"></span>
            <div className="toggle-switch-lås toggle-switch-lås-lukked">
                <LåsLukket />
            </div>
            <div className="toggle-switch-lås toggle-switch-lås-åpen">
                <LåsÅpen />
            </div>
        </label>
    );
}

export default ToggleSwitch;
