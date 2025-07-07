import {Navn} from '../components/tabell/innholdsceller/Navn';
import {Fnr} from '../components/tabell/innholdsceller/Fnr';
import {UkeKolonne} from '../components/tabell/kolonner/ukekolonne';
import {ytelseAapSortering, ytelsevalg} from '../filtrering/filter-konstanter';
import {DatoKolonne} from '../components/tabell/kolonner/datokolonne';
import {Kolonne} from '../ducks/ui/listevisning';
import {BrukerModell} from '../typer/bruker-modell';
import {FiltervalgModell} from '../typer/filtervalg-modell';
import {
    aapRettighetsperiode,
    aapVurderingsfrist,
    parseDatoString,
    utledValgteAktivitetsTyper,
    utlopsdatoUker,
    ytelsestypetekst
} from '../utils/utils';
import {VeilederNavn} from '../components/tabell/innholdsceller/enhetens-oversikt/veiledernavn';
import {VeilederNavident} from '../components/tabell/innholdsceller/enhetens-oversikt/veilederNavident';
import {TekstKolonne} from '../components/tabell/kolonner/tekstkolonne';
import {SisteEndring} from '../components/tabell/innholdsceller/SisteEndring';
import {Fodeland} from '../components/tabell/innholdsceller/Fodeland';
import {Statsborgerskap} from '../components/tabell/innholdsceller/Statsborgerskap';
import {StatsborgerskapGyldigFra} from '../components/tabell/innholdsceller/StatsborgerskapGyldigFra';
import {GeografiskBosted} from '../components/tabell/innholdsceller/GeografiskBosted';
import {GeografiskBostedDetaljer} from '../components/tabell/innholdsceller/GeografiskBostedDetaljer';
import {GeografiskBostedSistOppdatert} from '../components/tabell/innholdsceller/GeografiskBostedSistOppdatert';
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
import {UtdanningOgSituasjonSistEndret} from '../components/tabell/innholdsceller/UtdanningOgSituasjonSistEndret';
import {BarnUnder18Aar} from '../components/tabell/innholdsceller/BarnUnder18Aar';
import {EnsligeForsorgereOmBarnet} from '../components/tabell/innholdsceller/EnsligeForsorgereOmBarnet';
import './enhetsportefolje.css';
import './brukerliste.css';

interface EnhetKolonnerProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: string;
    filtervalg: FiltervalgModell;
    valgteKolonner: Kolonne[];
}

export function EnhetKolonner({className, bruker, enhetId, filtervalg, valgteKolonner}: EnhetKolonnerProps) {
    const ytelsevalgIntl = ytelsevalg();
    const {ytelse} = filtervalg;
    const utlopsdatoUkerIgjen = utlopsdatoUker(bruker.utlopsdato);
    const valgteAktivitetstyper = utledValgteAktivitetsTyper(bruker.aktiviteter, filtervalg.aktiviteter);
    const erAapYtelse = !!ytelse && Object.keys(ytelseAapSortering).includes(ytelse);
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
        <div className={className}>
            <Navn className="col col-xs-2" bruker={bruker} enhetId={enhetId} />
            <Fnr className="col col-xs-2-5 fnr-kolonne" bruker={bruker} />

            <Fodeland bruker={bruker} valgteKolonner={valgteKolonner} />
            <Statsborgerskap bruker={bruker} valgteKolonner={valgteKolonner} />
            <StatsborgerskapGyldigFra bruker={bruker} valgteKolonner={valgteKolonner} />

            <Tolkebehov bruker={bruker} valgteKolonner={valgteKolonner} filtervalg={filtervalg} />
            <Tolkesprak bruker={bruker} valgteKolonner={valgteKolonner} filtervalg={filtervalg} />
            <TolkebehovSistOppdatert bruker={bruker} valgteKolonner={valgteKolonner} />

            <GeografiskBosted bruker={bruker} valgteKolonner={valgteKolonner} />
            <GeografiskBostedDetaljer bruker={bruker} valgteKolonner={valgteKolonner} />
            <GeografiskBostedSistOppdatert bruker={bruker} valgteKolonner={valgteKolonner} />

            <OppfolgingStartet bruker={bruker} valgteKolonner={valgteKolonner} />

            <VeilederNavn bruker={bruker} valgteKolonner={valgteKolonner} />
            <VeilederNavident bruker={bruker} valgteKolonner={valgteKolonner} />

            <UkeKolonne
                className="col col-xs-2"
                ukerIgjen={bruker.dagputlopUke}
                minVal={2}
                skalVises={
                    valgteKolonner.includes(Kolonne.GJENSTAENDE_UKER_RETTIGHET_DAGPENGER) &&
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
                    valgteKolonner.includes(Kolonne.GJENSTAENDE_UKER_RETTIGHET_DAGPENGER) &&
                    (ytelse === ytelsevalgIntl.DAGPENGER_MED_PERMITTERING ||
                        ytelse === ytelsevalgIntl.DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI)
                }
            />
            <TekstKolonne
                className="col col-xs-2"
                skalVises={valgteKolonner.includes(Kolonne.TYPE_YTELSE) && erAapYtelse}
                tekst={bruker.ytelse ? ytelsestypetekst(bruker.ytelse) : '–'}
            />
            <TekstKolonne
                className="col col-xs-2"
                skalVises={valgteKolonner.includes(Kolonne.VURDERINGSFRIST_YTELSE) && erAapYtelse}
                tekst={vurderingsfristAAP || '–'}
            />
            <UkeKolonne
                className="col col-xs-2"
                ukerIgjen={utlopsdatoUkerIgjen}
                minVal={2}
                skalVises={valgteKolonner.includes(Kolonne.VEDTAKSPERIODE) && erAapYtelse}
            />
            <UkeKolonne
                className="col col-xs-2"
                ukerIgjen={rettighetsPeriode}
                minVal={2}
                skalVises={valgteKolonner.includes(Kolonne.RETTIGHETSPERIODE) && erAapYtelse}
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

            <TiltakshendelseLenke bruker={bruker} valgteKolonner={valgteKolonner} enhetId={enhetId} />
            <TiltakshendelseDatoOpprettet bruker={bruker} valgteKolonner={valgteKolonner} />

            <UtlopteAktiviteter bruker={bruker} valgteKolonner={valgteKolonner} />
            <AvtaltAktivitet bruker={bruker} valgteKolonner={valgteKolonner} />

            <DatoKolonne
                className="col col-xs-2"
                dato={parseDatoString(bruker.nesteUtlopsdatoAktivitet)}
                skalVises={avtaltAktivitetOgTiltak || forenkletAktivitetOgTiltak}
            />

            <MoterIDag bruker={bruker} valgteKolonner={valgteKolonner} />
            <MoteVarighet bruker={bruker} valgteKolonner={valgteKolonner} />
            <Motestatus bruker={bruker} valgteKolonner={valgteKolonner} />

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
        </div>
    );
}
