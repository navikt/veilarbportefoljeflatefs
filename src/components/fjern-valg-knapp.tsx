import React from 'react';

interface Props {
    fjernValg: () => React.ReactNode;
    dataTestId: string;
    knappeTekst?: string;
}

 function FjernValgKnapp({fjernValg, dataTestId, knappeTekst = 'Fjern valg'}: Props) {
    return (
        <button
            type="button"
            className="knapp knapp--standard knapp--mini"
            onClick={() => fjernValg()}
            data-testid={`${dataTestId}_fjern-knapp`}
        >
            {knappeTekst}
        </button>
    );
}

export default FjernValgKnapp;
