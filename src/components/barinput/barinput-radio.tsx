import React, {ChangeEventHandler} from 'react';
import {ferdigfilterListe, mapFilternavnTilFilterValue} from '../../filtrering/filter-konstanter';
import './bar.less';
import Barlabel from './barlabel';

interface BarinputRadioProps {
    filterNavn: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    checked?: boolean;
    antall: number;
}

export const BarInputRadio = ({filterNavn, handleChange, antall, checked}: BarinputRadioProps) => {
    const filterVerdi = mapFilternavnTilFilterValue[filterNavn];
    const labelTekst = ferdigfilterListe[filterVerdi];

    return (
        <div className="barinput-radio">
            <input
                data-testid={`filter_checkboks-container_${filterNavn}`}
                type="radio"
                name="ferdigfilter"
                id={filterNavn}
                value={filterVerdi}
                onChange={handleChange}
                checked={checked}
                className="barinput-radio__input"
            />
            <Barlabel htmlFor={filterNavn} labelTekst={labelTekst} antall={antall} />
        </div>
    );
};
