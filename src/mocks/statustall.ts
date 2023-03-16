import portefolje from './portefolje';
import {Statustall} from '../ducks/statustall';

const statustall: Statustall = {
    totalt: portefolje.length,
    ufordelteBrukere: 2032,
    nyeBrukereForVeileder: 15,
    inaktiveBrukere: 23,
    venterPaSvarFraNAV: 150,
    venterPaSvarFraBruker: 231,
    utlopteAktiviteter: 123,
    ikkeIavtaltAktivitet: 1231,
    iavtaltAktivitet: 2323,
    minArbeidsliste: 10,
    minArbeidslisteBla: 3,
    minArbeidslisteLilla: 2,
    minArbeidslisteGronn: 1,
    minArbeidslisteGul: 5,
    erSykmeldtMedArbeidsgiver: 20,
    trengerVurdering: 42,
    moterMedNAVIdag: 40,
    underVurdering: 14,
    adressebeskyttelseEllerSkjermingTotalt: 20,
    adressebeskyttelseEllerSkjermingUfordelte: 10,
    adressebeskyttelseEllerSkjermingVenterPaSvarFraNAV: 10
};

export default statustall;
