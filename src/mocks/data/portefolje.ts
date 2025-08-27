import moment from 'moment';
import {fakerNB_NO as faker} from '@faker-js/faker';
import {veiledere} from './veiledere';
import {aktiviteter, hendelserLabels} from '../../filtrering/filter-konstanter';
import {
    BarnUnder18AarModell,
    EnsligeForsorgereOvergangsstonad,
    FargekategoriModell,
    GjeldendeVedtak14aModell,
    Hovedmal,
    InnsatsgruppeGjeldendeVedtak14a,
    TiltakshendelseModell,
    UtgattVarselHendelse,
    Utkast14a
} from '../../typer/bruker-modell';
import {rnd} from '../utils';
import {MOCK_CONFIG} from '../constants';
import {MoteplanModell} from '../../typer/moteplan';

faker.seed(MOCK_CONFIG.seed);

const ytelser = [
    'ORDINARE_DAGPENGER',
    'DAGPENGER_MED_PERMITTERING',
    'DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI',
    'LONNSGARANTIMIDLER_DAGPENGER',
    'DAGPENGER_OVRIGE',
    'AAP_MAXTID',
    'AAP_UNNTAK',
    'TILTAKSPENGER'
];

let mockAktoeridLopenummer = 0;
const huskelapp: any = {};

let i = 123456;

function lagGrunndata() {
    const ar = rnd(0, 99);
    const erDoed = Math.random() < (100 - ar * 20) / 100;

    const kjonn = Math.random() > 0.5 ? 'K' : 'M';
    const venterPaSvarFraBruker = randomDate({past: true});
    const venterPaSvarFraNAV = randomDate({past: true});
    const nesteUtlopteAktivitet = randomDate({past: false});

    const brukerAktiviteter = Object.keys(aktiviteter)
        .map((x: string) => x.toLowerCase())
        .reduce((acc, curr) => ({...acc, [curr]: Math.random() > 0.1 ? null : randomDate({past: false})}), {});

    const moteStartTid = Math.random() > 0.5 ? new Date() : null;
    const alleMoterStartTid = Math.random() > 0.5 ? new Date() : null;

    return {
        fnr: String(i++).padStart(11, '0'),
        fornavn: faker.person.firstName(kjonn === 'K' ? 'female' : 'male'),
        etternavn: 'Testson',
        erDoed,
        nesteUtlopteAktivitet,
        venterPaSvarFraBruker,
        venterPaSvarFraNAV,
        aktiviteter: brukerAktiviteter,
        moteStartTid,
        alleMoterStartTid,
        alleMoterSluttTid: alleMoterStartTid && new Date(alleMoterStartTid.getTime() + randomMotevarighet() * 60 * 1000)
    };
}

function lagYtelse() {
    const maybeYtelse = rnd(0, ytelser.length * 1.5);
    const ytelse = maybeYtelse < ytelser.length ? ytelser[maybeYtelse] : null;
    const out = {
        ytelse,
        utlopsdato: '',
        aapmaxtidUke: '',
        aapUnntakUkerIgjen: '',
        aapordinerutlopsdato: ''
    };

    const dag = rnd(1, 31);
    const mnd = rnd(1, 12);
    const ar = rnd(0, 3) + new Date().getFullYear();

    if (ytelse === 'AAP_MAXTID' || ytelse === 'AAP_UNNTAK') {
        const rndDate = new Date(ar, mnd - 1, dag);
        const todayDate = new Date();

        const aaptidUke = Math.round((rndDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24 * 7));

        out.aapmaxtidUke = aaptidUke.toString();
        out.aapUnntakUkerIgjen = aaptidUke.toString();
        if (ytelse === 'AAP_MAXTID') {
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

function lagVedtakUtkast(): Utkast14a | null {
    const maybeUtkast = rnd(0, 1);
    const maybeUtkastOpprettet = rnd(0, 1);
    const ansvarligVeileder = faker.person.firstName() + ' ' + faker.person.lastName();
    if (maybeUtkast > 0.5) {
        return {
            status: maybeUtkastOpprettet ? 'Utkast' : 'Venter på beslutter',
            statusEndret: randomDate({past: true}),
            ansvarligVeileder: ansvarligVeileder
        };
    }
    return null;
}

const lagHuskelapp = fnr => {
    const maybeHuskelapp = rnd(0, 1);
    const huskeklappId = rnd(1, 1000);
    if (maybeHuskelapp > 0.75) {
        return null;
    }

    return {
        huskelappId: huskeklappId,
        brukerFnr: fnr,
        kommentar: '\n\n' + lagOverskrift() + '\n\nDette skal bort ',
        frist: moment().add(rnd(0, 20), 'days').add(rnd(0, 23), 'hours').format('YYYY-MM-DD'),
        enhetId: maybeHuskelapp > 0.7 ? '0220' : '1234',
        sistEndretAv: 'Meg selv',
        endretDato: moment().subtract(rnd(0, 20), 'days').subtract(rnd(0, 23), 'hours').format('YYYY-MM-DD')
    };
};

const lagTiltakshendelse = (): TiltakshendelseModell => ({
    id: '54f06061-4383-417d-a063-1c4fc4701a78',
    opprettet: new Date(),
    tekst: 'Forslag: Avslutt deltakelse',
    lenke: 'https://www.nav.no/54f06061-4383-417d-a063-1c4fc4701a78',
    tiltakstype: 'ARBFORB'
});

const lag14aVedtak = (): GjeldendeVedtak14aModell | null => {
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

const lagUtgattVarsel = (): UtgattVarselHendelse | null => {
    const maybeUtgattVarsel = rnd(0, 1);

    if (maybeUtgattVarsel < 0.5) {
        return {
            beskrivelse: 'Bruker har et utgått varsel',
            dato: '2024-11-29T09:40:00.052559441+01:00',
            lenke: 'https://veilarbpersonflate.intern.dev.nav.no/aktivitetsplan'
        };
    }
    return {
        beskrivelse: 'Bruker har et utgått varsel',
        dato: new Date().toISOString(),
        lenke: 'https://veilarbpersonflate.intern.dev.nav.no/aktivitetsplan',
        detaljer: 'Varsel om stans i oppfølging'
    };
};

function lagBruker(sikkerhetstiltak = []) {
    const grunndata = lagGrunndata();

    const maybeVeileder = rnd(0, veiledere.length * 2);
    const nyForVeileder = maybeVeileder && Math.random() < 25 / 100;
    const nyForEnhet = Math.random() < 25 / 100;
    const veilederId = maybeVeileder < veiledere.length ? veiledere[maybeVeileder].ident : null;

    const aktoerid = mockAktoeridLopenummer++;
    const ytelse = lagYtelse();
    const huskelapp = lagHuskelapp(grunndata.fnr);
    const erSykmeldtMedArbeidsgiver = Math.random() < 25 / 100;
    const vedtakUtkast = lagVedtakUtkast();
    const randomSisteEndring = randomEndring();

    const random_egenAnsatt = erSkjermet();
    const random_harSkjermetTil = erSkjermet();

    return {
        fnr: grunndata.fnr,
        aktoerid: aktoerid,
        fornavn: grunndata.fornavn,
        etternavn: grunndata.etternavn,
        veilederId,
        nyForVeileder,
        nyForEnhet,
        diskresjonskode: null,
        sikkerhetstiltak,
        venterPaSvarFraBruker: grunndata.venterPaSvarFraBruker,
        venterPaSvarFraNAV: grunndata.venterPaSvarFraNAV,
        tiltakshendelse: lagTiltakshendelse(),
        nyesteUtlopteAktivitet: grunndata.nesteUtlopteAktivitet,
        egenAnsatt: random_egenAnsatt ? true : '',
        skjermetTil: random_harSkjermetTil ? randomDateInNearFuture() : '',
        erDoed: grunndata.erDoed,
        ytelse: ytelse.ytelse,
        utlopsdato: ytelse.utlopsdato,
        aktivitetStart: ytelse.utlopsdato,
        nesteAktivitetStart: ytelse.utlopsdato,
        forrigeAktivitetStart: ytelse.utlopsdato,
        aapmaxtidUke: ytelse.aapmaxtidUke,
        aapUnntakUkerIgjen: ytelse.aapUnntakUkerIgjen,
        aapordinerutlopsdato: ytelse.aapordinerutlopsdato,
        aktiviteter: grunndata.aktiviteter,
        erSykmeldtMedArbeidsgiver,
        moteStartTid: grunndata.moteStartTid,
        alleMoterStartTid: grunndata.alleMoterStartTid,
        alleMoterSluttTid: grunndata.alleMoterSluttTid,
        moteErAvtaltMedNAV: grunndata.moteStartTid != null && Math.random() < 0.5,
        utkast14a: vedtakUtkast,
        sisteEndringKategori: randomSisteEndring,
        sisteEndringAktivitetId: '12345',
        sisteEndringTidspunkt: randomDate({past: true}),
        nesteUtlopsdatoAktivitet: randomDate({past: false}),
        hovedStatsborgerskap: {
            statsborgerskap: hentLand(),
            gyldigFra: '1961-06-12',
            gyldigTil: ''
        },
        foedeland: hentLand(),
        bostedKommune: hentBostedKommune(),
        bostedBydel: hentBostedBydel(),
        bostedSistOppdatert: randomDate({past: true}),
        tolkebehov: {
            talespraaktolk: hentSpraak(),
            tegnspraaktolk: hentSpraak(),
            sistOppdatert: randomDate({past: true, withoutTimestamp: true})
        },
        nesteSvarfristCvStillingFraNav: '2023-06-12',
        avvik14aVedtak: randomAvvik14aVedtak(),
        ensligeForsorgereOvergangsstonad: lagRandomOvergangsstonadForEnsligForsorger(),
        barnUnder18AarData: hentBarnUnder18Aar(),
        utdanningOgSituasjonSistEndret: randomDate({past: false}),
        fargekategori: lagFargekategori(),
        fargekategoriEnhetId: '1234',
        huskelapp,
        gjeldendeVedtak14a: lag14aVedtak(),
        utgattVarsel: lagUtgattVarsel()
    };
}

const erSkjermet = () => {
    let randomArray = new Int8Array(1);
    window.crypto.getRandomValues(randomArray);

    return randomArray[0] % 5 === 0;
};

const randomAvvik14aVedtak = () => {
    const avvikListe = [
        'HOVEDMAL_ULIK',
        'INNSATSGRUPPE_ULIK',
        'INNSATSGRUPPE_OG_HOVEDMAL_ULIK',
        'INNSATSGRUPPE_MANGLER_I_NY_KILDE',
        'INGEN_AVVIK'
    ];

    return avvikListe[Math.floor(Math.random() * avvikListe.length)];
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

    return null;
};

const hentBarnUnder18Aar = () => {
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
