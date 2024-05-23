import {innloggetVeileder, veiledere} from './veiledere';
import {aktiviteter, hendelserLabels} from '../../filtrering/filter-konstanter';
import {fakerNB_NO as faker} from '@faker-js/faker';
import {
    BarnUnder18Aar,
    EnsligeForsorgereOvergangsstonad,
    FargekategoriModell,
    KategoriModell
} from '../../model-interfaces';
import moment from 'moment';
import {rnd} from '../utils';
import {MOCK_CONFIG} from '../constants';
import {MoteData} from '../../minoversikt/moteplan/moteplan';

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
const arbeidsliste: any = [];
const huskelapp: any = {};

let i = 123456;

function lagGrunndata() {
    const dag = rnd(1, 31);
    const mnd = rnd(1, 12);
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
        fodselsdato: {
            dayOfMonth: dag,
            monthValue: mnd,
            year: 1900 + ar
        },
        fornavn: faker.person.firstName(kjonn === 'K' ? 'female' : 'male'),
        etternavn: 'Testson',
        kjonn,
        erDoed,
        nesteUtlopteAktivitet,
        venterPaSvarFraBruker,
        venterPaSvarFraNAV,
        aktiviteter: brukerAktiviteter,
        moteStartTid,
        moteSluttTid: moteStartTid && new Date(moteStartTid.getTime() + 15 * 60 * 1000),
        alleMoterStartTid,
        alleMoterSluttTid: alleMoterStartTid && new Date(alleMoterStartTid.getTime() + 45 * 60 * 1000)
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
        return faker.lorem.word().substring(0, 12);
    }
    return null;
}

function lagVedtakUtkast() {
    const maybeUtkast = rnd(0, 1);
    const maybeUtkastOpprettet = rnd(0, 1);
    const ansvarligVeileder = faker.person.firstName() + ' ' + faker.person.lastName();
    if (maybeUtkast > 0.5) {
        return {
            utkast14aStatusEndret: randomDate({past: true}),
            utkast14aStatus: maybeUtkastOpprettet ? 'Utkast' : 'Venter på beslutter',
            utkast14aAnsvarligVeileder: ansvarligVeileder
        };
    }
    return {
        utkast14aStatusEndret: null,
        utkast14aStatus: null,
        utkast14aAnsvarligVeileder: ''
    };
}

export const tomArbeidsliste = {
    kommentar: null,
    frist: null,
    isOppfolgendeVeileder: null,
    arbeidslisteAktiv: false,
    sistEndretAv: {},
    kategori: null,
    hentetKommentarOgTittel: true
};

function lagArbeidsliste(aktoerid, fnr) {
    const maybeArbeidsliste = rnd(0, 1);
    if (maybeArbeidsliste > 0.5) {
        return tomArbeidsliste;
    }

    const kategoriType = rnd(1, 4);
    let kategori;
    if (kategoriType === 1) {
        kategori = KategoriModell.BLA;
    } else if (kategoriType === 2) {
        kategori = KategoriModell.GRONN;
    } else if (kategoriType === 3) {
        kategori = KategoriModell.GUL;
    } else {
        kategori = KategoriModell.LILLA;
    }

    const arbeidslisteElement = {
        overskrift: null,
        kommentar: null,
        frist: new Date(),
        isOppfolgendeVeileder: true,
        arbeidslisteAktiv: true,
        sistEndretAv: {veilederId: innloggetVeileder.ident},
        kategori,
        hentetKommentarOgTittel: true
    };

    arbeidsliste.push({
        ...arbeidslisteElement,
        aktoerid: aktoerid,
        fodselsnummer: fnr,
        overskrift: lagOverskrift(),
        kommentar:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure do'
    });

    return arbeidslisteElement;
}

const lagHuskelapp = fnr => {
    const maybeHuskelapp = rnd(0, 1);
    if (maybeHuskelapp > 0.75) {
        return null;
    }
    return {
        huskelappId: lagOverskrift(),
        brukerFnr: fnr,
        kommentar: lagOverskrift(),
        frist: moment().add(rnd(0, 20), 'days').add(rnd(0, 23), 'hours').format('YYYY-MM-DD')
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
    const arbeidsliste = lagArbeidsliste(aktoerid, grunndata.fnr);
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
        nyesteUtlopteAktivitet: grunndata.nesteUtlopteAktivitet,
        egenAnsatt: random_egenAnsatt ? true : '',
        skjermetTil: random_harSkjermetTil ? randomDateInNearFuture() : '',
        erDoed: grunndata.erDoed,
        fodselsdagIMnd: grunndata.fodselsdato.dayOfMonth,
        fodselsdato: grunndata.fodselsdato,
        kjonn: grunndata.kjonn,
        ytelse: ytelse.ytelse,
        utlopsdato: ytelse.utlopsdato,
        aktivitetStart: ytelse.utlopsdato,
        nesteAktivitetStart: ytelse.utlopsdato,
        forrigeAktivitetStart: ytelse.utlopsdato,
        aapmaxtidUke: ytelse.aapmaxtidUke,
        aapUnntakUkerIgjen: ytelse.aapUnntakUkerIgjen,
        aapordinerutlopsdato: ytelse.aapordinerutlopsdato,
        arbeidsliste,
        aktiviteter: grunndata.aktiviteter,
        erSykmeldtMedArbeidsgiver,
        moteStartTid: grunndata.moteStartTid,
        moteSluttTid: grunndata.moteSluttTid,
        alleMoterStartTid: grunndata.alleMoterStartTid,
        alleMoterSluttTid: grunndata.alleMoterSluttTid,
        moteErAvtaltMedNAV: grunndata.moteStartTid != null && Math.random() < 0.5,
        utkast14aStatus: vedtakUtkast.utkast14aStatus,
        utkast14aStatusEndret: vedtakUtkast.utkast14aStatusEndret,
        utkast14aAnsvarligVeileder: vedtakUtkast.utkast14aAnsvarligVeileder,
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
        harFlereStatsborgerskap: Boolean(Math.random() > 0.5),
        innflyttingTilNorgeFraLand: '',
        bostedKommune: hentBostedKommune(),
        bostedBydel: hentBostedBydel(),
        bostedSistOppdatert: randomDate({past: true}),
        talespraaktolk: hentSpraak(),
        tegnspraaktolk: hentSpraak(),
        tolkBehovSistOppdatert: randomDate({past: true}),
        nesteSvarfristCvStillingFraNav: '2023-06-12',
        avvik14aVedtak: randomAvvik14aVedtak(),
        ensligeForsorgereOvergangsstonad: lagRandomOvergangsstonadForEnsligForsorger(),
        barnUnder18AarData: hentBarnUnder18Aar(),
        brukersSituasjonSistEndret: randomDate({past: false}),
        fargekategori: lagFargekategori(),
        huskelapp
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
    const barnInfo: BarnUnder18Aar[] = [];
    const randomArray = new Int8Array(10);
    window.crypto.getRandomValues(randomArray);

    let barnAntall = randomArray[0] % 3;

    for (let i = 0; i <= barnAntall; i++) {
        const singleObj: BarnUnder18Aar = {
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

const randomDate = ({past}) => {
    const dag = rnd(1, 31);
    const mnd = rnd(1, 12);
    let ar = rnd(0, 4) + new Date().getFullYear();
    if (past) {
        ar = -rnd(0, 4) + new Date().getFullYear();
    }
    return new Date(ar, mnd - 1, dag).toISOString();
};

const randomDateInNearFuture = () => {
    return moment()
        .add(rnd(0, 20), 'days')
        .add(rnd(0, 23), 'hours')
        .add(rnd(10, 50), 'minutes')
        .format('YYYY-MM-DD HH:mm');
};

export function hentArbeidsliste() {
    return arbeidsliste;
}

export function hentArbeidslisteForBruker(fnr: {fodselsnummer: any}) {
    const {fodselsnummer} = fnr;
    const arbeidslisteForBruker = arbeidsliste.find(
        arbeidslisteForBruker => arbeidslisteForBruker.fodselsnummer === fodselsnummer
    );

    if (arbeidslisteForBruker) {
        return arbeidslisteForBruker;
    }
    return lagArbeidsliste('1', fnr);
}

export function hentHuskelappForBruker(fnr: string, enhetId: string) {
    if (huskelapp.fnr === fnr) {
        return huskelapp;
    }
    return {
        huskelappId: lagOverskrift(),
        brukerFnr: fnr,
        kommentar: lagOverskrift(),
        frist: moment().add(rnd(0, 20), 'days').add(rnd(0, 23), 'hours').format('YYYY-MM-DD')
    };
}

export function hentMockPlan(): MoteData[] {
    const deltaker1 = {fornavn: 'john', etternavn: 'johnson', fnr: '123'};
    const deltaker2 = {fornavn: 'Mars', etternavn: 'Testson', fnr: '456'};
    const deltaker3 = {fornavn: 'Ada', etternavn: 'Kadabra', fnr: '11223312345'};

    const now = new Date();
    const omToDager = new Date();
    omToDager.setDate(omToDager.getDate() + 4);

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toString();
    }
    function motedataRandomDager(antallMoter: number): MoteData[] {
        const moteliste: MoteData[] = [];
        for (let i = 0; i < antallMoter; i++) {
            const dato = randomDate(now, new Date(2025, 11, 30));
            moteliste.push({
                dato,
                deltaker: deltaker3,
                avtaltMedNav: false
            });
        }
        return moteliste;
    }

    return [
        {
            dato: now.toString(),
            deltaker: deltaker1,
            avtaltMedNav: true
        },
        {
            dato: '2022-03-23T12:02:35.636Z',
            deltaker: deltaker1,
            avtaltMedNav: true
        },
        {
            dato: '2022-03-25T15:02:35.636Z',
            deltaker: deltaker2,
            avtaltMedNav: false
        },
        {
            dato: '2022-03-24T15:02:35.636Z',
            deltaker: deltaker1,
            avtaltMedNav: true
        },
        {
            dato: '2022-03-26T15:02:35.636Z',
            deltaker: deltaker2,
            avtaltMedNav: true
        },
        {
            dato: '2022-03-27T15:02:35.636Z',
            deltaker: deltaker2,
            avtaltMedNav: true
        },
        {dato: omToDager.toString(), deltaker: deltaker3, avtaltMedNav: false},
        ...motedataRandomDager(5)
    ];
}

const lagRandomOvergangsstonadForEnsligForsorger = (): EnsligeForsorgereOvergangsstonad => {
    return {
        vedtaksPeriodetype: hentRandomVedtaksperiodeType(),
        harAktivitetsplikt: hentRandomAktivitetsplikt(),
        utlopsDato: new Date(randomDate({past: false})),
        yngsteBarnsFødselsdato: new Date(randomDate({past: false}))
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

export const testperson_uten_arbeidsliste = lagBruker();
testperson_uten_arbeidsliste.arbeidsliste = tomArbeidsliste;
testperson_uten_arbeidsliste.fornavn = 'Aase';
testperson_uten_arbeidsliste.etternavn = 'Uten Arbeidsliste';

export const testperson_uten_arbeidsliste2 = lagBruker();
testperson_uten_arbeidsliste2.arbeidsliste = tomArbeidsliste;
testperson_uten_arbeidsliste2.fornavn = 'Åse';
testperson_uten_arbeidsliste2.etternavn = 'Uten Arbeidsliste';
