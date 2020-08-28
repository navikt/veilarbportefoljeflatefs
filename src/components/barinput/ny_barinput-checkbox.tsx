import React, {ChangeEventHandler} from 'react';
import {ferdigfilterListe, mapFilternavnTilFilterValue} from '../../filtrering/filter-konstanter';
import './barlabel.less';
import NyBarInput from "./ny_barinput";

interface BarInputCheckboxProps {
    filterNavn: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    checked: boolean;
    antall: number;
    labelTekst?: React.ReactNode;
}

function NyBarInputCheckbox({filterNavn, handleChange, checked, antall, labelTekst}: BarInputCheckboxProps) {
    const filterVerdi = mapFilternavnTilFilterValue[filterNavn];
    const egenLabelTekst = labelTekst ? labelTekst : ferdigfilterListe[filterVerdi];

    return (
        <NyBarInput
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

export default NyBarInputCheckbox;
