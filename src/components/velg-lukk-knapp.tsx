import * as React from 'react';

interface Props {
    harValg: boolean;
    dataTestId: string;
}

function VelgLukkKnapp({harValg, dataTestId}: Props) {
    return (
        <button
            type="submit"
            className={harValg ? 'knapp knapp--mini knapp--hoved' : 'knapp knapp--mini'}
            data-testid={harValg ? `${dataTestId}_velg-knapp` : `${dataTestId}_lukk-knapp`}
        >
            {harValg ? 'Velg' : 'Lukk'}
        </button>
    );
}

export default VelgLukkKnapp;
