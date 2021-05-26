import React from 'react';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';
import './nullstill-valg-knapp.less';
import classNames from 'classnames';

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
            <button
                type="button"
                className="knapp knapp--standard knapp--mini"
                onClick={nullstille}
                disabled={disabled}
                data-testid={`${dataTestId}_nullstill-knapp`}
            >
                Nullstill
            </button>
        </div>
    );
}

export default NullstillValgKnapp;
