import {ChangeEventHandler} from 'react';
import {Label, Radio} from '@navikt/ds-react';
import './bar.css';

interface BarinputRadioProps {
    filterNavn: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    antall: number;
    labelTekst: string;
    filterVerdi: string;
    testId: string;
}

export const BarInputRadio = ({
    filterNavn,
    handleChange,
    antall,
    labelTekst,
    filterVerdi,
    testId
}: BarinputRadioProps) => {
    return (
        <div className="barinput-radio">
            <Radio
                className="mine-filter__filternavn"
                data-testid={testId}
                key={filterNavn}
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
