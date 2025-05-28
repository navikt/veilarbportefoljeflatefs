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
                        filterVerdi={TRENGER_OPPFOLGINGSVEDTAK}
                        handleChange={handleRadioButtonChange}
                        labelTekst={ferdigfilterListeLabelTekst[TRENGER_OPPFOLGINGSVEDTAK]}
                        statustall={statustallMedBrukerinnsyn.trengerOppfolgingsvedtak}
                    />
                    <BarInputRadio
                        filterVerdi={UNDER_VURDERING}
                        handleChange={handleRadioButtonChange}
                        labelTekst={ferdigfilterListeLabelTekst[UNDER_VURDERING]}
                        statustall={statustallMedBrukerinnsyn.underVurdering}
                    />
                    <BarInputRadio
                        filterVerdi={ER_SYKMELDT_MED_ARBEIDSGIVER}
                        handleChange={handleRadioButtonChange}
                        labelTekst={ferdigfilterListeLabelTekst[ER_SYKMELDT_MED_ARBEIDSGIVER]}
                        statustall={statustallMedBrukerinnsyn.erSykmeldtMedArbeidsgiver}
                    />
                </div>
                <div className="forste-barlabel-i-gruppe">
                    <BarInputRadio
                        filterVerdi={VENTER_PA_SVAR_FRA_NAV}
                        handleChange={handleRadioButtonChange}
                        labelTekst={ferdigfilterListeLabelTekst[VENTER_PA_SVAR_FRA_NAV]}
                        statustall={statustallMedBrukerinnsyn.venterPaSvarFraNAV}
                    />
                    <BarInputRadio
                        filterVerdi={VENTER_PA_SVAR_FRA_BRUKER}
                        handleChange={handleRadioButtonChange}
                        labelTekst={ferdigfilterListeLabelTekst[VENTER_PA_SVAR_FRA_BRUKER]}
                        statustall={statustallMedBrukerinnsyn.venterPaSvarFraBruker}
                    />
                    <BarInputRadio
                        filterVerdi={MOTER_IDAG}
                        handleChange={handleRadioButtonChange}
                        labelTekst={ferdigfilterListeLabelTekst[MOTER_IDAG]}
                        statustall={statustallMedBrukerinnsyn.moterMedNAVIdag}
                        testId="filter_checkboks-container_avtaltMoteMedNav"
                    />
                    <BarInputRadio
                        filterVerdi={TILTAKSHENDELSER}
                        handleChange={handleRadioButtonChange}
                        labelTekst={ferdigfilterListeLabelTekst[TILTAKSHENDELSER]}
                        statustall={statustallMedBrukerinnsyn.tiltakshendelser}
                    />
                </div>
                <div className="forste-barlabel-i-gruppe">
                    <BarInputRadio
                        filterVerdi={UTGATTE_VARSEL}
                        handleChange={handleRadioButtonChange}
                        labelTekst={ferdigfilterListeLabelTekst[UTGATTE_VARSEL]}
                        statustall={statustallMedBrukerinnsyn.utgatteVarsel}
                    />
                    <BarInputRadio
                        labelTekst={ferdigfilterListeLabelTekst[UTLOPTE_AKTIVITETER]}
                        handleChange={handleRadioButtonChange}
                        filterVerdi={UTLOPTE_AKTIVITETER}
                        statustall={statustallMedBrukerinnsyn.utlopteAktiviteter}
                    />
                    <BarInputRadio
                        filterVerdi={IKKE_I_AVTALT_AKTIVITET}
                        handleChange={handleRadioButtonChange}
                        labelTekst={ferdigfilterListeLabelTekst[IKKE_I_AVTALT_AKTIVITET]}
                        statustall={statustallMedBrukerinnsyn.ikkeIavtaltAktivitet}
                    />
                    <BarInputRadio
                        filterVerdi={I_AVTALT_AKTIVITET}
                        handleChange={handleRadioButtonChange}
                        labelTekst={ferdigfilterListeLabelTekst[I_AVTALT_AKTIVITET]}
                        statustall={statustallMedBrukerinnsyn.iavtaltAktivitet}
                        testId="filter_checkboks-container_iavtaltAktivitet"
                    />
                </div>
                <div className="forste-barlabel-i-gruppe">
                    <BarInputRadio
                        filterVerdi={INAKTIVE_BRUKERE}
                        handleChange={handleRadioButtonChange}
                        labelTekst={ferdigfilterListeLabelTekst[INAKTIVE_BRUKERE]}
                        statustall={statustallMedBrukerinnsyn.inaktiveBrukere}
                    />
                </div>
                {oversiktType === OversiktType.minOversikt && (
                    <div className="forste-barlabel-i-gruppe">
                        <BarInputRadio
                            filterVerdi={MINE_HUSKELAPPER}
                            handleChange={handleRadioButtonChange}
                            labelTekst={ferdigfilterListeLabelTekst[MINE_HUSKELAPPER]}
                            statustall={statustallMedBrukerinnsyn.mineHuskelapper}
                        />
                        <FilterStatusMineFargekategorier />
                    </div>
                )}
            </RadioGroup>
        </div>
    );
}
