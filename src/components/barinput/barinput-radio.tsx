import {ChangeEventHandler} from 'react';
import {Label, Radio} from '@navikt/ds-react';
import './bar.css';

interface BarinputRadioProps {
    filterVerdi: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    labelTekst: string;
    statustall: number;
    testId?: string;
}

export const BarInputRadio = ({filterVerdi, handleChange, labelTekst, statustall, testId}: BarinputRadioProps) => {
    return (
        <div className="barinput-radio">
            <Radio
                name="ferdigfilter"
                value={filterVerdi}
                onChange={handleChange}
                data-testid={testId}
                key={filterVerdi}
                className="mine-filter__filternavn"
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
