import React from 'react';
import {useDispatch} from 'react-redux';
import {endreFiltervalg} from '../../ducks/filtrering';
import {fjernFerdigfilter, leggTilFerdigFilter} from './filter-utils';
import {FiltervalgModell} from '../../model-interfaces';
import {pagineringSetup} from '../../ducks/paginering';
import {
    ALLE_MOTER_IDAG,
    ER_SYKMELDT_MED_ARBEIDSGIVER,
    I_AKTIVITET,
    I_AVTALT_AKTIVITET,
    IKKE_I_AVTALT_AKTIVITET,
    INAKTIVE_BRUKERE,
    MIN_ARBEIDSLISTE,
    MOTER_IDAG,
    NYE_BRUKERE_FOR_VEILEDER,
    TRENGER_VURDERING,
    UFORDELTE_BRUKERE,
    UNDER_VURDERING,
    UTLOPTE_AKTIVITETER,
    VENTER_PA_SVAR_FRA_BRUKER,
    VENTER_PA_SVAR_FRA_NAV
} from '../filter-konstanter';
import FilterStatusMinArbeidsliste from './arbeidsliste';
import {OversiktType} from '../../ducks/ui/listevisning';
import BarInputCheckbox from '../../components/barinput/barinput-checkbox';
import {useStatusTallSelector} from '../../hooks/redux/use-statustall';
import {BarInputRadio} from '../../components/barinput/barinput-radio';
import {tekstAntallBrukere} from '../../utils/tekst-utils';
import {useFeatureSelector} from '../../hooks/redux/use-feature-selector';
import {IKKE_AVTALT, VEDTAKSTOTTE} from '../../konstanter';
import {Label} from '@navikt/ds-react';
import './filtrering-status.less';

interface FiltreringStatusProps {
    filtervalg: FiltervalgModell;
    oversiktType: OversiktType;
}

export function FiltreringStatus(props: FiltreringStatusProps) {
    const ferdigfilterListe = props.filtervalg.ferdigfilterListe;
    const kategoriliste = props.filtervalg.arbeidslisteKategori;
    const dispatch = useDispatch();

    function dispatchFiltreringStatusChanged(ferdigFilterListe) {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg('ferdigfilterListe', ferdigFilterListe, props.oversiktType));
    }

    function dispatchArbeidslisteKategoriChange(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(pagineringSetup({side: 1}));
        const nyeFerdigfilterListe = e.target.checked
            ? [...kategoriliste, e.target.value]
            : kategoriliste.filter(elem => elem !== e.target.value);
        dispatch(endreFiltervalg('arbeidslisteKategori', nyeFerdigfilterListe, props.oversiktType));
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
        if (e.target.value !== 'MIN_ARBEIDSLISTE') {
            dispatch(endreFiltervalg('arbeidslisteKategori', [], props.oversiktType));
        }
    }

    const statusTall = useStatusTallSelector();
    const erVedtaksStotteFeatureTogglePa = useFeatureSelector()(VEDTAKSTOTTE);
    const erIkkeAvtalteAktiviteterFeatureTogglePa = useFeatureSelector()(IKKE_AVTALT);

    return (
        <div className="filtrering-oversikt panel">
            <Label className="filtrering-oversikt__totalt-antall">{tekstAntallBrukere(statusTall.totalt)}</Label>
            <div className="filter-checkboks-container">
                {props.oversiktType === OversiktType.minOversikt ? (
                    <BarInputCheckbox
                        filterNavn="nyeBrukere"
                        antall={statusTall.nyeBrukereForVeileder}
                        handleChange={handleCheckboxChange}
                        checked={ferdigfilterListe.includes(NYE_BRUKERE_FOR_VEILEDER)}
                    />
                ) : (
                    <BarInputCheckbox
                        filterNavn="ufordeltebruker"
                        antall={statusTall.ufordelteBrukere}
                        handleChange={handleCheckboxChange}
                        checked={ferdigfilterListe.includes(UFORDELTE_BRUKERE)}
                    />
                )}
            </div>
            <div className="forsteBarlabelIGruppe">
                <BarInputRadio
                    filterNavn="trengerVurdering"
                    handleChange={handleRadioButtonChange}
                    checked={ferdigfilterListe.includes(TRENGER_VURDERING)}
                    antall={statusTall.trengerVurdering}
                />
                <BarInputRadio
                    filterNavn="erSykmeldtMedArbeidsgiver"
                    handleChange={handleRadioButtonChange}
                    checked={ferdigfilterListe.includes(ER_SYKMELDT_MED_ARBEIDSGIVER)}
                    antall={statusTall.erSykmeldtMedArbeidsgiver}
                />
                {erVedtaksStotteFeatureTogglePa && (
                    <BarInputRadio
                        filterNavn="underVurdering"
                        handleChange={handleRadioButtonChange}
                        checked={ferdigfilterListe.includes(UNDER_VURDERING)}
                        antall={statusTall.underVurdering}
                    />
                )}
            </div>
            <div className="forsteBarlabelIGruppe">
                <BarInputRadio
                    filterNavn="venterPaSvarFraNAV"
                    antall={statusTall.venterPaSvarFraNAV}
                    handleChange={handleRadioButtonChange}
                    checked={ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV)}
                />
                <BarInputRadio
                    filterNavn="venterPaSvarFraBruker"
                    antall={statusTall.venterPaSvarFraBruker}
                    handleChange={handleRadioButtonChange}
                    checked={ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_BRUKER)}
                />
                {erIkkeAvtalteAktiviteterFeatureTogglePa && (
                    <BarInputRadio
                        filterNavn="alleMoterMedNav"
                        handleChange={handleRadioButtonChange}
                        antall={statusTall.alleMoterMedNAVIdag}
                        checked={ferdigfilterListe.includes(ALLE_MOTER_IDAG)}
                    />
                )}
                {!erIkkeAvtalteAktiviteterFeatureTogglePa && (
                    <BarInputRadio
                        filterNavn="avtaltMoteMedNav"
                        handleChange={handleRadioButtonChange}
                        antall={statusTall.moterMedNAVIdag}
                        checked={ferdigfilterListe.includes(MOTER_IDAG)}
                    />
                )}
            </div>
            <div className="forsteBarlabelIGruppe">
                <BarInputRadio
                    filterNavn="utlopteAktiviteter"
                    antall={statusTall.utlopteAktiviteter}
                    handleChange={handleRadioButtonChange}
                    checked={ferdigfilterListe.includes(UTLOPTE_AKTIVITETER)}
                />
                <BarInputRadio
                    filterNavn="ikkeIavtaltAktivitet"
                    antall={statusTall.ikkeIavtaltAktivitet}
                    handleChange={handleRadioButtonChange}
                    checked={ferdigfilterListe.includes(IKKE_I_AVTALT_AKTIVITET)}
                />
                <BarInputRadio
                    filterNavn="iavtaltAktivitet"
                    antall={statusTall.iavtaltAktivitet}
                    handleChange={handleRadioButtonChange}
                    checked={ferdigfilterListe.includes(I_AVTALT_AKTIVITET)}
                />
                {erVedtaksStotteFeatureTogglePa && (
                    <BarInputRadio
                        filterNavn="iAktivitet"
                        antall={statusTall.iAktivitet}
                        handleChange={handleRadioButtonChange}
                        checked={ferdigfilterListe.includes(I_AKTIVITET)}
                    />
                )}
            </div>
            <div className="forsteBarlabelIGruppe">
                <BarInputRadio
                    filterNavn="inaktiveBrukere"
                    handleChange={handleRadioButtonChange}
                    antall={statusTall.inaktiveBrukere}
                    checked={ferdigfilterListe.includes(INAKTIVE_BRUKERE)}
                />
            </div>
            <FilterStatusMinArbeidsliste
                ferdigfilterListe={kategoriliste}
                handleChange={handleRadioButtonChange}
                handleChangeCheckbox={dispatchArbeidslisteKategoriChange}
                hidden={props.oversiktType !== OversiktType.minOversikt}
                filtervalg={props.filtervalg}
                endreFiltervalg={dispatchFiltreringStatusChanged}
                checked={ferdigfilterListe.includes(MIN_ARBEIDSLISTE)}
            />
        </div>
    );
}
