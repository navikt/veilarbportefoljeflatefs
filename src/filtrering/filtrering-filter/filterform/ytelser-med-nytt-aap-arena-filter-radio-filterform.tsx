import {ChangeEvent} from 'react';
import {useDispatch} from 'react-redux';
import {Radio, RadioGroup} from '@navikt/ds-react';
import {Filtervalg, FiltervalgModell} from '../../../typer/filtervalg-modell';
import {NullstillKnapp} from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import {OrNothing} from '../../../utils/types/types';
import {Grid} from '../../../components/grid/grid';
import {
    AAPFilterArena,
    AAPFilterArenaBegge,
    aapIArenaFilterBeggeAlternativ,
    dagpengerArenaFilterRadiobuttons,
    DagpengerFilterArena,
    DagpengerFilterArenaAlle,
    tiltakspengerFilterArena,
    TiltakspengerFilterArena
} from '../../filter-konstanter';
import {oppdaterKolonneAlternativer, OversiktType} from '../../../ducks/ui/listevisning';
import {pagineringSetup} from '../../../ducks/paginering';
import {endreFiltervalg} from '../../../ducks/filtrering';
import './filterform.css';

interface RadioFilterformProps {
    endreFiltervalgArvaFunksjon: (form: string, filterVerdi: OrNothing<string> | string[]) => void;
    filtervalg: FiltervalgModell;
    gridColumns?: number;
    oversiktType: OversiktType;
}

export function YtelserMedNyttAapArenaFilterRadioFilterform({
    endreFiltervalgArvaFunksjon,
    filtervalg,
    gridColumns = 1,
    oversiktType
}: RadioFilterformProps) {
    const dispatch = useDispatch();

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
        endreFiltervalgArvaFunksjon(Filtervalg.ytelseAapArena, []);
        endreFiltervalgArvaFunksjon(Filtervalg.ytelseTiltakspengerArena, []);
        endreFiltervalgArvaFunksjon(Filtervalg.ytelseDagpengerArena, []);
    };

    const byttTilNyttFilterOgFiksKolonnevalg = (filterId: string, filterVerdi, nyttFiltervalg: FiltervalgModell) => {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg(filterId, filterVerdi, oversiktType));
        oppdaterKolonneAlternativer(dispatch, nyttFiltervalg, oversiktType);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>, filter: Arenaytelsesfilter) => {
        e.persist();

        switch (filter) {
            case Filtervalg.ytelseAapArena: {
                const filtervalgNullstillAndreArenaytelser = {
                    ...filtervalg,
                    [Filtervalg.ytelseTiltakspengerArena]: [],
                    [Filtervalg.ytelseDagpengerArena]: []
                };

                if (e.target.value === AAPFilterArenaBegge.HAR_ORDINAR_ELLER_UNNTAK) {
                    const filterverdiAap = [
                        AAPFilterArena.HAR_AAP_ORDINAR_I_ARENA,
                        AAPFilterArena.HAR_AAP_UNNTAK_I_ARENA
                    ];
                    byttTilNyttFilterOgFiksKolonnevalg(Filtervalg.ytelseAapArena, filterverdiAap, {
                        ...filtervalgNullstillAndreArenaytelser,
                        [Filtervalg.ytelseAapArena]: filterverdiAap
                    });
                } else {
                    const filterverdiAap = [e.target.value as AAPFilterArena];
                    byttTilNyttFilterOgFiksKolonnevalg(Filtervalg.ytelseAapArena, filterverdiAap, {
                        ...filtervalgNullstillAndreArenaytelser,
                        [Filtervalg.ytelseAapArena]: filterverdiAap
                    });
                }
                // Nullstill andre ytelsesfilter
                dispatch(endreFiltervalg(Filtervalg.ytelseDagpengerArena, [], oversiktType));
                dispatch(endreFiltervalg(Filtervalg.ytelseTiltakspengerArena, [], oversiktType));
                return;
            }
            case Filtervalg.ytelseTiltakspengerArena: {
                const filtervalgNullstillAndreArenaytelser = {
                    ...filtervalg,
                    [Filtervalg.ytelseDagpengerArena]: [],
                    [Filtervalg.ytelseAapArena]: []
                };
                const filterverdiTiltakspenger: [TiltakspengerFilterArena] = [
                    e.target.value as TiltakspengerFilterArena
                ];
                byttTilNyttFilterOgFiksKolonnevalg(Filtervalg.ytelseTiltakspengerArena, filterverdiTiltakspenger, {
                    ...filtervalgNullstillAndreArenaytelser,
                    [Filtervalg.ytelseTiltakspengerArena]: filterverdiTiltakspenger
                });
                // Nullstill andre ytelsesfilter
                dispatch(endreFiltervalg(Filtervalg.ytelseDagpengerArena, [], oversiktType));
                dispatch(endreFiltervalg(Filtervalg.ytelseAapArena, [], oversiktType));
                return;
            }
            case Filtervalg.ytelseDagpengerArena: {
                const filtervalgNullstillAndreArenaytelser = {
                    ...filtervalg,
                    [Filtervalg.ytelseTiltakspengerArena]: [],
                    [Filtervalg.ytelseAapArena]: []
                };
                if (e.target.value === DagpengerFilterArenaAlle.HAR_DAGPENGER_ARENA) {
                    const filterverdiDagpenger = [
                        DagpengerFilterArena.HAR_DAGPENGER_ORDINAR_ARENA,
                        DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_ARENA,
                        DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI_ARENA,
                        DagpengerFilterArena.HAR_DAGPENGER_LONNSGARANTIMIDLER_ARENA
                    ];
                    byttTilNyttFilterOgFiksKolonnevalg(Filtervalg.ytelseDagpengerArena, filterverdiDagpenger, {
                        ...filtervalgNullstillAndreArenaytelser,
                        [Filtervalg.ytelseDagpengerArena]: filterverdiDagpenger
                    });
                } else {
                    const filterverdiDagpenger = [e.target.value as DagpengerFilterArena];

                    byttTilNyttFilterOgFiksKolonnevalg(Filtervalg.ytelseDagpengerArena, filterverdiDagpenger, {
                        ...filtervalgNullstillAndreArenaytelser,
                        [Filtervalg.ytelseDagpengerArena]: filterverdiDagpenger
                    });
                }
                // Nullstill andre ytelsesfilter
                dispatch(endreFiltervalg(Filtervalg.ytelseTiltakspengerArena, [], oversiktType));
                dispatch(endreFiltervalg(Filtervalg.ytelseAapArena, [], oversiktType));
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
                        name={dagpengerArenaFilterRadiobuttons[DagpengerFilterArenaAlle.HAR_DAGPENGER_ARENA].label}
                        onChange={v => onChange(v, Filtervalg.ytelseDagpengerArena)}
                    >
                        {dagpengerArenaFilterRadiobuttons[DagpengerFilterArenaAlle.HAR_DAGPENGER_ARENA].label}
                    </Radio>
                    <Radio
                        value={DagpengerFilterArena.HAR_DAGPENGER_ORDINAR_ARENA}
                        name={dagpengerArenaFilterRadiobuttons[DagpengerFilterArena.HAR_DAGPENGER_ORDINAR_ARENA].label}
                        className={
                            dagpengerArenaFilterRadiobuttons[DagpengerFilterArena.HAR_DAGPENGER_ORDINAR_ARENA].className
                        }
                        onChange={v => onChange(v, Filtervalg.ytelseDagpengerArena)}
                    >
                        {dagpengerArenaFilterRadiobuttons[DagpengerFilterArena.HAR_DAGPENGER_ORDINAR_ARENA].label}
                    </Radio>
                    <Radio
                        value={DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_ARENA}
                        name={
                            dagpengerArenaFilterRadiobuttons[DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_ARENA]
                                .label
                        }
                        className={
                            dagpengerArenaFilterRadiobuttons[DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_ARENA]
                                .className
                        }
                        onChange={v => onChange(v, Filtervalg.ytelseDagpengerArena)}
                    >
                        {
                            dagpengerArenaFilterRadiobuttons[DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_ARENA]
                                .label
                        }
                    </Radio>
                    <Radio
                        value={DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI_ARENA}
                        name={
                            dagpengerArenaFilterRadiobuttons[
                                DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI_ARENA
                            ].label
                        }
                        className={
                            dagpengerArenaFilterRadiobuttons[
                                DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI_ARENA
                            ].className
                        }
                        onChange={v => onChange(v, Filtervalg.ytelseDagpengerArena)}
                    >
                        {
                            dagpengerArenaFilterRadiobuttons[
                                DagpengerFilterArena.HAR_DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI_ARENA
                            ].label
                        }
                    </Radio>
                    <Radio
                        value={DagpengerFilterArena.HAR_DAGPENGER_LONNSGARANTIMIDLER_ARENA}
                        name={
                            dagpengerArenaFilterRadiobuttons[
                                DagpengerFilterArena.HAR_DAGPENGER_LONNSGARANTIMIDLER_ARENA
                            ].label
                        }
                        className={
                            dagpengerArenaFilterRadiobuttons[
                                DagpengerFilterArena.HAR_DAGPENGER_LONNSGARANTIMIDLER_ARENA
                            ].className
                        }
                        onChange={v => onChange(v, Filtervalg.ytelseDagpengerArena)}
                    >
                        {
                            dagpengerArenaFilterRadiobuttons[
                                DagpengerFilterArena.HAR_DAGPENGER_LONNSGARANTIMIDLER_ARENA
                            ].label
                        }
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
