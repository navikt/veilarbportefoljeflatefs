import React from 'react';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';
import './nullstill-valg-knapp.less';
import classNames from 'classnames';
import {Button} from '@navikt/ds-react';

interface Props {
    nullstillValg: () => void;
    dataTestId: string;
    form: string;
    disabled: boolean;
    className?: string;
}

function NullstillValgKnapp({nullstillValg, dataTestId, form, disabled, className}: Props) {
    const nullstille = () => {
        logEvent('portefolje.metrikker.nullstill-knapp', {
            sideNavn: finnSideNavn(),
            dropdown: form
        });
        return nullstillValg();
    };

    return (
        <div className={classNames('nullstill-valg-knapp', className)}>
            <Button
                variant="tertiary"
                type="button"
                onClick={nullstille}
                disabled={disabled}
                data-testid={`${dataTestId}_nullstill-knapp`}
            >
                Nullstill
            </Button>
        </div>
    );
}

export default NullstillValgKnapp;
