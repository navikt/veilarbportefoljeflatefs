import {
    AAPFilterArena,
    AAPFilterKelvin,
    AktiviteterAvtaltMedNav,
    AktiviteterFilternokler,
    AktiviteterValg,
    alder,
    alleFargekategoriFilterAlternativer,
    barnUnder18Aar as barnUnder18AarKonst,
    cvJobbprofil,
    DagpengerFilter,
    DagpengerFilterArena,
    ensligeForsorgere,
    ferdigfilterListeLabelTekst,
    fodselsdagIMnd,
    formidlingsgruppe,
    gjeldendeVedtak14a as gjeldendeVedtak14aKonst,
    hendelserEtikett,
    initialStateAktiviteterFiltervalg,
    kjonn,
    landgruppe,
    manuellBrukerStatus,
    registreringstype,
    rettighetsgruppeArena,
    servicegruppe,
    stillingFraNavFilter,
    TiltakspengerFilter,
    TiltakspengerFilterArena,
    tolkebehov,
    ulesteEndringer,
    UngdomsprogramytelseFilter,
    utdanning,
    utdanningBestatt,
    utdanningGodkjent
} from '../../../filtrering/filter-konstanter';
import {Filtervalg} from '../../../typer/filtervalg-modell';
import {Hovedmal, InnsatsgruppeGjeldendeVedtak14a} from '../../../typer/bruker-modell';

type Validator = (value: unknown) => unknown | undefined;

const isString = (v: unknown): v is string => typeof v === 'string';
const isStringArray = (v: unknown): v is string[] => Array.isArray(v) && v.every(isString);

/** Sjekker at verdier kun er de som ligger i `tillate`. Returner undefined om input ikke er en liste. */
const enumArray =
    (tillate: readonly string[]): Validator =>
    v =>
        isStringArray(v) ? v.filter(x => tillate.includes(x)) : undefined;

/** Aksepter en liste av strenger uten enum-sjekk (fritekst fra backend, f eks veileder-ID-er). */
const stringArray: Validator = v => (isStringArray(v) ? v : undefined);

/** Nullbar streng; bare gyldige enum-verdier tillat. */
const nullableEnum =
    (tillate: readonly string[]): Validator =>
    v => {
        if (v === null) return null;
        if (isString(v) && tillate.includes(v)) return v;
        return undefined;
    };

const freeString: Validator = v => (isString(v) ? v : undefined);

const aktiviteterValidator: Validator = v => {
    if (!v || typeof v !== 'object' || Array.isArray(v)) return undefined;
    const gyldigeAktivitetar = Object.values(AktiviteterAvtaltMedNav) as string[];
    const gyldigeVal = Object.values(AktiviteterValg) as string[];
    const reinsa: Partial<AktiviteterFilternokler> = {};
    for (const [key, value] of Object.entries(v)) {
        if (gyldigeAktivitetar.includes(key) && isString(value) && gyldigeVal.includes(value)) {
            reinsa[key as AktiviteterAvtaltMedNav] = value as AktiviteterValg;
        }
    }
    return {...initialStateAktiviteterFiltervalg, ...reinsa};
};

export const filtervalgValidators: Partial<Record<Filtervalg, Validator>> = {
    [Filtervalg.ferdigfilterListe]: enumArray(Object.keys(ferdigfilterListeLabelTekst)),
    [Filtervalg.alder]: enumArray(Object.keys(alder)),
    [Filtervalg.kjonn]: nullableEnum(Object.keys(kjonn)),
    [Filtervalg.landgruppe]: enumArray(Object.keys(landgruppe)),
    [Filtervalg.foedeland]: stringArray,
    [Filtervalg.fodselsdagIMnd]: enumArray(Object.keys(fodselsdagIMnd())),
    [Filtervalg.formidlingsgruppe]: enumArray(Object.keys(formidlingsgruppe)),
    [Filtervalg.servicegruppe]: enumArray(Object.keys(servicegruppe)),
    [Filtervalg.veiledere]: stringArray,
    [Filtervalg.aktiviteter]: aktiviteterValidator,
    [Filtervalg.aktiviteterForenklet]: enumArray(Object.values(AktiviteterAvtaltMedNav)),
    [Filtervalg.tiltakstyper]: stringArray,
    [Filtervalg.navnEllerFnrQuery]: freeString,
    [Filtervalg.rettighetsgruppe]: enumArray(Object.keys(rettighetsgruppeArena)),
    [Filtervalg.manuellBrukerStatus]: enumArray(Object.keys(manuellBrukerStatus)),
    [Filtervalg.veilederNavnQuery]: freeString,
    [Filtervalg.registreringstype]: enumArray(Object.keys(registreringstype)),
    [Filtervalg.cvJobbprofil]: nullableEnum(Object.keys(cvJobbprofil)),
    [Filtervalg.utdanning]: enumArray(Object.keys(utdanning)),
    [Filtervalg.utdanningGodkjent]: enumArray(Object.keys(utdanningGodkjent)),
    [Filtervalg.utdanningBestatt]: enumArray(Object.keys(utdanningBestatt)),
    [Filtervalg.sisteEndringKategori]: nullableEnum(Object.keys(hendelserEtikett)),
    [Filtervalg.ulesteEndringer]: nullableEnum(Object.keys(ulesteEndringer)),
    [Filtervalg.tolkebehov]: enumArray(Object.keys(tolkebehov)),
    [Filtervalg.tolkBehovSpraak]: stringArray,
    [Filtervalg.stillingFraNavFilter]: enumArray(Object.keys(stillingFraNavFilter)),
    [Filtervalg.geografiskBosted]: stringArray,
    [Filtervalg.visGeografiskBosted]: stringArray,
    [Filtervalg.ensligeForsorgere]: enumArray(Object.keys(ensligeForsorgere)),
    [Filtervalg.barnUnder18Aar]: enumArray(Object.keys(barnUnder18AarKonst)),
    [Filtervalg.barnUnder18AarAlder]: stringArray,
    [Filtervalg.fargekategorier]: enumArray(alleFargekategoriFilterAlternativer),
    [Filtervalg.gjeldendeVedtak14a]: enumArray(Object.keys(gjeldendeVedtak14aKonst)),
    [Filtervalg.innsatsgruppeGjeldendeVedtak14a]: enumArray(Object.values(InnsatsgruppeGjeldendeVedtak14a)),
    [Filtervalg.hovedmalGjeldendeVedtak14a]: enumArray(Object.values(Hovedmal)),
    [Filtervalg.ytelseAapArena]: enumArray(Object.values(AAPFilterArena)),
    [Filtervalg.ytelseAapKelvin]: enumArray(Object.values(AAPFilterKelvin)),
    [Filtervalg.ytelseTiltakspengerArena]: enumArray(Object.values(TiltakspengerFilterArena)),
    [Filtervalg.ytelseTiltakspenger]: enumArray(Object.values(TiltakspengerFilter)),
    [Filtervalg.ytelseDagpengerArena]: enumArray(Object.values(DagpengerFilterArena)),
    [Filtervalg.ytelseDagpenger]: enumArray(Object.values(DagpengerFilter)),
    [Filtervalg.ytelseUngdomsprogram]: enumArray(Object.values(UngdomsprogramytelseFilter))
};
