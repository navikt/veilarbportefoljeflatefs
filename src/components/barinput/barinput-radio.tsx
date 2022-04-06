import React, {ChangeEventHandler} from 'react';
import {ferdigfilterListe, mapFilternavnTilFilterValue} from '../../filtrering/filter-konstanter';
import './bar.less';
import {Radio} from 'nav-frontend-skjema';
import {Label} from '@navikt/ds-react';

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
            <Radio
                className="mine-filter__filternavn"
                key={filterNavn}
                name="ferdigfilter"
                label={labelTekst}
                value={filterVerdi}
                onChange={handleChange}
                checked={checked}
                data-testid={`filter_checkboks-container_${filterNavn}`}
            />
            {(antall || antall === 0) && (
                <Label className="barlabel__antall" size="small">
                    {antall}
                </Label>
            )}
        </div>
    );
};
