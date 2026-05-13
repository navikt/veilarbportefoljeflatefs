import {ChangeEventHandler, ReactNode} from 'react';
import {Checkbox, Detail} from '@navikt/ds-react';
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
                className="barinput-checkbox__checkbox"
                data-testid={`filter_checkboks-container_${filterNavn}`}
            >
                {labelTekst}
                {(antall || antall === 0) && (
                    <Detail weight="semibold" data-testid={`filter_checkboks-label_${filterNavn}`}>
                        {antall}
                    </Detail>
                )}
            </Checkbox>
        </div>
    );
}
