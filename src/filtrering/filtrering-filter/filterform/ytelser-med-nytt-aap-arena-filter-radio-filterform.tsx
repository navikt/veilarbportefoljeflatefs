import {Radio, RadioGroup} from '@navikt/ds-react';
import {kebabCase} from '../../../utils/utils';
import {FiltervalgModell} from '../../../typer/filtervalg-modell';
import {NullstillKnapp} from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import {OrNothing} from '../../../utils/types/types';
import {Grid} from '../../../components/grid/grid';
import {
    YTELSE_ARENA_AAP,
    YTELSE_ARENA_AAP_ORDINAR,
    YTELSE_ARENA_AAP_UNNTAK,
    YTELSE_ARENA_DAGPENGER,
    YTELSE_ARENA_DAGPENGER_LONNSGARANTIMIDLER,
    YTELSE_ARENA_DAGPENGER_ORDINARE,
    YTELSE_ARENA_DAGPENGER_PERMITTERING,
    YTELSE_ARENA_DAGPENGER_PERMITTERING_FISKEINDUSTRI,
    YTELSE_ARENA_TILTAKSPENGER,
    ytelseArena
} from '../../filter-konstanter';
import {ChangeEvent} from 'react';
import './filterform.css';

interface ValgType {
    [key: string]: {label: string; className?: string};
}

interface RadioFilterformProps {
    form: string;
    endreFiltervalg: (form: string, filterVerdi: OrNothing<string> | string[]) => void;
    valg: ValgType;
    filtervalg: FiltervalgModell;
    gridColumns?: number;
}

export function YtelserMedNyttAapArenaFilterRadioFilterform({
    form,
    endreFiltervalg,
    filtervalg,
    gridColumns = 1
}: RadioFilterformProps) {
    const valgtFilterValg = filtervalg[form];

    enum Filter {
        YTELSE = 'ytelse',
        YTELSE_AAP_ARENA = 'ytelseAapArena'
    }

    const nullstillValg = () => {
        endreFiltervalg(Filter.YTELSE, null);
        endreFiltervalg(Filter.YTELSE_AAP_ARENA, []);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>, filter: Filter) => {
        e.persist();

        switch (filter) {
            case Filter.YTELSE: {
                endreFiltervalg(Filter.YTELSE, e.target.value);
                endreFiltervalg(Filter.YTELSE_AAP_ARENA, []);
                return;
            }
            case Filter.YTELSE_AAP_ARENA: {
                endreFiltervalg(Filter.YTELSE, []);
                endreFiltervalg(Filter.YTELSE_AAP_ARENA, e.target.value);
                return;
            }
            default:
                throw new Error('Ugyldig verdi for filter i onChange i radio-filterform for ytelser');
        }
    };

    // TODO ta bort bakgrunnsfargen når vi er ferdige med testing.
    return (
        <form className="skjema radio-filterform" data-testid="radio-filterform" style={{background: 'PaleGoldenrod'}}>
            <RadioGroup hideLegend legend="" value={valgtFilterValg} size="small">
                <Grid columns={gridColumns} className="radio-filterform__valg">
                    <Radio
                        value={YTELSE_ARENA_DAGPENGER}
                        name={ytelseArena[YTELSE_ARENA_DAGPENGER].label}
                        onChange={v => onChange(v, Filter.YTELSE)}
                        data-testid={`radio-valg_${kebabCase(ytelseArena[YTELSE_ARENA_DAGPENGER].label)}`}
                    >
                        {ytelseArena[YTELSE_ARENA_DAGPENGER].label}
                    </Radio>
                    <Radio
                        value={YTELSE_ARENA_DAGPENGER_ORDINARE}
                        name={ytelseArena[YTELSE_ARENA_DAGPENGER_ORDINARE].label}
                        className={ytelseArena[YTELSE_ARENA_DAGPENGER_ORDINARE].className}
                        onChange={v => onChange(v, Filter.YTELSE)}
                        data-testid={`radio-valg_${kebabCase(ytelseArena[YTELSE_ARENA_DAGPENGER_ORDINARE].label)}`}
                    >
                        {ytelseArena[YTELSE_ARENA_DAGPENGER_ORDINARE].label}
                    </Radio>
                    <Radio
                        value={YTELSE_ARENA_DAGPENGER_PERMITTERING}
                        name={ytelseArena[YTELSE_ARENA_DAGPENGER_PERMITTERING].label}
                        className={ytelseArena[YTELSE_ARENA_DAGPENGER_PERMITTERING].className}
                        onChange={v => onChange(v, Filter.YTELSE)}
                        data-testid={`radio-valg_${kebabCase(ytelseArena[YTELSE_ARENA_DAGPENGER_PERMITTERING].label)}`}
                    >
                        {ytelseArena[YTELSE_ARENA_DAGPENGER_PERMITTERING].label}
                    </Radio>
                    <Radio
                        value={YTELSE_ARENA_DAGPENGER_PERMITTERING_FISKEINDUSTRI}
                        name={ytelseArena[YTELSE_ARENA_DAGPENGER_PERMITTERING_FISKEINDUSTRI].label}
                        className={ytelseArena[YTELSE_ARENA_DAGPENGER_PERMITTERING_FISKEINDUSTRI].className}
                        onChange={v => onChange(v, Filter.YTELSE)}
                        data-testid={`radio-valg_${kebabCase(ytelseArena[YTELSE_ARENA_DAGPENGER_PERMITTERING_FISKEINDUSTRI].label)}`}
                    >
                        {ytelseArena[YTELSE_ARENA_DAGPENGER_PERMITTERING_FISKEINDUSTRI].label}
                    </Radio>
                    <Radio
                        value={YTELSE_ARENA_DAGPENGER_LONNSGARANTIMIDLER}
                        name={ytelseArena[YTELSE_ARENA_DAGPENGER_LONNSGARANTIMIDLER].label}
                        className={ytelseArena[YTELSE_ARENA_DAGPENGER_LONNSGARANTIMIDLER].className}
                        onChange={v => onChange(v, Filter.YTELSE)}
                        data-testid={`radio-valg_${kebabCase(ytelseArena[YTELSE_ARENA_DAGPENGER_LONNSGARANTIMIDLER].label)}`}
                    >
                        {ytelseArena[YTELSE_ARENA_DAGPENGER_LONNSGARANTIMIDLER].label}
                    </Radio>
                    <Radio
                        value={YTELSE_ARENA_AAP}
                        name={ytelseArena[YTELSE_ARENA_AAP].label}
                        onChange={v => onChange(v, Filter.YTELSE)}
                        data-testid={`radio-valg_${kebabCase(ytelseArena[YTELSE_ARENA_AAP].label)}`}
                    >
                        {ytelseArena[YTELSE_ARENA_AAP].label}
                    </Radio>
                    <Radio
                        value={YTELSE_ARENA_AAP_ORDINAR}
                        name={ytelseArena[YTELSE_ARENA_AAP_ORDINAR].label}
                        className={ytelseArena[YTELSE_ARENA_AAP_ORDINAR].className}
                        onChange={v => onChange(v, Filter.YTELSE)}
                        data-testid={`radio-valg_${kebabCase(ytelseArena[YTELSE_ARENA_AAP_ORDINAR].label)}`}
                    >
                        {ytelseArena[YTELSE_ARENA_AAP_ORDINAR].label}
                    </Radio>
                    <Radio
                        value={YTELSE_ARENA_AAP_UNNTAK}
                        name={ytelseArena[YTELSE_ARENA_AAP_UNNTAK].label}
                        className={ytelseArena[YTELSE_ARENA_AAP_UNNTAK].className}
                        onChange={v => onChange(v, Filter.YTELSE)}
                        data-testid={`radio-valg_${kebabCase(ytelseArena[YTELSE_ARENA_AAP_UNNTAK].label)}`}
                    >
                        {ytelseArena[YTELSE_ARENA_AAP_UNNTAK].label}
                    </Radio>
                    <Radio
                        value={YTELSE_ARENA_TILTAKSPENGER}
                        name={ytelseArena[YTELSE_ARENA_TILTAKSPENGER].label}
                        onChange={v => onChange(v, Filter.YTELSE)}
                        data-testid={`radio-valg_${kebabCase(ytelseArena[YTELSE_ARENA_TILTAKSPENGER].label)}`}
                    >
                        {ytelseArena[YTELSE_ARENA_TILTAKSPENGER].label}
                    </Radio>
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
