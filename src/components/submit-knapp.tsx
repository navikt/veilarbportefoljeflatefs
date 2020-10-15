import * as React from 'react';

interface Props {
    pristine: boolean;
    closeDropdown?: React.MouseEventHandler<HTMLButtonElement>;
    dataTestId?: string;
}

function SubmitKnapp({pristine, closeDropdown, dataTestId}: Props) {
    if (pristine) {
        return (
            <button className="knapp knapp--mini"
                    type="button"
                    onClick={closeDropdown}
                    data-testid={`${dataTestId}_lukk-knapp`}>
                Lukk
            </button>
        );
    }

    return (
        <button className="knapp knapp--mini knapp--hoved"
                type="submit"
                data-testid={`${dataTestId}_velg-knapp`}>
            Velg
        </button>
    );
}

export default SubmitKnapp;
