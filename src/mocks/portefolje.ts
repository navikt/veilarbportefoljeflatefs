import {veiledere, innloggetVeileder} from './veiledere';
import {aktiviteter, hendelserLabels} from '../filtrering/filter-konstanter';
import {MOCK_CONFIG, rnd} from './utils';
import {faker} from '@faker-js/faker/locale/nb_NO';
import {KategoriModell} from '../model-interfaces';
import moment from "moment";

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
        fornavn: faker.name.firstName(kjonn === 'K' ? 'female' : 'male'),
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
        aapUnntakUkerIgjen: ''
    };

    const dag = rnd(1, 31);
    const mnd = rnd(1, 12);
    const ar = rnd(0, 4) + new Date().getFullYear();

    if (ytelse === 'AAP_MAXTID' || ytelse === 'AAP_UNNTAK') {
        const rndDate = new Date(ar, mnd - 1, dag).getTime();
        const todayDate = new Date().getTime();

        const aaptidUke = Math.round((rndDate - todayDate) / (1000 * 60 * 60 * 24 * 7));

        out.aapmaxtidUke = aaptidUke.toString();
        out.aapUnntakUkerIgjen = aaptidUke.toString();
    } else {
        out.utlopsdato = new Date(ar, mnd, dag).toISOString();
    }

    return out;
}

function lagOverskrift() {
    const maybeOverskrift = rnd(0, 1);
    if (maybeOverskrift > 0.5) {
        return faker.random.word().substr(0, 12);
    }
    return null;
}

function lagVedtakUtkast() {
    const maybeUtkast = rnd(0, 1);
    const maybeUtkastOpprettet = rnd(0, 1);
    const ansvarligVeileder = faker.name.firstName() + ' ' + faker.name.lastName();
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

function lagArbeidsliste(aktoerid, fnr) {
    const maybeArbeidsliste = rnd(0, 1);
    if (maybeArbeidsliste > 0.5) {
        return {
            kommentar: null,
            frist: null,
            isOppfolgendeVeileder: null,
            arbeidslisteAktiv: false,
            sistEndretAv: {},
            kategori: null
        };
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
        kategori
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

function lagBruker(sikkerhetstiltak = [], egenAnsatt = false) {
    const grunndata = lagGrunndata();

    const maybeVeileder = rnd(0, veiledere.length * 2);
    const nyForVeileder = maybeVeileder && Math.random() < 25 / 100;
    const nyForEnhet = Math.random() < 25 / 100;
    const veilederId = maybeVeileder < veiledere.length ? veiledere[maybeVeileder].ident : null;

    const aktoerid = mockAktoeridLopenummer++;
    const ytelse = lagYtelse();
    const arbeidsliste = lagArbeidsliste(aktoerid, grunndata.fnr);
    const erSykmeldtMedArbeidsgiver = Math.random() < 25 / 100;
    const vedtakUtkast = lagVedtakUtkast();
    const randomSisteEndring = randomEndring();

    const random_eggenAnsatt = Math.random() < 0.5;

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
        egenAnsatt,
        skjermetTil: random_eggenAnsatt ? randomDateInNearFuture() : '',
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
        talespraaktolk: hentSpraak(),
        tegnspraaktolk: hentSpraak(),
        tolkBehovSistOppdatert: randomDate({past: true})
    };
}

const hentLand = () => {
    const landListe = ['NORGE', 'SVERIGE', 'FINLAND', 'DANMARK', 'ENGLAND', 'MONTENEGRO', 'ISLAND', 'HELLAS'];

    return landListe[Math.floor(Math.random() * landListe.length)];
};

const hentSpraak = () => {
    const spraakListe = [null, 'Italiensk ', 'Engelsk', 'Spansk', 'Norsk', 'Fransk', 'Portugisisk', 'Rumensk'];

    return spraakListe[Math.floor(Math.random() * spraakListe.length)];
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

export function hentArbeidslisteForBruker(fnr) {
    const {fodselsnummer} = fnr;
    const arbeidslisteForBruker = arbeidsliste.find(
        arbeidslisteForBruker => arbeidslisteForBruker.fodselsnummer === fodselsnummer
    );

    if (arbeidslisteForBruker) {
        return arbeidslisteForBruker;
    }
    return lagArbeidsliste('1', fnr);
}

export function hentMockPlan() {
    const omToDager = new Date();
    omToDager.setDate(omToDager.getDate() + 4);
    return [
        {dato: new Date(), deltaker: {fornavn: 'john', etternavn: 'johnson', fnr: '123'}, avtaltMedNav: true},
        {
            dato: '2022-03-23T12:02:35.636Z',
            deltaker: {fornavn: 'john', etternavn: 'johnson'},
            avtaltMedNav: true
        },
        {
            dato: '2022-03-25T15:02:35.636Z',
            deltaker: {fornavn: 'john', etternavn: 'testson', fnr: '123'},
            avtaltMedNav: false
        },
        {
            dato: '2022-03-24T15:02:35.636Z',
            deltaker: {fornavn: 'john', etternavn: 'tester', fnr: '123'},
            avtaltMedNav: true
        },
        {
            dato: '2022-03-26T15:02:35.636Z',
            deltaker: {fornavn: 'Mars', etternavn: 'Johnson', fnr: '123'},
            avtaltMedNav: true
        },
        {
            dato: '2022-03-27T15:02:35.636Z',
            deltaker: {fornavn: 'Mars', etternavn: 'Johnson', fnr: '123'},
            avtaltMedNav: true
        },
        {dato: omToDager, deltaker: {fornavn: 'X', etternavn: 'tester4', fnr: '123'}, avtaltMedNav: false}
    ];
}

export default new Array(123).fill(0).map(() => lagBruker());
