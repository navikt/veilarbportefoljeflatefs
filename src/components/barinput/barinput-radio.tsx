import {ChangeEventHandler} from 'react';
import {Detail, Radio} from '@navikt/ds-react';
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
                className="barinput-radio__radio"
                size="small"
            >
                {labelTekst}
                {(!!statustall || statustall === 0) && <Detail weight="semibold">{statustall}</Detail>}
            </Radio>
        </div>
    );
};
