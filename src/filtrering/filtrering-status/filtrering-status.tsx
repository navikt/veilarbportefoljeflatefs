import React from 'react';
import {useDispatch} from 'react-redux';
import {Alert, Detail, Label, Link, RadioGroup, ReadMore} from '@navikt/ds-react';
import {ExternalLinkIcon} from '@navikt/aksel-icons';
import {endreFiltervalg} from '../../ducks/filtrering';
import {CHECKBOX_FILTER, fjernFerdigfilter, leggTilFerdigFilter} from './filter-utils';
import {FiltervalgModell, KategoriModell} from '../../model-interfaces';
import {pagineringSetup} from '../../ducks/paginering';
import {
    ER_SYKMELDT_MED_ARBEIDSGIVER,
    ferdigfilterListeLabelTekst,
    MINE_HUSKELAPPER,
    I_AVTALT_AKTIVITET,
    IKKE_I_AVTALT_AKTIVITET,
    INAKTIVE_BRUKERE,
    MIN_ARBEIDSLISTE,
    MOTER_IDAG,
    NYE_BRUKERE_FOR_VEILEDER,
    TILTAKSHENDELSER,
    TRENGER_VURDERING,
    UFORDELTE_BRUKERE,
    UNDER_VURDERING,
    UTLOPTE_AKTIVITETER,
    VENTER_PA_SVAR_FRA_BRUKER,
    VENTER_PA_SVAR_FRA_NAV
} from '../filter-konstanter';
import FilterStatusMinArbeidsliste from './arbeidsliste';
import {oppdaterKolonneAlternativer, OversiktType} from '../../ducks/ui/listevisning';
import BarInputCheckbox from '../../components/barinput/barinput-checkbox';
import {BarInputRadio} from '../../components/barinput/barinput-radio';
import {tekstAntallBrukere} from '../../utils/tekst-utils';
import {useFeatureSelector} from '../../hooks/redux/use-feature-selector';
import {
    HUSKELAPP,
    SKJUL_ARBEIDSLISTEFUNKSJONALITET,
    VEDTAKSTOTTE,
    VIS_MELDING_OM_BRUKERE_MED_ADRESSEBESKYTTELSE_ELLER_SKJERMING,
    VIS_STATUSFILTER_TILTAKSHENDELSE
} from '../../konstanter';
import FilterStatusMineFargekategorier from './fargekategori';
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
    moterMedNAVIdag: number;
    tiltakshendelser: number;
    utlopteAktiviteter: number;
    ikkeIavtaltAktivitet: number;
    iavtaltAktivitet: number;
    minArbeidsliste: number;
    minArbeidslisteBla: number;
    minArbeidslisteLilla: number;
    minArbeidslisteGronn: number;
    minArbeidslisteGul: number;
    erSykmeldtMedArbeidsgiver: number;
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
    const erStatusfilterTiltakshendelseFeatureTogglePa = useFeatureSelector()(VIS_STATUSFILTER_TILTAKSHENDELSE);
    const visBrukereMedAdressebeskyttelseEllerSkjermingStatus =
        useFeatureSelector()(VIS_MELDING_OM_BRUKERE_MED_ADRESSEBESKYTTELSE_ELLER_SKJERMING) &&
        oversiktType === OversiktType.enhetensOversikt &&
        statustallUtenBrukerinnsyn !== null &&
        (statustallUtenBrukerinnsyn.ufordelteBrukere > 0 || statustallUtenBrukerinnsyn.venterPaSvarFraNAV > 0);
    const arbeidslistefunksjonalitetSkalVises = !useFeatureSelector()(SKJUL_ARBEIDSLISTEFUNKSJONALITET);

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
                        filterVerdi={NYE_BRUKERE_FOR_VEILEDER}
                    />
                ) : (
                    <BarInputCheckbox
                        filterNavn="ufordeltebruker"
                        antall={statustallMedBrukerinnsyn.ufordelteBrukere}
                        handleChange={handleCheckboxChange}
                        checked={ferdigfilterListe.includes(UFORDELTE_BRUKERE)}
                        labelTekst={'Ufordelte brukere'}
                        filterVerdi={UFORDELTE_BRUKERE}
                    />
                )}
            </div>
            <RadioGroup
                hideLegend
                legend=""
                value={ferdigfilterListe.filter(ferdigFilter => !CHECKBOX_FILTER.includes(ferdigFilter))[0] ?? ''}
            >
                <div className="forste-barlabel-i-gruppe">
                    <BarInputRadio
                        filterNavn="trengerVurdering"
                        handleChange={handleRadioButtonChange}
                        antall={statustallMedBrukerinnsyn.trengerVurdering}
                        filterVerdi={TRENGER_VURDERING}
                        labelTekst={ferdigfilterListeLabelTekst[TRENGER_VURDERING]}
                    />
                    <BarInputRadio
                        filterNavn="erSykmeldtMedArbeidsgiver"
                        handleChange={handleRadioButtonChange}
                        antall={statustallMedBrukerinnsyn.erSykmeldtMedArbeidsgiver}
                        filterVerdi={ER_SYKMELDT_MED_ARBEIDSGIVER}
                        labelTekst={ferdigfilterListeLabelTekst[ER_SYKMELDT_MED_ARBEIDSGIVER]}
                    />
                    {erVedtaksStotteFeatureTogglePa && (
                        <BarInputRadio
                            filterNavn="underVurdering"
                            handleChange={handleRadioButtonChange}
                            antall={statustallMedBrukerinnsyn.underVurdering}
                            filterVerdi={UNDER_VURDERING}
                            labelTekst={ferdigfilterListeLabelTekst[UNDER_VURDERING]}
                        />
                    )}
                </div>
                <div className="forste-barlabel-i-gruppe">
                    <BarInputRadio
                        filterNavn="venterPaSvarFraNAV"
                        antall={statustallMedBrukerinnsyn.venterPaSvarFraNAV}
                        handleChange={handleRadioButtonChange}
                        filterVerdi={VENTER_PA_SVAR_FRA_NAV}
                        labelTekst={ferdigfilterListeLabelTekst[VENTER_PA_SVAR_FRA_NAV]}
                    />
                    <BarInputRadio
                        filterNavn="venterPaSvarFraBruker"
                        antall={statustallMedBrukerinnsyn.venterPaSvarFraBruker}
                        handleChange={handleRadioButtonChange}
                        filterVerdi={VENTER_PA_SVAR_FRA_BRUKER}
                        labelTekst={ferdigfilterListeLabelTekst[VENTER_PA_SVAR_FRA_BRUKER]}
                    />
                    <BarInputRadio
                        filterNavn="avtaltMoteMedNav"
                        handleChange={handleRadioButtonChange}
                        antall={statustallMedBrukerinnsyn.moterMedNAVIdag}
                        filterVerdi={MOTER_IDAG}
                        labelTekst={ferdigfilterListeLabelTekst[MOTER_IDAG]}
                    />
                    {erStatusfilterTiltakshendelseFeatureTogglePa && (
                        <BarInputRadio
                            filterNavn="tiltakshendelse"
                            handleChange={handleRadioButtonChange}
                            antall={statustallMedBrukerinnsyn.tiltakshendelser}
                            filterVerdi={TILTAKSHENDELSER}
                            labelTekst={ferdigfilterListeLabelTekst[TILTAKSHENDELSER]}
                        />
                    )}
                </div>
                <div className="forste-barlabel-i-gruppe">
                    <BarInputRadio
                        filterNavn="utlopteAktiviteter"
                        antall={statustallMedBrukerinnsyn.utlopteAktiviteter}
                        handleChange={handleRadioButtonChange}
                        filterVerdi={UTLOPTE_AKTIVITETER}
                        labelTekst={ferdigfilterListeLabelTekst[UTLOPTE_AKTIVITETER]}
                    />
                    <BarInputRadio
                        filterNavn="ikkeIavtaltAktivitet"
                        antall={statustallMedBrukerinnsyn.ikkeIavtaltAktivitet}
                        handleChange={handleRadioButtonChange}
                        filterVerdi={IKKE_I_AVTALT_AKTIVITET}
                        labelTekst={ferdigfilterListeLabelTekst[IKKE_I_AVTALT_AKTIVITET]}
                    />
                    <BarInputRadio
                        filterNavn="iavtaltAktivitet"
                        antall={statustallMedBrukerinnsyn.iavtaltAktivitet}
                        handleChange={handleRadioButtonChange}
                        filterVerdi={I_AVTALT_AKTIVITET}
                        labelTekst={ferdigfilterListeLabelTekst[I_AVTALT_AKTIVITET]}
                    />
                </div>
                <div className="forste-barlabel-i-gruppe">
                    <BarInputRadio
                        filterNavn="inaktiveBrukere"
                        handleChange={handleRadioButtonChange}
                        antall={statustallMedBrukerinnsyn.inaktiveBrukere}
                        filterVerdi={INAKTIVE_BRUKERE}
                        labelTekst={ferdigfilterListeLabelTekst[INAKTIVE_BRUKERE]}
                    />
                </div>
                {oversiktType === OversiktType.minOversikt && (
                    <div className="forste-barlabel-i-gruppe">
                        {arbeidslistefunksjonalitetSkalVises && !erHuskelappFeatureTogglePa && (
                            <Label className="minArbeidsliste__tittel">Arbeidsliste</Label>
                        )}
                        {arbeidslistefunksjonalitetSkalVises && erHuskelappFeatureTogglePa && (
                            <>
                                <Label className="minArbeidsliste__tittel">Huskelapper og kategorier</Label>
                                <Alert variant="warning" size="small" className="minArbeidsliste__alert">
                                    <Link
                                        href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Arbeidslisten-i-Oversikten-i-Modia.aspx"
                                        target="_blank"
                                        rel="noopener"
                                        inlineText
                                    >
                                        Gamle arbeidslister blir slettet 25. oktober
                                        <ExternalLinkIcon title="Ekstern lenke" />
                                    </Link>
                                </Alert>
                            </>
                        )}
                        {arbeidslistefunksjonalitetSkalVises && (
                            <FilterStatusMinArbeidsliste
                                ferdigfilterListe={kategoriliste}
                                handleChange={handleRadioButtonChange}
                                handleChangeCheckbox={dispatchArbeidslisteKategoriChange}
                                hidden={oversiktType !== OversiktType.minOversikt}
                                checked={ferdigfilterListe.includes(MIN_ARBEIDSLISTE)}
                            />
                        )}
                        {erHuskelappFeatureTogglePa && (
                            <BarInputRadio
                                filterNavn="huskelapp"
                                antall={statustallMedBrukerinnsyn.mineHuskelapper}
                                handleChange={handleRadioButtonChange}
                                filterVerdi={MINE_HUSKELAPPER}
                                labelTekst={ferdigfilterListeLabelTekst[MINE_HUSKELAPPER]}
                            />
                        )}
                        {!arbeidslistefunksjonalitetSkalVises && erHuskelappFeatureTogglePa && (
                            <FilterStatusMineFargekategorier />
                        )}
                    </div>
                )}
                {arbeidslistefunksjonalitetSkalVises &&
                    erHuskelappFeatureTogglePa &&
                    oversiktType === OversiktType.minOversikt && (
                        <div className="forste-barlabel-i-gruppe">
                            <FilterStatusMineFargekategorier />
                        </div>
                    )}
            </RadioGroup>
        </div>
    );
}
