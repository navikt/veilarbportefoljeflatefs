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
    dagpengerArenaFilter,
    DagpengerFilterArena,
    DagpengerFilterArenaAlle,
    tiltakspengerFilterArena,
    TiltakspengerFilterArena
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
    type Arenaytelsesfilter =
        | Filtervalg.ytelseAapArena
        | Filtervalg.ytelseTiltakspengerArena
        | Filtervalg.ytelseDagpengerArena;

    const valgtFiltervalg = () => {
        if (filtervalg.ytelseAapArena.length === 1) {
            return filtervalg.ytelseAapArena[0];
        }
        if (filtervalg.ytelseAapArena.length === 2) {
            return AAPFilterArenaBegge.HAR_ORDINAR_ELLER_UNNTAK;
        }
        if (filtervalg.ytelseTiltakspengerArena.length === 1) {
            return filtervalg.ytelseTiltakspengerArena[0];
        }
        if (filtervalg.ytelseDagpengerArena.length === 1) {
            return filtervalg.ytelseDagpengerArena[0];
        }
        if (filtervalg.ytelseDagpengerArena.length > 1) {
            return DagpengerFilterArenaAlle.HAR_DAGPENGER_ARENA;
        }
        return '';
    };

    const nullstillValg = () => {
        endreFiltervalg(Filtervalg.ytelseAapArena, []);
        endreFiltervalg(Filtervalg.ytelseTiltakspengerArena, []);
        endreFiltervalg(Filtervalg.ytelseDagpengerArena, []);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>, filter: Arenaytelsesfilter) => {
        e.persist();

        switch (filter) {
            case Filtervalg.ytelseAapArena: {
                if (e.target.value === AAPFilterArenaBegge.HAR_ORDINAR_ELLER_UNNTAK) {
                    endreFiltervalg(Filtervalg.ytelseTiltakspengerArena, []);
                    endreFiltervalg(Filtervalg.ytelseDagpengerArena, []);
                    endreFiltervalg(Filtervalg.ytelseAapArena, [
                        AAPFilterArena.HAR_AAP_ORDINAR_I_ARENA,
                        AAPFilterArena.HAR_AAP_UNNTAK_I_ARENA
                    ]);
                } else {
                    endreFiltervalg(Filtervalg.ytelseTiltakspengerArena, []);
                    endreFiltervalg(Filtervalg.ytelseDagpengerArena, []);
                    endreFiltervalg(Filtervalg.ytelseAapArena, [e.target.value]);
                }
                return;
            }
            case Filtervalg.ytelseTiltakspengerArena: {
                endreFiltervalg(Filtervalg.ytelseAapArena, []);
                endreFiltervalg(Filtervalg.ytelseDagpengerArena, []);
                endreFiltervalg(Filtervalg.ytelseTiltakspengerArena, [e.target.value]);
                return;
            }
            case Filtervalg.ytelseDagpengerArena: {
                if (e.target.value === DagpengerFilterArenaAlle.HAR_DAGPENGER_ARENA) {
                    endreFiltervalg(Filtervalg.ytelseAapArena, []);
                    endreFiltervalg(Filtervalg.ytelseTiltakspengerArena, []);
                    endreFiltervalg(Filtervalg.ytelseDagpengerArena, [
                        DagpengerFilterArena.HAR_DAGPENGER_ORDINAR_ARENA,
                        DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_ARENA,
                        DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI_ARENA,
                        DagpengerFilterArena.HAR_DAGPENGER_LONNSGARANTIMIDLER_ARENA
                    ]);
                } else {
                    endreFiltervalg(Filtervalg.ytelseAapArena, []);
                    endreFiltervalg(Filtervalg.ytelseTiltakspengerArena, []);
                    endreFiltervalg(Filtervalg.ytelseDagpengerArena, [e.target.value]);
                }
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
                        value={DagpengerFilterArenaAlle.HAR_DAGPENGER_ARENA}
                        name={dagpengerArenaFilter[DagpengerFilterArenaAlle.HAR_DAGPENGER_ARENA].label}
                        onChange={v => onChange(v, Filtervalg.ytelseDagpengerArena)}
                    >
                        {dagpengerArenaFilter[DagpengerFilterArenaAlle.HAR_DAGPENGER_ARENA].label}
                    </Radio>
                    <Radio
                        value={DagpengerFilterArena.HAR_DAGPENGER_ORDINAR_ARENA}
                        name={dagpengerArenaFilter[DagpengerFilterArena.HAR_DAGPENGER_ORDINAR_ARENA].label}
                        className={dagpengerArenaFilter[DagpengerFilterArena.HAR_DAGPENGER_ORDINAR_ARENA].className}
                        onChange={v => onChange(v, Filtervalg.ytelseDagpengerArena)}
                    >
                        {dagpengerArenaFilter[DagpengerFilterArena.HAR_DAGPENGER_ORDINAR_ARENA].label}
                    </Radio>
                    <Radio
                        value={DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_ARENA}
                        name={dagpengerArenaFilter[DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_ARENA].label}
                        className={
                            dagpengerArenaFilter[DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_ARENA].className
                        }
                        onChange={v => onChange(v, Filtervalg.ytelseDagpengerArena)}
                    >
                        {dagpengerArenaFilter[DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_ARENA].label}
                    </Radio>
                    <Radio
                        value={DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI_ARENA}
                        name={
                            dagpengerArenaFilter[
                                DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI_ARENA
                            ].label
                        }
                        className={
                            dagpengerArenaFilter[
                                DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI_ARENA
                            ].className
                        }
                        onChange={v => onChange(v, Filtervalg.ytelseDagpengerArena)}
                    >
                        {
                            dagpengerArenaFilter[
                                DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI_ARENA
                            ].label
                        }
                    </Radio>
                    <Radio
                        value={DagpengerFilterArena.HAR_DAGPENGER_LONNSGARANTIMIDLER_ARENA}
                        name={dagpengerArenaFilter[DagpengerFilterArena.HAR_DAGPENGER_LONNSGARANTIMIDLER_ARENA].label}
                        className={
                            dagpengerArenaFilter[DagpengerFilterArena.HAR_DAGPENGER_LONNSGARANTIMIDLER_ARENA].className
                        }
                        onChange={v => onChange(v, Filtervalg.ytelseDagpengerArena)}
                    >
                        {dagpengerArenaFilter[DagpengerFilterArena.HAR_DAGPENGER_LONNSGARANTIMIDLER_ARENA].label}
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
                disabled={valgtFiltervalg() === ''}
            />
        </form>
    );
}
