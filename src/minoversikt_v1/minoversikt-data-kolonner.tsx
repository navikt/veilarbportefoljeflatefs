import * as React from 'react';
import {
    aapRettighetsperiode,
    nesteUtlopsdatoEllerNull,
    parseDatoString,
    utledValgteAktivitetsTyper,
    utlopsdatoUker
} from '../utils/utils';
import BrukerNavn from '../components/tabell_v1/brukernavn';
import BrukerFnr from '../components/tabell_v1/brukerfnr';
import UkeKolonne from '../components/tabell_v1/kolonner/ukekolonne';
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
import DatoKolonne from '../components/tabell_v1/kolonner/datokolonne';
import {BrukerModell, FiltervalgModell} from '../model-interfaces';
import {Kolonne} from '../ducks/ui/listevisning';
import ArbeidslisteOverskrift from '../components/tabell_v1/arbeidslisteoverskrift';
import TidKolonne from '../components/tabell_v1/kolonner/tidkolonne';
import {dagerSiden, klokkeslettTilMinutter, minuttDifferanse, oppfolgingStartetDato} from '../utils/dato-utils';
import VarighetKolonne from '../components/tabell_v1/kolonner/varighetkolonne';
import {OrNothing} from '../utils/types/types';
import './minoversikt.less';
import {DagerSidenKolonne} from '../components/tabell_v1/kolonner/dagersidenkolonne';
import {TekstKolonne} from '../components/tabell_v1/kolonner/tekstkolonne';
import SisteEndringKategori from '../components/tabell_v1/sisteendringkategori';

interface MinOversiktKolonnerProps {
    className?: string;
    bruker: BrukerModell;
    filtervalg: FiltervalgModell;
    valgteKolonner: Kolonne[];
    enhetId: OrNothing<string>;
}

function MinoversiktDataKolonner({className, bruker, filtervalg, valgteKolonner, enhetId}: MinOversiktKolonnerProps) {
    const {ytelse} = filtervalg;
    const ytelsevalgIntl = ytelsevalg();
    const erAapYtelse = Object.keys(ytelseAapSortering).includes(ytelse!);
    const valgteAktivitetstyper = utledValgteAktivitetsTyper(bruker.aktiviteter, filtervalg.aktiviteter);
    const arbeidslisteFrist = bruker.arbeidsliste?.frist ? new Date(bruker.arbeidsliste.frist) : null;
    const utlopsdatoUkerIgjen = utlopsdatoUker(bruker.utlopsdato);
    const venterPaSvarFraBruker = bruker.venterPaSvarFraBruker ? new Date(bruker.venterPaSvarFraBruker) : null;
    const venterPaSvarFraNAV = bruker.venterPaSvarFraNAV ? new Date(bruker.venterPaSvarFraNAV) : null;
    const moteStartTid = klokkeslettTilMinutter(bruker.moteStartTid);
    const varighet = minuttDifferanse(bruker.moteSluttTid, bruker.moteStartTid);
    const nyesteUtlopteAktivitet = bruker.nyesteUtlopteAktivitet ? new Date(bruker.nyesteUtlopteAktivitet) : null;
    const ytelseErValgtKolonne = valgteKolonner.includes(Kolonne.UTLOP_YTELSE);
    const ytelseAapVedtaksperiodeErValgtKolonne = valgteKolonner.includes(Kolonne.VEDTAKSPERIODE);
    const ytelseAapRettighetsperiodeErValgtKolonne = valgteKolonner.includes(Kolonne.RETTIGHETSPERIODE);
    const ferdigfilterListe = !!filtervalg ? filtervalg.ferdigfilterListe : '';
    const rettighetsPeriode = aapRettighetsperiode(ytelse, bruker.aapmaxtidUke, bruker.aapUnntakUkerIgjen);
    const iAvtaltAktivitet: boolean =
        !!ferdigfilterListe?.includes(I_AVTALT_AKTIVITET) && valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET);
    const avtaltAktivitetOgTiltak: boolean = iAvtaltAktivitet
        ? false
        : !!valgteAktivitetstyper &&
          filtervalg.tiltakstyper.length === 0 &&
          valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET);

    const forenkletAktivitetOgTiltak =
        valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET) &&
        (filtervalg.tiltakstyper.length > 0 || filtervalg.aktiviteterForenklet.length > 0);

    const sisteEndringTidspunkt = bruker.sisteEndringTidspunkt ? new Date(bruker.sisteEndringTidspunkt) : null;

    return (
        <>
            <BrukerNavn role="cell" className="col col-xs-2" bruker={bruker} enhetId={enhetId} />
            <BrukerFnr role="cell" className="col col-xs-2" bruker={bruker} />
            <DatoKolonne
                role="cell"
                className="col col-xs-2"
                skalVises={valgteKolonner.includes(Kolonne.OPPFOLGINGSTARTET)}
                dato={oppfolgingStartetDato(bruker.oppfolgingStartdato)}
            />
            <DatoKolonne
                role="cell"
                className="col col-xs-2"
                dato={arbeidslisteFrist}
                skalVises={
                    !!ferdigfilterListe?.includes(MIN_ARBEIDSLISTE) &&
                    valgteKolonner.includes(Kolonne.ARBEIDSLISTE_FRIST)
                }
            />
            <ArbeidslisteOverskrift
                role="cell"
                className="col col-xs-2"
                bruker={bruker}
                skalVises={
                    !!ferdigfilterListe?.includes(MIN_ARBEIDSLISTE) &&
                    valgteKolonner.includes(Kolonne.ARBEIDSLISTE_OVERSKRIFT)
                }
            />
            <UkeKolonne
                role="cell"
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
                role="cell"
                className="col col-xs-2"
                ukerIgjen={bruker.permutlopUke}
                minVal={2}
                skalVises={ytelseErValgtKolonne && ytelse === ytelsevalgIntl.DAGPENGER_MED_PERMITTERING}
            />
            <UkeKolonne
                role="cell"
                className="col col-xs-2"
                ukerIgjen={utlopsdatoUkerIgjen}
                minVal={2}
                skalVises={ytelseErValgtKolonne && erAapYtelse}
            />
            <UkeKolonne
                role="cell"
                className="col col-xs-2"
                ukerIgjen={utlopsdatoUkerIgjen}
                minVal={2}
                skalVises={ytelseAapVedtaksperiodeErValgtKolonne && erAapYtelse}
            />
            <UkeKolonne
                role="cell"
                className="col col-xs-2"
                ukerIgjen={rettighetsPeriode}
                minVal={2}
                skalVises={ytelseAapRettighetsperiodeErValgtKolonne && erAapYtelse}
            />
            <UkeKolonne
                role="cell"
                className="col col-xs-2"
                ukerIgjen={utlopsdatoUkerIgjen}
                minVal={2}
                skalVises={ytelseErValgtKolonne && ytelse === ytelsevalgIntl.TILTAKSPENGER}
            />
            <DatoKolonne
                role="cell"
                className="col col-xs-2"
                dato={venterPaSvarFraBruker}
                skalVises={!!ferdigfilterListe?.includes(VENTER_PA_SVAR_FRA_BRUKER)}
            />
            <DatoKolonne
                role="cell"
                className="col col-xs-2"
                dato={venterPaSvarFraNAV}
                skalVises={!!ferdigfilterListe?.includes(VENTER_PA_SVAR_FRA_NAV)}
            />
            <TidKolonne
                role="cell"
                className="col col-xs-2"
                dato={moteStartTid}
                skalVises={!!ferdigfilterListe?.includes(MOTER_IDAG) && valgteKolonner.includes(Kolonne.MOTER_IDAG)}
            />
            <VarighetKolonne
                role="cell"
                className="col col-xs-2"
                dato={varighet}
                skalVises={!!ferdigfilterListe?.includes(MOTER_IDAG) && valgteKolonner.includes(Kolonne.MOTER_VARIGHET)}
            />
            <DatoKolonne
                role="cell"
                className="col col-xs-2"
                dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter)}
                skalVises={iAvtaltAktivitet}
            />
            <DatoKolonne
                role="cell"
                className="col col-xs-2"
                dato={nyesteUtlopteAktivitet}
                skalVises={!!ferdigfilterListe?.includes(UTLOPTE_AKTIVITETER)}
            />
            <DatoKolonne
                role="cell"
                className="col col-xs-2"
                dato={parseDatoString(bruker.nesteUtlopsdatoAktivitet)}
                skalVises={avtaltAktivitetOgTiltak || forenkletAktivitetOgTiltak}
            />
            <DatoKolonne
                role="cell"
                className="col col-xs-2"
                dato={bruker.aktivitetStart ? new Date(bruker.aktivitetStart) : null}
                skalVises={
                    !!ferdigfilterListe?.includes(I_AVTALT_AKTIVITET) &&
                    valgteKolonner.includes(Kolonne.START_DATO_AKTIVITET)
                }
            />
            <DatoKolonne
                role="cell"
                className="col col-xs-2"
                dato={bruker.nesteAktivitetStart ? new Date(bruker.nesteAktivitetStart) : null}
                skalVises={
                    !!ferdigfilterListe?.includes(I_AVTALT_AKTIVITET) &&
                    valgteKolonner.includes(Kolonne.NESTE_START_DATO_AKTIVITET)
                }
            />
            <DatoKolonne
                role="cell"
                className="col col-xs-2"
                dato={bruker.forrigeAktivitetStart ? new Date(bruker.forrigeAktivitetStart) : null}
                skalVises={
                    !!ferdigfilterListe?.includes(I_AVTALT_AKTIVITET) &&
                    valgteKolonner.includes(Kolonne.FORRIGE_START_DATO_AKTIVITET)
                }
            />
            <TekstKolonne
                role="cell"
                tekst={bruker.vedtakStatus}
                skalVises={
                    !!ferdigfilterListe?.includes(UNDER_VURDERING) && valgteKolonner.includes(Kolonne.VEDTAKSTATUS)
                }
                className="col col-xs-2"
            />
            <DagerSidenKolonne
                role="cell"
                className="col col-xs-2"
                dato={dagerSiden(bruker.vedtakStatusEndret)}
                skalVises={
                    !!ferdigfilterListe?.includes(UNDER_VURDERING) &&
                    valgteKolonner.includes(Kolonne.VEDTAKSTATUS_ENDRET)
                }
            />
            <TekstKolonne
                role="cell"
                tekst={!!bruker.ansvarligVeilederForVedtak ? bruker.ansvarligVeilederForVedtak : ' '}
                skalVises={
                    !!ferdigfilterListe?.includes(UNDER_VURDERING) &&
                    valgteKolonner.includes(Kolonne.ANSVARLIG_VEILEDER_FOR_VEDTAK)
                }
                className="col col-xs-2"
            />
            <SisteEndringKategori
                role="cell"
                bruker={bruker}
                enhetId={enhetId}
                skalVises={!!filtervalg.sisteEndringKategori && valgteKolonner.includes(Kolonne.SISTE_ENDRING)}
                className="col col-xs-2"
            />
            <DatoKolonne
                role="cell"
                className="col col-xs-2"
                dato={sisteEndringTidspunkt}
                skalVises={!!filtervalg.sisteEndringKategori && valgteKolonner.includes(Kolonne.SISTE_ENDRING_DATO)}
            />
        </>
    );
}

export default MinoversiktDataKolonner;
