import React from 'react';
import {logEvent} from '../utils/frontend-logger';
import {finnSideNavn} from '../middleware/metrics-middleware';

interface Props {
    nullstillValg: () => void;
    dataTestId: string;
    form: string;
}

function NullstillValgKnapp({nullstillValg, dataTestId, form}: Props) {
    const nullstille = () => {
        logEvent('portefolje.metrikker.nullstill-knapp', {
            sideNavn: finnSideNavn(),
            dropdown: form
        });
        return nullstillValg();
    };

    return (
        <button
            type="button"
            className="knapp knapp--standard knapp--mini"
            onClick={nullstille}
            data-testid={`${dataTestId}_nullstill-knapp`}
        >
            Nullstill
        </button>
    );
}

export default NullstillValgKnapp;
