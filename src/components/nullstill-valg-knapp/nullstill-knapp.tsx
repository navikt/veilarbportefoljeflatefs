import classNames from 'classnames';
import {Button} from '@navikt/ds-react';
import './nullstill-knapp.css';

interface Props {
    nullstillValg: () => void;
    dataTestId: string;
    disabled: boolean;
    className?: string;
}

export function NullstillKnapp({nullstillValg, dataTestId, disabled, className}: Props) {
    const nullstille = e => {
        e.persist();
        return nullstillValg();
    };

    return (
        <div className={classNames('nullstill__wrapper', className)}>
            <Button
                variant="secondary"
                size="small"
                type="button"
                onClick={e => nullstille(e)}
                disabled={disabled}
                data-testid={`${dataTestId}_nullstill-knapp`}
                className="nullstill__knapp"
            >
                Nullstill
            </Button>
        </div>
    );
}
