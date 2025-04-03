import {PadlockLockedIcon, PadlockUnlockedIcon} from '@navikt/aksel-icons';
import './toggle-switch.css';

interface ToggleSwitchProps {
    onChange: () => void;
    defaultChecked?: boolean;
    checked?: boolean;
    ariaLabel?: string;
}

export function ToggleSwitch({onChange, defaultChecked, checked, ariaLabel}: ToggleSwitchProps) {
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
                <PadlockLockedIcon title="Rekkefølge er låst" fontSize="1.2rem" />
            </div>
            <div className="toggle-switch-las__apen">
                <PadlockUnlockedIcon title="Rekkefølge er ulåst" fontSize="1.2rem" />
            </div>
            <div className="toggle-switch-border" />
        </label>
    );
}
