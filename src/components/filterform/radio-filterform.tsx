import React, {useState} from 'react';
import classNames from 'classnames';
import {Radio} from 'nav-frontend-skjema';
import './filterform.less';
import {FiltervalgModell} from '../../model-interfaces';
import VelgLukkKnapp from '../velg-lukk-knapp';
import NullstillValgKnapp from '../nullstill-valg-knapp';

interface ValgType {
    [key: string]: {label: string; className?: string};
}

interface RadioFilterformProps {
    form: string;
    endreFiltervalg: (form: string, filterVerdi: string) => void;
    closeDropdown: () => void;
    valg: ValgType;
    filtervalg: FiltervalgModell;
}

export function RadioFilterform({form, endreFiltervalg, closeDropdown, valg, filtervalg}: RadioFilterformProps) {
    const [valgtFilterValg, setValgteFilterValg] = useState<string>(filtervalg[form]);

    const nullstillValg = () => {
        setValgteFilterValg('');
        endreFiltervalg(form, '');
    };

    let reactKey = 1;
    return (
        <form
            className="skjema radio-filterform"
            onSubmit={e => {
                e.preventDefault();
                if (valgtFilterValg) {
                    endreFiltervalg(form, valgtFilterValg);
                }
                closeDropdown();
            }}
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
                        onChange={e => setValgteFilterValg(e.target.value)}
                    />
                ))}
            </div>
            <div className="filterform__under-valg">
                <VelgLukkKnapp harValg={valgtFilterValg !== null} dataTestId="radio-filterform" />
                <NullstillValgKnapp dataTestId="checkbox-filterform" nullstillValg={nullstillValg} />
            </div>
        </form>
    );
}
