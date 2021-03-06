import * as React from 'react';
import classNames from 'classnames';

interface KnappPanelProps {
    children: React.ReactChild | React.ReactChildren;
    disabled?: boolean;
    onClick?: () => void;
    selected?: boolean;
    ariaLabel: string;
}

function KnappPanel({children, disabled = false, selected = false, ariaLabel, ...props}: KnappPanelProps) {
    const classes = classNames('paginering__knapp', {
        disabled,
        'paginering__knapp--pressed': selected
    });
    return (
        <button
            className={classes}
            aria-disabled={disabled}
            aria-pressed={selected}
            disabled={disabled}
            {...props}
            aria-label={ariaLabel}
            title={ariaLabel}
        >
            {children}
        </button>
    );
}

export default KnappPanel;
