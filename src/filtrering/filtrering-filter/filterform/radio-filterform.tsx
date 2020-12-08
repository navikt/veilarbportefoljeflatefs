import React, {useEffect, useState} from 'react';
import {Radio} from 'nav-frontend-skjema';
import './filterform.less';
import {kebabCase} from '../../../utils/utils';
import {NULLSTILL_KNAPP} from '../../../konstanter';
import {FiltervalgModell} from '../../../model-interfaces';
import {useFeatureSelector} from '../../../hooks/redux/use-feature-selector';
import NullstillValgKnapp from '../../../components/nullstill-valg-knapp';
import {OrNothing} from '../../../utils/types/types';

interface ValgType {
    [key: string]: {label: string; className?: string};
}
interface RadioFilterformProps {
    form: string;
    endreFiltervalg: (form: string, filterVerdi: OrNothing<string>) => void;
    closeDropdown: () => void;
    valg: ValgType;
    filtervalg: FiltervalgModell;
}
export function RadioFilterform({form, endreFiltervalg, closeDropdown, valg, filtervalg}: RadioFilterformProps) {
    const [valgtFilterValg, setValgteFilterValg] = useState<string>(filtervalg[form]);
    const erNullstillFeatureTogglePa = useFeatureSelector()(NULLSTILL_KNAPP);

    useEffect(() => {
        setValgteFilterValg(filtervalg[form]);
    }, [filtervalg, form]);

    const nullstillValg = () => {
        endreFiltervalg(form, null);
        closeDropdown();
    };

    const onChange = e => {
        e.preventDefault();
        endreFiltervalg(form, e.target.value);
    };

    let reactKey = 1;
    return (
        <form className="skjema radio-filterform">
            <div className="radio-filterform__valg">
                {Object.keys(valg).map(v => (
                    <Radio
                        key={reactKey++}
                        label={valg[v].label}
                        value={v}
                        name={valg[v].label}
                        className={valg[v].className}
                        checked={valgtFilterValg === v}
                        onChange={e => onChange(e)}
                        data-testid={`radio-valg_${kebabCase(valg[v].label)}`}
                    />
                ))}
            </div>
            <div className={'filterform__under-valg'}>
                {erNullstillFeatureTogglePa && (
                    <NullstillValgKnapp
                        dataTestId="radio-filterform"
                        nullstillValg={nullstillValg}
                        form={form}
                        disabled={!(valgtFilterValg !== '' && valgtFilterValg !== null)}
                    />
                )}
            </div>
        </form>
    );
}
