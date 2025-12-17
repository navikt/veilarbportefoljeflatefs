import moment from 'moment';
import {fakerNB_NO as faker} from '@faker-js/faker';
import {veiledere} from './veiledere';
import {hendelserLabels} from '../../filtrering/filter-konstanter';
import {
    AapKelvinData,
    AktiviteterAvtaltMedNav,
    BarnUnder18AarModell,
    BrukerModell,
    EnsligeForsorgereOvergangsstonad,
    Etiketter,
    FargekategoriModell,
    GeografiskBosted,
    GjeldendeVedtak14aModell,
    HendelseInnhold,
    Hovedmal,
    HuskelappModell,
    InnsatsgruppeGjeldendeVedtak14a,
    MeldingerVenterPaSvar,
    MoterMedNav,
    SisteEndringAvBruker,
    Statsborgerskap,
    TiltakshendelseModell,
    TiltakspengerData,
    Utkast14a,
    Vedtak14a,
    Ytelser,
    YtelserArena
} from '../../typer/bruker-modell';
import {rnd} from '../utils';
import {MOCK_CONFIG} from '../constants';
import {MoteplanModell} from '../../typer/moteplan';

faker.seed(MOCK_CONFIG.seed);

/* I sjølve koden (utanfor mock) er dette ikkje typa, det er berre hardkoda strengar */
enum DagpengerYtelseData {
    YTELSE_ARENA_DAGPENGER = 'DAGPENGER',
    YTELSE_ARENA_DAGPENGER_ORDINARE = 'ORDINARE_DAGPENGER',
    YTELSE_ARENA_DAGPENGER_PERMITTERING = 'DAGPENGER_MED_PERMITTERING',
    YTELSE_ARENA_DAGPENGER_PERMITTERING_FISKEINDUSTRI = 'DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI',
    YTELSE_ARENA_DAGPENGER_LONNSGARANTIMIDLER = 'LONNSGARANTIMIDLER_DAGPENGER'
}

const dagpengerYtelserMedPermittering = [
    DagpengerYtelseData.YTELSE_ARENA_DAGPENGER_PERMITTERING,
    DagpengerYtelseData.YTELSE_ARENA_DAGPENGER_PERMITTERING_FISKEINDUSTRI
];

const dagpengerYtelser = [
    DagpengerYtelseData.YTELSE_ARENA_DAGPENGER,
    DagpengerYtelseData.YTELSE_ARENA_DAGPENGER_ORDINARE,
    DagpengerYtelseData.YTELSE_ARENA_DAGPENGER_LONNSGARANTIMIDLER,
    ...dagpengerYtelserMedPermittering
];

/* I sjølve koden (utanfor mock) er dette ikkje typa, det er berre hardkoda strengar */
enum AapYtelseData {
    ORDINAR_AAP = 'AAP_MAXTID',
    UNNTAK_AAP = 'AAP_UNNTAK'
}

enum TiltakspengerYtelseData {
    TILTAKSPENGER = 'TILTAKSPENGER'
}

const ytelser = [
    ...dagpengerYtelser,
    AapYtelseData.ORDINAR_AAP,
    AapYtelseData.UNNTAK_AAP,
    TiltakspengerYtelseData.TILTAKSPENGER
];

const huskelapp: any = {};

let i = 123456;

function lagGrunndata() {
    const kjonn = Math.random() > 0.5 ? 'K' : 'M';

    return {
        fnr: String(i++).padStart(11, '0'),
        fornavn: faker.person.firstName(kjonn === 'K' ? 'female' : 'male'),
        etternavn: 'Testson'
    };
}

function lagArenaYtelse(): YtelserArena {
    const maybeYtelse = rnd(0, ytelser.length * 1.5);
    const ytelse = maybeYtelse < ytelser.length ? ytelser[maybeYtelse] : undefined;
    const out: YtelserArena = {
        innsatsgruppe: null,
        ytelse: ytelse,
        utlopsdato: '',
        aapmaxtidUke: 0,
        aapUnntakUkerIgjen: undefined,
        aapordinerutlopsdato: '',
        dagputlopUke: 24,
        permutlopUke: 10
    };

    const dag = rnd(1, 31);
    const mnd = rnd(1, 12);
    const ar = rnd(0, 3) + new Date().getFullYear();

    if (ytelse === AapYtelseData.ORDINAR_AAP || ytelse === AapYtelseData.UNNTAK_AAP) {
        const rndDate = new Date(ar, mnd - 1, dag);
        const todayDate = new Date();

        const aaptidUke = Math.round((rndDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24 * 7));

        out.aapmaxtidUke = aaptidUke;
        out.aapUnntakUkerIgjen = aaptidUke;
        if (ytelse === AapYtelseData.ORDINAR_AAP) {
            if (Math.random() > 0.5) {
                out.aapordinerutlopsdato = rndDate.toString();
            }
        }
    } else {
        out.utlopsdato = new Date(ar, mnd, dag).toISOString();
    }

    return out;
}

function lagOverskrift() {
    const maybeOverskrift = rnd(0, 1);
    if (maybeOverskrift > 0.5) {
        return faker.lorem.word();
    }
    return null;
}

export const lagHuskelapp = (): HuskelappModell | null => {
    const maybeHuskelapp = rnd(0, 1);
    const huskeklappId = rnd(1, 1000).toString();
    if (maybeHuskelapp > 0.75) {
        return null;
    }

    return {
        huskelappId: huskeklappId,
        kommentar: '\n\n' + lagOverskrift() + '\n\nDette skal bort ',
        frist: moment().add(rnd(0, 20), 'days').add(rnd(0, 23), 'hours').toDate(),
        enhetId: maybeHuskelapp > 0.7 ? '0220' : '1234',
        endretAv: 'Meg selv',
        endretDato: moment().subtract(rnd(0, 20), 'days').subtract(rnd(0, 23), 'hours').toDate()
    };
};

const lagTiltakshendelse = (): TiltakshendelseModell => ({
    id: '54f06061-4383-417d-a063-1c4fc4701a78',
    opprettet: new Date(),
    tekst: 'Forslag: Avslutt deltakelse',
    lenke: 'https://www.nav.no/54f06061-4383-417d-a063-1c4fc4701a78',
    tiltakstype: 'ARBFORB'
});

function lagVedtak14a(): Vedtak14a {
    const gjeldendeVedtak = lagGjeldende14aVedtak();
    const utkastVedtak = lagVedtakUtkast();

    return {
        gjeldendeVedtak14a: gjeldendeVedtak,
        utkast14a: utkastVedtak
    };
}

function lagVedtakUtkast(): Utkast14a | null {
    const maybeUtkast = rnd(0, 1);
    const maybeUtkastOpprettet = rnd(0, 1);
    const ansvarligVeileder = faker.person.firstName() + ' ' + faker.person.lastName();
    const dagerSiden = rnd(1, 30);
    const daterSidenTekst = dagerSiden + (dagerSiden === 1 ? ' dag' : ' dager') + ' siden';

    if (maybeUtkast > 0.5) {
        return {
            status: maybeUtkastOpprettet ? 'Utkast' : 'Venter på beslutter',
            dagerSidenStatusEndretSeg: daterSidenTekst,
            ansvarligVeileder: ansvarligVeileder
        };
    }
    return null;
}

const lagGjeldende14aVedtak = (): GjeldendeVedtak14aModell | null => {
    const maybe14aVedtak = rnd(0, 1);
    const today = new Date();

    if (maybe14aVedtak < 0.15) {
        return {
            innsatsgruppe: InnsatsgruppeGjeldendeVedtak14a.GRADERT_VARIG_TILPASSET_INNSATS,
            hovedmal: Hovedmal.BEHOLDE_ARBEID,
            fattetDato: new Date(today.setMonth(today.getDay() - 5))
        };
    }
    if (maybe14aVedtak < 0.3) {
        return {
            innsatsgruppe: InnsatsgruppeGjeldendeVedtak14a.SPESIELT_TILPASSET_INNSATS,
            hovedmal: Hovedmal.OKE_DELTAKELSE,
            fattetDato: new Date(today.setMonth(today.getDay() - 14))
        };
    }
    if (maybe14aVedtak < 0.45) {
        return {
            innsatsgruppe: InnsatsgruppeGjeldendeVedtak14a.SITUASJONSBESTEMT_INNSATS,
            hovedmal: Hovedmal.SKAFFE_ARBEID,
            fattetDato: new Date(today.setMonth(today.getDay() - 9))
        };
    }
    if (maybe14aVedtak < 0.6) {
        return {
            innsatsgruppe: InnsatsgruppeGjeldendeVedtak14a.STANDARD_INNSATS,
            hovedmal: Hovedmal.SKAFFE_ARBEID,
            fattetDato: new Date(today.setMonth(today.getDay() - 7))
        };
    }
    if (maybe14aVedtak < 0.75) {
        return {
            innsatsgruppe: InnsatsgruppeGjeldendeVedtak14a.VARIG_TILPASSET_INNSATS,
            hovedmal: Hovedmal.SKAFFE_ARBEID,
            fattetDato: new Date(today.setMonth(today.getDay() - 20))
        };
    }
    return null;
};

const lagHendelse = (): HendelseInnhold | null => {
    const maybeHendelse = rnd(0, 1);
    const today = new Date();

    if (maybeHendelse < 0.25) {
        return {
            beskrivelse: 'Bruker har et utgått varsel',
            dato: new Date(today.setMonth(today.getDay() - 4)).toString(),
            lenke: 'https://veilarbpersonflate.intern.dev.nav.no/aktivitetsplan'
        };
    }
    if (maybeHendelse < 0.5) {
        return {
            beskrivelse: 'Bruker har et udelt samtalereferat',
            dato: new Date(today.setMonth(today.getDay() - 7)).toString(),
            lenke: 'https://veilarbpersonflate.intern.dev.nav.no/aktivitetsplan'
        };
    }
    return null;
};

const lagAapKelvinData = (): AapKelvinData | null => {
    const muligeRettighetstyper = [
        'Bistandsbehov',
        'Sykepengeerstatning',
        'Student',
        'Arbeidssøker',
        'Vurderes for uføretrygd'
    ];

    const tilfeldigRettighetstype = () => {
        return muligeRettighetstyper[Math.round(Math.random() * muligeRettighetstyper.length)];
    };

    return {
        vedtaksdatoTilOgMed: randomDate({past: true, withoutTimestamp: true}),
        rettighetstype: tilfeldigRettighetstype()
    };
};

const lagTiltakspengerData = (): TiltakspengerData | null => {
    const muligeRettigheter = ['Tiltakspenger', 'Tiltakspenger og barnetillegg'];

    const tilfeldigRettigheter = () => {
        return muligeRettigheter[Math.round(Math.random() * muligeRettigheter.length)];
    };

    return {
        vedtaksdatoTilOgMed: randomDate({past: true, withoutTimestamp: true}),
        rettighet: tilfeldigRettigheter()
    };
};

const lagYtelser = (): Ytelser => {
    return {
        ytelserArena: lagArenaYtelse(),
        aap: lagAapKelvinData(),
        tiltakspenger: lagTiltakspengerData(),
        ensligeForsorgereOvergangsstonad: lagRandomOvergangsstonadForEnsligForsorger()
    };
};

const lagGeografiskBosted = (): GeografiskBosted => {
    return {
        bostedKommune: hentBostedKommune(),
        bostedBydel: hentBostedBydel(),
        bostedKommuneUkjentEllerUtland: '-',
        bostedSistOppdatert: randomDate({past: true})
    };
};

const lagMeldingerVenterPaSvar = (): MeldingerVenterPaSvar => {
    return {
        datoMeldingVenterPaNav: randomDate({past: true}),
        datoMeldingVenterPaBruker: randomDate({past: true})
    };
};

const lagEtiketter = (): Etiketter => {
    const ar = rnd(0, 99);
    const erDoed = Math.random() < (100 - ar * 20) / 100;
    const maybeVeileder = rnd(0, veiledere.length * 2);
    const nyForVeileder = maybeVeileder > 0 && Math.random() < 0.25;
    const nyForEnhet = Math.random() < 25 / 100;
    const erSykmeldtMedArbeidsgiver = Math.random() < 25 / 100;

    return {
        harSikkerhetstiltak: false,
        nyForVeileder: nyForVeileder,
        nyForEnhet: nyForEnhet,
        erDoed: erDoed,
        erSykmeldtMedArbeidsgiver: erSykmeldtMedArbeidsgiver,
        trengerOppfolgingsvedtak: false,
        harBehovForArbeidsevneVurdering: false,
        diskresjonskodeFortrolig: null,
        profileringResultat: null
    };
};

const lagHovedstatsborgerskap = (): Statsborgerskap => {
    return {
        statsborgerskap: hentLand(),
        gyldigFra: '1961-06-12'
    };
};

const lagSisteEndringAvBruker = (): SisteEndringAvBruker | null => {
    const randomSisteEndring = randomEndring();

    return {
        tidspunkt: randomDate({past: true}),
        kategori: randomSisteEndring,
        aktivitetId: '12345'
    };
};

const lagAktiviteterAvtaltMedNav = (): AktiviteterAvtaltMedNav => {
    return {
        nesteUtlopsdatoForAlleAktiviteter: randomDate({past: false}),
        nesteUtlopsdatoForFiltrerteAktiviteter: randomDate({past: false}),
        nyesteUtlopteAktivitet: null,
        aktivitetStart: null,
        nesteAktivitetStart: null,
        forrigeAktivitetStart: null
    };
};

const lagMoterMedNav = (): MoterMedNav => {
    const harAvtaltMoteMedNavIDag = Math.random() < 0.3;
    const forstkommendeMoteDato = harAvtaltMoteMedNavIDag ? randomDate({past: false}) : null;
    const forstkommendeMoteVarighetMinutter = harAvtaltMoteMedNavIDag ? randomMotevarighet() : null;

    return {
        harAvtaltMoteMedNavIDag,
        forstkommendeMoteDato,
        forstkommendeMoteVarighetMinutter
    };
};

function lagBruker(): BrukerModell {
    const grunndata = lagGrunndata();

    const maybeVeileder = rnd(0, veiledere.length * 2);
    const veilederId = maybeVeileder < veiledere.length ? veiledere[maybeVeileder].ident : null;
    const random_egenAnsatt = erSkjermet();
    const random_harSkjermetTil = erSkjermet();

    return {
        guid: '',
        etiketter: lagEtiketter(),
        fnr: grunndata.fnr,
        fornavn: grunndata.fornavn,
        etternavn: grunndata.etternavn,
        hovedStatsborgerskap: lagHovedstatsborgerskap(),
        foedeland: hentLand(),
        geografiskBosted: lagGeografiskBosted(),
        tolkebehov: {
            talespraaktolk: hentSpraak(),
            tegnspraaktolk: hentSpraak(),
            sistOppdatert: randomDate({past: true, withoutTimestamp: true})
        },
        barnUnder18AarData: hentBarnUnder18Aar(),
        oppfolgingStartdato: '',
        tildeltTidspunkt: randomDate({past: true}),
        veilederId: veilederId,
        egenAnsatt: random_egenAnsatt,
        skjermetTil: random_harSkjermetTil ? randomDateInNearFuture() : '',
        tiltakshendelse: lagTiltakshendelse(),
        hendelse: lagHendelse(),
        meldingerVenterPaSvar: lagMeldingerVenterPaSvar(),
        aktiviteterAvtaltMedNav: lagAktiviteterAvtaltMedNav(),
        moterMedNav: lagMoterMedNav(),
        sisteEndringAvBruker: lagSisteEndringAvBruker(),
        utdanningOgSituasjonSistEndret: randomDate({past: false}),
        nesteSvarfristCvStillingFraNav: '2023-06-12',
        ytelser: lagYtelser(),
        vedtak14a: lagVedtak14a(),
        fargekategori: lagFargekategori(),
        fargekategoriEnhetId: '1234',
        huskelapp: lagHuskelapp()
    };
}

const erSkjermet = () => {
    let randomArray = new Int8Array(1);
    window.crypto.getRandomValues(randomArray);

    return randomArray[0] % 5 === 0;
};

const hentLand = () => {
    const landListe = [
        'NORGE',
        'SVERIGE',
        'FINLAND',
        'DANMARK',
        'ENGLAND',
        'Saint Vincent og Grenadinene',
        'ISLAND',
        'HELLAS',
        'Elfenbenskysten',
        'Mikronesiaføderasjonen',
        'Den demokratiske republikken São Tomé og Príncipe',
        'Storbritannia Storbritannia og Nord-Irland',
        'Uavhengig og suveren republikken Kiribati',
        'Den føderale demokratiske republikken Etiopia'
    ];

    return landListe[Math.floor(Math.random() * landListe.length)];
};

const hentBostedKommune = () => {
    const spraakListe = ['0301', '1103'];

    let x = Math.floor(Math.random() * 100);

    if (x % 3 === 0) {
        return spraakListe[Math.floor(Math.random() * spraakListe.length)];
    }
    return '';
};

const hentBostedBydel = () => {
    const bostedListe = ['030103', '110307'];

    let randomArray = new Int8Array(2);
    window.crypto.getRandomValues(randomArray);

    if (randomArray[0] % 3 === 0) {
        return bostedListe[Math.abs(randomArray[1] % bostedListe.length)];
    }
    return '';
};

const hentSpraak = () => {
    const spraakListe = ['AR', 'NB', 'ES', 'UK'];

    let randomArray = new Int8Array(2);
    window.crypto.getRandomValues(randomArray);

    if (randomArray[0] % 3 === 0) {
        return spraakListe[Math.abs(randomArray[1] % spraakListe.length)];
    }

    return '';
};

const hentBarnUnder18Aar = (): BarnUnder18AarModell[] => {
    const barnInfo: BarnUnder18AarModell[] = [];
    const randomArray = new Int8Array(10);
    window.crypto.getRandomValues(randomArray);

    let barnAntall = randomArray[0] % 3;

    for (let i = 0; i <= barnAntall; i++) {
        const singleObj: BarnUnder18AarModell = {
            alder: Math.abs(randomArray[i] % 18)
        };
        barnInfo.push(singleObj);
    }

    return barnInfo;
};

const randomEndring = () => {
    const keys = Object.keys(hendelserLabels);
    return keys[(keys.length * Math.random()) << 0];
};

interface RandomDateProps {
    past: boolean;
    /** Returns a date without timestamp, formatted as YYYY-MM-DD*/
    withoutTimestamp?: boolean;
}

const randomDate = ({past, withoutTimestamp = false}: RandomDateProps) => {
    const dag = rnd(1, 31);
    const mnd = rnd(1, 12);
    let ar = rnd(0, 4) + new Date().getFullYear();
    if (past) {
        ar = -rnd(0, 4) + new Date().getFullYear();
    }
    const date = new Date(ar, mnd - 1, dag).toISOString();

    if (withoutTimestamp) {
        return date.slice(0, 10); // End slice at 10 to only get the "YYYY-MM-DD"-part of the ISO-date-string
    }

    return date;
};

const randomDateInNearFuture = () => {
    return moment()
        .add(rnd(0, 20), 'days')
        .add(rnd(0, 23), 'hours')
        .add(rnd(10, 50), 'minutes')
        .format('YYYY-MM-DD HH:mm');
};

/** Returnerer ei møtevarigheit mellom 15 minutt og 7,5 timar
 *  Talet vil alltid vere runda til eit heilt kvarter. */
const randomMotevarighet = () => {
    const base = rnd(1, 30); // Mellom 1 og 30 kvarter (7,5 timar)
    return base * 15; // Møtevarighet i minutt
};

export function hentHuskelappForBruker(fnr: string, enhetId: string) {
    if (huskelapp.fnr === fnr) {
        return huskelapp;
    }
    return {
        huskelappId: lagOverskrift(),
        brukerFnr: fnr,
        kommentar:
            '\n\n\n\n   HEIII   \nasdfølkjasdølfkajsdøflkajsdølfjaksdfølajskdøflajsdølfkjasødlfjaøsldjfølasjdølfjasøjldfjaøldf',
        frist: moment().add(rnd(0, 20), 'days').add(rnd(0, 23), 'hours').format('YYYY-MM-DD'),
        endretAv: 'Meg selv'
    };
}

export function hentMockPlan(): MoteplanModell[] {
    const deltaker1 = {fornavn: 'john', etternavn: 'johnson', fnr: '123'};
    const deltaker2 = {fornavn: 'Mars', etternavn: 'Testson', fnr: '456'};
    const deltaker3 = {fornavn: 'Ada', etternavn: 'Kadabra', fnr: '11223312345'};

    const now = new Date();
    const omToDager = new Date();
    omToDager.setDate(omToDager.getDate() + 4);

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toString();
    }

    function motedataRandomDager(antallMoter: number): MoteplanModell[] {
        const moteliste: MoteplanModell[] = [];

        for (let i = 0; i < antallMoter; i++) {
            const dato = randomDate(now, new Date(2025, 11, 30));
            const varighetMinutter = randomMotevarighet();

            moteliste.push({
                dato,
                varighetMinutter,
                deltaker: deltaker3,
                avtaltMedNav: false
            });
        }
        return moteliste;
    }

    return [
        {
            dato: now.toString(),
            varighetMinutter: 105,
            deltaker: deltaker1,
            avtaltMedNav: true
        },
        {
            dato: '2022-03-23T12:02:35.636Z',
            varighetMinutter: 15,
            deltaker: deltaker1,
            avtaltMedNav: true
        },
        {
            dato: '2022-03-23T13:00:00.636Z',
            varighetMinutter: 60,
            deltaker: deltaker2,
            avtaltMedNav: false
        },
        {
            dato: '2022-03-24T15:00:00.636Z',
            varighetMinutter: 75,
            deltaker: deltaker1,
            avtaltMedNav: true
        },
        {
            dato: '2022-03-25T15:02:35.636Z',
            varighetMinutter: 315,
            deltaker: deltaker2,
            avtaltMedNav: false
        },
        {
            dato: '2022-03-26T15:02:35.636Z',
            varighetMinutter: 75,
            deltaker: deltaker2,
            avtaltMedNav: true
        },
        {
            dato: '2022-03-27T15:02:35.636Z',
            varighetMinutter: 15,
            deltaker: deltaker2,
            avtaltMedNav: true
        },
        {
            dato: omToDager.toString(),
            varighetMinutter: 30,
            deltaker: deltaker3,
            avtaltMedNav: false
        },
        ...motedataRandomDager(5)
    ];
}

const lagRandomOvergangsstonadForEnsligForsorger = (): EnsligeForsorgereOvergangsstonad => {
    return {
        vedtaksPeriodetype: hentRandomVedtaksperiodeType(),
        harAktivitetsplikt: hentRandomAktivitetsplikt(),
        utlopsDato: new Date(randomDate({past: false})),
        yngsteBarnsFodselsdato: new Date(randomDate({past: false}))
    };
};

const hentRandomVedtaksperiodeType = () => {
    const vedtaksperiodeTyper = [
        'Forlengelse',
        'Hovedperiode',
        'Migrering fra Infotrygd',
        'Sanksjon',
        'Periode før fødsel',
        'Utvidelse',
        'Ny periode for nytt barn'
    ];

    return vedtaksperiodeTyper[Math.floor(Math.random() * vedtaksperiodeTyper.length)];
};

const hentRandomAktivitetsplikt = () => {
    const aktivitetspliktUtfall = [true, false, undefined];

    return aktivitetspliktUtfall[Math.floor(Math.random() * aktivitetspliktUtfall.length)];
};

const lagFargekategori = () => {
    const fargekategoriType = rnd(1, 11);
    switch (fargekategoriType) {
        case 1:
            return FargekategoriModell.FARGEKATEGORI_A;
        case 2:
            return FargekategoriModell.FARGEKATEGORI_B;
        case 3:
            return FargekategoriModell.FARGEKATEGORI_C;
        case 4:
            return FargekategoriModell.FARGEKATEGORI_D;
        case 5:
            return FargekategoriModell.FARGEKATEGORI_E;
        case 6:
            return FargekategoriModell.FARGEKATEGORI_F;
        case 7:
            return FargekategoriModell.INGEN_KATEGORI;
        default:
            return null;
    }
};

export const brukere = new Array(123).fill(0).map(() => lagBruker());
