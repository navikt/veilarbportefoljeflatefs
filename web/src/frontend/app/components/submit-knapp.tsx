import * as React from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
    pristine: boolean;
    closeDropdown?: React.MouseEventHandler<HTMLButtonElement>;
}

function SubmitKnapp({ pristine, closeDropdown }: Props) {
    if (pristine) {
        return (
            <button className="knapp knapp--mini" type="button" onClick={closeDropdown}>
                <FormattedMessage id="components.filterform.button.lukk"/>
            </button>
        );
    }

    return (
        <button className="knapp knapp--mini knapp--hoved" type="submit">
            <FormattedMessage id="components.filterform.button.velg"/>
        </button>
    );
}
export default SubmitKnapp;
