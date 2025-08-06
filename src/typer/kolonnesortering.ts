export enum Sorteringsrekkefolge {
    ikke_satt = 'ikke_satt',
    stigende = 'stigende',
    synkende = 'synkende'
}

export enum Sorteringsfelt {
    IKKE_SATT = 'ikke_satt',
    VALGTE_AKTIVITETER = 'valgteaktiviteter',
    ETTERNAVN = 'etternavn',
    FODSELSNUMMER = 'fodselsnummer',
    OPPFOLGING_STARTET = 'oppfolging_startdato',
    UTLOPSDATO = 'utlopsdato',

    NAVIDENT = 'veileder_id',
    VEILEDER = 'veileder_navn',

    DAGPENGER_UTLOP_UKE = 'dagputlopuke',
    DAGPENGER_PERM_UTLOP_UKE = 'permutlopuke',

    AAP_TYPE = 'aap_type',
    AAP_VURDERINGSFRIST = 'aap_vurderingsfrist',
    AAP_MAXTID_UKE = 'aapmaxtiduke',
    AAP_UNNTAK_UKER_IGJEN = 'aapunntakukerigjen',

    VENTER_PA_SVAR_FRA_NAV = 'venterpasvarfranav',
    VENTER_PA_SVAR_FRA_BRUKER = 'venterpasvarfrabruker',

    I_AVTALT_AKTIVITET = 'iavtaltaktivitet',
    UTLOPTE_AKTIVITETER = 'utlopteaktiviteter',
    STARTDATO_FOR_AVTALT_AKTIVITET = 'aktivitet_start',
    NESTE_STARTDATO_FOR_AVTALT_AKTIVITET = 'neste_aktivitet_start',
    FORRIGE_DATO_FOR_AVTALT_AKTIVITET = 'forrige_aktivitet_start',

    AAP_RETTIGHETSPERIODE = 'aaprettighetsperiode',

    MOTER_MED_NAV_IDAG = 'moterMedNAVIdag',
    MOTESTATUS = 'motestatus',

    GJELDENDE_VEDTAK_14A_INNSATSGRUPPE = 'gjeldende_vedtak_14a_innsatsgruppe',
    GJELDENDE_VEDTAK_14A_HOVEDMAL = 'gjeldende_vedtak_14a_hovedmal',
    GJELDENDE_VEDTAK_14A_VEDTAKSDATO = 'gjeldende_vedtak_14a_vedtaksdato',

    UTKAST_14A_STATUS = 'utkast_14a_status',
    UTKAST_14A_STATUS_ENDRET = 'utkast_14a_status_endret',
    UTKAST_14A_ANSVARLIG_VEILEDER = 'utkast_14a_ansvarlig_veileder',

    SISTE_ENDRING = 'siste_endring_kategori',
    SISTE_ENDRING_DATO = 'siste_endring_tidspunkt',

    FODELAND = 'fodeland',
    STATSBORGERSKAP = 'statsborgerskap',
    STATSBORGERSKAP_GYLDIG_FRA = 'statsborgerskap_gyldig_fra',

    BOSTED_KOMMUNE = 'kommunenummer',
    BOSTED_BYDEL = 'bydelsnummer',
    BOSTED_SIST_OPPDATERT = 'bostedSistOppdatert',

    TOLKEBEHOV = 'tolkebehov',
    TOLKESPRAK = 'tolkespraak',
    TOLKEBEHOV_SIST_OPPDATERT = 'tolkebehov_sistoppdatert',

    CV_SVARFRIST = 'neste_svarfrist_stilling_fra_nav',

    ENSLIGE_FORSORGERE_UTLOP_YTELSE = 'enslige_forsorgere_utlop_ytelse',
    ENSLIGE_FORSORGERE_VEDTAKSPERIODETYPE = 'enslige_forsorgere_vedtaksperiodetype',
    ENSLIGE_FORSORGERE_AKTIVITETSPLIKT = 'enslige_forsorgere_aktivitetsplikt',
    ENSLIGE_FORSORGERE_OM_BARNET = 'enslige_forsorgere_om_barnet',

    BARN_UNDER_18_AR = 'barn_under_18_aar',

    UTDANNING_OG_SITUASJON_SIST_ENDRET = 'utdanningOgSituasjonSistEndret',

    HUSKELAPP_KOMMENTAR = 'huskelapp_kommentar',
    HUSKELAPP_FRIST = 'huskelapp_frist',
    HUSKELAPP_SIST_ENDRET = 'huskelapp_sist_endret',
    HUSKELAPP = 'huskelapp',

    FARGEKATEGORI = 'fargekategori',

    TILTAKSHENDELSE_TEKST = 'tiltakshendelse_tekst',
    TILTAKSHENDELSE_DATO_OPPRETTET = 'tiltakshendelse_dato_opprettet',

    FILTERHENDELSE_DATO_OPPRETTET = 'filterhendelse_dato_opprettet'
}
