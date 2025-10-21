import {SorteringHeader} from '../components/tabell/sortering-header';
import {FiltervalgModell} from '../typer/filtervalg-modell';
import {Sorteringsfelt, Sorteringsrekkefolge} from '../typer/kolonnesortering';
import {AktiviteterValg} from '../filtrering/filter-konstanter';
import {Kolonne} from '../ducks/ui/listevisning';
import VelgalleCheckboks from '../components/toolbar/velgalle-checkboks';
import {OrNothing} from '../utils/types/types';
import {NavnHeader} from '../components/tabell/headerceller/NavnHeader';
import {FnrHeader} from '../components/tabell/headerceller/FnrHeader';
import {FodelandHeader} from '../components/tabell/headerceller/FodelandHeader';
import {StatsborgerskapHeader} from '../components/tabell/headerceller/StatsborgerskapHeader';
import {StatsborgerskapGyldigFraHeader} from '../components/tabell/headerceller/StatsborgerskapGyldigFraHeader';
import {TolkebehovHeader} from '../components/tabell/headerceller/TolkebehovHeader';
import {TolkesprakHeader} from '../components/tabell/headerceller/TolkesprakHeader';
import {TolkebehovSistOppdatertHeader} from '../components/tabell/headerceller/TolkebehovSistOppdatertHeader';
import {GeografiskBostedHeader} from '../components/tabell/headerceller/GeografiskBostedHeader';
import {GeografiskBostedDetaljerHeader} from '../components/tabell/headerceller/GeografiskBostedDetaljerHeader';
import {GeografiskBostedSistOppdatertHeader} from '../components/tabell/headerceller/GeografiskBostedSistOppdatertHeader';
import {OppfolgingStartetHeader} from '../components/tabell/headerceller/OppfolgingStartetHeader';
import {SvarfristCvHeader} from '../components/tabell/headerceller/SvarfristCvHeader';
import {Status14aVedtakHeader} from '../components/tabell/headerceller/Status14aVedtakHeader';
import {BarnUnder18AarHeader} from '../components/tabell/headerceller/BarnUnder18AarHeader';
import {UtdanningOgSituasjonSistEndretHeader} from '../components/tabell/headerceller/UtdanningOgSituasjonSistEndretHeader';
import {HuskelappKommentarHeader} from '../components/tabell/headerceller/HuskelappKommentarHeader';
import {HuskelappFristHeader} from '../components/tabell/headerceller/HuskelappFristHeader';
import {GjeldendeVedtak14aInnsatsgruppeHeader} from '../components/tabell/headerceller/GjeldendeVedtak14aInnsatsgruppeHeader';
import {GjeldendeVedtak14aHovedmalHeader} from '../components/tabell/headerceller/GjeldendeVedtak14aHovedmalHeader';
import {GjeldendeVedtak14aVedtaksdatoHeader} from '../components/tabell/headerceller/GjeldendeVedtak14aVedtaksdatoHeader';
import {FilterhendelseLenkeHeader} from '../components/tabell/headerceller/FilterhendelseLenkeHeader';
import {FilterhendelseDatoOpprettetHeaderHeader} from '../components/tabell/headerceller/FilterhendelseDatoOpprettetHeaderHeader';
import {TiltakshendelseDatoOpprettetHeader} from '../components/tabell/headerceller/TiltakshendelseDatoOpprettetHeader';
import {TiltakshendelseLenkeHeader} from '../components/tabell/headerceller/TiltakshendelseLenkeHeader';
import {EnsligeForsorgereOmBarnetHeader} from '../components/tabell/headerceller/EnsligeForsorgereOmBarnetHeader';
import {EnsligeForsorgereAktivitetspliktHeader} from '../components/tabell/headerceller/EnsligeForsorgereAktivitetspliktHeader';
import {EnsligeForsorgereVedtaksperiodeHeader} from '../components/tabell/headerceller/EnsligeForsorgereVedtaksperiodeHeader';
import {EnsligeForsorgereUtlopOvergangsstonadHeader} from '../components/tabell/headerceller/EnsligeForsorgereUtlopOvergangsstonadHeader';
import {SisteEndringDatoHeader} from '../components/tabell/headerceller/SisteEndringDatoHeader';
import {SisteEndringHeader} from '../components/tabell/headerceller/SisteEndringHeader';
import {VenterPaSvarFraNavHeader} from '../components/tabell/headerceller/VenterPaSvarFraNavHeader';
import {VenterPaSvarFraBrukerHeader} from '../components/tabell/headerceller/VenterPaSvarFraBrukerHeader';
import {UtlopteAktiviteterHeader} from '../components/tabell/headerceller/UtlopteAktiviteterHeader';
import {AvtaltAktivitetHeader} from '../components/tabell/headerceller/AvtaltAktivitetHeader';
import {MoterIDagHeader} from '../components/tabell/headerceller/MoterIDagHeader';
import {MoteVarighetHeader} from '../components/tabell/headerceller/MoteVarighetHeader';
import {MotestatusHeader} from '../components/tabell/headerceller/MotestatusHeader';
import {Utkast14aVedtaksstatusHeader} from '../components/tabell/headerceller/Utkast14aVedtaksstatusHeader';
import {Utkast14aVedtaksstatusEndretHeader} from '../components/tabell/headerceller/Utkast14aVedtaksstatusEndretHeader';
import {Utkast14aAnsvarligVeilederHeader} from '../components/tabell/headerceller/Utkast14aAnsvarligVeilederHeader';
import {Fargekategori} from '../components/tabell/headerceller/min-oversikt/Fargekategori';
import {Huskelapp} from '../components/tabell/headerceller/min-oversikt/Huskelapp';
import {HuskelappSistEndretHeader} from '../components/tabell/headerceller/HuskelappSistEndretHeader';
import {AapKelvinVedtakTilOgMedDatoHeaderHeader} from '../components/tabell/headerceller/AapKelvinVedtakTilOgMedDatoHeaderHeader';
import {AapKelvinRettighetHeader} from '../components/tabell/headerceller/AapKelvinRettighetHeader';
import {TildeltTidspunktHeader} from '../components/tabell/headerceller/TildeltTidspunktHeader';
import {TiltakspengerVedtakTilOgMedDatoHeader} from '../components/tabell/headerceller/TiltakspengerVedtakTilOgMedDatoHeader';
import {TiltakspengerRettighetHeader} from '../components/tabell/headerceller/TiltakspengerRettighetHeader';
import {DagpengerArenaGjenstaendeUkerRettighetHeader} from '../components/tabell/headerceller/DagpengerArenaGjenstaendeUkerRettighetHeader';
import {TiltakspengerArenaGjenstaendeUkerVedtakHeader} from '../components/tabell/headerceller/TiltakspengerArenaGjenstaendeUkerVedtakHeader';
import {AapArenaYtelsestypeHeader} from '../components/tabell/headerceller/AapArenaYtelsestypeHeader';
import {AapArenaVurderingsfristHeader} from '../components/tabell/headerceller/AapArenaVurderingsfristHeader';
import {AapArenaVedtaksperiodeHeader} from '../components/tabell/headerceller/AapArenaVedtaksperiodeHeader';
import {AapArenaRettighetsperiodeHeader} from '../components/tabell/headerceller/AapArenaRettighetsperiodeHeader';
import './minoversikt.css';

function harValgteAktiviteter(aktiviteter) {
    if (aktiviteter && Object.keys(aktiviteter).length > 0) {
        const valgteAktiviteter = Object.values(aktiviteter).filter(
            aktivitetvalg => aktivitetvalg !== AktiviteterValg.NA
        );
        return valgteAktiviteter?.length > 0;
    }
    return false;
}

interface MinOversiktListehodeProps {
    sorteringsrekkefolge: OrNothing<Sorteringsrekkefolge>;
    sorteringOnClick: (sortering: string) => void;
    sorteringsfelt: OrNothing<Sorteringsfelt>;
    filtervalg: FiltervalgModell;
    valgteKolonner: Kolonne[];
}

export function MinOversiktListehode({
    sorteringsrekkefolge,
    sorteringOnClick,
    sorteringsfelt,
    filtervalg,
    valgteKolonner
}: MinOversiktListehodeProps) {
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

            <div className="brukerliste__minoversikt-ikonknapper">
                <Fargekategori {...sorteringTilHeadercelle} />
                <Huskelapp {...sorteringTilHeadercelle} />
            </div>

            <div className="brukerliste__innhold" data-testid="brukerliste_innhold">
                <NavnHeader {...sorteringTilHeadercelle} />
                <FnrHeader {...sorteringTilHeadercelle} />

                <FodelandHeader {...sorteringTilHeadercelle} />
                <StatsborgerskapHeader {...sorteringTilHeadercelle} />
                <StatsborgerskapGyldigFraHeader {...sorteringTilHeadercelle} />

                <TolkebehovHeader {...sorteringTilHeadercelle} />
                <TolkesprakHeader {...sorteringTilHeadercelle} />
                <TolkebehovSistOppdatertHeader {...sorteringTilHeadercelle} />

                <GeografiskBostedHeader {...sorteringTilHeadercelle} />
                <GeografiskBostedDetaljerHeader {...sorteringTilHeadercelle} />
                <GeografiskBostedSistOppdatertHeader {...sorteringTilHeadercelle} />

                <OppfolgingStartetHeader {...sorteringTilHeadercelle} />
                <TildeltTidspunktHeader {...sorteringTilHeadercelle} />

                <DagpengerArenaGjenstaendeUkerRettighetHeader {...sorteringTilHeadercelle} filtervalg={filtervalg} />

                <TiltakspengerArenaGjenstaendeUkerVedtakHeader {...sorteringTilHeadercelle} />

                <AapArenaYtelsestypeHeader {...sorteringTilHeadercelle} />
                <AapArenaVurderingsfristHeader {...sorteringTilHeadercelle} />
                <AapArenaVedtaksperiodeHeader {...sorteringTilHeadercelle} />
                <AapArenaRettighetsperiodeHeader {...sorteringTilHeadercelle} filtervalg={filtervalg} />

                <VenterPaSvarFraNavHeader {...sorteringTilHeadercelle} />
                <VenterPaSvarFraBrukerHeader {...sorteringTilHeadercelle} />

                <FilterhendelseLenkeHeader {...sorteringTilHeadercelle} />
                <FilterhendelseDatoOpprettetHeaderHeader {...sorteringTilHeadercelle} />

                <TiltakshendelseLenkeHeader {...sorteringTilHeadercelle} />
                <TiltakshendelseDatoOpprettetHeader {...sorteringTilHeadercelle} />

                <UtlopteAktiviteterHeader {...sorteringTilHeadercelle} />
                <AvtaltAktivitetHeader {...sorteringTilHeadercelle} />

                <MoterIDagHeader {...sorteringTilHeadercelle} />
                <MoteVarighetHeader {...sorteringTilHeadercelle} />
                <MotestatusHeader {...sorteringTilHeadercelle} />

                <Utkast14aVedtaksstatusHeader {...sorteringTilHeadercelle} />
                <Utkast14aVedtaksstatusEndretHeader {...sorteringTilHeadercelle} />
                <Utkast14aAnsvarligVeilederHeader {...sorteringTilHeadercelle} />

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
                <SorteringHeader
                    skalVises={valgteKolonner.includes(Kolonne.START_DATO_AKTIVITET)}
                    sortering={Sorteringsfelt.STARTDATO_FOR_AVTALT_AKTIVITET}
                    erValgt={sorteringsfelt === Sorteringsfelt.STARTDATO_FOR_AVTALT_AKTIVITET}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Startdato aktivitet"
                    title='Startdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                    className="col col-xs-2"
                />
                <SorteringHeader
                    skalVises={valgteKolonner.includes(Kolonne.NESTE_START_DATO_AKTIVITET)}
                    sortering={Sorteringsfelt.NESTE_STARTDATO_FOR_AVTALT_AKTIVITET}
                    erValgt={sorteringsfelt === Sorteringsfelt.NESTE_STARTDATO_FOR_AVTALT_AKTIVITET}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Neste startdato aktivitet"
                    title='Neste startdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                    className="col col-xs-2"
                />
                <SorteringHeader
                    skalVises={valgteKolonner.includes(Kolonne.FORRIGE_START_DATO_AKTIVITET)}
                    sortering={Sorteringsfelt.FORRIGE_DATO_FOR_AVTALT_AKTIVITET}
                    erValgt={sorteringsfelt === Sorteringsfelt.FORRIGE_DATO_FOR_AVTALT_AKTIVITET}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Passert startdato aktivitet"
                    title='Passert startdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                    className="col col-xs-2"
                />

                <SisteEndringHeader {...sorteringTilHeadercelle} />
                <SisteEndringDatoHeader {...sorteringTilHeadercelle} />

                <SvarfristCvHeader {...sorteringTilHeadercelle} />

                <Status14aVedtakHeader {...sorteringTilHeadercelle} />

                <GjeldendeVedtak14aInnsatsgruppeHeader {...sorteringTilHeadercelle} />
                <GjeldendeVedtak14aHovedmalHeader {...sorteringTilHeadercelle} />
                <GjeldendeVedtak14aVedtaksdatoHeader {...sorteringTilHeadercelle} />

                <EnsligeForsorgereUtlopOvergangsstonadHeader {...sorteringTilHeadercelle} />
                <EnsligeForsorgereVedtaksperiodeHeader {...sorteringTilHeadercelle} />
                <EnsligeForsorgereAktivitetspliktHeader {...sorteringTilHeadercelle} />
                <EnsligeForsorgereOmBarnetHeader {...sorteringTilHeadercelle} />

                <BarnUnder18AarHeader {...sorteringTilHeadercelle} />

                <UtdanningOgSituasjonSistEndretHeader {...sorteringTilHeadercelle} />

                <HuskelappKommentarHeader {...sorteringTilHeadercelle} />
                <HuskelappFristHeader {...sorteringTilHeadercelle} />
                <HuskelappSistEndretHeader {...sorteringTilHeadercelle} />

                <AapKelvinVedtakTilOgMedDatoHeaderHeader {...sorteringTilHeadercelle} />
                <AapKelvinRettighetHeader {...sorteringTilHeadercelle} />

                <TiltakspengerVedtakTilOgMedDatoHeader {...sorteringTilHeadercelle} />
                <TiltakspengerRettighetHeader {...sorteringTilHeadercelle} />
            </div>
            <div className="brukerliste__gutter-right" />
        </div>
    );
}
