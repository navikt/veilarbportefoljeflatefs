import {Kolonne} from '../../../ducks/ui/listevisning';
import {alternativerConfig} from './listevisning-utils';
import {ChangeEvent} from 'react';
import * as React from 'react';
import {Checkbox} from '@navikt/ds-react';

interface ListevisningRadProps {
    kolonneoverskrift: Kolonne;
    disabled: boolean;
    valgt: boolean;
    onChange: (name: Kolonne, checked: boolean) => void;
}

function ListevisningRad(props: ListevisningRadProps) {
    const alternativ = alternativerConfig.get(props.kolonneoverskrift);
    const kolonneoverskrift = props.kolonneoverskrift.toString();

    if (alternativ == null) {
        return null;
    }

    return (
        <li>
            <Checkbox
                checked={props.valgt}
                data-testid={`velg-kolonne-rad_${kolonneoverskrift}`}
                disabled={props.disabled}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    props.onChange(props.kolonneoverskrift, e.target.checked)
                }
                size="small"
                value={kolonneoverskrift}
            >
                {alternativ.tekstlabel}
            </Checkbox>
        </li>
    );
}

export default ListevisningRad;
