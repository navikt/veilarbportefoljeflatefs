import {Radio, RadioGroup} from '@navikt/ds-react';
import {kebabCase} from '../../../utils/utils';
import {FiltervalgModell} from '../../../typer/filtervalg-modell';
import {NullstillKnapp} from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import {OrNothing} from '../../../utils/types/types';
import {Grid} from '../../../components/grid/grid';
import './filterform.css';

interface ValgType {
    [key: string]: {label: string; className?: string};
}

interface RadioFilterformProps {
    form: string;
    endreFiltervalg: (form: string, filterVerdi: OrNothing<string>) => void;
    valg: ValgType;
    filtervalg: FiltervalgModell;
    gridColumns?: number;
}

export function RadioFilterform({form, endreFiltervalg, valg, filtervalg, gridColumns = 1}: RadioFilterformProps) {
    const valgtFilterValg = filtervalg[form];

    const nullstillValg = () => {
        endreFiltervalg(form, null);
    };

    const onChange = e => {
        e.persist();
        endreFiltervalg(form, e.target.value);
    };

    return (
        <form className="skjema radio-filterform" data-testid="radio-filterform">
            <RadioGroup hideLegend legend="" value={valgtFilterValg} size="small">
                <Grid columns={gridColumns} className="radio-filterform__valg">
                    {Object.keys(valg).map(key => (
                        <Radio
                            key={key}
                            value={key}
                            name={valg[key].label}
                            className={valg[key].className}
                            onChange={v => onChange(v)}
                            data-testid={`radio-valg_${kebabCase(valg[key].label)}`}
                        >
                            {valg[key].label}
                        </Radio>
                    ))}
                </Grid>
            </RadioGroup>
            <NullstillKnapp
                dataTestId="radio-filterform"
                nullstillValg={nullstillValg}
                form={form}
                disabled={valgtFilterValg === '' || valgtFilterValg === null}
            />
        </form>
    );
}
