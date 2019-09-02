import React, { ChangeEventHandler } from 'react';
import BarInput from './barinput';
import { ferdigfilterListe, mapFilternavnTilFilterValue } from '../../filtrering/filter-konstanter';

interface BarInputCheckboxProps {
    filterNavn: string;
    max: number;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    checked: boolean;
    antall: number;
}

function BarInputCheckbox({filterNavn, max, handleChange, checked, antall}: BarInputCheckboxProps ) {
    const filterVerdi = mapFilternavnTilFilterValue[filterNavn];
    const labelTekst = ferdigfilterListe[filterVerdi];
    return (
        <BarInput
            className="checkboks"
            type="checkbox"
            name="ferdigfilter"
            id={filterNavn}
            barClassname={filterNavn}
            labelTekst={labelTekst}
            antall={antall}
            max={max}
            onChange={handleChange}
            value={filterVerdi}
            checked={checked}
        />
    );
}

export default BarInputCheckbox;
