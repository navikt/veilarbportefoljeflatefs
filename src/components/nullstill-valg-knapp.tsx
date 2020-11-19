import React from 'react';

interface Props {
    nullstillValg: () => void;
    dataTestId: string;
}

function NullstillValgKnapp({nullstillValg, dataTestId}: Props) {
    return (
        <button
            type="button"
            className="knapp knapp--standard knapp--mini"
            onClick={nullstillValg}
            data-testid={`${dataTestId}_nullstill-knapp`}
        >
            Nullstill
        </button>
    );
}

export default NullstillValgKnapp;
