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
import {tekstAntallBrukere} from "../../utils/tekst-utils";
import Grid from "../../components/grid/grid";
import {CheckBoxMedAntall} from "../components/checkbox-antall";
import {RadioMedAntall} from "../components/radio-antall";
import MetrikkEkspanderbartpanel from "../../components/toolbar/metrikk-ekspanderbartpanel";
import hiddenIf from "../../components/hidden-if/hidden-if";

function FiltreringStatusNy (props: FiltreringStatusProps) {
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
        <MetrikkEkspanderbartpanel
            apen
            tittel="Status"
            tittelProps="undertittel"
            lamellNavn="status"
        >
            <div className="filtrering-oversikt panel">
                <CheckBoxMedAntall
                    className="ufordeltebrukere"
                    labelNavn="Ufordelte brukere"
                    antall={statusTall.ufordelteBrukere}
                    onChange={handleCheckboxChange}
                    value={UFORDELTE_BRUKERE}
                    checked={ferdigfilterListe.includes(UFORDELTE_BRUKERE)}
                />
                <Grid columns={3}>
                    <div className="filtrering-oversikt__kolonne">
                        <RadioMedAntall
                            antall={statusTall.trengerVurdering}
                            labelNavn="Trenger vurdering"
                            onChange={handleRadioButtonChange}
                            value={TRENGER_VURDERING}
                            checked={ferdigfilterListe.includes(TRENGER_VURDERING)}
                        />
                        <RadioMedAntall
                            antall={statusTall.erSykmeldtMedArbeidsgiver}
                            labelNavn="Sykmeldt med arbeidsgiver"
                            onChange={handleRadioButtonChange}
                            value={ER_SYKMELDT_MED_ARBEIDSGIVER}
                            checked={ferdigfilterListe.includes(ER_SYKMELDT_MED_ARBEIDSGIVER)}
                        />
                        <RadioMedAntall
                            antall={statusTall.inaktiveBrukere}
                            onChange={handleRadioButtonChange}
                            value={INAKTIVE_BRUKERE}
                            labelNavn="Ikke servicebehov"
                            checked={ferdigfilterListe.includes(INAKTIVE_BRUKERE)}
                        />
                    </div>
                    <div className="filtrering-oversikt__kolonne">
                        <RadioMedAntall
                            antall={statusTall.venterPaSvarFraNAV}
                            labelNavn="Venter på svar fra NAV"
                            onChange={handleRadioButtonChange}
                            value={VENTER_PA_SVAR_FRA_NAV}
                            checked={ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV)}
                        />
                        <RadioMedAntall
                            antall={statusTall.venterPaSvarFraBruker}
                            labelNavn="Venter på svar fra bruker"
                            onChange={handleRadioButtonChange}
                            value={VENTER_PA_SVAR_FRA_BRUKER}
                            checked={ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_BRUKER)}
                        />
                        <RadioMedAntall
                            antall={statusTall.moterMedNAVIdag}
                            labelNavn="Møte med NAV idag"
                            onChange={handleRadioButtonChange}
                            value={MOTER_IDAG}
                            checked={ferdigfilterListe.includes(MOTER_IDAG)}
                        />
                    </div>
                    <div>
                        <RadioMedAntall
                            labelNavn="I avtalt aktivitet"
                            antall={statusTall.iavtaltAktivitet}
                            onChange={handleRadioButtonChange}
                            value={I_AVTALT_AKTIVITET}
                            checked={ferdigfilterListe.includes(I_AVTALT_AKTIVITET)}
                        />
                        <RadioMedAntall
                            labelNavn="Utløpte aktiviteter"
                            antall={statusTall.utlopteAktiviteter}
                            onChange={handleRadioButtonChange}
                            value={UTLOPTE_AKTIVITETER}
                            checked={ferdigfilterListe.includes(UTLOPTE_AKTIVITETER)}
                        />
                        <RadioMedAntall
                            labelNavn="Ikke i avtalt aktivitet"
                            antall={statusTall.ikkeIavtaltAktivitet}
                            onChange={handleRadioButtonChange}
                            value={IKKE_I_AVTALT_AKTIVITET}
                            checked={ferdigfilterListe.includes(IKKE_I_AVTALT_AKTIVITET)}
                        />
                    </div>
                </Grid>
            </div>
        </MetrikkEkspanderbartpanel>
    );
}

export default hiddenIf(FiltreringStatusNy);
