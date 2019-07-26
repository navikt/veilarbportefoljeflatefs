import * as React from 'react';

interface Props {
    pristine: boolean;
    closeDropdown?: React.MouseEventHandler<HTMLButtonElement>;
}

function SubmitKnapp({ pristine, closeDropdown }: Props) {
    if (pristine) {
        return (
            <button className="knapp knapp--mini" type="button" onClick={closeDropdown}>
               Lukk
            </button>
        );
    }

    return (
        <button className="knapp knapp--mini knapp--hoved" type="submit">
            Velg
        </button>
    );
}
export default SubmitKnapp;
