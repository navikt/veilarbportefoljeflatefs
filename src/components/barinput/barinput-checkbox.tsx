import React, { ChangeEventHandler } from 'react';
import BarInput from './barinput';
import { ferdigfilterListe, mapFilternavnTilFilterValue } from '../../filtrering/filter-konstanter';
import './barlabel.less';

interface BarInputCheckboxProps {
    filterNavn: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    checked: boolean;
    antall: number;
    labelTekst?: React.ReactNode;
}

function BarInputCheckbox({filterNavn, handleChange, checked, antall, labelTekst}: BarInputCheckboxProps) {
    const filterVerdi = mapFilternavnTilFilterValue[filterNavn];
    const egenLabelTekst = labelTekst ? labelTekst : ferdigfilterListe[filterVerdi];

    return (
        <BarInput
            className="checkboks"
            type="checkbox"
            name="ferdigfilter"
            id={filterNavn}
            barClassname={filterNavn}
            labelTekst={egenLabelTekst}
            antall={antall}
            onChange={handleChange}
            value={filterVerdi}
            checked={checked}
        />
    );
}

export default BarInputCheckbox;
