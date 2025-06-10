import {
    aapRettighetsperiode,
    aapVurderingsfrist,
    parseDatoString,
    utledValgteAktivitetsTyper,
    utlopsdatoUker,
    ytelsestypetekst
} from '../utils/utils';
import {BrukerNavn} from '../components/tabell/innholdsceller/brukernavn';
import {BrukerFnr} from '../components/tabell/innholdsceller/brukerfnr';
import {UkeKolonne} from '../components/tabell/kolonner/ukekolonne';
import {avvik14aVedtakAvhengigeFilter, ytelseAapSortering, ytelsevalg} from '../filtrering/filter-konstanter';
import {DatoKolonne} from '../components/tabell/kolonner/datokolonne';
import {HovedmalNavn, innsatsgruppeNavn} from '../model-interfaces';
import {BarnUnder18Aar, BrukerModell} from '../typer/bruker-modell';
import {FiltervalgModell} from '../typer/filtervalg-modell';
import {Kolonne} from '../ducks/ui/listevisning';
import {toDateString} from '../utils/dato-utils';
import {TekstKolonne} from '../components/tabell/kolonner/tekstkolonne';
import {SisteEndring} from '../components/tabell/innholdsceller/SisteEndring';
import {truncateTekst} from '../utils/tekst-utils';
import {mapOmAktivitetsPlikt, oppfolingsdatoEnsligeForsorgere} from '../utils/enslig-forsorger';
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
import './minoversikt.css';
import {SvarfristCv} from '../components/tabell/innholdsceller/SvarfristCv';

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
