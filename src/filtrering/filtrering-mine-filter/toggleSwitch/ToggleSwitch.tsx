import React from 'react';
import './toggle-switch.less';
import {ReactComponent as LåsLukket} from './lock-close.svg';
import {ReactComponent as LåsÅpen} from './lock-open.svg';

function ToggleSwitch() {
    return (
        <label className="toggle-switch">
            <input className="toggle-input" type="checkbox" />
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
