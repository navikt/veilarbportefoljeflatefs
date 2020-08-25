import React, {ChangeEventHandler} from 'react';
import {
    ferdigfilterListe,
    mapFilternavnTilFilterValue
} from '../../filtrering/filter-konstanter';
import './barlabel.less';
import hiddenIf from '../hidden-if/hidden-if';
import NyBarInput from "./ny_barinput";

interface BarinputRadioProps {
    filterNavn: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    checked: boolean;
    antall: number;
}

export function NyBarInputRadio({filterNavn, handleChange, checked, antall}: BarinputRadioProps) {
    const filterVerdi = mapFilternavnTilFilterValue[filterNavn]; // TODO :SENDE SOM PROPS?
    const labelTekst = ferdigfilterListe[filterVerdi];  // TODO: SENDE SOM PROPS?

    return (
        <NyBarInput
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

export const HiddenIfNyBarInputRadio = hiddenIf(NyBarInputRadio);
