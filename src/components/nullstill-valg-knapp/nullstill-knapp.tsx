import React from 'react';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';
import './nullstill-knapp.less';
import classNames from 'classnames';
import {Button} from '@navikt/ds-react';

interface Props {
    nullstillValg: () => void;
    dataTestId: string;
    form: string;
    disabled: boolean;
    className?: string;
}

function NullstillKnapp({nullstillValg, dataTestId, form, disabled, className}: Props) {
    const nullstille = e => {
        e.persist();
        logEvent('portefolje.metrikker.nullstill-knapp', {
            sideNavn: finnSideNavn(),
            dropdown: form
        });
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

export default NullstillKnapp;
