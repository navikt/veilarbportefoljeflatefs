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
alternativerConfig.set(Kolonne.GJENSTAENDE_UKER_RETTIGHET_DAGPENGER, {
    tekstlabel: 'Gjenstående uker rettighet dagpenger'
});
alternativerConfig.set(Kolonne.GJENSTAENDE_UKER_VEDTAK_TILTAKSPENGER, {
    tekstlabel: 'Gjenstående uker vedtak tiltakspenger'
});
alternativerConfig.set(Kolonne.VURDERINGSFRIST_YTELSE, {tekstlabel: 'Frist vurdering rett AAP'});
alternativerConfig.set(Kolonne.TYPE_YTELSE, {tekstlabel: 'Type AAP-periode'});
alternativerConfig.set(Kolonne.VEDTAKSPERIODE, {tekstlabel: 'Gjenstående uker vedtak AAP'});
alternativerConfig.set(Kolonne.RETTIGHETSPERIODE, {tekstlabel: 'Gjenstående uker rettighet AAP'});
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
alternativerConfig.set(Kolonne.BOSTED_KOMMUNE, {tekstlabel: 'Geografisk bosted'});
alternativerConfig.set(Kolonne.BOSTED_BYDEL, {tekstlabel: 'Bosted detaljer'});
alternativerConfig.set(Kolonne.BOSTED_SIST_OPPDATERT, {tekstlabel: 'Bosted sist oppdatert'});
alternativerConfig.set(Kolonne.TOLKEBEHOV, {tekstlabel: 'Tolkebehov'});
alternativerConfig.set(Kolonne.TOLKEBEHOV_SPRAAK, {tekstlabel: 'Språk'});
alternativerConfig.set(Kolonne.TOLKEBEHOV_SIST_OPPDATERT, {tekstlabel: 'Sist oppdatert'});
alternativerConfig.set(Kolonne.CV_SVARFRIST, {tekstlabel: 'CV svarfrist'});
alternativerConfig.set(Kolonne.AVVIK_14A_VEDTAK, {tekstlabel: 'Status § 14 a-vedtak'});
alternativerConfig.set(Kolonne.ENSLIGE_FORSORGERE_UTLOP_OVERGANGSSTONAD, {tekstlabel: 'Utløp overgangsstønad'});
alternativerConfig.set(Kolonne.ENSLIGE_FORSORGERE_AKIVITETSPLIKT, {tekstlabel: 'Om aktivitetsplikt overgangsstønad'});
alternativerConfig.set(Kolonne.ENSLIGE_FORSORGERE_VEDTAKSPERIODE, {tekstlabel: 'Type vedtaksperiode overgangsstønad'});
alternativerConfig.set(Kolonne.ENSLIGE_FORSORGERE_OM_BARNET, {tekstlabel: 'Om barnet'});
alternativerConfig.set(Kolonne.HAR_BARN_UNDER_18, {tekstlabel: 'Barn under 18 år'});
alternativerConfig.set(Kolonne.BRUKERS_SITUASJON_SIST_ENDRET, {tekstlabel: 'Dato endret situasjon'});
