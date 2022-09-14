import React from 'react';
import {useDispatch} from 'react-redux';
import {endreFiltervalg} from '../../ducks/filtrering';
import {CHECKBOX_FILTER, fjernFerdigfilter, leggTilFerdigFilter} from './filter-utils';
import {FiltervalgModell} from '../../model-interfaces';
import {pagineringSetup} from '../../ducks/paginering';
import {MIN_ARBEIDSLISTE, NYE_BRUKERE_FOR_VEILEDER, UFORDELTE_BRUKERE} from '../filter-konstanter';
import FilterStatusMinArbeidsliste from './arbeidsliste';
import {OversiktType} from '../../ducks/ui/listevisning';
import BarInputCheckbox from '../../components/barinput/barinput-checkbox';
import {useStatusTallSelector} from '../../hooks/redux/use-statustall';
import {BarInputRadio} from '../../components/barinput/barinput-radio';
import {tekstAntallBrukere} from '../../utils/tekst-utils';
import {useFeatureSelector} from '../../hooks/redux/use-feature-selector';
import {VEDTAKSTOTTE, STILLING_FRA_NAV} from '../../konstanter';
import {Label, RadioGroup} from '@navikt/ds-react';
import './filtrering-status.css';

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
    const ercvDeltStillingFraNavFeatureTogglePa = useFeatureSelector()(STILLING_FRA_NAV);

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
                        labelTekst={'Nye brukere'}
                    />
                ) : (
                    <BarInputCheckbox
                        filterNavn="ufordeltebruker"
                        antall={statusTall.ufordelteBrukere}
                        handleChange={handleCheckboxChange}
                        checked={ferdigfilterListe.includes(UFORDELTE_BRUKERE)}
                        labelTekst={'Ufordelte brukere'}
                    />
                )}
            </div>
            <RadioGroup
                hideLegend
                legend=""
                value={ferdigfilterListe.filter(ferdigFilter => !CHECKBOX_FILTER.includes(ferdigFilter))[0] ?? ''}
            >
                <div className="forsteBarlabelIGruppe">
                    <BarInputRadio
                        filterNavn="trengerVurdering"
                        handleChange={handleRadioButtonChange}
                        antall={statusTall.trengerVurdering}
                    />
                    <BarInputRadio
                        filterNavn="erSykmeldtMedArbeidsgiver"
                        handleChange={handleRadioButtonChange}
                        antall={statusTall.erSykmeldtMedArbeidsgiver}
                    />
                    {erVedtaksStotteFeatureTogglePa && (
                        <BarInputRadio
                            filterNavn="underVurdering"
                            handleChange={handleRadioButtonChange}
                            antall={statusTall.underVurdering}
                        />
                    )}
                </div>
                <div className="forsteBarlabelIGruppe">
                    <BarInputRadio
                        filterNavn="venterPaSvarFraNAV"
                        antall={statusTall.venterPaSvarFraNAV}
                        handleChange={handleRadioButtonChange}
                    />
                    <BarInputRadio
                        filterNavn="venterPaSvarFraBruker"
                        antall={statusTall.venterPaSvarFraBruker}
                        handleChange={handleRadioButtonChange}
                    />
                    <BarInputRadio
                        filterNavn="avtaltMoteMedNav"
                        handleChange={handleRadioButtonChange}
                        antall={statusTall.moterMedNAVIdag}
                    />
                    {ercvDeltStillingFraNavFeatureTogglePa && (
                        <BarInputRadio
                            filterNavn="cvDeltStillingFraNav"
                            handleChange={handleRadioButtonChange}
                            antall={statusTall.cvDeltStillingFraNav}
                        />
                    )}
                </div>
                <div className="forsteBarlabelIGruppe">
                    <BarInputRadio
                        filterNavn="utlopteAktiviteter"
                        antall={statusTall.utlopteAktiviteter}
                        handleChange={handleRadioButtonChange}
                    />
                    <BarInputRadio
                        filterNavn="ikkeIavtaltAktivitet"
                        antall={statusTall.ikkeIavtaltAktivitet}
                        handleChange={handleRadioButtonChange}
                    />
                    <BarInputRadio
                        filterNavn="iavtaltAktivitet"
                        antall={statusTall.iavtaltAktivitet}
                        handleChange={handleRadioButtonChange}
                    />
                </div>
                <div className="forsteBarlabelIGruppe">
                    <BarInputRadio
                        filterNavn="inaktiveBrukere"
                        handleChange={handleRadioButtonChange}
                        antall={statusTall.inaktiveBrukere}
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
            </RadioGroup>
        </div>
    );
}
