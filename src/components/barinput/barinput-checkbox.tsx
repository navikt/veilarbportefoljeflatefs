import React, {ChangeEventHandler} from 'react';
import {mapFilternavnTilFilterValue} from '../../filtrering/filter-konstanter';
import './bar.css';
import {Checkbox, Label} from '@navikt/ds-react';

interface BarInputCheckboxProps {
    antall?: number;
    checked: boolean;
    filterNavn: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    labelTekst?: React.ReactNode;
    indeterminate?: boolean;
}

function BarInputCheckbox({
    antall,
    checked,
    filterNavn,
    handleChange,
    labelTekst,
    indeterminate
}: BarInputCheckboxProps) {
    const filterVerdi = mapFilternavnTilFilterValue[filterNavn];

    return (
        <div className="barinput-checkbox">
            <Checkbox
                data-testid={`filter_checkboks-container_${filterNavn}`}
                name="ferdigfilter"
                id={filterNavn}
                value={filterVerdi}
                onChange={handleChange}
                checked={checked}
                size="small"
                indeterminate={indeterminate}
            >
                {labelTekst}
            </Checkbox>
            {(antall || antall === 0) && (
                <Label className="barlabel__antall" size="small" data-testid={`filter_checkboks-label_${filterNavn}`}>
                    {antall}
                </Label>
            )}
        </div>
    );
}

export default BarInputCheckbox;
