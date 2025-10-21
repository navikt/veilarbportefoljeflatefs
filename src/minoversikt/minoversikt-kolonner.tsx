import {parseDatoString, utledValgteAktivitetsTyper} from '../utils/utils';
import {Navn} from '../components/tabell/dataCells/Navn';
import {Fnr} from '../components/tabell/dataCells/Fnr';
import {DatoKolonne} from '../components/tabell/kolonner/datokolonne';
import {BrukerModell} from '../typer/bruker-modell';
import {FiltervalgModell} from '../typer/filtervalg-modell';
import {Kolonne} from '../ducks/ui/listevisning';
import {SisteEndring} from '../components/tabell/dataCells/SisteEndring';
import {Fodeland} from '../components/tabell/dataCells/Fodeland';
import {Statsborgerskap} from '../components/tabell/dataCells/Statsborgerskap';
import {StatsborgerskapGyldigFra} from '../components/tabell/dataCells/StatsborgerskapGyldigFra';
import {GeografiskBosted} from '../components/tabell/dataCells/GeografiskBosted';
import {GeografiskBostedDetaljer} from '../components/tabell/dataCells/GeografiskBostedDetaljer';
import {GeografiskBostedSistOppdatert} from '../components/tabell/dataCells/GeografiskBostedSistOppdatert';
import {Tolkebehov} from '../components/tabell/dataCells/Tolkebehov';
import {Tolkesprak} from '../components/tabell/dataCells/Tolkesprak';
import {TolkebehovSistOppdatert} from '../components/tabell/dataCells/TolkebehovSistOppdatert';
import {OppfolgingStartet} from '../components/tabell/dataCells/OppfolgingStartet';
import {VenterPaSvarFraNav} from '../components/tabell/dataCells/VenterPaSvarFraNav';
import {VenterPaSvarFraBruker} from '../components/tabell/dataCells/VenterPaSvarFraBruker';
import {FilterhendelseLenke} from '../components/tabell/dataCells/FilterhendelseLenke';
import {FilterhendelseDatoOpprettet} from '../components/tabell/dataCells/FilterhendelseDatoOpprettet';
import {TiltakshendelseLenke} from '../components/tabell/dataCells/TiltakshendelseLenke';
import {TiltakshendelseDatoOpprettet} from '../components/tabell/dataCells/TiltakshendelseDatoOpprettet';
import {UtlopteAktiviteter} from '../components/tabell/dataCells/UtlopteAktiviteter';
import {AvtaltAktivitet} from '../components/tabell/dataCells/AvtaltAktivitet';
import {MoterIDag} from '../components/tabell/dataCells/MoterIDag';
import {MoteVarighet} from '../components/tabell/dataCells/MoteVarighet';
import {Motestatus} from '../components/tabell/dataCells/Motestatus';
import {Utkast14aVedtaksstatus} from '../components/tabell/dataCells/Utkast14aVedtaksstatus';
import {Utkast14aVedtaksstatusEndret} from '../components/tabell/dataCells/Utkast14aVedtaksstatusEndret';
import {Utkast14aAnsvarligVeileder} from '../components/tabell/dataCells/Utkast14aAnsvarligVeileder';
import {SisteEndringDato} from '../components/tabell/dataCells/SisteEndringDato';
import {SvarfristCv} from '../components/tabell/dataCells/SvarfristCv';
import {Status14aVedtak} from '../components/tabell/dataCells/Status14aVedtak';
import {GjeldendeVedtak14aInnsatsgruppe} from '../components/tabell/dataCells/GjeldendeVedtak14aInnsatsgruppe';
import {GjeldendeVedtak14aHovedmal} from '../components/tabell/dataCells/GjeldendeVedtak14aHovedmal';
import {GjeldendeVedtak14aVedtaksdato} from '../components/tabell/dataCells/GjeldendeVedtak14aVedtaksdato';
import {EnsligeForsorgereUtlopOvergangsstonad} from '../components/tabell/dataCells/EnsligeForsorgereUtlopOvergangsstonad';
import {EnsligeForsorgereVedtaksperiode} from '../components/tabell/dataCells/EnsligeForsorgereVedtaksperiode';
import {EnsligeForsorgereAktivitetsplikt} from '../components/tabell/dataCells/EnsligeForsorgereAktivitetsplikt';
import {EnsligeForsorgereOmBarnet} from '../components/tabell/dataCells/EnsligeForsorgereOmBarnet';
import {UtdanningOgSituasjonSistEndret} from '../components/tabell/dataCells/UtdanningOgSituasjonSistEndret';
import {BarnUnder18Aar} from '../components/tabell/dataCells/BarnUnder18Aar';
import {HuskelappKommentar} from '../components/tabell/dataCells/min-oversikt/HuskelappKommentar';
import {HuskelappFrist} from '../components/tabell/dataCells/min-oversikt/HuskelappFrist';
import {HuskelappSistEndret} from '../components/tabell/dataCells/min-oversikt/HuskelappSistEndret';
import {AapKelvinVedtakTilOgMedDato} from '../components/tabell/dataCells/AapKelvinVedtakTilOgMedDato';
import {AapKelvinRettighet} from '../components/tabell/dataCells/AapKelvinRettighet';
import {TildeltTidspunkt} from '../components/tabell/dataCells/TildeltTidspunkt';
import {AapArenaYtelsestype} from '../components/tabell/dataCells/AapArenaYtelsestype';
import {AapArenaVurderingsfrist} from '../components/tabell/dataCells/AapArenaVurderingsfrist';
import {AapArenaVedtaksperiode} from '../components/tabell/dataCells/AapArenaVedtaksperiode';
import {AapArenaRettighetsperiode} from '../components/tabell/dataCells/AapArenaRettighetsperiode';
import {TiltakspengerArenaGjenstaendeUkerVedtak} from '../components/tabell/dataCells/TiltakspengerArenaGjenstaendeUkerVedtak';
import {DagpengerArenaGjenstaendeUkerRettighet} from '../components/tabell/dataCells/DagpengerArenaGjenstaendeUkerRettighet';
import './minoversikt.css';
import {TiltakspengerVedtakTilOgMedDato} from '../components/tabell/dataCells/TiltakspengerVedtakTilOgMedDato';
import {TiltakspengerRettighet} from '../components/tabell/dataCells/TiltakspengerRettighet';

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
