import faker from 'faker';
import veiledereResponse from './veiledere';
const veiledere = veiledereResponse.veilederListe;

const ytelser = [
    'ORDINARE_DAGPENGER',
    'DAGPENGER_MED_PERMITTERING',
    'DAGPENGER_OVRIGE',
    'APP_MAXTID',
    'AAP_UNNTAK',
    'TILTAKSPENGER'
];

function rnd(start, stop) {
    return Math.round(Math.random() * (stop - start) + start);
}

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

    const kontrollsifre = `${rnd(0, 9)}${rnd(0, 9)}`;

    return {
        fnr: `${dag.toString().padStart(2, '0')}${mnd.toString().padStart(2, '0')}${ar.toString().padStart(2, '0')}${individsifre}${kontrollsifre}`,
        fodselsdato: {
            'dayOfMonth': dag,
            'monthValue': mnd,
            'year': 1900 + ar,
        },
        fornavn: faker.name.firstName(kjonn === 'K' ? 1 : 0),
        etternavn: faker.name.lastName(kjonn === 'K' ? 1 : 0),
        kjonn,
        erDoed
    };
}

function lagYtelse() {
    const maybeYtelse = rnd(0, ytelser.length * 1.5);
    const ytelse = maybeYtelse  < ytelser.length ? ytelser[maybeYtelse] : null;

    const out = {
        ytelse,
        utlopsdato: null,
        utlopsdatoFasett: null,
        aapMaxtid: null,
        aapMaxtidFasett: null
    };

    if (!ytelse) {
        return out;
    }

    const dag = rnd(1, 31);
    const mnd = rnd(1, 12);
    const ar = rnd(0, 4);

    if (ytelse === 'AAP_MAXTID') {
        out['aapMaxtid'] = {
            'dayOfMonth': dag,
            'monthValue': mnd,
            'year': new Date().getYear() + 1900 + ar,
        };
        out['aapMaxtidFasett'] = `KV${rnd(1,16)}`
    } else{
        out['utlopsdato'] = {
            'dayOfMonth': dag,
            'monthValue': mnd,
            'year': new Date().getYear() + 1900 + ar,
        };
        out['utlopsdatoFasett'] = `MND${rnd(1,12)}`
    }

    return out;
}

function lagBruker(sikkerhetstiltak = [], diskresjonskode = null, egenAnsatt = false) {
    const grunndata = lagGrunndata();

    const maybeVeileder = rnd(0, veiledere.length * 2);
    const veilederId = maybeVeileder  < veiledere.length ? veiledere[maybeVeileder].ident : null;

    const ytelse = lagYtelse();

    return {
        'fnr': grunndata.fnr,
        'fornavn': grunndata.fornavn,
        'etternavn': grunndata.etternavn,
        'veilederId': veilederId,
        'sikkerhetstiltak': sikkerhetstiltak,
        'diskresjonskode': diskresjonskode,
        'egenAnsatt': egenAnsatt,
        'erDoed': grunndata.erDoed,
        'fodselsdagIMnd': grunndata.fodselsdato.dayOfMonth,
        'fodselsdato': grunndata.fodselsdato,
        'kjonn': grunndata.kjonn,
        'ytelse': ytelse.ytelse,
        'utlopsdato': ytelse.utlopsdato,
        'utlopsdatoFasett': ytelse.utlopsdatoFasett,
        'aapMaxtid': ytelse.aapMaxtid,
        'aapMaxtidFasett': ytelse.aapMaxtidFasett
    };
}

export default new Array(45).fill(0).map(() => lagBruker());
