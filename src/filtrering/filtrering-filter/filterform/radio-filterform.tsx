import React from 'react';
import './filterform.less';
import {kebabCase} from '../../../utils/utils';
import {FiltervalgModell} from '../../../model-interfaces';
import NullstillKnapp from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import {Radio, RadioGroup} from '@navikt/ds-react';
import Grid from '../../../components/grid/grid';

interface ValgType {
    [key: string]: {label: string; className?: string};
}

interface RadioFilterformProps {
    form: string;
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    valg: ValgType;
    filtervalg: FiltervalgModell;
    gridColumns?: number;
}
export function RadioFilterform({form, endreFiltervalg, valg, filtervalg, gridColumns = 1}: RadioFilterformProps) {
    const valgtFilterValg = filtervalg[form];

    const nullstillValg = () => {
        endreFiltervalg(form, []);
    };

    const onChange = e => {
        e.persist();
        endreFiltervalg(form, [e.target.value]);
    };

    return (
        <form className="skjema radio-filterform" data-testid="radio-filterform">
            <RadioGroup className="radio-filterform__valg" legend="" hideLegend>
                <Grid columns={gridColumns}>
                    {Object.keys(valg).map(filterKey => (
                        <>
                            {console.log(valgtFilterValg)}
                            {/*{console.log(valgtFilterValg?.includes(filterKey))}*/}
                            {console.log(valgtFilterValg?.includes(filterKey))}
                            <Radio
                                key={filterKey}
                                value={filterKey}
                                name={valg[filterKey].label}
                                className={valg[filterKey].className}
                                checked={valgtFilterValg?.includes(filterKey)}
                                onChange={e => onChange(e)}
                                data-testid={`radio-valg_${kebabCase(valg[filterKey].label)}`}
                            >
                                {valg[filterKey].label}{' '}
                            </Radio>
                        </>
                    ))}
                </Grid>
            </RadioGroup>
            <NullstillKnapp
                dataTestId="radio-filterform"
                nullstillValg={nullstillValg}
                form={form}
                disabled={valgtFilterValg.length <= 0}
            />
        </form>
    );
}
