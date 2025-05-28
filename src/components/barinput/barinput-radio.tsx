import {ChangeEventHandler} from 'react';
import {Label, Radio} from '@navikt/ds-react';
import './bar.css';

interface BarinputRadioProps {
    handleChange: ChangeEventHandler<HTMLInputElement>;
    antall: number;
    labelTekst: string;
    filterVerdi: string;
    testId: string;
}

export const BarInputRadio = ({handleChange, antall, labelTekst, filterVerdi, testId}: BarinputRadioProps) => {
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
            {(!!antall || antall === 0) && (
                <Label className="barlabel__antall" size="small">
                    {antall}
                </Label>
            )}
        </div>
    );
};
