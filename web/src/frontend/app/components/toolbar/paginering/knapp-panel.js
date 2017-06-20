import React, { PropTypes as PT } from 'react';
import classNames from 'classnames';

function KnappPanel({ children, disabled, pressed, ...props }) {
    const classes = classNames('paginering__knapp', {
        disabled,
        'paginering__knapp--pressed': pressed
    });
    return (
        <button
            className={classes}
            aria-disabled={disabled}
            aria-pressed={pressed}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}

KnappPanel.propTypes = {
    children: PT.node.isRequired,
    disabled: PT.bool,
    pressed: PT.bool
};
KnappPanel.defaultProps = {
    disabled: false,
    pressed: false
};

export default KnappPanel;
