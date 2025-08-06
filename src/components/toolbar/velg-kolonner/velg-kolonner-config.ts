import {Kolonne} from '../../../ducks/ui/listevisning';

interface Alternativ {
    tekstlabel: string;
}

export const alternativerConfig = new Map<Kolonne, Alternativ>();
alternativerConfig.set(Kolonne.OPPFOLGING_STARTET, {tekstlabel: 'Oppfølging startet'});
alternativerConfig.set(Kolonne.VEILEDER, {tekstlabel: 'Veileder'});
alternativerConfig.set(Kolonne.NAVIDENT, {tekstlabel: 'Nav-ident'});
alternativerConfig.set(Kolonne.VENTER_SVAR_FRA_NAV_DATO, {tekstlabel: 'Dato på melding'});
alternativerConfig.set(Kolonne.VENTER_SVAR_FRA_BRUKER_DATO, {tekstlabel: 'Dato på melding'});
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
alternativerConfig.set(Kolonne.MOTE_ER_AVTALT, {tekstlabel: 'Møte er avtalt med Nav'});
alternativerConfig.set(Kolonne.VEDTAKSTATUS, {tekstlabel: 'Status oppfølgingsvedtak § 14 a'});
alternativerConfig.set(Kolonne.VEDTAKSTATUS_ENDRET, {
    tekstlabel: 'Dager siden statusendring på utkast for oppfølgingsvedtak § 14 a'
});
alternativerConfig.set(Kolonne.ANSVARLIG_VEILEDER_FOR_VEDTAK, {
    tekstlabel: 'Ansvarlig veileder på utkast for oppfølgingsvedtak § 14 a'
});
alternativerConfig.set(Kolonne.SISTE_ENDRING, {tekstlabel: 'Siste endring personen har gjort på aktivitet/mål'});
alternativerConfig.set(Kolonne.SISTE_ENDRING_DATO, {
    tekstlabel: 'Dato for siste endring personen har gjort på aktivitet/mål'
});
alternativerConfig.set(Kolonne.FODELAND, {tekstlabel: 'Fødeland'});
alternativerConfig.set(Kolonne.STATSBORGERSKAP, {tekstlabel: 'Statsborgerskap'});
alternativerConfig.set(Kolonne.STATSBORGERSKAP_GYLDIG_FRA, {tekstlabel: 'Statsborgerskap gyldig fra'});
alternativerConfig.set(Kolonne.BOSTED_KOMMUNE, {tekstlabel: 'Geografisk bosted'});
alternativerConfig.set(Kolonne.BOSTED_BYDEL, {tekstlabel: 'Bosted detaljer'});
alternativerConfig.set(Kolonne.BOSTED_SIST_OPPDATERT, {tekstlabel: 'Bosted sist oppdatert'});
alternativerConfig.set(Kolonne.TOLKEBEHOV, {tekstlabel: 'Tolkebehov'});
alternativerConfig.set(Kolonne.TOLKESPRAK, {tekstlabel: 'Tolkespråk'});
alternativerConfig.set(Kolonne.TOLKEBEHOV_SIST_OPPDATERT, {tekstlabel: 'Tolkebehov sist oppdatert'});
alternativerConfig.set(Kolonne.CV_SVARFRIST, {tekstlabel: 'Frist deling av CV'});
alternativerConfig.set(Kolonne.GJELDENDE_VEDTAK_14A_INNSATSGRUPPE, {tekstlabel: 'Innsatsgruppe § 14 a-vedtak'});
alternativerConfig.set(Kolonne.GJELDENDE_VEDTAK_14A_HOVEDMAL, {tekstlabel: 'Hovedmål § 14 a-vedtak'});
alternativerConfig.set(Kolonne.GJELDENDE_VEDTAK_14A_VEDTAKSDATO, {tekstlabel: 'Vedtaksdato § 14 a-vedtak'});
alternativerConfig.set(Kolonne.AVVIK_14A_VEDTAK, {
    tekstlabel: 'Status § 14 a-vedtak (sammenligning mellom Arena og ny løsning)'
});
alternativerConfig.set(Kolonne.ENSLIGE_FORSORGERE_UTLOP_OVERGANGSSTONAD, {tekstlabel: 'Utløp overgangsstønad'});
alternativerConfig.set(Kolonne.ENSLIGE_FORSORGERE_AKIVITETSPLIKT, {tekstlabel: 'Om aktivitetsplikt overgangsstønad'});
alternativerConfig.set(Kolonne.ENSLIGE_FORSORGERE_VEDTAKSPERIODE, {tekstlabel: 'Type vedtaksperiode overgangsstønad'});
alternativerConfig.set(Kolonne.ENSLIGE_FORSORGERE_OM_BARNET, {tekstlabel: 'Om barnet'});
alternativerConfig.set(Kolonne.BARN_UNDER_18_AAR, {tekstlabel: 'Barn under 18 år'});
alternativerConfig.set(Kolonne.UTDANNING_OG_SITUASJON_SIST_ENDRET, {tekstlabel: 'Situasjon/utdanning sist endret'});
alternativerConfig.set(Kolonne.HUSKELAPP_KOMMENTAR, {tekstlabel: 'Huskelapp'});
alternativerConfig.set(Kolonne.HUSKELAPP_FRIST, {tekstlabel: 'Frist huskelapp'});
alternativerConfig.set(Kolonne.HUSKELAPP_SIST_ENDRET, {tekstlabel: 'Huskelapp sist endret'});
alternativerConfig.set(Kolonne.TILTAKSHENDELSE_LENKE, {tekstlabel: 'Hendelse på tiltak (lenke)'});
alternativerConfig.set(Kolonne.TILTAKSHENDELSE_DATO_OPPRETTET, {tekstlabel: 'Dato for hendelse på tiltak'});
alternativerConfig.set(Kolonne.FILTERHENDELSE_LENKE, {tekstlabel: 'Hendelse (lenke)'});
alternativerConfig.set(Kolonne.FILTERHENDELSE_DATO_OPPRETTET, {tekstlabel: 'Dato for hendelse'});
