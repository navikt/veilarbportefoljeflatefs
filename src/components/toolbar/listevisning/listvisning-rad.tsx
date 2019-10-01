import { Kolonne } from '../../../ducks/ui/listevisning';
import { alternativerConfig } from './listevisning-utils';
import { ChangeEvent } from 'react';
import * as React from 'react';
import { Checkbox } from 'nav-frontend-skjema';

interface ListevisningRadProps {
    kolonne: Kolonne;
    disabled: boolean;
    valgt: boolean;
    onChange: (name: Kolonne, checked: boolean) => void;
}

function ListevisningRad(props: ListevisningRadProps) {
    const alternativ = alternativerConfig.get(props.kolonne);

    if (alternativ == null) {
        return null;
    }

    return (
        <li>
            <Checkbox
                label={alternativ.tekstlabel}
                value={props.kolonne.toString()}
                checked={props.valgt || alternativ.checked}
                disabled={props.disabled || alternativ.checkboxDisabled}
                onChange={((e: ChangeEvent<HTMLInputElement>) => props.onChange(props.kolonne, e.target.checked))}
            />
        </li>
    );
}

export default ListevisningRad;
