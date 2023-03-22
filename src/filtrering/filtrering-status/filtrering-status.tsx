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
import {BarInputRadio} from '../../components/barinput/barinput-radio';
import {tekstAntallBrukere} from '../../utils/tekst-utils';
import {useFeatureSelector} from '../../hooks/redux/use-feature-selector';
import {VEDTAKSTOTTE, VIS_MELDING_OM_BRUKERE_MED_ADRESSEBESKYTTELSE_ELLER_SKJERMING} from '../../konstanter';
import {Detail, Label, RadioGroup, ReadMore} from '@navikt/ds-react';
import './filtrering-status.css';

export interface Statustall {
    medBrukerinnsyn: StatustallInnhold;
    utenBrukerinnsyn: StatustallInnhold | null;
}

interface StatustallInnhold {
    totalt: number;
    ufordelteBrukere: number;
    inaktiveBrukere: number;
    venterPaSvarFraNAV: number;
    venterPaSvarFraBruker: number;
    utlopteAktiviteter: number;
    ikkeIavtaltAktivitet: number;
    iavtaltAktivitet: number;
    minArbeidsliste: number;
    minArbeidslisteBla: number;
    minArbeidslisteLilla: number;
    minArbeidslisteGronn: number;
    minArbeidslisteGul: number;
    erSykmeldtMedArbeidsgiver: number;
    moterMedNAVIdag: number;
    trengerVurdering: number;
    nyeBrukereForVeileder: number;
    underVurdering: number;
}

interface FiltreringStatusProps {
    filtervalg: FiltervalgModell;
    oversiktType: OversiktType;
    statustall: Statustall;
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

    const erVedtaksStotteFeatureTogglePa = useFeatureSelector()(VEDTAKSTOTTE);
    const visBrukereMedAdressebeskyttelseEllerSkjermingStatus =
        useFeatureSelector()(VIS_MELDING_OM_BRUKERE_MED_ADRESSEBESKYTTELSE_ELLER_SKJERMING) &&
        props.oversiktType === OversiktType.enhetensOversikt &&
        props.statustall.utenBrukerinnsyn !== null &&
        (props.statustall.utenBrukerinnsyn.ufordelteBrukere > 0 ||
            props.statustall.utenBrukerinnsyn.venterPaSvarFraNAV > 0);

    return (
        <div className="filtrering-oversikt panel">
            <Label className="filtrering-oversikt__totalt-antall">
                {tekstAntallBrukere(props.statustall.medBrukerinnsyn.totalt)}
            </Label>
            {visBrukereMedAdressebeskyttelseEllerSkjermingStatus && props.statustall.utenBrukerinnsyn !== null && (
                <ReadMore header={`Adressebeskyttelse/skjerming (${props.statustall.utenBrukerinnsyn.totalt})`}>
                    {props.statustall.utenBrukerinnsyn.ufordelteBrukere > 0 && (
                        <Detail>{`Ufordelte brukere (${props.statustall.utenBrukerinnsyn.ufordelteBrukere})`}</Detail>
                    )}
                    {props.statustall.utenBrukerinnsyn.venterPaSvarFraNAV > 0 && (
                        <Detail>{`Venter på svar fra NAV (${props.statustall.utenBrukerinnsyn.venterPaSvarFraNAV})`}</Detail>
                    )}
                    <br />
                    <Detail>
                        Du må ha spesiell tilgang for å se disse brukerne, og de er ikke regnet med i statustallene
                        under.
                    </Detail>
                </ReadMore>
            )}
            <div className="filter-checkboks-container">
                {props.oversiktType === OversiktType.minOversikt ? (
                    <BarInputCheckbox
                        filterNavn="nyeBrukere"
                        antall={props.statustall.medBrukerinnsyn.nyeBrukereForVeileder}
                        handleChange={handleCheckboxChange}
                        checked={ferdigfilterListe.includes(NYE_BRUKERE_FOR_VEILEDER)}
                        labelTekst={'Nye brukere'}
                    />
                ) : (
                    <BarInputCheckbox
                        filterNavn="ufordeltebruker"
                        antall={props.statustall.medBrukerinnsyn.ufordelteBrukere}
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
                        antall={props.statustall.medBrukerinnsyn.trengerVurdering}
                    />
                    <BarInputRadio
                        filterNavn="erSykmeldtMedArbeidsgiver"
                        handleChange={handleRadioButtonChange}
                        antall={props.statustall.medBrukerinnsyn.erSykmeldtMedArbeidsgiver}
                    />
                    {erVedtaksStotteFeatureTogglePa && (
                        <BarInputRadio
                            filterNavn="underVurdering"
                            handleChange={handleRadioButtonChange}
                            antall={props.statustall.medBrukerinnsyn.underVurdering}
                        />
                    )}
                </div>
                <div className="forsteBarlabelIGruppe">
                    <BarInputRadio
                        filterNavn="venterPaSvarFraNAV"
                        antall={props.statustall.medBrukerinnsyn.venterPaSvarFraNAV}
                        handleChange={handleRadioButtonChange}
                    />
                    <BarInputRadio
                        filterNavn="venterPaSvarFraBruker"
                        antall={props.statustall.medBrukerinnsyn.venterPaSvarFraBruker}
                        handleChange={handleRadioButtonChange}
                    />
                    <BarInputRadio
                        filterNavn="avtaltMoteMedNav"
                        handleChange={handleRadioButtonChange}
                        antall={props.statustall.medBrukerinnsyn.moterMedNAVIdag}
                    />
                </div>
                <div className="forsteBarlabelIGruppe">
                    <BarInputRadio
                        filterNavn="utlopteAktiviteter"
                        antall={props.statustall.medBrukerinnsyn.utlopteAktiviteter}
                        handleChange={handleRadioButtonChange}
                    />
                    <BarInputRadio
                        filterNavn="ikkeIavtaltAktivitet"
                        antall={props.statustall.medBrukerinnsyn.ikkeIavtaltAktivitet}
                        handleChange={handleRadioButtonChange}
                    />
                    <BarInputRadio
                        filterNavn="iavtaltAktivitet"
                        antall={props.statustall.medBrukerinnsyn.iavtaltAktivitet}
                        handleChange={handleRadioButtonChange}
                    />
                </div>
                <div className="forsteBarlabelIGruppe">
                    <BarInputRadio
                        filterNavn="inaktiveBrukere"
                        handleChange={handleRadioButtonChange}
                        antall={props.statustall.medBrukerinnsyn.inaktiveBrukere}
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
