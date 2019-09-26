import {BrukerModell} from "../model-interfaces";
import brukerfnr from "../components/tabell/brukerfnr";

export const statustall = (brukere: any) => ({
    totalt: brukerfnr.length,
    ufordelteBrukere: brukere.filter(b => b.nyForEnhet).length || 10,
    nyeBrukereForVeileder: brukere.filter(b => b.nyForVeileder).length,
    inaktiveBrukere: 10,
    venterPaSvarFraNAV: brukere.filter(b => !!b.venterPaSvarFraNAV).length,
    venterPaSvarFraBruker: brukere.filter(b => !!b.venterPaSvarFraBruker).length,
    utlopteAktiviteter: 123,
    ikkeIavtaltAktivitet: 10,
    iavtaltAktivitet: 2323,
    minArbeidsliste: 10,
    erSykmeldtMedArbeidsgiver: brukere.filter(f => f.erSykmeldtMedArbeidsgiver).length,
    trengerVurdering: brukere.filter(f => f.trengerVurdering).length,
    moterMedNAVIdag: brukere.filter(b => !!b.moteSluttTid).length,
});
