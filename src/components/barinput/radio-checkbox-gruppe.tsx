import React from 'react';
import './barlabel.less';
import {CheckboxGroup, RadioGroup} from '@navikt/ds-react';
import classNames from 'classnames';

interface RadioCheckboxGruppeProps {
    radio: boolean;
    children: React.ReactNode;
    legend?: string;
    skalViseTittel?: boolean;
    className?: string;
}

export default function RadioCheckboxGruppe({
    radio,
    children,
    legend = '',
    skalViseTittel,
    className
}: RadioCheckboxGruppeProps) {
    return radio ? (
        <RadioGroup legend={legend} hideLegend={!skalViseTittel} className={classNames('div', className)}>
            {children}
        </RadioGroup>
    ) : (
        <CheckboxGroup legend={legend} hideLegend={!skalViseTittel} className={classNames('div', className)}>
            {children}
        </CheckboxGroup>
    );
}
