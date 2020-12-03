import React, {useEffect, useState} from 'react';
import {Radio} from 'nav-frontend-skjema';
import './filterform.less';
import {kebabCase} from '../../../utils/utils';
import {NULLSTILL_KNAPP} from '../../../konstanter';
import {FiltervalgModell} from '../../../model-interfaces';
import VelgLukkKnapp from '../../../components/velg-lukk-knapp';
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
    };
    const onChange = e => {
        e.preventDefault();
        endreFiltervalg(form, e.target.value);
    };
    let reactKey = 1;
    return (
        <form
            className="skjema radio-filterform"
            // onSubmit={e => {
            //     e.preventDefault();
            //     if (valgtFilterValg) {
            //         endreFiltervalg(form, valgtFilterValg);
            //     }
            //     closeDropdown();
            // }}
        >
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
            <div
                className={
                    erNullstillFeatureTogglePa ? 'filterform__under-valg__nullstill-feature' : 'filterform__under-valg'
                }
            >
                <VelgLukkKnapp
                    harValg={valgtFilterValg !== '' && valgtFilterValg !== null}
                    dataTestId="radio-filterform"
                />
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
