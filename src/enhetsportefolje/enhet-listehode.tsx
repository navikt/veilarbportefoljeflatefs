import {SorteringHeader} from '../components/tabell/sortering-header';
import {AktiviteterValg} from '../filtrering/filter-konstanter';
import {FiltervalgModell} from '../typer/filtervalg-modell';
import {Kolonne} from '../ducks/ui/listevisning';
import VelgalleCheckboks from '../components/toolbar/velgalle-checkboks';
import {OrNothing} from '../utils/types/types';
import {Navn} from '../components/tabell/headerceller/Navn';
import {Fnr} from '../components/tabell/headerceller/Fnr';
import {Fodeland} from '../components/tabell/headerceller/Fodeland';
import {Statsborgerskap} from '../components/tabell/headerceller/Statsborgerskap';
import {StatsborgerskapGyldigFra} from '../components/tabell/headerceller/StatsborgerskapGyldigFra';
import {Tolkebehov} from '../components/tabell/headerceller/Tolkebehov';
import {Tolkesprak} from '../components/tabell/headerceller/Tolkesprak';
import {TolkebehovSistOppdatert} from '../components/tabell/headerceller/TolkebehovSistOppdatert';
import {GeografiskBosted} from '../components/tabell/headerceller/GeografiskBosted';
import {GeografiskBostedDetaljer} from '../components/tabell/headerceller/GeografiskBostedDetaljer';
import {GeografiskBostedSistOppdatert} from '../components/tabell/headerceller/GeografiskBostedSistOppdatert';
import {OppfolgingStartet} from '../components/tabell/headerceller/OppfolgingStartet';
import {SvarfristCv} from '../components/tabell/headerceller/SvarfristCv';
import {Status14aVedtak} from '../components/tabell/headerceller/Status14aVedtak';
import {BarnUnder18Aar} from '../components/tabell/headerceller/BarnUnder18Ar';
import {UtdanningOgSituasjonSistEndret} from '../components/tabell/headerceller/UtdanningOgSituasjonSistEndret';
import {GjeldendeVedtak14aInnsatsgruppe} from '../components/tabell/headerceller/GjeldendeVedtak14aInnsatsgruppe';
import {GjeldendeVedtak14aHovedmal} from '../components/tabell/headerceller/GjeldendeVedtak14aHovedmal';
import {GjeldendeVedtak14aVedtaksdato} from '../components/tabell/headerceller/GjeldendeVedtak14aVedtaksdato';
import {FilterhendelseLenke} from '../components/tabell/headerceller/FilterhendelseLenke';
import {FilterhendelseDatoOpprettet} from '../components/tabell/headerceller/FilterhendelseDatoOpprettet';
import {TiltakshendelseDatoOpprettet} from '../components/tabell/headerceller/TiltakshendelseDatoOpprettet';
import {TiltakshendelseLenke} from '../components/tabell/headerceller/TiltakshendelseLenke';
import {EnsligeForsorgereOmBarnet} from '../components/tabell/headerceller/EnsligeForsorgereOmBarnet';
import {EnsligeForsorgereAktivitetsplikt} from '../components/tabell/headerceller/EnsligeForsorgereAktivitetsplikt';
import {EnsligeForsorgereVedtaksperiode} from '../components/tabell/headerceller/EnsligeForsorgereVedtaksperiode';
import {EnsligeForsorgereUtlopOvergangsstonad} from '../components/tabell/headerceller/EnsligeForsorgereUtlopOvergangsstonad';
import {SisteEndringDato} from '../components/tabell/headerceller/SisteEndringDato';
import {SisteEndring} from '../components/tabell/headerceller/SisteEndring';
import {VenterPaSvarFraNav} from '../components/tabell/headerceller/VenterPaSvarFraNav';
import {VenterPaSvarFraBruker} from '../components/tabell/headerceller/VenterPaSvarFraBruker';
import {UtlopteAktiviteter} from '../components/tabell/headerceller/UtlopteAktiviteter';
import {AvtaltAktivitet} from '../components/tabell/headerceller/AvtaltAktivitet';
import {MoterIDag} from '../components/tabell/headerceller/MoterIDag';
import {MoteVarighet} from '../components/tabell/headerceller/MoteVarighet';
import {Motestatus} from '../components/tabell/headerceller/Motestatus';
import {Utkast14aVedtaksstatus} from '../components/tabell/headerceller/Utkast14aVedtaksstatus';
import {Utkast14aVedtaksstatusEndret} from '../components/tabell/headerceller/Utkast14aVedtaksstatusEndret';
import {Utkast14aAnsvarligVeileder} from '../components/tabell/headerceller/Utkast14aAnsvarligVeileder';
import {VeilederNavident} from '../components/tabell/headerceller/enhetens-oversikt/VeilederNavident';
import {VeilederNavn} from '../components/tabell/headerceller/enhetens-oversikt/VeilederNavn';
import {Sorteringsfelt, Sorteringsrekkefolge} from '../typer/kolonnesortering';
import {AapKelvinVedtakTilOgMedDato} from '../components/tabell/headerceller/AapKelvinVedtakTilOgMedDato';
import {AapKelvinRettighetstype} from '../components/tabell/headerceller/AapKelvinRettighetstype';
import {TildeltTidspunkt} from '../components/tabell/headerceller/TildeltTidspunkt';
import {DagpengerArenaGjenstaendeUkerRettighet} from '../components/tabell/headerceller/DagpengerArenaGjenstaendeUkerRettighet';
import {TiltakspengerArenaGjenstaendeUkerVedtak} from '../components/tabell/headerceller/TiltakspengerArenaGjenstaendeUkerVedtak';
import {AapArenaYtelsestype} from '../components/tabell/headerceller/AapArenaYtelsestype';
import {AapArenaVurderingsfrist} from '../components/tabell/headerceller/AapArenaVurderingsfrist';
import {AapArenaVedtaksperiode} from '../components/tabell/headerceller/AapArenaVedtaksperiode';
import {AapArenaRettighetsperiode} from '../components/tabell/headerceller/AapArenaRettighetsperiode';
import './enhetsportefolje.css';
import './brukerliste.css';

function harValgteAktiviteter(aktiviteter) {
    if (aktiviteter && Object.keys(aktiviteter).length > 0) {
        const valgteAktiviteter = Object.values(aktiviteter).filter(
            aktivitetvalg => aktivitetvalg !== AktiviteterValg.NA
        );
        return valgteAktiviteter?.length > 0;
    }
    return false;
}

interface EnhetListehodeProps {
    sorteringsrekkefolge: OrNothing<Sorteringsrekkefolge>;
    sorteringOnClick: (sortering: string) => void;
    valgteKolonner: Kolonne[];
    filtervalg: FiltervalgModell;
    sorteringsfelt: OrNothing<Sorteringsfelt>;
}

export function EnhetListehode({
    sorteringsrekkefolge,
    sorteringOnClick,
    filtervalg,
    sorteringsfelt,
    valgteKolonner
}: EnhetListehodeProps) {
    const avansertAktivitet = harValgteAktiviteter(filtervalg.aktiviteter);

    const forenkletAktivitet = harValgteAktiviteter(filtervalg.aktiviteterForenklet);

    const tiltaksType = harValgteAktiviteter(filtervalg.tiltakstyper);

    const sorteringTilHeadercelle = {
        gjeldendeSorteringsfelt: sorteringsfelt,
        valgteKolonner: valgteKolonner,
        rekkefolge: sorteringsrekkefolge,
        onClick: sorteringOnClick
    };

    return (
        <div className="brukerliste__header brukerliste__sorteringheader">
            <VelgalleCheckboks />
            <div className="brukerliste__innhold" data-testid="brukerliste_innhold">
                <Navn {...sorteringTilHeadercelle} />
                <Fnr {...sorteringTilHeadercelle} />

                <Fodeland {...sorteringTilHeadercelle} />
                <Statsborgerskap {...sorteringTilHeadercelle} />
                <StatsborgerskapGyldigFra {...sorteringTilHeadercelle} />

                <Tolkebehov {...sorteringTilHeadercelle} />
                <Tolkesprak {...sorteringTilHeadercelle} />
                <TolkebehovSistOppdatert {...sorteringTilHeadercelle} />

                <GeografiskBosted {...sorteringTilHeadercelle} />
                <GeografiskBostedDetaljer {...sorteringTilHeadercelle} />
                <GeografiskBostedSistOppdatert {...sorteringTilHeadercelle} />

                <OppfolgingStartet {...sorteringTilHeadercelle} />

                <VeilederNavn {...sorteringTilHeadercelle} />
                <VeilederNavident {...sorteringTilHeadercelle} />
                <TildeltTidspunkt {...sorteringTilHeadercelle} />

                <DagpengerArenaGjenstaendeUkerRettighet {...sorteringTilHeadercelle} filtervalg={filtervalg} />

                <TiltakspengerArenaGjenstaendeUkerVedtak {...sorteringTilHeadercelle} />

                <AapArenaYtelsestype {...sorteringTilHeadercelle} />
                <AapArenaVurderingsfrist {...sorteringTilHeadercelle} />
                <AapArenaVedtaksperiode {...sorteringTilHeadercelle} />
                <AapArenaRettighetsperiode {...sorteringTilHeadercelle} filtervalg={filtervalg} />

                <VenterPaSvarFraNav {...sorteringTilHeadercelle} />
                <VenterPaSvarFraBruker {...sorteringTilHeadercelle} />

                <FilterhendelseLenke {...sorteringTilHeadercelle} />
                <FilterhendelseDatoOpprettet {...sorteringTilHeadercelle} />

                <TiltakshendelseLenke {...sorteringTilHeadercelle} />
                <TiltakshendelseDatoOpprettet {...sorteringTilHeadercelle} />

                <UtlopteAktiviteter {...sorteringTilHeadercelle} />
                <AvtaltAktivitet {...sorteringTilHeadercelle} />

                <SorteringHeader
                    skalVises={
                        valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET) &&
                        (avansertAktivitet || forenkletAktivitet || tiltaksType)
                    }
                    sortering={Sorteringsfelt.VALGTE_AKTIVITETER}
                    erValgt={sorteringsfelt === Sorteringsfelt.VALGTE_AKTIVITETER}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Neste utløpsdato valgt aktivitet"
                    title='Neste utløpsdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                    className="col col-xs-2"
                />

                <MoterIDag {...sorteringTilHeadercelle} />
                <MoteVarighet {...sorteringTilHeadercelle} />
                <Motestatus {...sorteringTilHeadercelle} />

                <Utkast14aVedtaksstatus {...sorteringTilHeadercelle} />
                <Utkast14aVedtaksstatusEndret {...sorteringTilHeadercelle} />
                <Utkast14aAnsvarligVeileder {...sorteringTilHeadercelle} />

                <SisteEndring {...sorteringTilHeadercelle} />
                <SisteEndringDato {...sorteringTilHeadercelle} />

                <SvarfristCv {...sorteringTilHeadercelle} />

                <Status14aVedtak {...sorteringTilHeadercelle} />

                <GjeldendeVedtak14aInnsatsgruppe {...sorteringTilHeadercelle} />
                <GjeldendeVedtak14aHovedmal {...sorteringTilHeadercelle} />
                <GjeldendeVedtak14aVedtaksdato {...sorteringTilHeadercelle} />

                <EnsligeForsorgereUtlopOvergangsstonad {...sorteringTilHeadercelle} />
                <EnsligeForsorgereVedtaksperiode {...sorteringTilHeadercelle} />
                <EnsligeForsorgereAktivitetsplikt {...sorteringTilHeadercelle} />
                <EnsligeForsorgereOmBarnet {...sorteringTilHeadercelle} />

                <BarnUnder18Aar {...sorteringTilHeadercelle} />

                <UtdanningOgSituasjonSistEndret {...sorteringTilHeadercelle} />

                <AapKelvinVedtakTilOgMedDato {...sorteringTilHeadercelle} />
                <AapKelvinRettighetstype {...sorteringTilHeadercelle} />
            </div>
            <div className="brukerliste__gutter-right" />
        </div>
    );
}
