import {ChangeEvent} from 'react';
import {Checkbox} from '@navikt/ds-react';
import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {alternativerConfig} from './velg-kolonner-config';

interface ValgteKolonnerRadProps {
    kolonne: Kolonne;
    disabled: boolean;
    valgt: boolean;
    onChange: (name: Kolonne, checked: boolean) => void;
}

export function VelgKolonnerRad({kolonne, disabled, valgt, onChange}: ValgteKolonnerRadProps) {
    const alternativ = alternativerConfig.get(kolonne);
    const kolonneoverskrift = kolonne.toString();
    const label = alternativ?.tekstlabel ?? kolonneoverskrift;

    return (
        <li>
            <Checkbox
                checked={valgt}
                data-testid={`velg-kolonne-rad_${kolonneoverskrift}`}
                disabled={disabled}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(kolonne, e.target.checked)}
                size="small"
                value={kolonneoverskrift}
            >
                {label}
            </Checkbox>
        </li>
    );
}
