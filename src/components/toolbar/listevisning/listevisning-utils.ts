import { Kolonne } from '../../../ducks/ui/listevisning';

export interface Alternativ {
    tekstlabel: string;
    checkboxDisabled?: boolean;
}

export const alternativerConfig = new Map<Kolonne, Alternativ>();
alternativerConfig.set(Kolonne.BRUKER, {tekstlabel: 'Bruker', checkboxDisabled: true});
alternativerConfig.set(Kolonne.FODSELSNR, {tekstlabel: 'Fødselsnr', checkboxDisabled: true});
alternativerConfig.set(Kolonne.OPPFOLGINGSTARTET, {tekstlabel: 'Oppfølging startet', checkboxDisabled: true});
alternativerConfig.set(Kolonne.VEILEDER, {tekstlabel: 'Veileder'});
alternativerConfig.set(Kolonne.NAVIDENT, {tekstlabel: 'NAV-ident'});
alternativerConfig.set(Kolonne.VENTER_SVAR, {tekstlabel: 'Venter på svar fra veileder'});
alternativerConfig.set(Kolonne.UTLOP_YTELSE, {tekstlabel: 'Utløp ytelse'});
alternativerConfig.set(Kolonne.UTLOP_AKTIVITET, {tekstlabel: 'Første sluttdato av valgte aktiviteter'});
alternativerConfig.set(Kolonne.UTLOPTE_AKTIVITETER, {tekstlabel: 'Utløpte aktiviteter'});
alternativerConfig.set(Kolonne.AVTALT_AKTIVITET, {tekstlabel: 'Neste utløpsdato aktivitet'});
alternativerConfig.set(Kolonne.START_DATO_AKTIVITET, {tekstlabel: 'Startdato aktivitet'});
alternativerConfig.set(Kolonne.NESTE_START_DATO_AKTIVITET, {tekstlabel: 'Neste startdato aktivitet'});
alternativerConfig.set(Kolonne.FORRIGE_START_DATO_AKTIVITET, {tekstlabel: 'Startdato aktivitet passert'});
alternativerConfig.set(Kolonne.MOTER_IDAG, {tekstlabel: 'Møte starttid'});
alternativerConfig.set(Kolonne.MOTER_VARIGHET, {tekstlabel: 'Møte varighet'});
alternativerConfig.set(Kolonne.ARBEIDSLISTE_FRIST, {tekstlabel: 'Arbeidsliste frist'});
alternativerConfig.set(Kolonne.ARBEIDSLISTE_OVERSKRIFT, {tekstlabel: 'Arbeidsliste tittel'});
