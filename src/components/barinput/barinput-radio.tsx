import React, {ChangeEventHandler} from 'react';
import {ferdigfilterListeLabelTekst, mapFilternavnTilFilterValue} from '../../filtrering/filter-konstanter';
import './bar.css';
import {Label, Radio} from '@navikt/ds-react';

interface BarinputRadioProps {
    filterNavn: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    antall: number;
}

export const BarInputRadio = ({filterNavn, handleChange, antall}: BarinputRadioProps) => {
    const filterVerdi = mapFilternavnTilFilterValue[filterNavn];
    const labelTekst = ferdigfilterListeLabelTekst[filterVerdi];

    return (
        <div className="barinput-radio">
            <Radio
                className="mine-filter__filternavn"
                data-testid={`filter_checkboks-container_${filterNavn}`}
                key={filterNavn}
                name="ferdigfilter"
                onChange={handleChange}
                value={filterVerdi}
                size="small"
            >
                {labelTekst}
            </Radio>
            {(antall || antall === 0) && (
                <Label className="barlabel__antall" size="small">
                    {antall}
                </Label>
            )}
        </div>
    );
};
