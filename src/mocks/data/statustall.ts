import {brukere as portefolje} from './portefolje';
import {StatustallInnhold, StatustallVeileder} from '../../ducks/statustall/statustall-typer';

export const statustallVeileder: {statustall: StatustallVeileder} = {
    statustall: {
        totalt: portefolje.length,
        ufordelteBrukere: 2032,
        nyeBrukereForVeileder: 15,
        inaktiveBrukere: 23,
        venterPaSvarFraNAV: 150,
        venterPaSvarFraBruker: 231,
        moterMedNAVIdag: 40,
        tiltakshendelser: 20,
        utgatteVarsel: 10,
        utlopteAktiviteter: 123,
        ikkeIavtaltAktivitet: 1231,
        iavtaltAktivitet: 2323,
        erSykmeldtMedArbeidsgiver: 20,
        trengerOppfolgingsvedtak: 84,
        underVurdering: 14,
        mineHuskelapper: 16,
        fargekategoriA: 1,
        fargekategoriB: 2,
        fargekategoriC: 3,
        fargekategoriD: 4,
        fargekategoriE: 5,
        fargekategoriF: 6,
        fargekategoriIngenKategori: 7
    }
};

export const statustallEnhet: {
    statustallMedBrukerinnsyn: StatustallInnhold;
    statustallUtenBrukerinnsyn: StatustallInnhold;
} = {
    statustallMedBrukerinnsyn: {
        totalt: portefolje.length,
        ufordelteBrukere: 2032,
        nyeBrukereForVeileder: 15,
        inaktiveBrukere: 23,
        venterPaSvarFraNAV: 150,
        venterPaSvarFraBruker: 231,
        moterMedNAVIdag: 40,
        tiltakshendelser: 20,
        utgatteVarsel: 10,
        utlopteAktiviteter: 123,
        ikkeIavtaltAktivitet: 1231,
        iavtaltAktivitet: 2323,
        erSykmeldtMedArbeidsgiver: 20,
        trengerOppfolgingsvedtak: 84,
        underVurdering: 14,
        mineHuskelapper: 16
    },
    statustallUtenBrukerinnsyn: {
        totalt: portefolje.length,
        ufordelteBrukere: 2,
        nyeBrukereForVeileder: 2,
        inaktiveBrukere: 2,
        venterPaSvarFraNAV: 2,
        venterPaSvarFraBruker: 2,
        moterMedNAVIdag: 2,
        tiltakshendelser: 2,
        utgatteVarsel: 2,
        utlopteAktiviteter: 2,
        ikkeIavtaltAktivitet: 2,
        iavtaltAktivitet: 2,
        erSykmeldtMedArbeidsgiver: 2,
        trengerOppfolgingsvedtak: 4,
        underVurdering: 2,
        mineHuskelapper: 16
    }
};
