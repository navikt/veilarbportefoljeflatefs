import React from 'react';
import {Radio} from 'nav-frontend-skjema';
import './filterform.less';
import {kebabCase} from '../../../utils/utils';
import {FiltervalgModell} from '../../../model-interfaces';
import NullstillValgKnapp from '../../../components/nullstill-valg-knapp/nullstill-valg-knapp';
import {OrNothing} from '../../../utils/types/types';

interface RadioFilterformProps {
    form: string;
    endreFiltervalg: (form: string, filterVerdi: OrNothing<string>) => void;
    valg: {[key: string]: {label: string; className?: string}};
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
            <div className="radio-filterform__valg">
                {Object.keys(valg).map(key => (
                    <Radio
                        key={key}
                        label={valg[key].label}
                        value={key}
                        name={valg[key].label}
                        className={valg[key].className}
                        checked={valgtFilterValg === key}
                        onChange={e => onChange(e)}
                        data-testid={`radio-valg_${kebabCase(valg[key].label)}`}
                    />
                ))}
            </div>
            <NullstillValgKnapp
                dataTestId="radio-filterform"
                nullstillValg={nullstillValg}
                form={form}
                disabled={!(valgtFilterValg !== '' && valgtFilterValg !== null)}
            />
        </form>
    );
}
