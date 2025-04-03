import {ChangeEvent} from 'react';
import {Checkbox} from '@navikt/ds-react';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {alternativerConfig} from './velg-kolonner-config';

interface ListevisningRadProps {
    kolonne: Kolonne;
    disabled: boolean;
    valgt: boolean;
    onChange: (name: Kolonne, checked: boolean) => void;
}

export function VelgKolonnerRad({kolonne, disabled, valgt, onChange}: ListevisningRadProps) {
    const alternativ = alternativerConfig.get(kolonne);
    const kolonneoverskrift = kolonne.toString();

    if (alternativ == null) {
        return null;
    }

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
                {alternativ.tekstlabel}
            </Checkbox>
        </li>
    );
}
