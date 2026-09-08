import {Radio, RadioGroup, Stack} from '@navikt/ds-react';
import {FiltervalgModell} from '../../../typer/filtervalg-modell';
import {NullstillKnapp} from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import {OrNothing} from '../../../utils/types/types';
import './filterform.css';
import {kebabCase} from '../../../utils/utils';

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
        e.persist();
        endreFiltervalg(form, e.target.value);
    };

    return (
        <form className="skjema radio-filterform" data-testid="radio-filterform">
            <RadioGroup hideLegend legend="" value={valgtFilterValg} size="small">
                <Stack gap="space-0 space-24" direction={{xs: 'column', sm: 'row'}} wrap={true}>
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
                </Stack>
            </RadioGroup>
            <NullstillKnapp
                dataTestId="radio-filterform"
                nullstillValg={nullstillValg}
                disabled={valgtFilterValg === '' || valgtFilterValg === null}
            />
        </form>
    );
}
