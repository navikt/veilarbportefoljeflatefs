import {ChangeEventHandler, ReactNode} from 'react';
import {Checkbox, Label} from '@navikt/ds-react';
import './bar.css';

interface BarInputCheckboxProps {
    antall?: number;
    checked: boolean;
    filterNavn: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    labelTekst: ReactNode;
    indeterminate?: boolean;
    filterVerdi: string;
}

export function BarInputCheckbox({
    antall,
    checked,
    filterNavn,
    handleChange,
    labelTekst,
    indeterminate,
    filterVerdi
}: BarInputCheckboxProps) {
    return (
        <div className="barinput-checkbox">
            <Checkbox
                size="small"
                id={filterNavn}
                value={filterVerdi}
                name="ferdigfilter"
                onChange={handleChange}
                checked={checked}
                indeterminate={indeterminate}
                data-testid={`filter_checkboks-container_${filterNavn}`}
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
