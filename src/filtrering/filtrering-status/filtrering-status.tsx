import React from 'react';
import {useDispatch} from 'react-redux';
import {endreFiltervalg} from '../../ducks/filtrering';
import {fjernFerdigfilter, leggTilFerdigFilter} from './filter-utils';
import {FiltervalgModell} from '../../model-interfaces';
import {pagineringSetup} from '../../ducks/paginering';
import {
    ER_SYKMELDT_MED_ARBEIDSGIVER,
    I_AVTALT_AKTIVITET,
    IKKE_I_AVTALT_AKTIVITET,
    INAKTIVE_BRUKERE,
    mapFilternavnTilFilterValue,
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
import {VEDTAKSTOTTE} from '../../konstanter';
import {Label, RadioGroup} from '@navikt/ds-react';
import './filtrering-status.less';
import {Radio, RadioGruppe} from 'nav-frontend-skjema';

interface FiltreringStatusProps {
    filtervalg: FiltervalgModell;
    oversiktType: OversiktType;
}

export function FiltreringStatus(props: FiltreringStatusProps) {
    const ferdigfilterListe = props.filtervalg.ferdigfilterListe;
    const kategoriliste = props.filtervalg.arbeidslisteKategori;
    const statusTall = useStatusTallSelector();
    const erVedtaksStotteFeatureTogglePa = useFeatureSelector()(VEDTAKSTOTTE);

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

    console.log('trenger vurdering', ferdigfilterListe);

    return (
        <div className="filtrering-oversikt panel">
            <Label className="filtrering-oversikt__totalt-antall">{tekstAntallBrukere(statusTall.totalt)}</Label>
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

            <RadioGruppe legend="Hvor vil du sitte?">
                <Radio
                    label={'erSykmeldtMedArbeidsgiver'}
                    name="sitteplass"
                    checked={ferdigfilterListe.includes(ER_SYKMELDT_MED_ARBEIDSGIVER)}
                    onChange={handleRadioButtonChange}
                    value={mapFilternavnTilFilterValue['erSykmeldtMedArbeidsgiver']}
                />
                <Radio
                    label={'underVurdering'}
                    name="sitteplass"
                    checked={ferdigfilterListe.includes(UNDER_VURDERING)}
                    onChange={handleRadioButtonChange}
                    value={mapFilternavnTilFilterValue['underVurdering']}
                />
                <Radio
                    label={'venterPaSvarFraNAV'}
                    name="sitteplass"
                    checked={ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV)}
                    onChange={handleRadioButtonChange}
                    value={mapFilternavnTilFilterValue['venterPaSvarFraNAV']}
                />
            </RadioGruppe>

            {/*<input*/}
            {/*    type={'radio'}*/}
            {/*    id={'test1'}*/}
            {/*    name={'test'}*/}
            {/*    value={mapFilternavnTilFilterValue['trengerVurdering']}*/}
            {/*    onChange={handleRadioButtonChange}*/}
            {/*    checked={ferdigfilterListe.includes(TRENGER_VURDERING)}*/}
            {/*/>*/}

            <RadioGroup legend="" hideLegend key={1}>
                {/*<input*/}
                {/*    type={'radio'}*/}
                {/*    id={'test1'}*/}
                {/*    name={'test'}*/}
                {/*    value={mapFilternavnTilFilterValue['trengerVurdering']}*/}
                {/*    onChange={handleRadioButtonChange}*/}
                {/*    checked={ferdigfilterListe.includes(TRENGER_VURDERING)}*/}
                {/*>*/}
                {/*    /!*<label htmlFor={'test1'}>trenger vurdering</label>*!/*/}
                {/*</input>*/}

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
                <div className="filtrering-skillelinje" />

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
                <BarInputRadio
                    filterNavn="avtaltMoteMedNav"
                    handleChange={handleRadioButtonChange}
                    antall={statusTall.moterMedNAVIdag}
                    checked={ferdigfilterListe.includes(MOTER_IDAG)}
                />
                <div className="filtrering-skillelinje" />

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
                <div className="filtrering-skillelinje" />

                <BarInputRadio
                    filterNavn="inaktiveBrukere"
                    handleChange={handleRadioButtonChange}
                    antall={statusTall.inaktiveBrukere}
                    checked={ferdigfilterListe.includes(INAKTIVE_BRUKERE)}
                />

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
