import React from 'react';
import {useDispatch} from 'react-redux';
import {endreFiltervalg} from '../../ducks/filtrering';
import {CHECKBOX_FILTER, fjernFerdigfilter, leggTilFerdigFilter} from './filter-utils';
import {FiltervalgModell, KategoriModell} from '../../model-interfaces';
import {pagineringSetup} from '../../ducks/paginering';
import {
    ferdigfilterListeLabelTekst,
    mapFilternavnTilFilterValue,
    MIN_ARBEIDSLISTE,
    NYE_BRUKERE_FOR_VEILEDER,
    UFORDELTE_BRUKERE
} from '../filter-konstanter';
import FilterStatusMinArbeidsliste from './arbeidsliste';
import {oppdaterKolonneAlternativer, OversiktType} from '../../ducks/ui/listevisning';
import BarInputCheckbox from '../../components/barinput/barinput-checkbox';
import {BarInputRadio} from '../../components/barinput/barinput-radio';
import {tekstAntallBrukere} from '../../utils/tekst-utils';
import {useFeatureSelector} from '../../hooks/redux/use-feature-selector';
import {
    FARGEKATEGORIER,
    HUSKELAPP,
    VEDTAKSTOTTE,
    VIS_MELDING_OM_BRUKERE_MED_ADRESSEBESKYTTELSE_ELLER_SKJERMING
} from '../../konstanter';
import {Detail, Label, RadioGroup, ReadMore} from '@navikt/ds-react';
import './filtrering-status.css';
import FilterStatusMineFargekategorier from './fargekategori';

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
    mineHuskelapper: number;
}

interface FiltreringStatusProps {
    filtervalg: FiltervalgModell;
    oversiktType: OversiktType;
    statustall: Statustall;
}

export function FiltreringStatus({filtervalg, oversiktType, statustall}: FiltreringStatusProps) {
    const {utenBrukerinnsyn: statustallUtenBrukerinnsyn, medBrukerinnsyn: statustallMedBrukerinnsyn} = statustall;
    const ferdigfilterListe = filtervalg.ferdigfilterListe;
    const kategoriliste = filtervalg.arbeidslisteKategori;
    const statustallTotalt = statustallMedBrukerinnsyn.totalt + (statustallUtenBrukerinnsyn?.totalt ?? 0);
    const erVedtaksStotteFeatureTogglePa = useFeatureSelector()(VEDTAKSTOTTE);
    const erHuskelappFeatureTogglePa = useFeatureSelector()(HUSKELAPP);
    const erFargekategorierFeatureTogglePa = useFeatureSelector()(FARGEKATEGORIER);
    const visBrukereMedAdressebeskyttelseEllerSkjermingStatus =
        useFeatureSelector()(VIS_MELDING_OM_BRUKERE_MED_ADRESSEBESKYTTELSE_ELLER_SKJERMING) &&
        oversiktType === OversiktType.enhetensOversikt &&
        statustallUtenBrukerinnsyn !== null &&
        (statustallUtenBrukerinnsyn.ufordelteBrukere > 0 || statustallUtenBrukerinnsyn.venterPaSvarFraNAV > 0);

    const dispatch = useDispatch();

    function dispatchFiltreringStatusChanged(ferdigFilterListe) {
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg('ferdigfilterListe', ferdigFilterListe, oversiktType));
        oppdaterKolonneAlternativer(dispatch, {...filtervalg, ferdigfilterListe: ferdigFilterListe}, oversiktType);
    }

    function dispatchArbeidslisteKategoriChange(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(pagineringSetup({side: 1}));
        const nyeFerdigfilterListe = e.target.checked
            ? [...kategoriliste, e.target.value]
            : kategoriliste.filter(elem => elem !== e.target.value);
        dispatch(endreFiltervalg('arbeidslisteKategori', nyeFerdigfilterListe, oversiktType));
        oppdaterKolonneAlternativer(
            dispatch,
            {...filtervalg, arbeidslisteKategori: nyeFerdigfilterListe as KategoriModell[]},
            oversiktType
        );
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
            dispatch(endreFiltervalg('arbeidslisteKategori', [], oversiktType));
        }
        oppdaterKolonneAlternativer(
            dispatch,
            {
                ...filtervalg,
                ferdigfilterListe: nyeFerdigfilterListe,
                arbeidslisteKategori: e.target.value !== 'MIN_ARBEIDSLISTE' ? [] : filtervalg.arbeidslisteKategori
            },
            oversiktType
        );
    }

    return (
        <div className="filtrering-oversikt panel">
            <Label className="filtrering-oversikt__totalt-antall">{tekstAntallBrukere(statustallTotalt)}</Label>
            {visBrukereMedAdressebeskyttelseEllerSkjermingStatus && statustallUtenBrukerinnsyn !== null && (
                <ReadMore header={`Adressebeskyttelse/skjerming (${statustallUtenBrukerinnsyn.totalt})`}>
                    {statustallUtenBrukerinnsyn.ufordelteBrukere > 0 && (
                        <Detail>{`Ufordelte brukere (${statustallUtenBrukerinnsyn.ufordelteBrukere})`}</Detail>
                    )}
                    {statustallUtenBrukerinnsyn.venterPaSvarFraNAV > 0 && (
                        <Detail>{`Venter på svar fra NAV (${statustallUtenBrukerinnsyn.venterPaSvarFraNAV})`}</Detail>
                    )}
                    <br />
                    <Detail>
                        Du må ha spesiell tilgang for å se disse brukerne, og de er ikke regnet med i statustallene
                        under.
                    </Detail>
                </ReadMore>
            )}
            <div className="filter-checkboks-container">
                {oversiktType === OversiktType.minOversikt ? (
                    <BarInputCheckbox
                        filterNavn="nyeBrukere"
                        antall={statustallMedBrukerinnsyn.nyeBrukereForVeileder}
                        handleChange={handleCheckboxChange}
                        checked={ferdigfilterListe.includes(NYE_BRUKERE_FOR_VEILEDER)}
                        labelTekst={'Nye brukere'}
                    />
                ) : (
                    <BarInputCheckbox
                        filterNavn="ufordeltebruker"
                        antall={statustallMedBrukerinnsyn.ufordelteBrukere}
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
                        antall={statustallMedBrukerinnsyn.trengerVurdering}
                        filterVerdi={mapFilternavnTilFilterValue['trengerVurdering']}
                        labelTekst={ferdigfilterListeLabelTekst[mapFilternavnTilFilterValue['trengerVurdering']]}
                    />
                    <BarInputRadio
                        filterNavn="erSykmeldtMedArbeidsgiver"
                        handleChange={handleRadioButtonChange}
                        antall={statustallMedBrukerinnsyn.erSykmeldtMedArbeidsgiver}
                        filterVerdi={mapFilternavnTilFilterValue['erSykmeldtMedArbeidsgiver']}
                        labelTekst={
                            ferdigfilterListeLabelTekst[mapFilternavnTilFilterValue['erSykmeldtMedArbeidsgiver']]
                        }
                    />
                    {erVedtaksStotteFeatureTogglePa && (
                        <BarInputRadio
                            filterNavn="underVurdering"
                            handleChange={handleRadioButtonChange}
                            antall={statustallMedBrukerinnsyn.underVurdering}
                            filterVerdi={mapFilternavnTilFilterValue['underVurdering']}
                            labelTekst={ferdigfilterListeLabelTekst[mapFilternavnTilFilterValue['underVurdering']]}
                        />
                    )}
                </div>
                <div className="forsteBarlabelIGruppe">
                    <BarInputRadio
                        filterNavn="venterPaSvarFraNAV"
                        antall={statustallMedBrukerinnsyn.venterPaSvarFraNAV}
                        handleChange={handleRadioButtonChange}
                        filterVerdi={mapFilternavnTilFilterValue['venterPaSvarFraNAV']}
                        labelTekst={ferdigfilterListeLabelTekst[mapFilternavnTilFilterValue['venterPaSvarFraNAV']]}
                    />
                    <BarInputRadio
                        filterNavn="venterPaSvarFraBruker"
                        antall={statustallMedBrukerinnsyn.venterPaSvarFraBruker}
                        handleChange={handleRadioButtonChange}
                        filterVerdi={mapFilternavnTilFilterValue['venterPaSvarFraBruker']}
                        labelTekst={ferdigfilterListeLabelTekst[mapFilternavnTilFilterValue['venterPaSvarFraBruker']]}
                    />
                    <BarInputRadio
                        filterNavn="avtaltMoteMedNav"
                        handleChange={handleRadioButtonChange}
                        antall={statustallMedBrukerinnsyn.moterMedNAVIdag}
                        filterVerdi={mapFilternavnTilFilterValue['avtaltMoteMedNav']}
                        labelTekst={ferdigfilterListeLabelTekst[mapFilternavnTilFilterValue['avtaltMoteMedNav']]}
                    />
                </div>
                <div className="forsteBarlabelIGruppe">
                    <BarInputRadio
                        filterNavn="utlopteAktiviteter"
                        antall={statustallMedBrukerinnsyn.utlopteAktiviteter}
                        handleChange={handleRadioButtonChange}
                        filterVerdi={mapFilternavnTilFilterValue['utlopteAktiviteter']}
                        labelTekst={ferdigfilterListeLabelTekst[mapFilternavnTilFilterValue['utlopteAktiviteter']]}
                    />
                    <BarInputRadio
                        filterNavn="ikkeIavtaltAktivitet"
                        antall={statustallMedBrukerinnsyn.ikkeIavtaltAktivitet}
                        handleChange={handleRadioButtonChange}
                        filterVerdi={mapFilternavnTilFilterValue['ikkeIavtaltAktivitet']}
                        labelTekst={ferdigfilterListeLabelTekst[mapFilternavnTilFilterValue['ikkeIavtaltAktivitet']]}
                    />
                    <BarInputRadio
                        filterNavn="iavtaltAktivitet"
                        antall={statustallMedBrukerinnsyn.iavtaltAktivitet}
                        handleChange={handleRadioButtonChange}
                        filterVerdi={mapFilternavnTilFilterValue['iavtaltAktivitet']}
                        labelTekst={ferdigfilterListeLabelTekst[mapFilternavnTilFilterValue['iavtaltAktivitet']]}
                    />
                </div>
                <div className="forsteBarlabelIGruppe">
                    <BarInputRadio
                        filterNavn="inaktiveBrukere"
                        handleChange={handleRadioButtonChange}
                        antall={statustallMedBrukerinnsyn.inaktiveBrukere}
                        filterVerdi={mapFilternavnTilFilterValue['inaktiveBrukere']}
                        labelTekst={ferdigfilterListeLabelTekst[mapFilternavnTilFilterValue['inaktiveBrukere']]}
                    />
                </div>
                <FilterStatusMinArbeidsliste
                    ferdigfilterListe={kategoriliste}
                    handleChange={handleRadioButtonChange}
                    handleChangeCheckbox={dispatchArbeidslisteKategoriChange}
                    hidden={oversiktType !== OversiktType.minOversikt}
                    checked={ferdigfilterListe.includes(MIN_ARBEIDSLISTE)}
                />
                {erHuskelappFeatureTogglePa && oversiktType === OversiktType.minOversikt && (
                    <BarInputRadio
                        filterNavn="huskelapp"
                        antall={statustallMedBrukerinnsyn.mineHuskelapper}
                        handleChange={handleRadioButtonChange}
                        filterVerdi={mapFilternavnTilFilterValue['huskelapp']}
                        labelTekst={ferdigfilterListeLabelTekst[mapFilternavnTilFilterValue['huskelapp']]}
                    />
                )}
                {erFargekategorierFeatureTogglePa && oversiktType === OversiktType.minOversikt && (
                    <div className="forsteBarlabelIGruppe">
                        <FilterStatusMineFargekategorier hidden={oversiktType !== OversiktType.minOversikt} />
                    </div>
                )}
            </RadioGroup>
        </div>
    );
}
