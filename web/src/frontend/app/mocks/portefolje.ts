/* eslint-disable */
import veiledereResponse, { innloggetVeileder } from './veiledere';
import { aktiviteter } from '../filtrering/filter-konstanter';
import { rnd, MOCK_CONFIG } from './utils';
import * as faker from 'faker/locale/nb_NO';

faker.seed(MOCK_CONFIG.seed);

const veiledere = veiledereResponse.veilederListe;

const ytelser = [
    'ORDINARE_DAGPENGER',
    'DAGPENGER_MED_PERMITTERING',
    'DAGPENGER_OVRIGE',
    'APP_MAXTID',
    'AAP_UNNTAK',
    'TILTAKSPENGER'
];

function partall() {
    return rnd(0, 4) * 2;
}
function oddetall() {
    return rnd(1, 5) * 2 - 1;
}

function lagGrunndata() {
    const dag = rnd(1, 31);
    const mnd = rnd(1, 12);
    const ar = rnd(0, 99);
    const erDoed = Math.random() < ((100 - ar) / 100);

    const arhundre = rnd(0, 99).toString().padStart(2, '0');
    const kjonn = Math.random() > 0.5 ? 'K' : 'M';
    const kjonnsiffer = kjonn === 'K' ? partall() : oddetall();
    const individsifre = `${arhundre}${kjonnsiffer}`;
    const venterPaSvarFraBruker = randomDate({past:true});
    const venterPaSvarFraNAV = randomDate({past:true});
    const nyesteUtlopteAktivitet = randomDate({past:true});
    const diskresjonskode = rnd(0,10) > 8 ? '7' : null;

    const kontrollsifre = `${rnd(0, 9)}${rnd(0, 9)}`;

    const brukerAktiviteter = Object.keys(aktiviteter)
        .reduce( (acc, curr) => ({...acc, [curr]: Math.random() > 0.05 ? null : new Date() }), {});

    return {
        fnr: `${dag.toString().padStart(2, '0')}${mnd.toString().padStart(2, '0')}${ar.toString().padStart(2, '0')}${individsifre}${kontrollsifre}`,
        fodselsdato: {
            dayOfMonth: dag,
            monthValue: mnd,
            year: 1900 + ar
        },
        fornavn: faker.name.firstName(kjonn === 'K' ? 1 : 0),
        etternavn: faker.name.lastName(kjonn === 'K' ? 1 : 0),
        kjonn,
        erDoed,
        nyesteUtlopteAktivitet,
        venterPaSvarFraBruker,
        venterPaSvarFraNAV,
        aktiviteter: brukerAktiviteter
    };
}

function lagYtelse() {
    const maybeYtelse = rnd(0, ytelser.length * 1.5);
    const ytelse = maybeYtelse < ytelser.length ? ytelser[maybeYtelse] : null;

    const out = {
        ytelse,
        utlopsdato: '',
        utlopsdatoFasett: '',
        aapMaxtid: '',
        aapMaxtidFasett: ''
    };

    const dag = rnd(1, 31);
    const mnd = rnd(1, 12);
    const ar = rnd(0, 4) + new Date().getFullYear();

    if (ytelse === 'AAP_MAXTID') {
        out.aapMaxtid = new Date(ar, mnd - 1, dag).toISOString();
        out.aapMaxtidFasett = `KV${rnd(1, 16)}`;
    } else {
        out.utlopsdato = new Date(ar, mnd, dag).toISOString();
        out.utlopsdatoFasett = `MND${rnd(1, 12)}`;
    }

    return out;
}

function lagArbeidsliste() {
    const maybeArbeidsliste = rnd(0, 1);
    if (maybeArbeidsliste > 0.5) {
        return {
            kommentar: null,
            frist: null,
            isOppfolgendeVeileder: null,
            arbeidslisteAktiv: false,
            sistEndretAv: {}
        };
    }

    return ({
        kommentar: 'En random kommentar',
        frist: new Date(),
        isOppfolgendeVeileder: true,
        arbeidslisteAktiv: true,
        sistEndretAv: {veilederId: innloggetVeileder.ident}
    });
}

function lagBruker(sikkerhetstiltak = [], egenAnsatt = false) {
    const grunndata = lagGrunndata();

    const maybeVeileder = rnd(0, veiledere.length * 2);
    const veilederId = maybeVeileder < veiledere.length ? veiledere[maybeVeileder].ident : null;

    const ytelse = lagYtelse();
    const arbeidsliste = lagArbeidsliste();

    return {
        fnr: grunndata.fnr,
        fornavn: grunndata.fornavn,
        etternavn: grunndata.etternavn,
        veilederId,
        diskresjonskode: null,
        sikkerhetstiltak,
        venterPaSvarFraBruker: grunndata.venterPaSvarFraBruker,
        venterPaSvarFraNAV: grunndata.venterPaSvarFraNAV,
        nyesteUtlopteAktivitet: grunndata.nyesteUtlopteAktivitet,
        egenAnsatt,
        erDoed: grunndata.erDoed,
        fodselsdagIMnd: grunndata.fodselsdato.dayOfMonth,
        fodselsdato: grunndata.fodselsdato,
        kjonn: grunndata.kjonn,
        ytelse: ytelse.ytelse,
        utlopsdato: ytelse.utlopsdato,
        utlopsdatoFasett: ytelse.utlopsdatoFasett,
        aapMaxtid: ytelse.aapMaxtid,
        aapMaxtidFasett: ytelse.aapMaxtidFasett,
        arbeidsliste,
        aktiviteter: grunndata.aktiviteter
    };
}

const randomDate = ({past}) => {
    const dag = rnd(1, 31);
    const mnd = rnd(1, 12);
    let ar = rnd(0, 4) + new Date().getFullYear();
    if(past) {
        ar = -rnd(0,4) + new Date().getFullYear();
    }
    return new Date(ar, mnd-1, dag).toISOString();
};

export default new Array(123).fill(0).map(() => lagBruker());
