import React from 'react';
import moment from 'moment';
import {
    aapRettighetsperiode,
    aapVurderingsfrist,
    bostedKommuneUtlandEllerUkjent,
    capitalize,
    bostedBydelEllerUkjent,
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
import BrukerNavn from '../components/tabell/brukernavn';
import BrukerFnr from '../components/tabell/brukerfnr';
import UkeKolonne from '../components/tabell/kolonner/ukekolonne';
import {
    avvik14aVedtakAvhengigeFilter,
    I_AVTALT_AKTIVITET,
    MIN_ARBEIDSLISTE,
    MOTER_IDAG,
    TILTAKSHENDELSER,
    UNDER_VURDERING,
    UTLOPTE_AKTIVITETER,
    VENTER_PA_SVAR_FRA_BRUKER,
    VENTER_PA_SVAR_FRA_NAV,
    ytelseAapSortering,
    ytelsevalg
} from '../filtrering/filter-konstanter';
import DatoKolonne from '../components/tabell/kolonner/datokolonne';
import {BarnUnder18Aar, BrukerModell, FiltervalgModell, HovedmalNavn, InnsatsgruppeNavn} from '../model-interfaces';
import {Kolonne} from '../ducks/ui/listevisning';
import ArbeidslisteOverskrift from '../components/tabell/arbeidslisteoverskrift';
import TidKolonne from '../components/tabell/kolonner/tidkolonne';
import {
    dagerSiden,
    klokkeslettTilMinutter,
    minuttDifferanse,
    oppfolgingStartetDato,
    toDateString
} from '../utils/dato-utils';
import VarighetKolonne from '../components/tabell/kolonner/varighetkolonne';
import {DagerSidenKolonne} from '../components/tabell/kolonner/dagersidenkolonne';
import {TekstKolonne} from '../components/tabell/kolonner/tekstkolonne';
import SisteEndringKategori from '../components/tabell/sisteendringkategori';
import {useGeografiskbostedSelector} from '../hooks/redux/use-geografiskbosted-selector';
import {useTolkbehovSelector} from '../hooks/redux/use-tolkbehovspraak-selector';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {
    SKJUL_ARBEIDSLISTEFUNKSJONALITET,
    VIS_AAP_VURDERINGSFRISTKOLONNER,
    VIS_FILTER_14A_FRA_VEDTAKSSTOTTE
} from '../konstanter';
import {truncateTekst} from '../utils/tekst-utils';
import {LenkeKolonne} from '../components/tabell/kolonner/lenkekolonne';
import './minoversikt.css';

interface MinOversiktKolonnerProps {
    bruker: BrukerModell;
    enhetId: string;
    filtervalg: FiltervalgModell;
    valgteKolonner: Kolonne[];
}

function MinoversiktDatokolonner({bruker, enhetId, filtervalg, valgteKolonner}: MinOversiktKolonnerProps) {
    const vis_kolonner_for_vurderingsfrist_aap = useFeatureSelector()(VIS_AAP_VURDERINGSFRISTKOLONNER);
    const visKolonnerForArbeidsliste = !useFeatureSelector()(SKJUL_ARBEIDSLISTEFUNKSJONALITET);
    const visFilter14aFraVedtaksstotte = useFeatureSelector()(VIS_FILTER_14A_FRA_VEDTAKSSTOTTE);

    const moteStartTid = klokkeslettTilMinutter(bruker.alleMoterStartTid);
    const varighet = minuttDifferanse(bruker.alleMoterSluttTid, bruker.alleMoterStartTid);
    const moteErAvtaltMedNAV = moment(bruker.moteStartTid).isSame(new Date(), 'day');

    const {ytelse} = filtervalg;
    const ytelsevalgIntl = ytelsevalg();
    const erAapYtelse = Object.keys(ytelseAapSortering).includes(ytelse!);
    const valgteAktivitetstyper = utledValgteAktivitetsTyper(bruker.aktiviteter, filtervalg.aktiviteter);
    const arbeidslisteFrist = bruker.arbeidsliste?.frist ? new Date(bruker.arbeidsliste.frist) : null;
    const utlopsdatoUkerIgjen = utlopsdatoUker(bruker.utlopsdato);
    const venterPaSvarFraBruker = bruker.venterPaSvarFraBruker ? new Date(bruker.venterPaSvarFraBruker) : null;
    const venterPaSvarFraNAV = bruker.venterPaSvarFraNAV ? new Date(bruker.venterPaSvarFraNAV) : null;
    const nyesteUtlopteAktivitet = bruker.nyesteUtlopteAktivitet ? new Date(bruker.nyesteUtlopteAktivitet) : null;
    const ytelseDagpengerErValgtKolonne = valgteKolonner.includes(Kolonne.GJENSTAENDE_UKER_RETTIGHET_DAGPENGER);
    const ytelseAapTypeErValgtKolonne = valgteKolonner.includes(Kolonne.TYPE_YTELSE);
    const ytelseAapVurderingsfristErValgtKolonne = valgteKolonner.includes(Kolonne.VURDERINGSFRIST_YTELSE);
    const ytelseAapVedtaksperiodeErValgtKolonne = valgteKolonner.includes(Kolonne.VEDTAKSPERIODE);
    const ytelseAapRettighetsperiodeErValgtKolonne = valgteKolonner.includes(Kolonne.RETTIGHETSPERIODE);
    const ferdigfilterListe = filtervalg ? filtervalg.ferdigfilterListe : '';
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
    const iAvtaltAktivitet: boolean =
        !!ferdigfilterListe?.includes(I_AVTALT_AKTIVITET) && valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET);
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
            {visKolonnerForArbeidsliste && (
                <>
                    <DatoKolonne
                        className="col col-xs-2"
                        dato={arbeidslisteFrist}
                        skalVises={
                            !!ferdigfilterListe?.includes(MIN_ARBEIDSLISTE) &&
                            valgteKolonner.includes(Kolonne.ARBEIDSLISTE_FRIST)
                        }
                    />
                    <ArbeidslisteOverskrift
                        className="col col-xs-2"
                        bruker={bruker}
                        skalVises={
                            !!ferdigfilterListe?.includes(MIN_ARBEIDSLISTE) &&
                            valgteKolonner.includes(Kolonne.ARBEIDSLISTE_OVERSKRIFT)
                        }
                    />
                </>
            )}
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
            {vis_kolonner_for_vurderingsfrist_aap && (
                <TekstKolonne
                    className="col col-xs-2"
                    skalVises={ytelseAapTypeErValgtKolonne && erAapYtelse}
                    tekst={bruker.ytelse ? ytelsestypetekst(bruker.ytelse) : '–'}
                />
            )}
            {vis_kolonner_for_vurderingsfrist_aap && (
                <TekstKolonne
                    className="col col-xs-2"
                    skalVises={ytelseAapVurderingsfristErValgtKolonne && erAapYtelse}
                    tekst={vurderingsfristAAP || '–'}
                />
            )}
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
                dato={venterPaSvarFraBruker}
                skalVises={!!ferdigfilterListe?.includes(VENTER_PA_SVAR_FRA_BRUKER)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={venterPaSvarFraNAV}
                skalVises={!!ferdigfilterListe?.includes(VENTER_PA_SVAR_FRA_NAV)}
            />
            <TidKolonne
                className="col col-xs-2"
                dato={moteStartTid}
                skalVises={!!ferdigfilterListe?.includes(MOTER_IDAG) && valgteKolonner.includes(Kolonne.MOTER_IDAG)}
            />
            <VarighetKolonne
                className="col col-xs-2"
                dato={varighet}
                skalVises={!!ferdigfilterListe?.includes(MOTER_IDAG) && valgteKolonner.includes(Kolonne.MOTER_VARIGHET)}
            />
            <TekstKolonne
                className="col col-xs-2"
                tekst={moteErAvtaltMedNAV ? 'Avtalt med NAV' : '-'}
                skalVises={!!ferdigfilterListe?.includes(MOTER_IDAG) && valgteKolonner.includes(Kolonne.MOTE_ER_AVTALT)}
            />
            {visFilter14aFraVedtaksstotte && (
                <>
                    <TekstKolonne
                        skalVises={valgteKolonner.includes(Kolonne.GJELDENDE_VEDTAK_14A_INNSATSGRUPPE)}
                        tekst={
                            bruker.gjeldendeVedtak14a?.innsatsgruppe
                                ? InnsatsgruppeNavn[bruker.gjeldendeVedtak14a.innsatsgruppe]
                                : '-'
                        }
                        className="col col-xs-2"
                    />
                    <TekstKolonne
                        skalVises={valgteKolonner.includes(Kolonne.GJELDENDE_VEDTAK_14A_HOVEDMAL)}
                        tekst={
                            bruker.gjeldendeVedtak14a?.hovedmal ? HovedmalNavn[bruker.gjeldendeVedtak14a.hovedmal] : '-'
                        }
                        className="col col-xs-2"
                    />
                    <TekstKolonne
                        skalVises={valgteKolonner.includes(Kolonne.GJELDENDE_VEDTAK_14A_VEDTAKSDATO)}
                        tekst={
                            bruker.gjeldendeVedtak14a?.innsatsgruppe
                                ? toDateString(bruker.gjeldendeVedtak14a?.fattetDato)
                                : '-'
                        }
                        className="col col-xs-2"
                    />
                </>
            )}
            <LenkeKolonne
                className="col col-xs-3 col-break-word"
                bruker={bruker}
                lenke={bruker.tiltakshendelse?.lenke ?? ''}
                lenketekst={bruker.tiltakshendelse?.tekst ?? ''}
                enhetId={enhetId}
                skalVises={
                    !!ferdigfilterListe?.includes(TILTAKSHENDELSER) &&
                    valgteKolonner.includes(Kolonne.TILTAKSHENDELSE_LENKE)
                }
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={bruker.tiltakshendelse ? new Date(bruker.tiltakshendelse.opprettet) : null}
                skalVises={
                    !!ferdigfilterListe?.includes(TILTAKSHENDELSER) &&
                    valgteKolonner.includes(Kolonne.TILTAKSHENDELSE_DATO_OPPRETTET)
                }
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter)}
                skalVises={iAvtaltAktivitet}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={nyesteUtlopteAktivitet}
                skalVises={!!ferdigfilterListe?.includes(UTLOPTE_AKTIVITETER)}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={parseDatoString(bruker.nesteUtlopsdatoAktivitet)}
                skalVises={avtaltAktivitetOgTiltak || forenkletAktivitetOgTiltak}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={bruker.aktivitetStart ? new Date(bruker.aktivitetStart) : null}
                skalVises={
                    !!ferdigfilterListe?.includes(I_AVTALT_AKTIVITET) &&
                    valgteKolonner.includes(Kolonne.START_DATO_AKTIVITET)
                }
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={bruker.nesteAktivitetStart ? new Date(bruker.nesteAktivitetStart) : null}
                skalVises={
                    !!ferdigfilterListe?.includes(I_AVTALT_AKTIVITET) &&
                    valgteKolonner.includes(Kolonne.NESTE_START_DATO_AKTIVITET)
                }
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={bruker.forrigeAktivitetStart ? new Date(bruker.forrigeAktivitetStart) : null}
                skalVises={
                    !!ferdigfilterListe?.includes(I_AVTALT_AKTIVITET) &&
                    valgteKolonner.includes(Kolonne.FORRIGE_START_DATO_AKTIVITET)
                }
            />
            <TekstKolonne
                tekst={bruker.utkast14aStatus ?? '-'}
                skalVises={
                    !!ferdigfilterListe?.includes(UNDER_VURDERING) && valgteKolonner.includes(Kolonne.VEDTAKSTATUS)
                }
                className="col col-xs-2"
            />
            <DagerSidenKolonne
                className="col col-xs-2"
                dato={dagerSiden(bruker.utkast14aStatusEndret)}
                skalVises={
                    !!ferdigfilterListe?.includes(UNDER_VURDERING) &&
                    valgteKolonner.includes(Kolonne.VEDTAKSTATUS_ENDRET)
                }
            />
            <TekstKolonne
                tekst={bruker.utkast14aAnsvarligVeileder ? bruker.utkast14aAnsvarligVeileder : ' '}
                skalVises={
                    !!ferdigfilterListe?.includes(UNDER_VURDERING) &&
                    valgteKolonner.includes(Kolonne.ANSVARLIG_VEILEDER_FOR_VEDTAK)
                }
                className="col col-xs-2"
            />
            <SisteEndringKategori
                bruker={bruker}
                enhetId={enhetId}
                skalVises={!!filtervalg.sisteEndringKategori && valgteKolonner.includes(Kolonne.SISTE_ENDRING)}
                className="col col-xs-2"
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={sisteEndringTidspunkt}
                skalVises={!!filtervalg.sisteEndringKategori && valgteKolonner.includes(Kolonne.SISTE_ENDRING_DATO)}
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
                className="col col-xs-2"
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

export default MinoversiktDatokolonner;
