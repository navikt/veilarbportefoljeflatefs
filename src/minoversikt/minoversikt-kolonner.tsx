import {parseDatoString, utledValgteAktivitetsTyper} from '../utils/utils';
import {Navn} from '../components/tabell/innholdsceller/Navn';
import {Fnr} from '../components/tabell/innholdsceller/Fnr';
import {DatoKolonne} from '../components/tabell/kolonner/datokolonne';
import {BrukerModell} from '../typer/bruker-modell';
import {FiltervalgModell} from '../typer/filtervalg-modell';
import {Kolonne} from '../ducks/ui/listevisning';
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
import {EnsligeForsorgereOmBarnet} from '../components/tabell/innholdsceller/EnsligeForsorgereOmBarnet';
import {UtdanningOgSituasjonSistEndret} from '../components/tabell/innholdsceller/UtdanningOgSituasjonSistEndret';
import {BarnUnder18Aar} from '../components/tabell/innholdsceller/BarnUnder18Aar';
import {HuskelappKommentar} from '../components/tabell/innholdsceller/min-oversikt/HuskelappKommentar';
import {HuskelappFrist} from '../components/tabell/innholdsceller/min-oversikt/HuskelappFrist';
import {HuskelappSistEndret} from '../components/tabell/innholdsceller/min-oversikt/HuskelappSistEndret';
import {AapKelvinVedtakTilOgMedDato} from '../components/tabell/innholdsceller/AapKelvinVedtakTilOgMedDato';
import {AapKelvinRettighet} from '../components/tabell/innholdsceller/AapKelvinRettighet';
import {TildeltTidspunkt} from '../components/tabell/innholdsceller/TildeltTidspunkt';
import {AapArenaYtelsestype} from '../components/tabell/innholdsceller/AapArenaYtelsestype';
import {AapArenaVurderingsfrist} from '../components/tabell/innholdsceller/AapArenaVurderingsfrist';
import {AapArenaVedtaksperiode} from '../components/tabell/innholdsceller/AapArenaVedtaksperiode';
import {AapArenaRettighetsperiode} from '../components/tabell/innholdsceller/AapArenaRettighetsperiode';
import {TiltakspengerArenaGjenstaendeUkerVedtak} from '../components/tabell/innholdsceller/TiltakspengerArenaGjenstaendeUkerVedtak';
import {DagpengerArenaGjenstaendeUkerRettighet} from '../components/tabell/innholdsceller/DagpengerArenaGjenstaendeUkerRettighet';
import './minoversikt.css';
import {TiltakspengerVedtakTilOgMedDato} from '../components/tabell/innholdsceller/TiltakspengerVedtakTilOgMedDato';
import {TiltakspengerRettighet} from '../components/tabell/innholdsceller/TiltakspengerRettighet';

interface MinOversiktKolonnerProps {
    bruker: BrukerModell;
    enhetId: string;
    filtervalg: FiltervalgModell;
    valgteKolonner: Kolonne[];
}

export function MinOversiktKolonner({bruker, enhetId, filtervalg, valgteKolonner}: MinOversiktKolonnerProps) {
    const valgteAktivitetstyper = utledValgteAktivitetsTyper(bruker.aktiviteter, filtervalg.aktiviteter);

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
            <TildeltTidspunkt bruker={bruker} valgteKolonner={valgteKolonner} />

            <DagpengerArenaGjenstaendeUkerRettighet
                bruker={bruker}
                valgteKolonner={valgteKolonner}
                filtervalg={filtervalg}
            />

            <TiltakspengerArenaGjenstaendeUkerVedtak bruker={bruker} valgteKolonner={valgteKolonner} />

            <AapArenaYtelsestype bruker={bruker} valgteKolonner={valgteKolonner} />
            <AapArenaVurderingsfrist bruker={bruker} valgteKolonner={valgteKolonner} />
            <AapArenaVedtaksperiode bruker={bruker} valgteKolonner={valgteKolonner} />
            <AapArenaRettighetsperiode bruker={bruker} valgteKolonner={valgteKolonner} filtervalg={filtervalg} />

            <VenterPaSvarFraNav bruker={bruker} valgteKolonner={valgteKolonner} />
            <VenterPaSvarFraBruker bruker={bruker} valgteKolonner={valgteKolonner} />

            <FilterhendelseLenke bruker={bruker} valgteKolonner={valgteKolonner} enhetId={enhetId} />
            <FilterhendelseDatoOpprettet bruker={bruker} valgteKolonner={valgteKolonner} />

            <TiltakshendelseLenke bruker={bruker} valgteKolonner={valgteKolonner} enhetId={enhetId} />
            <TiltakshendelseDatoOpprettet bruker={bruker} valgteKolonner={valgteKolonner} />

            <UtlopteAktiviteter bruker={bruker} valgteKolonner={valgteKolonner} />
            <AvtaltAktivitet bruker={bruker} valgteKolonner={valgteKolonner} />

            <MoterIDag bruker={bruker} valgteKolonner={valgteKolonner} />
            <MoteVarighet bruker={bruker} valgteKolonner={valgteKolonner} />
            <Motestatus bruker={bruker} valgteKolonner={valgteKolonner} />

            <Utkast14aVedtaksstatus bruker={bruker} valgteKolonner={valgteKolonner} />
            <Utkast14aVedtaksstatusEndret bruker={bruker} valgteKolonner={valgteKolonner} />
            <Utkast14aAnsvarligVeileder bruker={bruker} valgteKolonner={valgteKolonner} />

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
            <HuskelappSistEndret bruker={bruker} valgteKolonner={valgteKolonner} />

            <AapKelvinVedtakTilOgMedDato bruker={bruker} valgteKolonner={valgteKolonner} />
            <AapKelvinRettighet bruker={bruker} valgteKolonner={valgteKolonner} />

            <TiltakspengerVedtakTilOgMedDato bruker={bruker} valgteKolonner={valgteKolonner} />
            <TiltakspengerRettighet bruker={bruker} valgteKolonner={valgteKolonner} />
        </div>
    );
}
