import * as React from 'react';
import {
    aapRettighetsperiode,
    capitalize,
    nesteUtlopsdatoEllerNull,
    parseDatoString,
    tolkBehov,
    tolkBehovSpraak,
    utledValgteAktivitetsTyper,
    utlopsdatoUker
} from '../utils/utils';
import BrukerNavn from '../components/tabell/brukernavn';
import BrukerFnr from '../components/tabell/brukerfnr';
import UkeKolonne from '../components/tabell/kolonner/ukekolonne';
import {
    I_AVTALT_AKTIVITET,
    MIN_ARBEIDSLISTE,
    MOTER_IDAG,
    UNDER_VURDERING,
    UTLOPTE_AKTIVITETER,
    VENTER_PA_SVAR_FRA_BRUKER,
    VENTER_PA_SVAR_FRA_NAV,
    ytelseAapSortering,
    ytelsevalg
} from '../filtrering/filter-konstanter';
import DatoKolonne from '../components/tabell/kolonner/datokolonne';
import {BrukerModell, FiltervalgModell} from '../model-interfaces';
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
import './minoversikt.css';
import {DagerSidenKolonne} from '../components/tabell/kolonner/dagersidenkolonne';
import {TekstKolonne} from '../components/tabell/kolonner/tekstkolonne';
import SisteEndringKategori from '../components/tabell/sisteendringkategori';
import moment from 'moment';
import {useTolkbehovSelector} from '../hooks/redux/use-tolkbehovspraak-selector';

interface MinOversiktKolonnerProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: string;
    filtervalg: FiltervalgModell;
    valgteKolonner: Kolonne[];
}

function MinoversiktDatokolonner({className, bruker, enhetId, filtervalg, valgteKolonner}: MinOversiktKolonnerProps) {
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
    const ytelseErValgtKolonne = valgteKolonner.includes(Kolonne.UTLOP_YTELSE);
    const ytelseAapVedtaksperiodeErValgtKolonne = valgteKolonner.includes(Kolonne.VEDTAKSPERIODE);
    const ytelseAapRettighetsperiodeErValgtKolonne = valgteKolonner.includes(Kolonne.RETTIGHETSPERIODE);
    const ferdigfilterListe = !!filtervalg ? filtervalg.ferdigfilterListe : '';
    const rettighetsPeriode = aapRettighetsperiode(ytelse, bruker.aapmaxtidUke, bruker.aapUnntakUkerIgjen);
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
                    bruker.hovedStatsborgerskap && bruker.hovedStatsborgerskap.statsborgerskap
                        ? capitalize(bruker.hovedStatsborgerskap.statsborgerskap)
                        : '-'
                }
                skalVises={valgteKolonner.includes(Kolonne.STATSBORGERSKAP)}
            />
            <TekstKolonne
                className="col col-xs-2"
                skalVises={valgteKolonner.includes(Kolonne.STATSBORGERSKAP_GYLDIG_FRA)}
                tekst={
                    bruker.hovedStatsborgerskap && bruker.hovedStatsborgerskap.gyldigFra
                        ? toDateString(bruker.hovedStatsborgerskap.gyldigFra)!.toString()
                        : '-'
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
                skalVises={valgteKolonner.includes(Kolonne.TOLKEBEHOV_SPRAAK)}
            />
            <TekstKolonne
                className="col col-xs-2"
                skalVises={valgteKolonner.includes(Kolonne.TOLKEBEHOV_SIST_OPPDATERT)}
                tekst={bruker.tolkBehovSistOppdatert ? toDateString(bruker.tolkBehovSistOppdatert)!.toString() : '-'}
            />
            <TekstKolonne
                className="col col-xs-2"
                skalVises={valgteKolonner.includes(Kolonne.CV_SVARFRIST)}
                tekst={filtervalg.stillingFraNavFilter.at(1) || '-'}
            />
            <DatoKolonne
                className="col col-xs-2"
                skalVises={valgteKolonner.includes(Kolonne.OPPFOLGINGSTARTET)}
                dato={oppfolgingStartetDato(bruker.oppfolgingStartdato)}
            />
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
            <UkeKolonne
                className="col col-xs-2"
                ukerIgjen={bruker.dagputlopUke}
                minVal={2}
                skalVises={
                    ytelseErValgtKolonne &&
                    (ytelse === ytelsevalgIntl.DAGPENGER ||
                        ytelse === ytelsevalgIntl.ORDINARE_DAGPENGER ||
                        ytelse === ytelsevalgIntl.DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI ||
                        ytelse === ytelsevalgIntl.LONNSGARANTIMIDLER_DAGPENGER)
                }
            />
            <UkeKolonne
                className="col col-xs-2"
                ukerIgjen={bruker.permutlopUke}
                minVal={2}
                skalVises={ytelseErValgtKolonne && ytelse === ytelsevalgIntl.DAGPENGER_MED_PERMITTERING}
            />
            <UkeKolonne
                className="col col-xs-2"
                ukerIgjen={utlopsdatoUkerIgjen}
                minVal={2}
                skalVises={ytelseErValgtKolonne && erAapYtelse}
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
                skalVises={ytelseErValgtKolonne && ytelse === ytelsevalgIntl.TILTAKSPENGER}
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
                tekst={!!bruker.utkast14aAnsvarligVeileder ? bruker.utkast14aAnsvarligVeileder : ' '}
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
        </div>
    );
}

export default MinoversiktDatokolonner;
