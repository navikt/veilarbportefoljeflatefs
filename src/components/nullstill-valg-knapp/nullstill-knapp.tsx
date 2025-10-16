import classNames from 'classnames';
import {Button} from '@navikt/ds-react';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';
import './nullstill-knapp.css';

interface Props {
    nullstillValg: () => void;
    dataTestId: string;
    form: string | string[];
    disabled: boolean;
    className?: string;
}

export function NullstillKnapp({nullstillValg, dataTestId, form, disabled, className}: Props) {
    const nullstille = e => {
        e.persist();

        if (typeof form === 'string') {
            logEvent('portefolje.metrikker.nullstill-knapp', {
                sideNavn: finnSideNavn(),
                dropdown: form
            });
        } else {
            // Dette er for filter der vi mappar ulike val til ulike felt på filtermodellen
            form.forEach(formInList =>
                logEvent('portefolje.metrikker.nullstill-knapp', {
                    sideNavn: finnSideNavn(),
                    dropdown: formInList
                })
            );
        }

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
