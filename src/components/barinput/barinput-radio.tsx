import BarInput from "./barinput";
import {
    ferdigfilterListe,
    mapFilternavnTilFilterValue
} from "../../filtrering/filter-konstanter";
import React from "react";

interface BarinputRadioProps {
    filterNavn: string,
    max: number,
    handleChange: (e: any)=> void;
    checked: boolean;
    antall: number
}

export function BarInputRadio ({filterNavn, max, handleChange, checked, antall}: BarinputRadioProps) {
    const filterVerdi = mapFilternavnTilFilterValue[filterNavn]; //TODO :SENDE SOM PROPS?
    const labelTekst = ferdigfilterListe[filterVerdi];  //TODO: SENDE SOM PROPS?

    return (
        <BarInput
            type="radio"
            name="ferdigfilter"
            className="radioknapp"
            id={filterNavn}
            value={filterVerdi}
            onChange={handleChange}
            checked={checked}
            labelTekst= {labelTekst}
            antall={antall}
            max={max}
            barClassname={filterNavn}
        />
    )
}
