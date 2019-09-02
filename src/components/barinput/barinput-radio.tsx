import React, { ChangeEventHandler } from 'react';
import BarInput from './barinput';
import {
    ferdigfilterListe,
    mapFilternavnTilFilterValue
} from '../../filtrering/filter-konstanter';

interface BarinputRadioProps {
    filterNavn: string;
    max: number;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    checked: boolean;
    antall: number;
}

export function BarInputRadio({filterNavn, max, handleChange, checked, antall}: BarinputRadioProps) {
    const filterVerdi = mapFilternavnTilFilterValue[filterNavn]; // TODO :SENDE SOM PROPS?
    const labelTekst = ferdigfilterListe[filterVerdi];  // TODO: SENDE SOM PROPS?

    return (
        <BarInput
            type="radio"
            name="ferdigfilter"
            className="radioknapp"
            id={filterNavn}
            value={filterVerdi}
            onChange={handleChange}
            checked={checked}
            labelTekst={labelTekst}
            antall={antall}
            max={max}
            barClassname={filterNavn}
        />
    );
}
