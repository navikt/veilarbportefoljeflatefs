import { Kolonne } from '../../../ducks/ui/listevisning';

export interface Alternativ {
    tekstid: string;
    checkboxDisabled?: boolean;
}

export const alternativerConfig = new Map<Kolonne, Alternativ>();
alternativerConfig.set(Kolonne.BRUKER, {tekstid: 'listevisning.valg.bruker', checkboxDisabled: true});
alternativerConfig.set(Kolonne.FODSELSNR, {tekstid: 'listevisning.valg.fodselsnr', checkboxDisabled: true});
alternativerConfig.set(Kolonne.VEILEDER, {tekstid: 'listevisning.valg.veileder'});
alternativerConfig.set(Kolonne.NAVIDENT, {tekstid: 'listevisning.valg.navident'});
alternativerConfig.set(Kolonne.VENTER_SVAR, {tekstid: 'listevisning.valg.ventersvar'});
alternativerConfig.set(Kolonne.UTLOP_YTELSE, {tekstid: 'listevisning.valg.utlopytelse'});
alternativerConfig.set(Kolonne.UTLOP_AKTIVITET, {tekstid: 'listevisning.valg.utlopaktivitet'});
alternativerConfig.set(Kolonne.UTLOPTE_AKTIVITETER, {tekstid: 'listevisning.valg.utlopteaktiviteter'});
alternativerConfig.set(Kolonne.AVTALT_AKTIVITET, {tekstid: 'listevisning.valg.avtaltaktivitet'});
alternativerConfig.set(Kolonne.START_DATO_AKTIVITET, {tekstid: 'listevisning.valg.aktivitet_start'});
alternativerConfig.set(Kolonne.NESTE_START_DATO_AKTIVITET, {tekstid: 'listevisning.valg.neste_aktivitet_start'});
alternativerConfig.set(Kolonne.FORRIGE_START_DATO_AKTIVITET, {tekstid: 'listevisning.valg.forrige_aktivitet_start'});
