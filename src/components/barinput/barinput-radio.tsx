import React, {ChangeEventHandler} from 'react';
import {ferdigfilterListe, mapFilternavnTilFilterValue} from '../../filtrering/filter-konstanter';
import './barlabel.less';
import Barlabel from './barlabel';
import {Radio} from '@navikt/ds-react';

interface BarinputRadioProps {
    filterNavn: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    antall: number;
}

export const BarInputRadio = ({filterNavn, handleChange, antall}: BarinputRadioProps) => {
    const filterVerdi = mapFilternavnTilFilterValue[filterNavn];
    const labelTekst = ferdigfilterListe[filterVerdi];

    return (
        <Radio
            value={filterVerdi}
            data-testid={`filter_checkboks-container_${filterNavn}`}
            onChange={handleChange}
            className="barlabel"
        >
            <Barlabel labelTekst={labelTekst} antall={antall} />
        </Radio>
    );
};
