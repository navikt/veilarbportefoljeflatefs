import React, {ChangeEventHandler} from 'react';
import {ferdigfilterListe, mapFilternavnTilFilterValue} from '../../filtrering/filter-konstanter';
import './bar.less';
import Barlabel from './barlabel';

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
        <div className="barinput-checkbox">
            <input
                data-testid={`filter_checkboks-container_${filterNavn}`}
                type="checkbox"
                name="ferdigfilter"
                id={filterNavn}
                value={filterVerdi}
                onChange={handleChange}
                checked={checked}
                className="barinput-checkbox__input"
            />
            <Barlabel htmlFor={filterNavn} labelTekst={egenLabelTekst} antall={antall} />
        </div>
    );
}

export default BarInputCheckbox;
