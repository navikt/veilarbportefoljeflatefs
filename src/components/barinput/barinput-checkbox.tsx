import React, {ChangeEventHandler} from 'react';
import {mapFilternavnTilFilterValue} from '../../filtrering/filter-konstanter';
import './bar.css';
import {Label} from '@navikt/ds-react';

interface BarInputCheckboxProps {
    filterNavn: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    checked: boolean;
    antall: number;
    labelTekst?: React.ReactNode;
}

function BarInputCheckbox({filterNavn, handleChange, checked, antall, labelTekst}: BarInputCheckboxProps) {
    const filterVerdi = mapFilternavnTilFilterValue[filterNavn];

    return (
        <div className="barinput-checkbox">
            <label className="barlabel__labeltext">
                <input
                    data-testid={`filter_checkboks-container_${filterNavn}`}
                    type="checkbox"
                    name="ferdigfilter"
                    id={filterNavn}
                    value={filterVerdi}
                    onChange={handleChange}
                    checked={checked}
                    className="barinput-checkbox__input"
                />
                {labelTekst}
            </label>
            {(antall || antall === 0) && (
                <Label className="barlabel__antall" size="small">
                    {antall}
                </Label>
            )}
        </div>
    );
}

export default BarInputCheckbox;
