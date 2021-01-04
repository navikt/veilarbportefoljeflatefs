import * as React from 'react';
import {Radio} from 'nav-frontend-skjema';
import './filterform.less';
import {useEffect, useState} from 'react';
import {kebabCase} from '../../../utils/utils';
import {FiltervalgModell} from '../../../model-interfaces';
import VelgLukkKnapp from '../../../components/velg-lukk-knapp';
import NullstillValgKnapp from '../../../components/nullstill-valg-knapp/nullstill-valg-knapp';
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

function GammelRadioFilterform({form, endreFiltervalg, closeDropdown, valg, filtervalg}: RadioFilterformProps) {
    const [valgtFilterValg, setValgteFilterValg] = useState<string>(filtervalg[form]);

    useEffect(() => {
        setValgteFilterValg(filtervalg[form]);
    }, [filtervalg, form]);

    const nullstillValg = () => {
        endreFiltervalg(form, null);
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
                        data-testid={`radio-valg_${kebabCase(valg[v].label)}`}
                    />
                ))}
            </div>
            <div className='filterform__gammel'>
                <VelgLukkKnapp
                    harValg={valgtFilterValg !== '' && valgtFilterValg !== null}
                    dataTestId="radio-filterform"
                />
                <NullstillValgKnapp
                    dataTestId="radio-filterform"
                    nullstillValg={nullstillValg}
                    form={form}
                    disabled={!(valgtFilterValg !== '' && valgtFilterValg !== null)}
                />
            </div>
        </form>
    );
}

export default GammelRadioFilterform;
