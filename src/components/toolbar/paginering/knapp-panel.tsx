import classNames from 'classnames';
import {Button} from '@navikt/ds-react';

interface KnappPanelProps {
    tekst: string;
    disabled?: boolean;
    onClick?: () => void;
    selected?: boolean;
    ariaLabel: string;
}

export function KnappPanel({disabled = false, selected = false, ariaLabel, ...props}: KnappPanelProps) {
    const classes = classNames('paginering__knapp', {
        disabled,
        'paginering__knapp--pressed': selected
    });
    return (
        <Button
            size="small"
            variant="tertiary"
            className={classes}
            aria-disabled={disabled}
            aria-pressed={selected}
            disabled={disabled}
            {...props}
            aria-label={ariaLabel}
            title={ariaLabel}
        >
            {props.tekst}
        </Button>
    );
}
