import {Radio, RadioGroup} from '@navikt/ds-react';
import {kebabCase} from '../../../utils/utils';
import {FiltervalgModell} from '../../../typer/filtervalg-modell';
import {NullstillKnapp} from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import {OrNothing} from '../../../utils/types/types';
import {Grid} from '../../../components/grid/grid';
import {
    AAPFilterArena,
    AAPFilterArenaBegge,
    aapIArenaFilter,
    aapIArenaFilterBeggeAlternativ,
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
    enum Filter {
        YTELSE = 'ytelse',
        YTELSE_AAP_ARENA = 'ytelseAapArena'
    }

    const valgtFiltervalg = () => {
        if (filtervalg[Filter.YTELSE] != null) {
            return filtervalg[Filter.YTELSE];
        }
        if (filtervalg[Filter.YTELSE_AAP_ARENA].length === 1) {
            return filtervalg[Filter.YTELSE_AAP_ARENA][0];
        }
        if (filtervalg[Filter.YTELSE_AAP_ARENA].length === 2) {
            return AAPFilterArenaBegge.HAR_ORDINAR_ELLER_UNNTAK;
        }
        return '';
    };

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
                if (e.target.value === AAPFilterArenaBegge.HAR_ORDINAR_ELLER_UNNTAK) {
                    endreFiltervalg(Filter.YTELSE, null);
                    endreFiltervalg(Filter.YTELSE_AAP_ARENA, [
                        AAPFilterArena.HAR_AAP_ORDINAR_I_ARENA,
                        AAPFilterArena.HAR_AAP_UNNTAK_I_ARENA
                    ]);
                } else {
                    endreFiltervalg(Filter.YTELSE, null);
                    endreFiltervalg(Filter.YTELSE_AAP_ARENA, [e.target.value]);
                }
                return;
            }
            default:
                throw new Error('Ugyldig verdi for filter i onChange i radio-filterform for ytelser');
        }
    };

    // TODO ta bort bakgrunnsfargen når vi er ferdige med testing.
    return (
        <form className="skjema radio-filterform" data-testid="radio-filterform" style={{background: 'PaleGoldenrod'}}>
            <RadioGroup hideLegend legend="" value={valgtFiltervalg()} size="small">
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
                        value={AAPFilterArenaBegge.HAR_ORDINAR_ELLER_UNNTAK}
                        name={aapIArenaFilterBeggeAlternativ[AAPFilterArenaBegge.HAR_ORDINAR_ELLER_UNNTAK].label}
                        onChange={v => onChange(v, Filter.YTELSE_AAP_ARENA)}
                        data-testid={`radio-valg_${kebabCase(aapIArenaFilterBeggeAlternativ[AAPFilterArenaBegge.HAR_ORDINAR_ELLER_UNNTAK].label)}`}
                    >
                        {aapIArenaFilterBeggeAlternativ[AAPFilterArenaBegge.HAR_ORDINAR_ELLER_UNNTAK].label}
                    </Radio>
                    <Radio
                        value={AAPFilterArena.HAR_AAP_ORDINAR_I_ARENA}
                        name={aapIArenaFilter[AAPFilterArena.HAR_AAP_ORDINAR_I_ARENA].label}
                        className={aapIArenaFilter[AAPFilterArena.HAR_AAP_ORDINAR_I_ARENA].className}
                        onChange={v => onChange(v, Filter.YTELSE_AAP_ARENA)}
                        data-testid={`radio-valg_${kebabCase(aapIArenaFilter[AAPFilterArena.HAR_AAP_ORDINAR_I_ARENA].label)}`}
                    >
                        {aapIArenaFilter[AAPFilterArena.HAR_AAP_ORDINAR_I_ARENA].label}
                    </Radio>
                    <Radio
                        value={AAPFilterArena.HAR_AAP_UNNTAK_I_ARENA}
                        name={aapIArenaFilter[AAPFilterArena.HAR_AAP_UNNTAK_I_ARENA].label}
                        className={aapIArenaFilter[AAPFilterArena.HAR_AAP_UNNTAK_I_ARENA].className}
                        onChange={v => onChange(v, Filter.YTELSE_AAP_ARENA)}
                        data-testid={`radio-valg_${kebabCase(aapIArenaFilter[AAPFilterArena.HAR_AAP_UNNTAK_I_ARENA].label)}`}
                    >
                        {aapIArenaFilter[AAPFilterArena.HAR_AAP_UNNTAK_I_ARENA].label}
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
                disabled={valgtFiltervalg() === '' || valgtFiltervalg() === null}
            />
        </form>
    );
}
