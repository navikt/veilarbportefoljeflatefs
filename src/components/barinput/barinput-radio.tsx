import {ChangeEventHandler} from 'react';
import {Label, Radio} from '@navikt/ds-react';
import './bar.css';

interface BarinputRadioProps {
    handleChange: ChangeEventHandler<HTMLInputElement>;
    statustall: number;
    labelTekst: string;
    filterVerdi: string;
    testId?: string;
}

export const BarInputRadio = ({handleChange, statustall, labelTekst, filterVerdi, testId}: BarinputRadioProps) => {
    return (
        <div className="barinput-radio">
            <Radio
                className="mine-filter__filternavn"
                data-testid={testId}
                key={filterVerdi}
                name="ferdigfilter"
                onChange={handleChange}
                value={filterVerdi}
                size="small"
            >
                {labelTekst}
            </Radio>
            {(!!statustall || statustall === 0) && (
                <Label className="barlabel__antall" size="small">
                    {statustall}
                </Label>
            )}
        </div>
    );
};
