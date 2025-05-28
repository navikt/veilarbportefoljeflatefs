import {ChangeEvent} from 'react';
import {useDispatch} from 'react-redux';
import {Detail, Label, RadioGroup, ReadMore} from '@navikt/ds-react';
import {endreFiltervalg} from '../../ducks/filtrering';
import {CHECKBOX_FILTER, fjernFerdigfilter, leggTilFerdigFilter} from './filter-utils';
import {FiltervalgModell} from '../../typer/filtervalg-modell';
import {pagineringSetup} from '../../ducks/paginering';
import {
    ER_SYKMELDT_MED_ARBEIDSGIVER,
    ferdigfilterListeLabelTekst,
    I_AVTALT_AKTIVITET,
    IKKE_I_AVTALT_AKTIVITET,
    INAKTIVE_BRUKERE,
    MINE_HUSKELAPPER,
    MOTER_IDAG,
    NYE_BRUKERE_FOR_VEILEDER,
    TILTAKSHENDELSER,
    TRENGER_OPPFOLGINGSVEDTAK,
    UFORDELTE_BRUKERE,
    UTGATTE_VARSEL,
    UNDER_VURDERING,
    UTLOPTE_AKTIVITETER,
    VENTER_PA_SVAR_FRA_BRUKER,
    VENTER_PA_SVAR_FRA_NAV
} from '../filter-konstanter';
import {oppdaterKolonneAlternativer, OversiktType} from '../../ducks/ui/listevisning';
import {BarInputCheckbox} from '../../components/barinput/barinput-checkbox';
import {BarInputRadio} from '../../components/barinput/barinput-radio';
import {tekstAntallBrukere} from '../../utils/tekst-utils';
import {useFeatureSelector} from '../../hooks/redux/use-feature-selector';
import {VIS_MELDING_OM_BRUKERE_MED_ADRESSEBESKYTTELSE_ELLER_SKJERMING} from '../../konstanter';
import {FilterStatusMineFargekategorier} from './fargekategori';
import {StatustallInnhold} from '../../ducks/statustall/statustall-typer';
import './filtrering-status.css';

/** Denne typen tek i mot StatustallEnhet og StatustallVeileder på formatet til StatustallEnhet.
 * Dersom vi er i Min oversikt får vi inn StatustallVeileder og utenBrukerinnsyn vil vere `null`.
 * På Enhetens oversikt får vi inn StatustallEnhet og har data for begge nøklar i objektet. */
export interface StatustallForStatusfane {
    medBrukerinnsyn: StatustallInnhold;
    utenBrukerinnsyn: StatustallInnhold | null;
}

interface FiltreringStatusProps {
    filtervalg: FiltervalgModell;
    oversiktType: OversiktType;
    statustall: StatustallForStatusfane;
}

export function FiltreringStatus({filtervalg, oversiktType, statustall}: FiltreringStatusProps) {
    const {utenBrukerinnsyn: statustallUtenBrukerinnsyn, medBrukerinnsyn: statustallMedBrukerinnsyn} = statustall;
    const ferdigfilterListe = filtervalg.ferdigfilterListe;
    const statustallTotalt = statustallMedBrukerinnsyn.totalt + (statustallUtenBrukerinnsyn?.totalt ?? 0);
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

    function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
        const nyeFerdigfilterListe = e.target.checked
            ? leggTilFerdigFilter(ferdigfilterListe!, e.target.value)
            : fjernFerdigfilter(ferdigfilterListe!, e.target.value);
        dispatchFiltreringStatusChanged(nyeFerdigfilterListe);
    }

    function handleRadioButtonChange(e: ChangeEvent<HTMLInputElement>) {
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
                        <Detail>{`Venter på svar fra Nav (${statustallUtenBrukerinnsyn.venterPaSvarFraNAV})`}</Detail>
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
                        testId="filter_checkboks-container_trengerOppfolgingsvedtak"
                        handleChange={handleRadioButtonChange}
                        antall={statustallMedBrukerinnsyn.trengerOppfolgingsvedtak}
                        filterVerdi={TRENGER_OPPFOLGINGSVEDTAK}
                        labelTekst={ferdigfilterListeLabelTekst[TRENGER_OPPFOLGINGSVEDTAK]}
                    />
                    <BarInputRadio
                        testId="filter_checkboks-container_underVurdering"
                        handleChange={handleRadioButtonChange}
                        antall={statustallMedBrukerinnsyn.underVurdering}
                        filterVerdi={UNDER_VURDERING}
                        labelTekst={ferdigfilterListeLabelTekst[UNDER_VURDERING]}
                    />
                    <BarInputRadio
                        testId="filter_checkboks-container_erSykmeldtMedArbeidsgiver"
                        handleChange={handleRadioButtonChange}
                        antall={statustallMedBrukerinnsyn.erSykmeldtMedArbeidsgiver}
                        filterVerdi={ER_SYKMELDT_MED_ARBEIDSGIVER}
                        labelTekst={ferdigfilterListeLabelTekst[ER_SYKMELDT_MED_ARBEIDSGIVER]}
                    />
                </div>
                <div className="forste-barlabel-i-gruppe">
                    <BarInputRadio
                        testId="filter_checkboks-container_venterPaSvarFraNAV"
                        antall={statustallMedBrukerinnsyn.venterPaSvarFraNAV}
                        handleChange={handleRadioButtonChange}
                        filterVerdi={VENTER_PA_SVAR_FRA_NAV}
                        labelTekst={ferdigfilterListeLabelTekst[VENTER_PA_SVAR_FRA_NAV]}
                    />
                    <BarInputRadio
                        testId="filter_checkboks-container_venterPaSvarFraBruker"
                        antall={statustallMedBrukerinnsyn.venterPaSvarFraBruker}
                        handleChange={handleRadioButtonChange}
                        filterVerdi={VENTER_PA_SVAR_FRA_BRUKER}
                        labelTekst={ferdigfilterListeLabelTekst[VENTER_PA_SVAR_FRA_BRUKER]}
                    />
                    <BarInputRadio
                        testId="filter_checkboks-container_avtaltMoteMedNav"
                        handleChange={handleRadioButtonChange}
                        antall={statustallMedBrukerinnsyn.moterMedNAVIdag}
                        filterVerdi={MOTER_IDAG}
                        labelTekst={ferdigfilterListeLabelTekst[MOTER_IDAG]}
                    />
                    <BarInputRadio
                        testId="filter_checkboks-container_tiltakshendelse"
                        handleChange={handleRadioButtonChange}
                        antall={statustallMedBrukerinnsyn.tiltakshendelser}
                        filterVerdi={TILTAKSHENDELSER}
                        labelTekst={ferdigfilterListeLabelTekst[TILTAKSHENDELSER]}
                    />
                </div>
                <div className="forste-barlabel-i-gruppe">
                    <BarInputRadio
                        testId="filter_checkboks-container_utgatteVarsel"
                        antall={statustallMedBrukerinnsyn.utgatteVarsel}
                        handleChange={handleRadioButtonChange}
                        filterVerdi={UTGATTE_VARSEL}
                        labelTekst={ferdigfilterListeLabelTekst[UTGATTE_VARSEL]}
                    />
                    <BarInputRadio
                        testId="filter_checkboks-container_utlopteAktiviteter"
                        antall={statustallMedBrukerinnsyn.utlopteAktiviteter}
                        handleChange={handleRadioButtonChange}
                        filterVerdi={UTLOPTE_AKTIVITETER}
                        labelTekst={ferdigfilterListeLabelTekst[UTLOPTE_AKTIVITETER]}
                    />
                    <BarInputRadio
                        testId="filter_checkboks-container_ikkeIavtaltAktivitet"
                        antall={statustallMedBrukerinnsyn.ikkeIavtaltAktivitet}
                        handleChange={handleRadioButtonChange}
                        filterVerdi={IKKE_I_AVTALT_AKTIVITET}
                        labelTekst={ferdigfilterListeLabelTekst[IKKE_I_AVTALT_AKTIVITET]}
                    />
                    <BarInputRadio
                        testId="filter_checkboks-container_iavtaltAktivitet"
                        antall={statustallMedBrukerinnsyn.iavtaltAktivitet}
                        handleChange={handleRadioButtonChange}
                        filterVerdi={I_AVTALT_AKTIVITET}
                        labelTekst={ferdigfilterListeLabelTekst[I_AVTALT_AKTIVITET]}
                    />
                </div>
                <div className="forste-barlabel-i-gruppe">
                    <BarInputRadio
                        testId="filter_checkboks-container_inaktiveBrukere"
                        handleChange={handleRadioButtonChange}
                        antall={statustallMedBrukerinnsyn.inaktiveBrukere}
                        filterVerdi={INAKTIVE_BRUKERE}
                        labelTekst={ferdigfilterListeLabelTekst[INAKTIVE_BRUKERE]}
                    />
                </div>
                {oversiktType === OversiktType.minOversikt && (
                    <div className="forste-barlabel-i-gruppe">
                        <BarInputRadio
                            testId="filter_checkboks-container_huskelapp"
                            antall={statustallMedBrukerinnsyn.mineHuskelapper}
                            handleChange={handleRadioButtonChange}
                            filterVerdi={MINE_HUSKELAPPER}
                            labelTekst={ferdigfilterListeLabelTekst[MINE_HUSKELAPPER]}
                        />
                        <FilterStatusMineFargekategorier />
                    </div>
                )}
            </RadioGroup>
        </div>
    );
}
