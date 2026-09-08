import {ChangeEvent} from 'react';
import {Checkbox} from '@navikt/ds-react';
import {Kolonne, OversiktType} from '../../../ducks/ui/valgte-kolonner';
import {useAlternativerConfig} from './velg-kolonner-config';

interface ValgteKolonnerRadProps {
    kolonne: Kolonne;
    disabled: boolean;
    valgt: boolean;
    onChange: (name: Kolonne, checked: boolean) => void;
    oversiktType: OversiktType;
}

export function VelgKolonnerRad({kolonne, disabled, valgt, onChange, oversiktType}: ValgteKolonnerRadProps) {
    const kolonneoverskrift = kolonne.toString();
    const alternativerConfig = useAlternativerConfig(oversiktType);
    const label = alternativerConfig.get(kolonne)?.tekstlabel ?? kolonne.toString();

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
