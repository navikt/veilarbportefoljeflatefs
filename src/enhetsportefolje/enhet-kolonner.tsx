import React from 'react';
import moment from 'moment';
import BrukerNavn from '../components/tabell/brukernavn';
import BrukerFnr from '../components/tabell/brukerfnr';
import UkeKolonne from '../components/tabell/kolonner/ukekolonne';
import {
    avvik14aVedtakAvhengigeFilter,
    I_AVTALT_AKTIVITET,
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
import {Kolonne} from '../ducks/ui/listevisning';
import {
    BarnUnder18Aar,
    BrukerModell,
    FiltervalgModell,
    VeilederModell,
    InnsatsgruppeNavn,
    HovedmalNavn
} from '../model-interfaces';
import {
    aapRettighetsperiode,
    aapVurderingsfrist,
    bostedKommune,
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
import VeilederNavn from '../components/tabell/veiledernavn';
import VeilederId from '../components/tabell/veilederid';
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
import {VIS_AAP_VURDERINGSFRISTKOLONNER, VIS_FILTER_14A_FRA_VEDTAKSSTOTTE} from '../konstanter';
import {LenkeKolonne} from '../components/tabell/kolonner/lenkekolonne';
import './enhetsportefolje.css';
import './brukerliste.css';
import Header from '../components/tabell/header';

interface EnhetKolonnerProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: string;
    filtervalg: FiltervalgModell;
    valgteKolonner: Kolonne[];
    brukersVeileder?: VeilederModell;
}

function EnhetKolonner({className, bruker, enhetId, filtervalg, valgteKolonner, brukersVeileder}: EnhetKolonnerProps) {
    const vis_kolonner_for_vurderingsfrist_aap = useFeatureSelector()(VIS_AAP_VURDERINGSFRISTKOLONNER);
    const moteStartTid = klokkeslettTilMinutter(bruker.alleMoterStartTid);
    const varighet = minuttDifferanse(bruker.alleMoterSluttTid, bruker.alleMoterStartTid);
    const moteErAvtaltMedNAV = moment(bruker.moteStartTid).isSame(new Date(), 'day');
    const ytelsevalgIntl = ytelsevalg();
    const {ytelse} = filtervalg;
    const utlopsdatoUkerIgjen = utlopsdatoUker(bruker.utlopsdato);
    const venterPaSvarFraBruker = bruker.venterPaSvarFraBruker ? new Date(bruker.venterPaSvarFraBruker) : null;
    const venterPaSvarFraNAV = bruker.venterPaSvarFraNAV ? new Date(bruker.venterPaSvarFraNAV) : null;
    const nyesteUtlopteAktivitet = bruker.nyesteUtlopteAktivitet ? new Date(bruker.nyesteUtlopteAktivitet) : null;
    const ytelseDagpengerErValgtKolonne = valgteKolonner.includes(Kolonne.GJENSTAENDE_UKER_RETTIGHET_DAGPENGER);
    const ytelseAapTypeErValgtKolonne = valgteKolonner.includes(Kolonne.TYPE_YTELSE);
    const ytelseAapVurderingsfristErValgtKolonne = valgteKolonner.includes(Kolonne.VURDERINGSFRIST_YTELSE);
    const ytelseAapVedtaksperiodeErValgtKolonne = valgteKolonner.includes(Kolonne.VEDTAKSPERIODE);
    const ytelseAapRettighetsperiodeErValgtKolonne = valgteKolonner.includes(Kolonne.RETTIGHETSPERIODE);
    const valgteAktivitetstyper = utledValgteAktivitetsTyper(bruker.aktiviteter, filtervalg.aktiviteter);
    const ferdigfilterListe = filtervalg ? filtervalg.ferdigfilterListe : '';
    const erAapYtelse = !!ytelse && Object.keys(ytelseAapSortering).includes(ytelse);
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

    const vedtak14aInnsatsgruppe = (bruker: BrukerModell) => {
        if (bruker.vedtak14a?.innsatsgruppe) {
            return InnsatsgruppeNavn[bruker.vedtak14a.innsatsgruppe];
        } else return '-';
    };

    const vedtak14aHovedmal = (bruker: BrukerModell) => {
        if (bruker.vedtak14a?.hovedmal) {
            return HovedmalNavn[bruker.vedtak14a.hovedmal];
        } else return '-';
    };

    const vedtak14aFattetDato = (bruker: BrukerModell) => {
        if (bruker.vedtak14a?.innsatsgruppe) {
            return toDateString(bruker.vedtak14a?.fattetDato);
        } else return '-';
    };

    return (
        <div className={className}>
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
                    bruker.hovedStatsborgerskap?.gyldigFra
                        ? toDateString(bruker.hovedStatsborgerskap.gyldigFra)!.toString()
                        : '-'
                }
            />
            <TekstKolonne
                className="col col-xs-2"
                skalVises={valgteKolonner.includes(Kolonne.BOSTED_KOMMUNE)}
                tekst={bostedKommune(bruker, geografiskbostedData)}
            />
            <TekstKolonne
                className="col col-xs-2"
                skalVises={valgteKolonner.includes(Kolonne.BOSTED_BYDEL)}
                tekst={bruker.bostedBydel ? geografiskbostedData.get(bruker.bostedBydel) : '-'}
            />
            <TekstKolonne
                className="col col-xs-2"
                skalVises={valgteKolonner.includes(Kolonne.BOSTED_SIST_OPPDATERT)}
                tekst={bruker.bostedSistOppdatert ? toDateString(bruker.bostedSistOppdatert)!.toString() : '-'}
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
                tekst={bruker.tolkBehovSistOppdatert ? toDateString(bruker.tolkBehovSistOppdatert)!.toString() : '-'}
            />
            <DatoKolonne
                className="col col-xs-2"
                skalVises={valgteKolonner.includes(Kolonne.OPPFOLGING_STARTET)}
                dato={oppfolgingStartetDato(bruker.oppfolgingStartdato)}
            />
            <VeilederNavn
                className="col col-xs-2"
                bruker={bruker}
                skalVises={valgteKolonner.includes(Kolonne.VEILEDER)}
                veileder={brukersVeileder}
            />
            <VeilederId
                className="col col-xs-2"
                bruker={bruker}
                skalVises={valgteKolonner.includes(Kolonne.NAVIDENT)}
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
                skalVises={
                    !!ferdigfilterListe?.includes(VENTER_PA_SVAR_FRA_BRUKER) &&
                    valgteKolonner.includes(Kolonne.VENTER_SVAR)
                }
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={venterPaSvarFraNAV}
                skalVises={
                    !!ferdigfilterListe?.includes(VENTER_PA_SVAR_FRA_NAV) &&
                    valgteKolonner.includes(Kolonne.VENTER_SVAR)
                }
            />
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
                dato={nyesteUtlopteAktivitet}
                skalVises={
                    !!ferdigfilterListe?.includes(UTLOPTE_AKTIVITETER) &&
                    valgteKolonner.includes(Kolonne.UTLOPTE_AKTIVITETER)
                }
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter || undefined)}
                skalVises={iAvtaltAktivitet}
            />
            <DatoKolonne
                className="col col-xs-2"
                dato={parseDatoString(bruker.nesteUtlopsdatoAktivitet)}
                skalVises={avtaltAktivitetOgTiltak || forenkletAktivitetOgTiltak}
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
            {VIS_FILTER_14A_FRA_VEDTAKSSTOTTE && (
                <>
                    <TekstKolonne skalVises={true} className="col col-xs-2" tekst={vedtak14aInnsatsgruppe(bruker)} />
                    <TekstKolonne skalVises={true} className="col col-xs-2" tekst={vedtak14aHovedmal(bruker)} />
                    <TekstKolonne skalVises={true} className="col col-xs-2" tekst={vedtak14aFattetDato(bruker)} />
                </>
            )}
            <TekstKolonne
                tekst={bruker.utkast14aStatus}
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
                tekst={bruker.ensligeForsorgereOvergangsstonad?.vedtaksPeriodetype}
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
                tekst={brukerBarnUnder18AarInfo(bruker.barnUnder18AarData)}
            />
            <DatoKolonne
                dato={brukersUtdanningOgSituasjonSistEndret}
                skalVises={valgteKolonner.includes(Kolonne.UTDANNING_OG_SITUASJON_SIST_ENDRET)}
                className="col col-xs-2"
            />
        </div>
    );
}

export default EnhetKolonner;
