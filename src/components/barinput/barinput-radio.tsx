import React, {ChangeEventHandler} from 'react';
import {ferdigfilterListe, mapFilternavnTilFilterValue} from '../../filtrering/filter-konstanter';
import './barlabel.less';
import hiddenIf from '../hidden-if/hidden-if';
import BarInput from './barinput';

interface BarinputRadioProps {
    filterNavn: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    checked: boolean;
    antall: number;
}

export function BarInputRadio({filterNavn, handleChange, checked, antall}: BarinputRadioProps) {
    const filterVerdi = mapFilternavnTilFilterValue[filterNavn];
    const labelTekst = ferdigfilterListe[filterVerdi];

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
            barClassname={filterNavn}
        />
    );
}

export const HiddenIfBarInputRadio = hiddenIf(BarInputRadio);
