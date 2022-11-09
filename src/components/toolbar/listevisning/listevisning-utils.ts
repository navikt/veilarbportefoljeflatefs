import {Kolonne} from '../../../ducks/ui/listevisning';

export interface Alternativ {
    tekstlabel: string;
}

export const alternativerConfig = new Map<Kolonne, Alternativ>();
alternativerConfig.set(Kolonne.OPPFOLGINGSTARTET, {tekstlabel: 'Oppfølging startet'});
alternativerConfig.set(Kolonne.VEILEDER, {tekstlabel: 'Veileder'});
alternativerConfig.set(Kolonne.NAVIDENT, {tekstlabel: 'NAV-ident'});
alternativerConfig.set(Kolonne.VENTER_SVAR, {tekstlabel: 'Dato på melding'});
alternativerConfig.set(Kolonne.UTLOP_YTELSE, {tekstlabel: 'Utløp ytelse'});
alternativerConfig.set(Kolonne.VEDTAKSPERIODE, {tekstlabel: 'Gjenstående uker vedtak'});
alternativerConfig.set(Kolonne.RETTIGHETSPERIODE, {tekstlabel: 'Gjenstående uker rettighet'});
alternativerConfig.set(Kolonne.UTLOP_AKTIVITET, {tekstlabel: 'Neste utløpsdato aktivitet'});
alternativerConfig.set(Kolonne.UTLOPTE_AKTIVITETER, {tekstlabel: 'Utløpsdato aktivitet'});
alternativerConfig.set(Kolonne.AVTALT_AKTIVITET, {tekstlabel: 'Neste utløpsdato aktivitet'});
alternativerConfig.set(Kolonne.START_DATO_AKTIVITET, {tekstlabel: 'Startdato aktivitet'});
alternativerConfig.set(Kolonne.NESTE_START_DATO_AKTIVITET, {tekstlabel: 'Neste startdato aktivitet'});
alternativerConfig.set(Kolonne.FORRIGE_START_DATO_AKTIVITET, {tekstlabel: 'Passert startdato aktivitet'});
alternativerConfig.set(Kolonne.MOTER_IDAG, {tekstlabel: 'Klokkeslett møte'});
alternativerConfig.set(Kolonne.MOTER_VARIGHET, {tekstlabel: 'Varighet møte'});
alternativerConfig.set(Kolonne.MOTE_ER_AVTALT, {tekstlabel: 'Møte er avtalt med NAV'});
alternativerConfig.set(Kolonne.ARBEIDSLISTE_FRIST, {tekstlabel: 'Arbeidsliste frist'});
alternativerConfig.set(Kolonne.ARBEIDSLISTE_OVERSKRIFT, {tekstlabel: 'Arbeidsliste tittel'});
alternativerConfig.set(Kolonne.VEDTAKSTATUS, {tekstlabel: 'Status oppfølgingsvedtak'});
alternativerConfig.set(Kolonne.VEDTAKSTATUS_ENDRET, {tekstlabel: 'Oppfølgingsvedtak status tidspunkt'});
alternativerConfig.set(Kolonne.SISTE_ENDRING, {tekstlabel: 'Siste endring'});
alternativerConfig.set(Kolonne.SISTE_ENDRING_DATO, {tekstlabel: 'Siste endring dato'});
alternativerConfig.set(Kolonne.FODELAND, {tekstlabel: 'Fødeland'});
alternativerConfig.set(Kolonne.STATSBORGERSKAP, {tekstlabel: 'Statsborgerskap'});
alternativerConfig.set(Kolonne.STATSBORGERSKAP_GYLDIG_FRA, {tekstlabel: 'Statsborgerskap gyldig fra'});
alternativerConfig.set(Kolonne.TOLKEBEHOV, {tekstlabel: 'Tolkebehov'});
alternativerConfig.set(Kolonne.TOLKEBEHOV_SPRAAK, {tekstlabel: 'Språk'});
alternativerConfig.set(Kolonne.TOLKEBEHOV_SIST_OPPDATERT, {tekstlabel: 'Sist oppdatert'});
alternativerConfig.set(Kolonne.CV_SVARFRIST, {tekstlabel: 'CV svarfrist'});
