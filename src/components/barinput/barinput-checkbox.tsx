import React, {ChangeEventHandler} from 'react';
import {ferdigfilterListe, mapFilternavnTilFilterValue} from '../../filtrering/filter-konstanter';
import './barlabel.less';
import Barlabel from './barlabel';
import {Checkbox} from '@navikt/ds-react';

interface BarInputCheckboxProps {
    filterNavn: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    checked: boolean;
    antall: number;
    labelTekst?: React.ReactNode;
    skalViseTittel?: boolean;
}

function BarInputCheckbox({filterNavn, handleChange, checked, antall, labelTekst}: BarInputCheckboxProps) {
    const filterVerdi = mapFilternavnTilFilterValue[filterNavn];
    const egenLabelTekst = labelTekst ? labelTekst : ferdigfilterListe[filterVerdi];

    return (
        <Checkbox
            value={filterVerdi}
            data-testid={`filter_checkboks-container_${filterNavn}`}
            onChange={handleChange}
            checked={checked}
            className="barlabel"
        >
            <Barlabel labelTekst={egenLabelTekst} antall={antall} />
        </Checkbox>
    );
}

export default BarInputCheckbox;
