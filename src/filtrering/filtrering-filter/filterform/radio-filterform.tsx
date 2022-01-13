import React from 'react';
import './filterform.less';
import {kebabCase} from '../../../utils/utils';
import {FiltervalgModell} from '../../../model-interfaces';
import NullstillValgKnapp from '../../../components/nullstill-valg-knapp/nullstill-valg-knapp';
import {OrNothing} from '../../../utils/types/types';
import {Radio, RadioGroup} from '@navikt/ds-react';

interface ValgType {
    [key: string]: {label: string; className?: string};
}

interface RadioFilterformProps {
    form: string;
    endreFiltervalg: (form: string, filterVerdi: OrNothing<string>) => void;
    valg: ValgType;
    filtervalg: FiltervalgModell;
}
export function RadioFilterform({form, endreFiltervalg, valg, filtervalg}: RadioFilterformProps) {
    const valgtFilterValg = filtervalg[form];

    const nullstillValg = () => {
        endreFiltervalg(form, null);
    };

    const onChange = e => {
        e.preventDefault();
        endreFiltervalg(form, e.target.value);
    };

    return (
        <form className="skjema radio-filterform" data-testid="radio-filterform">
            <RadioGroup className="radio-filterform__valg" legend="" hideLegend>
                {Object.keys(valg).map(key => (
                    <Radio
                        key={key}
                        value={key}
                        name={valg[key].label}
                        className={valg[key].className}
                        checked={valgtFilterValg === key}
                        onChange={e => onChange(e)}
                        data-testid={`radio-valg_${kebabCase(valg[key].label)}`}
                    >
                        {valg[key].label}{' '}
                    </Radio>
                ))}
            </RadioGroup>
            <NullstillValgKnapp
                dataTestId="radio-filterform"
                nullstillValg={nullstillValg}
                form={form}
                disabled={!(valgtFilterValg !== '' && valgtFilterValg !== null)}
            />
        </form>
    );
}
