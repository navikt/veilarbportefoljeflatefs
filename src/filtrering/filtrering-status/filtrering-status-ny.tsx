import {useDispatch} from "react-redux";
import {endreFiltervalg} from "../../ducks/filtrering";
import React from "react";
import {fjernFerdigfilter, leggTilFerdigFilter} from "./filter-utils";
import {FiltreringStatusProps} from "./filtrering-status";
import {useStatusTallSelector} from "../../hooks/redux/use-statustall";
import {
    ER_SYKMELDT_MED_ARBEIDSGIVER, I_AVTALT_AKTIVITET, IKKE_I_AVTALT_AKTIVITET, INAKTIVE_BRUKERE, MOTER_IDAG,
    TRENGER_VURDERING,
    UFORDELTE_BRUKERE, UTLOPTE_AKTIVITETER, VENTER_PA_SVAR_FRA_BRUKER,
    VENTER_PA_SVAR_FRA_NAV
} from "../filter-konstanter";
import {Checkbox, Radio} from "nav-frontend-skjema";
import {tekstAntallBrukere} from "../../utils/tekst-utils";
import Grid from "../../components/grid/grid";

export function FiltreringStatusNy (props: FiltreringStatusProps) {
    const ferdigfilterListe = props.filtervalg.ferdigfilterListe!;
    const dispatch = useDispatch();

    const statusTall = useStatusTallSelector();
    const brukereTekst = tekstAntallBrukere(statusTall.totalt);

    function dispatchFiltreringStatusChanged(ferdigFilterListe) {
        dispatch(endreFiltervalg(
            'ferdigfilterListe', ferdigFilterListe, props.filtergruppe, props.veileder));
    }

    function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
        const nyeFerdigfilterListe = e.target.checked
            ? leggTilFerdigFilter(ferdigfilterListe!, e.target.value)
            : fjernFerdigfilter(ferdigfilterListe!, e.target.value);
        dispatchFiltreringStatusChanged(nyeFerdigfilterListe);

    }

    function handleRadioButtonChange(e: React.ChangeEvent<HTMLInputElement>) {
        const nyeFerdigfilterListe = leggTilFerdigFilter(ferdigfilterListe!, e.target.value);
        dispatchFiltreringStatusChanged(nyeFerdigfilterListe);
    }

    return (
        <div className="filtrering-oversikt panel">
            <Checkbox
                className="ufordeltebrukere"
                label={<StatusLabel antall={statusTall.ufordelteBrukere} labelNavn="Ufordelte brukere"/>}
                onChange={handleCheckboxChange}
                value={UFORDELTE_BRUKERE}
                checked={ferdigfilterListe.includes(UFORDELTE_BRUKERE)}
            />
            <Grid columns={3}>
                <div className="filtrering-oversikt__kolonne">
                    <Radio
                        label={<StatusLabel antall={statusTall.trengerVurdering} labelNavn="Trenger vurdering"/>}
                        onChange={handleRadioButtonChange}
                        value={TRENGER_VURDERING}
                        name="Trenger vurdering"
                        checked={ferdigfilterListe.includes(TRENGER_VURDERING)}
                    />
                    <Radio
                        label={<StatusLabel antall={statusTall.erSykmeldtMedArbeidsgiver} labelNavn="Sykmeldt med arbeidsgiver"/>}
                        onChange={handleRadioButtonChange}
                        value={ER_SYKMELDT_MED_ARBEIDSGIVER}
                        name="Sykmeldt med arbeidsgiver"
                        checked={ferdigfilterListe.includes(ER_SYKMELDT_MED_ARBEIDSGIVER)}
                    />
                    <Radio
                        label={<StatusLabel labelNavn="Ikke servicebehov" antall={statusTall.inaktiveBrukere}/>}
                        onChange={handleRadioButtonChange}
                        value={INAKTIVE_BRUKERE}
                        name="Ikke servicebehov"
                        checked={ferdigfilterListe.includes(INAKTIVE_BRUKERE)}
                    />
                </div>
                <div className="filtrering-oversikt__kolonne">
                    <Radio
                        label={<StatusLabel antall={statusTall.venterPaSvarFraNAV} labelNavn="Venter på svar fra NAV"/>}
                        onChange={handleRadioButtonChange}
                        value={VENTER_PA_SVAR_FRA_NAV}
                        name="Venter på svar fra NAV"
                        checked={ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV)}
                    />
                    <Radio
                        label={<StatusLabel antall={statusTall.venterPaSvarFraBruker} labelNavn="Venter på svar fra bruker"/>}
                        onChange={handleRadioButtonChange}
                        value={VENTER_PA_SVAR_FRA_BRUKER}
                        name="Venter på svar fra bruker"
                        checked={ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_BRUKER)}
                    />
                    <Radio
                        label={<StatusLabel antall={statusTall.moterMedNAVIdag} labelNavn="Møte med NAV idag"/>}
                        onChange={handleRadioButtonChange}
                        value={MOTER_IDAG}
                        name="Møte med NAV idag"
                        checked={ferdigfilterListe.includes(MOTER_IDAG)}
                    />
                </div>
                <div>
                    <Radio
                        label={<StatusLabel labelNavn="I avtalt aktivitet" antall={statusTall.iavtaltAktivitet}/>}
                        onChange={handleRadioButtonChange}
                        value={I_AVTALT_AKTIVITET}
                        name="I avtalt aktivitet"
                        checked={ferdigfilterListe.includes(I_AVTALT_AKTIVITET)}
                    />
                    <Radio
                        label={<StatusLabel labelNavn="Utløpte aktiviteter" antall={statusTall.utlopteAktiviteter}/>}
                        onChange={handleRadioButtonChange}
                        value={UTLOPTE_AKTIVITETER}
                        name="Utløpte aktiviteter"
                        checked={ferdigfilterListe.includes(UTLOPTE_AKTIVITETER)}
                    />
                    <Radio
                        label={<StatusLabel labelNavn="Ikke i avtalt aktivitet" antall={statusTall.ikkeIavtaltAktivitet}/>}
                        onChange={handleRadioButtonChange}
                        value={IKKE_I_AVTALT_AKTIVITET}
                        name="Ikke i avtalt aktivitet"
                        checked={ferdigfilterListe.includes(IKKE_I_AVTALT_AKTIVITET)}
                    />
                </div>
            </Grid>
        </div>
    );
}


function StatusLabel (props: {labelNavn: string, antall: number}) {
    return (
        <span className="skjemaelement__label__filter-status">
            {props.labelNavn}
            <span>
                {props.antall}
            </span>
        </span>
    )
}
