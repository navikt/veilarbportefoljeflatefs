import moment from 'moment';
import {
    aapRettighetsperiode,
    aapVurderingsfrist,
    bostedBydelEllerUkjent,
    bostedKommuneUtlandEllerUkjent,
    capitalize,
    mapOmAktivitetsPlikt,
    nesteUtlopsdatoEllerNull,
    oppfolingsdatoEnsligeForsorgere,
    parseDatoString,
    tolkBehov,
    tolkBehovSpraak,
    utledValgteAktivitetsTyper,
    utlopsdatoUker,
    ytelsestypetekst
} from '../utils/utils';
import {BrukerNavn} from '../components/tabell/brukernavn';
import {BrukerFnr} from '../components/tabell/brukerfnr';
import {UkeKolonne} from '../components/tabell/kolonner/ukekolonne';
import {avvik14aVedtakAvhengigeFilter, ytelseAapSortering, ytelsevalg} from '../filtrering/filter-konstanter';
import {DatoKolonne} from '../components/tabell/kolonner/datokolonne';
import {BarnUnder18Aar, BrukerModell, FiltervalgModell, HovedmalNavn, innsatsgruppeNavn} from '../model-interfaces';
import {Kolonne} from '../ducks/ui/listevisning';
import {TidKolonne} from '../components/tabell/kolonner/tidkolonne';
import {
    dagerSiden,
    klokkeslettTilMinutter,
    minuttDifferanse,
    oppfolgingStartetDato,
    toDateString
} from '../utils/dato-utils';
import {VarighetKolonne} from '../components/tabell/kolonner/varighetkolonne';
import {DagerSidenKolonne} from '../components/tabell/kolonner/dagersidenkolonne';
import {TekstKolonne} from '../components/tabell/kolonner/tekstkolonne';
import {SisteEndringKategori} from '../components/tabell/sisteendringkategori';
import {useGeografiskbostedSelector} from '../hooks/redux/use-geografiskbosted-selector';
import {useTolkbehovSelector} from '../hooks/redux/use-tolkbehovspraak-selector';
import {truncateTekst} from '../utils/tekst-utils';
import {LenkeKolonne} from '../components/tabell/kolonner/lenkekolonne';
import './minoversikt.css';

interface MinOversiktKolonnerProps {
    bruker: BrukerModell;
    enhetId: string;
    filtervalg: FiltervalgModell;
    valgteKolonner: Kolonne[];
}

export function MinOversiktKolonner({bruker, enhetId, filtervalg, valgteKolonner}: MinOversiktKolonnerProps) {
    const moteStartTid = klokkeslettTilMinutter(bruker.alleMoterStartTid);
    const varighet = minuttDifferanse(bruker.alleMoterSluttTid, bruker.alleMoterStartTid);
    const moteErAvtaltMedNAV = moment(bruker.moteStartTid).isSame(new Date(), 'day');

    const {ytelse} = filtervalg;
    const ytelsevalgIntl = ytelsevalg();
    const erAapYtelse = Object.keys(ytelseAapSortering).includes(ytelse!);
    const valgteAktivitetstyper = utledValgteAktivitetsTyper(bruker.aktiviteter, filtervalg.aktiviteter);
    const utlopsdatoUkerIgjen = utlopsdatoUker(bruker.utlopsdato);
    const venterPaSvarFraBruker = bruker.venterPaSvarFraBruker ? new Date(bruker.venterPaSvarFraBruker) : null;
    const venterPaSvarFraNAV = bruker.venterPaSvarFraNAV ? new Date(bruker.venterPaSvarFraNAV) : null;
    const nyesteUtlopteAktivitet = bruker.nyesteUtlopteAktivitet ? new Date(bruker.nyesteUtlopteAktivitet) : null;
    const ytelseDagpengerErValgtKolonne = valgteKolonner.includes(Kolonne.GJENSTAENDE_UKER_RETTIGHET_DAGPENGER);
    const ytelseAapTypeErValgtKolonne = valgteKolonner.includes(Kolonne.TYPE_YTELSE);
    const ytelseAapVurderingsfristErValgtKolonne = valgteKolonner.includes(Kolonne.VURDERINGSFRIST_YTELSE);
    const ytelseAapVedtaksperiodeErValgtKolonne = valgteKolonner.includes(Kolonne.VEDTAKSPERIODE);
    const ytelseAapRettighetsperiodeErValgtKolonne = valgteKolonner.includes(Kolonne.RETTIGHETSPERIODE);
    const rettighetsPeriode = aapRettighetsperiode(ytelse, bruker.aapmaxtidUke, bruker.aapUnntakUkerIgjen);
    const vurderingsfristAAP = aapVurderingsfrist(
        bruker.innsatsgruppe,
        bruker.ytelse,
        bruker.utlopsdato,
        bruker.aapordinerutlopsdato
    );
    const overgangsstonadUtlopsdato = bruker.ensligeForsorgereOvergangsstonad?.utlopsDato
        ? new Date(bruker.ensligeForsorgereOvergangsstonad?.utlopsDato)
        : null;

    const brukersUtdanningOgSituasjonSistEndret = bruker.utdanningOgSituasjonSistEndret
        ? new Date(bruker.utdanningOgSituasjonSistEndret)
        : null;

    const huskeLappFrist = bruker.huskelapp?.frist ? new Date(bruker.huskelapp.frist) : null;

    const avtaltAktivitetOgTiltak: boolean =
        !!valgteAktivitetstyper &&
        filtervalg.tiltakstyper.length === 0 &&
        valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET);

    const forenkletAktivitetOgTiltak =
        valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET) &&
        (filtervalg.tiltakstyper.length > 0 || filtervalg.aktiviteterForenklet.length > 0);

    const sisteEndringTidspunkt = bruker.sisteEndringTidspunkt ? new Date(bruker.sisteEndringTidspunkt) : null;
    const tolkbehovSpraakData = useTolkbehovSelector();

    const geografiskbostedData = useGeografiskbostedSelector();

    const barnAlderTilStr = (dataOmBarn: BarnUnder18Aar[]) => {
        const lf = new Intl.ListFormat('no');
        const dataOmBarnSorted = dataOmBarn
            .map(x => x.alder)
            .sort((a, b) => (a < b ? -1 : 1))
            .map(x => String(x));
        return ' (' + lf.format(dataOmBarnSorted) + ' år)';
    };

    const brukerBarnUnder18AarInfo = (dataOmBarn: BarnUnder18Aar[]) => {
        if (dataOmBarn === null || dataOmBarn === undefined || (Array.isArray(dataOmBarn) && dataOmBarn.length === 0)) {
            return '-';
        }
        return dataOmBarn.length + barnAlderTilStr(dataOmBarn);
    };

    return (
        <div className="brukerliste__innhold flex flex--center">
            <BrukerNavn className="col col-xs-2" bruker={bruker} enhetId={enhetId} />
            <BrukerFnr className="col col-xs-2-5 fnr-kolonne" bruker={bruker} />

            <TekstKolonne
                className="col col-xs-2"
                tekst={bruker.foedeland ? capitalize(bruker.foedeland) : '-'}
                skalVises={valgteKolonner.includes(Kolonne.FODELAND)}
            />
            <TekstKolonne
                className="col col-xs-2"
                tekst={
                    bruker.hovedStatsborgerskap?.statsborgerskap
                        ? capitalize(bruker.hovedStatsborgerskap.statsborgerskap)
                        : '-'
                }
                skalVises={valgteKolonner.includes(Kolonne.STATSBORGERSKAP)}
            />
            <TekstKolonne
                className="col col-xs-2"
                skalVises={valgteKolonner.includes(Kolonne.STATSBORGERSKAP_GYLDIG_FRA)}
                tekst={
                    bruker.hovedStatsborgerskap?.gyldigFra ? toDateString(bruker.hovedStatsborgerskap.gyldigFra) : '-'
                }
            />
            <TekstKolonne
                className="col col-xs-2"
                tekst={tolkBehov(filtervalg, bruker)}
                skalVises={valgteKolonner.includes(Kolonne.TOLKEBEHOV)}
            />
            <TekstKolonne
                className="col col-xs-2"
                tekst={tolkBehovSpraak(filtervalg, bruker, tolkbehovSpraakData)}
                skalVises={valgteKolonner.includes(Kolonne.TOLKESPRAK)}
            />
            <TekstKolonne
                className="col col-xs-2"
                skalVises={valgteKolonner.includes(Kolonne.TOLKEBEHOV_SIST_OPPDATERT)}
                tekst={bruker.tolkBehovSistOppdatert ? toDateString(bruker.tolkBehovSistOppdatert) : '-'}
            />
            <TekstKolonne
                className="col col-xs-2"
                skalVises={valgteKolonner.includes(Kolonne.BOSTED_KOMMUNE)}
                tekst={bostedKommuneUtlandEllerUkjent(bruker, geografiskbostedData)}
            />
            <TekstKolonne
                className="col col-xs-2"
                skalVises={valgteKolonner.includes(Kolonne.BOSTED_BYDEL)}
                tekst={bruker.bostedBydel ? bostedBydelEllerUkjent(bruker.bostedBydel, geografiskbostedData) : '-'}
            />
            <TekstKolonne
                className="col col-xs-2"
                skalVises={valgteKolonner.includes(Kolonne.BOSTED_SIST_OPPDATERT)}
                tekst={bruker.bostedSistOppdatert ? toDateString(bruker.bostedSistOppdatert) : '-'}
            />
            <DatoKolonne
                className="col col-xs-2"
                skalVises={valgteKolonner.includes(Kolonne.OPPFOLGING_STARTET)}
                dato={oppfolgingStartetDato(bruker.oppfolgingStartdato)}
            />
            <UkeKolonne
                className="col col-xs-2"
                ukerIgjen={bruker.dagputlopUke}
                minVal={2}
                skalVises={
                    ytelseDagpengerErValgtKolonne &&
                    (ytelse === ytelsevalgIntl.DAGPENGER ||
                        ytelse === ytelsevalgIntl.ORDINARE_DAGPENGER ||
                        ytelse === ytelsevalgIntl.LONNSGARANTIMIDLER_DAGPENGER)
                }
            />
            <UkeKolonne
                className="col col-xs-2"
                ukerIgjen={bruker.permutlopUke}
                minVal={2}
                skalVises={
                    ytelseDagpengerErValgtKolonne &&
                    (ytelse === ytelsevalgIntl.DAGPENGER_MED_PERMITTERING ||
                        ytelse === ytelsevalgIntl.DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI)
                }
            />
            <TekstKolonne
                className="col col-xs-2"
                skalVises={ytelseAapTypeErValgtKolonne && erAapYtelse}
                tekst={bruker.ytelse ? ytelsestypetekst(bruker.ytelse) : '–'}
            />
            <TekstKolonne
                className="col col-xs-2"
                skalVises={ytelseAapVurderingsfristErValgtKolonne && erAapYtelse}
                tekst={vurderingsfristAAP || '–'}
            />
            <UkeKolonne
                className="col col-xs-2"
                ukerIgjen={utlopsdatoUkerIgjen}
                minVal={2}
                skalVises={ytelseAapVedtaksperiodeErValgtKolonne && erAapYtelse}
            />
            <UkeKolonne
                className="col col-xs-2"
                ukerIgjen={rettighetsPeriode}
                minVal={2}
                skalVises={ytelseAapRettighetsperiodeErValgtKolonne && erAapYtelse}
            />
            <UkeKolonne
                className="col col-xs-2"
                ukerIgjen={utlopsdatoUkerIgjen}
                minVal={2}
                skalVises={
                    ytelse === ytelsevalgIntl.TILTAKSPENGER &&
                    valgteKolonner.includes(Kolonne.GJENSTAENDE_UKER_VEDTAK_TILTAKSPENGER)
                }
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={venterPaSvarFraNAV}
                skalVises={valgteKolonner.includes(Kolonne.VENTER_SVAR_FRA_NAV_DATO)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={venterPaSvarFraBruker}
                skalVises={valgteKolonner.includes(Kolonne.VENTER_SVAR_FRA_BRUKER_DATO)}
            />
            <LenkeKolonne
                skalVises={valgteKolonner.includes(Kolonne.FILTERHENDELSE_LENKE)}
                bruker={bruker}
                lenke={bruker.utgattVarsel?.lenke ?? ''}
                lenketekst={bruker.utgattVarsel?.beskrivelse ?? ''}
                erAbsoluttLenke={true}
                enhetId={enhetId}
                className="col col-xs-2-5"
            />
            <DatoKolonne
                skalVises={valgteKolonner.includes(Kolonne.FILTERHENDELSE_DATO_OPPRETTET)}
                dato={bruker.utgattVarsel?.dato ? new Date(bruker.utgattVarsel?.dato) : null}
                className="col col-xs-2"
            />
            <TidKolonne
                className="col col-xs-2"
                dato={moteStartTid}
                skalVises={valgteKolonner.includes(Kolonne.MOTER_IDAG)}
            />
            <VarighetKolonne
                className="col col-xs-2"
                dato={varighet}
                skalVises={valgteKolonner.includes(Kolonne.MOTER_VARIGHET)}
            />
            <TekstKolonne
                className="col col-xs-2"
                tekst={moteErAvtaltMedNAV ? 'Avtalt med Nav' : '-'}
                skalVises={valgteKolonner.includes(Kolonne.MOTE_ER_AVTALT)}
            />

            <LenkeKolonne
                className="col col-xs-3 col-break-word"
                bruker={bruker}
                lenke={bruker.tiltakshendelse?.lenke ?? ''}
                lenketekst={bruker.tiltakshendelse?.tekst ?? ''}
                enhetId={enhetId}
                skalVises={valgteKolonner.includes(Kolonne.TILTAKSHENDELSE_LENKE)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={bruker.tiltakshendelse ? new Date(bruker.tiltakshendelse.opprettet) : null}
                skalVises={valgteKolonner.includes(Kolonne.TILTAKSHENDELSE_DATO_OPPRETTET)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter)}
                skalVises={valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={nyesteUtlopteAktivitet}
                skalVises={valgteKolonner.includes(Kolonne.UTLOPTE_AKTIVITETER)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={parseDatoString(bruker.nesteUtlopsdatoAktivitet)}
                skalVises={avtaltAktivitetOgTiltak || forenkletAktivitetOgTiltak}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={bruker.aktivitetStart ? new Date(bruker.aktivitetStart) : null}
                skalVises={valgteKolonner.includes(Kolonne.START_DATO_AKTIVITET)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={bruker.nesteAktivitetStart ? new Date(bruker.nesteAktivitetStart) : null}
                skalVises={valgteKolonner.includes(Kolonne.NESTE_START_DATO_AKTIVITET)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={bruker.forrigeAktivitetStart ? new Date(bruker.forrigeAktivitetStart) : null}
                skalVises={valgteKolonner.includes(Kolonne.FORRIGE_START_DATO_AKTIVITET)}
            />

            <TekstKolonne
                tekst={bruker.utkast14aStatus ?? '-'}
                skalVises={valgteKolonner.includes(Kolonne.VEDTAKSTATUS)}
                className="col col-xs-2"
            />
            <DagerSidenKolonne
                className="col col-xs-2"
                dato={dagerSiden(bruker.utkast14aStatusEndret)}
                skalVises={valgteKolonner.includes(Kolonne.VEDTAKSTATUS_ENDRET)}
            />
            <TekstKolonne
                tekst={bruker.utkast14aAnsvarligVeileder ? bruker.utkast14aAnsvarligVeileder : ' '}
                skalVises={valgteKolonner.includes(Kolonne.ANSVARLIG_VEILEDER_FOR_VEDTAK)}
                className="col col-xs-2"
            />

            <SisteEndringKategori
                bruker={bruker}
                enhetId={enhetId}
                skalVises={valgteKolonner.includes(Kolonne.SISTE_ENDRING)}
                className="col col-xs-2"
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={sisteEndringTidspunkt}
                skalVises={valgteKolonner.includes(Kolonne.SISTE_ENDRING_DATO)}
            />

            <TekstKolonne
                className="col col-xs-2"
                skalVises={valgteKolonner.includes(Kolonne.CV_SVARFRIST)}
                tekst={
                    bruker.nesteSvarfristCvStillingFraNav ? toDateString(bruker.nesteSvarfristCvStillingFraNav) : '-'
                }
            />

            <TekstKolonne
                tekst={
                    avvik14aVedtakAvhengigeFilter.hasOwnProperty(bruker.avvik14aVedtak)
                        ? avvik14aVedtakAvhengigeFilter[bruker.avvik14aVedtak].label
                        : '-'
                }
                skalVises={valgteKolonner.includes(Kolonne.AVVIK_14A_VEDTAK)}
                className="col col-xs-2"
            />

            <TekstKolonne
                skalVises={valgteKolonner.includes(Kolonne.GJELDENDE_VEDTAK_14A_INNSATSGRUPPE)}
                tekst={
                    bruker.gjeldendeVedtak14a?.innsatsgruppe
                        ? innsatsgruppeNavn[bruker.gjeldendeVedtak14a.innsatsgruppe]
                        : '-'
                }
                className="col col-xs-2"
            />
            <TekstKolonne
                skalVises={valgteKolonner.includes(Kolonne.GJELDENDE_VEDTAK_14A_HOVEDMAL)}
                tekst={bruker.gjeldendeVedtak14a?.hovedmal ? HovedmalNavn[bruker.gjeldendeVedtak14a.hovedmal] : '-'}
                className="col col-xs-2"
            />
            <TekstKolonne
                skalVises={valgteKolonner.includes(Kolonne.GJELDENDE_VEDTAK_14A_VEDTAKSDATO)}
                tekst={
                    bruker.gjeldendeVedtak14a?.innsatsgruppe ? toDateString(bruker.gjeldendeVedtak14a?.fattetDato) : '-'
                }
                className="col col-xs-2-5"
            />

            <DatoKolonne
                dato={overgangsstonadUtlopsdato}
                skalVises={valgteKolonner.includes(Kolonne.ENSLIGE_FORSORGERE_UTLOP_OVERGANGSSTONAD)}
                className="col col-xs-2"
            />
            <TekstKolonne
                tekst={bruker.ensligeForsorgereOvergangsstonad?.vedtaksPeriodetype ?? '-'}
                skalVises={valgteKolonner.includes(Kolonne.ENSLIGE_FORSORGERE_VEDTAKSPERIODE)}
                className="col col-xs-2"
            />
            <TekstKolonne
                tekst={mapOmAktivitetsPlikt(bruker.ensligeForsorgereOvergangsstonad?.harAktivitetsplikt)}
                skalVises={valgteKolonner.includes(Kolonne.ENSLIGE_FORSORGERE_AKIVITETSPLIKT)}
                className="col col-xs-2"
            />
            <TekstKolonne
                tekst={oppfolingsdatoEnsligeForsorgere(bruker.ensligeForsorgereOvergangsstonad?.yngsteBarnsFodselsdato)}
                skalVises={valgteKolonner.includes(Kolonne.ENSLIGE_FORSORGERE_OM_BARNET)}
                className="col col-xs-3"
            />
            <TekstKolonne
                className="col col-xs-2"
                skalVises={valgteKolonner.includes(Kolonne.BARN_UNDER_18_AAR)}
                tekst={bruker.barnUnder18AarData ? brukerBarnUnder18AarInfo(bruker.barnUnder18AarData) : '-'}
            />
            <DatoKolonne
                dato={brukersUtdanningOgSituasjonSistEndret}
                skalVises={valgteKolonner.includes(Kolonne.UTDANNING_OG_SITUASJON_SIST_ENDRET)}
                className="col col-xs-2"
            />
            <TekstKolonne
                className="col col-xs-2"
                skalVises={valgteKolonner.includes(Kolonne.HUSKELAPP_KOMMENTAR)}
                tekst={
                    bruker.huskelapp?.kommentar
                        ? // Fjerner eventuelle linjeskift før teksten og viser kun tekst fram til første linjeskift eller maks 30 tegn, ref. truncateTekst()
                          truncateTekst(bruker.huskelapp.kommentar.trimStart().split('\n')[0])
                        : ' '
                }
            />
            <DatoKolonne
                dato={huskeLappFrist}
                skalVises={valgteKolonner.includes(Kolonne.HUSKELAPP_FRIST)}
                className="col col-xs-2"
            />
        </div>
    );
}
