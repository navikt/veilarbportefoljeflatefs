import {ChangeEvent} from 'react';
import {Radio, RadioGroup} from '@navikt/ds-react';
import {Filtervalg, FiltervalgModell} from '../../../typer/filtervalg-modell';
import {NullstillKnapp} from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import {OrNothing} from '../../../utils/types/types';
import {Grid} from '../../../components/grid/grid';
import {
    AAPFilterArena,
    AAPFilterArenaBegge,
    aapIArenaFilterBeggeAlternativ,
    tiltakspengerFilterArena,
    TiltakspengerFilterArena,
    YTELSE_ARENA_DAGPENGER,
    YTELSE_ARENA_DAGPENGER_LONNSGARANTIMIDLER,
    YTELSE_ARENA_DAGPENGER_ORDINARE,
    YTELSE_ARENA_DAGPENGER_PERMITTERING,
    YTELSE_ARENA_DAGPENGER_PERMITTERING_FISKEINDUSTRI,
    ytelseArena
} from '../../filter-konstanter';
import './filterform.css';

interface RadioFilterformProps {
    endreFiltervalg: (form: string, filterVerdi: OrNothing<string> | string[]) => void;
    filtervalg: FiltervalgModell;
    gridColumns?: number;
}

export function YtelserMedNyttAapArenaFilterRadioFilterform({
    endreFiltervalg,
    filtervalg,
    gridColumns = 1
}: RadioFilterformProps) {
    type Arenaytelsesfilter = Filtervalg.ytelse | Filtervalg.ytelseAapArena | Filtervalg.ytelseTiltakspengerArena;

    const valgtFiltervalg = () => {
        if (filtervalg.ytelse != null) {
            return filtervalg.ytelse;
        }
        if (filtervalg.ytelseAapArena.length === 1) {
            return filtervalg.ytelseAapArena[0];
        }
        if (filtervalg.ytelseAapArena.length === 2) {
            return AAPFilterArenaBegge.HAR_ORDINAR_ELLER_UNNTAK;
        }
        if (filtervalg.ytelseTiltakspengerArena.length === 1) {
            return filtervalg.ytelseAapArena[0];
        }
        return '';
    };

    const nullstillValg = () => {
        endreFiltervalg(Filtervalg.ytelse, null);
        endreFiltervalg(Filtervalg.ytelseAapArena, []);
        endreFiltervalg(Filtervalg.ytelseTiltakspengerArena, []);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>, filter: Arenaytelsesfilter) => {
        e.persist();

        switch (filter) {
            case Filtervalg.ytelse: {
                endreFiltervalg(Filtervalg.ytelseAapArena, []);
                endreFiltervalg(Filtervalg.ytelseTiltakspengerArena, []);
                endreFiltervalg(Filtervalg.ytelse, e.target.value);
                return;
            }
            case Filtervalg.ytelseAapArena: {
                if (e.target.value === AAPFilterArenaBegge.HAR_ORDINAR_ELLER_UNNTAK) {
                    endreFiltervalg(Filtervalg.ytelse, null);
                    endreFiltervalg(Filtervalg.ytelseTiltakspengerArena, []);
                    endreFiltervalg(Filtervalg.ytelseAapArena, [
                        AAPFilterArena.HAR_AAP_ORDINAR_I_ARENA,
                        AAPFilterArena.HAR_AAP_UNNTAK_I_ARENA
                    ]);
                } else {
                    endreFiltervalg(Filtervalg.ytelse, null);
                    endreFiltervalg(Filtervalg.ytelseTiltakspengerArena, []);
                    endreFiltervalg(Filtervalg.ytelseAapArena, [e.target.value]);
                }
                return;
            }
            case Filtervalg.ytelseTiltakspengerArena: {
                endreFiltervalg(Filtervalg.ytelse, null);
                endreFiltervalg(Filtervalg.ytelseAapArena, []);
                endreFiltervalg(Filtervalg.ytelseTiltakspengerArena, [e.target.value]);
                return;
            }
            default:
                throw new Error('Ugyldig verdi for filter i onChange i radio-filterform for ytelser');
        }
    };

    return (
        <form className="skjema radio-filterform" data-testid="radio-filterform">
            <RadioGroup hideLegend legend="" value={valgtFiltervalg()} size="small">
                <Grid columns={gridColumns} className="radio-filterform__valg">
                    <Radio
                        value={YTELSE_ARENA_DAGPENGER}
                        name={ytelseArena[YTELSE_ARENA_DAGPENGER].label}
                        onChange={v => onChange(v, Filtervalg.ytelse)}
                    >
                        {ytelseArena[YTELSE_ARENA_DAGPENGER].label}
                    </Radio>
                    <Radio
                        value={YTELSE_ARENA_DAGPENGER_ORDINARE}
                        name={ytelseArena[YTELSE_ARENA_DAGPENGER_ORDINARE].label}
                        className={ytelseArena[YTELSE_ARENA_DAGPENGER_ORDINARE].className}
                        onChange={v => onChange(v, Filtervalg.ytelse)}
                    >
                        {ytelseArena[YTELSE_ARENA_DAGPENGER_ORDINARE].label}
                    </Radio>
                    <Radio
                        value={YTELSE_ARENA_DAGPENGER_PERMITTERING}
                        name={ytelseArena[YTELSE_ARENA_DAGPENGER_PERMITTERING].label}
                        className={ytelseArena[YTELSE_ARENA_DAGPENGER_PERMITTERING].className}
                        onChange={v => onChange(v, Filtervalg.ytelse)}
                    >
                        {ytelseArena[YTELSE_ARENA_DAGPENGER_PERMITTERING].label}
                    </Radio>
                    <Radio
                        value={YTELSE_ARENA_DAGPENGER_PERMITTERING_FISKEINDUSTRI}
                        name={ytelseArena[YTELSE_ARENA_DAGPENGER_PERMITTERING_FISKEINDUSTRI].label}
                        className={ytelseArena[YTELSE_ARENA_DAGPENGER_PERMITTERING_FISKEINDUSTRI].className}
                        onChange={v => onChange(v, Filtervalg.ytelse)}
                    >
                        {ytelseArena[YTELSE_ARENA_DAGPENGER_PERMITTERING_FISKEINDUSTRI].label}
                    </Radio>
                    <Radio
                        value={YTELSE_ARENA_DAGPENGER_LONNSGARANTIMIDLER}
                        name={ytelseArena[YTELSE_ARENA_DAGPENGER_LONNSGARANTIMIDLER].label}
                        className={ytelseArena[YTELSE_ARENA_DAGPENGER_LONNSGARANTIMIDLER].className}
                        onChange={v => onChange(v, Filtervalg.ytelse)}
                    >
                        {ytelseArena[YTELSE_ARENA_DAGPENGER_LONNSGARANTIMIDLER].label}
                    </Radio>
                    <Radio
                        value={AAPFilterArenaBegge.HAR_ORDINAR_ELLER_UNNTAK}
                        name={aapIArenaFilterBeggeAlternativ[AAPFilterArenaBegge.HAR_ORDINAR_ELLER_UNNTAK].label}
                        onChange={v => onChange(v, Filtervalg.ytelseAapArena)}
                    >
                        {aapIArenaFilterBeggeAlternativ[AAPFilterArenaBegge.HAR_ORDINAR_ELLER_UNNTAK].label}
                    </Radio>
                    <Radio
                        value={AAPFilterArena.HAR_AAP_ORDINAR_I_ARENA}
                        name={aapIArenaFilterBeggeAlternativ[AAPFilterArena.HAR_AAP_ORDINAR_I_ARENA].label}
                        className={aapIArenaFilterBeggeAlternativ[AAPFilterArena.HAR_AAP_ORDINAR_I_ARENA].className}
                        onChange={v => onChange(v, Filtervalg.ytelseAapArena)}
                    >
                        {aapIArenaFilterBeggeAlternativ[AAPFilterArena.HAR_AAP_ORDINAR_I_ARENA].label}
                    </Radio>
                    <Radio
                        value={AAPFilterArena.HAR_AAP_UNNTAK_I_ARENA}
                        name={aapIArenaFilterBeggeAlternativ[AAPFilterArena.HAR_AAP_UNNTAK_I_ARENA].label}
                        className={aapIArenaFilterBeggeAlternativ[AAPFilterArena.HAR_AAP_UNNTAK_I_ARENA].className}
                        onChange={v => onChange(v, Filtervalg.ytelseAapArena)}
                    >
                        {aapIArenaFilterBeggeAlternativ[AAPFilterArena.HAR_AAP_UNNTAK_I_ARENA].label}
                    </Radio>
                    <Radio
                        value={TiltakspengerFilterArena.HAR_TILTAKSPENGER}
                        name={tiltakspengerFilterArena[TiltakspengerFilterArena.HAR_TILTAKSPENGER].label}
                        onChange={v => onChange(v, Filtervalg.ytelseTiltakspengerArena)}
                    >
                        {tiltakspengerFilterArena[TiltakspengerFilterArena.HAR_TILTAKSPENGER].label}
                    </Radio>
                </Grid>
            </RadioGroup>
            <NullstillKnapp
                dataTestId="radio-filterform"
                nullstillValg={nullstillValg}
                form={[Filtervalg.ytelse, Filtervalg.ytelseAapArena, Filtervalg.ytelseTiltakspengerArena]}
                disabled={valgtFiltervalg() === ''}
            />
        </form>
    );
}
