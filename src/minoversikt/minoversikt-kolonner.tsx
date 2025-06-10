import {
    aapRettighetsperiode,
    aapVurderingsfrist,
    parseDatoString,
    utledValgteAktivitetsTyper,
    utlopsdatoUker,
    ytelsestypetekst
} from '../utils/utils';
import {Navn} from '../components/tabell/innholdsceller/Navn';
import {Fnr} from '../components/tabell/innholdsceller/Fnr';
import {UkeKolonne} from '../components/tabell/kolonner/ukekolonne';
import {ytelseAapSortering, ytelsevalg} from '../filtrering/filter-konstanter';
import {DatoKolonne} from '../components/tabell/kolonner/datokolonne';
import {BrukerModell} from '../typer/bruker-modell';
import {FiltervalgModell} from '../typer/filtervalg-modell';
import {Kolonne} from '../ducks/ui/listevisning';
import {TekstKolonne} from '../components/tabell/kolonner/tekstkolonne';
import {SisteEndring} from '../components/tabell/innholdsceller/SisteEndring';
import {Foedeland} from '../components/tabell/innholdsceller/Foedeland';
import {Statsborgerskap} from '../components/tabell/innholdsceller/Statsborgerskap';
import {StatsborgerskapGyldigFra} from '../components/tabell/innholdsceller/StatsborgerskapGyldigFra';
import {Bosted} from '../components/tabell/innholdsceller/Bosted';
import {BostedDetaljer} from '../components/tabell/innholdsceller/BostedDetaljer';
import {BostedSistOppdatert} from '../components/tabell/innholdsceller/BostedSistOppdatert';
import {Tolkebehov} from '../components/tabell/innholdsceller/Tolkebehov';
import {Tolkesprak} from '../components/tabell/innholdsceller/Tolkesprak';
import {TolkebehovSistOppdatert} from '../components/tabell/innholdsceller/TolkebehovSistOppdatert';
import {OppfolgingStartet} from '../components/tabell/innholdsceller/OppfolgingStartet';
import {VenterPaSvarFraNav} from '../components/tabell/innholdsceller/VenterPaSvarFraNav';
import {VenterPaSvarFraBruker} from '../components/tabell/innholdsceller/VenterPaSvarFraBruker';
import {FilterhendelseLenke} from '../components/tabell/innholdsceller/FilterhendelseLenke';
import {FilterhendelseDatoOpprettet} from '../components/tabell/innholdsceller/FilterhendelseDatoOpprettet';
import {TiltakshendelseLenke} from '../components/tabell/innholdsceller/TiltakshendelseLenke';
import {TiltakshendelseDatoOpprettet} from '../components/tabell/innholdsceller/TiltakshendelseDatoOpprettet';
import {UtlopteAktiviteter} from '../components/tabell/innholdsceller/UtlopteAktiviteter';
import {AvtaltAktivitet} from '../components/tabell/innholdsceller/AvtaltAktivitet';
import {MoterIDag} from '../components/tabell/innholdsceller/MoterIDag';
import {MoteVarighet} from '../components/tabell/innholdsceller/MoteVarighet';
import {Motestatus} from '../components/tabell/innholdsceller/Motestatus';
import {Utkast14aVedtaksstatus} from '../components/tabell/innholdsceller/Utkast14aVedtaksstatus';
import {Utkast14aVedtaksstatusEndret} from '../components/tabell/innholdsceller/Utkast14aVedtaksstatusEndret';
import {Utkast14aAnsvarligVeileder} from '../components/tabell/innholdsceller/Utkast14aAnsvarligVeileder';
import {SisteEndringDato} from '../components/tabell/innholdsceller/SisteEndringDato';
import {SvarfristCv} from '../components/tabell/innholdsceller/SvarfristCv';
import {Status14aVedtak} from '../components/tabell/innholdsceller/Status14aVedtak';
import {GjeldendeVedtak14aInnsatsgruppe} from '../components/tabell/innholdsceller/GjeldendeVedtak14aInnsatsgruppe';
import {GjeldendeVedtak14aHovedmal} from '../components/tabell/innholdsceller/GjeldendeVedtak14aHovedmal';
import {GjeldendeVedtak14aVedtaksdato} from '../components/tabell/innholdsceller/GjeldendeVedtak14aVedtaksdato';
import {EnsligeForsorgereUtlopOvergangsstonad} from '../components/tabell/innholdsceller/EnsligeForsorgereUtlopOvergangsstonad';
import {EnsligeForsorgereVedtaksperiode} from '../components/tabell/innholdsceller/EnsligeForsorgereVedtaksperiode';
import {EnsligeForsorgereAktivitetsplikt} from '../components/tabell/innholdsceller/EnsligeForsorgereAktivitetsplikt';
import {EnsligeForsorgereOmBarnet} from '../components/tabell/innholdsceller/EnsligeForsorgereOmBarnet';
import {UtdanningOgSituasjonSistEndret} from '../components/tabell/innholdsceller/UtdanningOgSituasjonSistEndret';
import {BarnUnder18Aar} from '../components/tabell/innholdsceller/BarnUnder18Aar';
import {HuskelappKommentar} from '../components/tabell/innholdsceller/min-oversikt/HuskelappKommentar';
import {HuskelappFrist} from '../components/tabell/innholdsceller/min-oversikt/HuskelappFrist';
import './minoversikt.css';

interface MinOversiktKolonnerProps {
    bruker: BrukerModell;
    enhetId: string;
    filtervalg: FiltervalgModell;
    valgteKolonner: Kolonne[];
}

export function MinOversiktKolonner({bruker, enhetId, filtervalg, valgteKolonner}: MinOversiktKolonnerProps) {
    const {ytelse} = filtervalg;
    const ytelsevalgIntl = ytelsevalg();
    const erAapYtelse = Object.keys(ytelseAapSortering).includes(ytelse!);
    const valgteAktivitetstyper = utledValgteAktivitetsTyper(bruker.aktiviteter, filtervalg.aktiviteter);
    const utlopsdatoUkerIgjen = utlopsdatoUker(bruker.utlopsdato);
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

    const avtaltAktivitetOgTiltak: boolean =
        !!valgteAktivitetstyper &&
        filtervalg.tiltakstyper.length === 0 &&
        valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET);

    const forenkletAktivitetOgTiltak =
        valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET) &&
        (filtervalg.tiltakstyper.length > 0 || filtervalg.aktiviteterForenklet.length > 0);

    return (
        <div className="brukerliste__innhold flex flex--center">
            <Navn className="col col-xs-2" bruker={bruker} enhetId={enhetId} />
            <Fnr className="col col-xs-2-5 fnr-kolonne" bruker={bruker} />

            <Foedeland bruker={bruker} valgteKolonner={valgteKolonner} />
            <Statsborgerskap bruker={bruker} valgteKolonner={valgteKolonner} />
            <StatsborgerskapGyldigFra bruker={bruker} valgteKolonner={valgteKolonner} />

            <Tolkebehov bruker={bruker} valgteKolonner={valgteKolonner} filtervalg={filtervalg} />
            <Tolkesprak bruker={bruker} valgteKolonner={valgteKolonner} filtervalg={filtervalg} />
            <TolkebehovSistOppdatert bruker={bruker} valgteKolonner={valgteKolonner} />

            <Bosted bruker={bruker} valgteKolonner={valgteKolonner} />
            <BostedDetaljer bruker={bruker} valgteKolonner={valgteKolonner} />
            <BostedSistOppdatert bruker={bruker} valgteKolonner={valgteKolonner} />

            <OppfolgingStartet bruker={bruker} valgteKolonner={valgteKolonner} />

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

            <VenterPaSvarFraNav bruker={bruker} valgteKolonner={valgteKolonner} />
            <VenterPaSvarFraBruker bruker={bruker} valgteKolonner={valgteKolonner} />

            <FilterhendelseLenke bruker={bruker} valgteKolonner={valgteKolonner} enhetId={enhetId} />
            <FilterhendelseDatoOpprettet bruker={bruker} valgteKolonner={valgteKolonner} />

            <MoterIDag bruker={bruker} valgteKolonner={valgteKolonner} />
            <MoteVarighet bruker={bruker} valgteKolonner={valgteKolonner} />
            <Motestatus bruker={bruker} valgteKolonner={valgteKolonner} />

            <TiltakshendelseLenke bruker={bruker} valgteKolonner={valgteKolonner} enhetId={enhetId} />
            <TiltakshendelseDatoOpprettet bruker={bruker} valgteKolonner={valgteKolonner} />

            <AvtaltAktivitet bruker={bruker} valgteKolonner={valgteKolonner} />
            <UtlopteAktiviteter bruker={bruker} valgteKolonner={valgteKolonner} />

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

            <Utkast14aVedtaksstatus bruker={bruker} valgteKolonner={valgteKolonner} />
            <Utkast14aVedtaksstatusEndret bruker={bruker} valgteKolonner={valgteKolonner} />
            <Utkast14aAnsvarligVeileder bruker={bruker} valgteKolonner={valgteKolonner} />

            <SisteEndring bruker={bruker} enhetId={enhetId} valgteKolonner={valgteKolonner} />
            <SisteEndringDato bruker={bruker} valgteKolonner={valgteKolonner} />

            <SvarfristCv bruker={bruker} valgteKolonner={valgteKolonner} />

            <Status14aVedtak bruker={bruker} valgteKolonner={valgteKolonner} />

            <GjeldendeVedtak14aInnsatsgruppe bruker={bruker} valgteKolonner={valgteKolonner} />
            <GjeldendeVedtak14aHovedmal bruker={bruker} valgteKolonner={valgteKolonner} />
            <GjeldendeVedtak14aVedtaksdato bruker={bruker} valgteKolonner={valgteKolonner} />

            <EnsligeForsorgereUtlopOvergangsstonad bruker={bruker} valgteKolonner={valgteKolonner} />
            <EnsligeForsorgereVedtaksperiode bruker={bruker} valgteKolonner={valgteKolonner} />
            <EnsligeForsorgereAktivitetsplikt bruker={bruker} valgteKolonner={valgteKolonner} />
            <EnsligeForsorgereOmBarnet bruker={bruker} valgteKolonner={valgteKolonner} />

            <BarnUnder18Aar bruker={bruker} valgteKolonner={valgteKolonner} />

            <UtdanningOgSituasjonSistEndret bruker={bruker} valgteKolonner={valgteKolonner} />

            <HuskelappKommentar bruker={bruker} valgteKolonner={valgteKolonner} />
            <HuskelappFrist bruker={bruker} valgteKolonner={valgteKolonner} />
        </div>
    );
}
