import {SorteringHeader} from '../components/tabell/sortering-header';
import {AktiviteterValg} from '../filtrering/filter-konstanter';
import {FiltervalgModell} from '../typer/filtervalg-modell';
import {Kolonne} from '../ducks/ui/listevisning';
import VelgalleCheckboks from '../components/toolbar/velgalle-checkboks';
import {OrNothing} from '../utils/types/types';
import {NavnHeader} from '../components/tabell/headerCells/NavnHeader';
import {FnrHeader} from '../components/tabell/headerCells/FnrHeader';
import {FodelandHeader} from '../components/tabell/headerCells/FodelandHeader';
import {StatsborgerskapHeader} from '../components/tabell/headerCells/StatsborgerskapHeader';
import {StatsborgerskapGyldigFraHeader} from '../components/tabell/headerCells/StatsborgerskapGyldigFraHeader';
import {TolkebehovHeader} from '../components/tabell/headerCells/TolkebehovHeader';
import {TolkesprakHeader} from '../components/tabell/headerCells/TolkesprakHeader';
import {TolkebehovSistOppdatertHeader} from '../components/tabell/headerCells/TolkebehovSistOppdatertHeader';
import {GeografiskBostedHeader} from '../components/tabell/headerCells/GeografiskBostedHeader';
import {GeografiskBostedDetaljerHeader} from '../components/tabell/headerCells/GeografiskBostedDetaljerHeader';
import {GeografiskBostedSistOppdatertHeader} from '../components/tabell/headerCells/GeografiskBostedSistOppdatertHeader';
import {OppfolgingStartetHeader} from '../components/tabell/headerCells/OppfolgingStartetHeader';
import {SvarfristCvHeader} from '../components/tabell/headerCells/SvarfristCvHeader';
import {Status14aVedtakHeader} from '../components/tabell/headerCells/Status14aVedtakHeader';
import {BarnUnder18AarHeader} from '../components/tabell/headerCells/BarnUnder18AarHeader';
import {UtdanningOgSituasjonSistEndretHeader} from '../components/tabell/headerCells/UtdanningOgSituasjonSistEndretHeader';
import {GjeldendeVedtak14aInnsatsgruppeHeader} from '../components/tabell/headerCells/GjeldendeVedtak14aInnsatsgruppeHeader';
import {GjeldendeVedtak14aHovedmalHeader} from '../components/tabell/headerCells/GjeldendeVedtak14aHovedmalHeader';
import {GjeldendeVedtak14aVedtaksdatoHeader} from '../components/tabell/headerCells/GjeldendeVedtak14aVedtaksdatoHeader';
import {FilterhendelseLenkeHeader} from '../components/tabell/headerCells/FilterhendelseLenkeHeader';
import {FilterhendelseDatoOpprettetHeaderHeader} from '../components/tabell/headerCells/FilterhendelseDatoOpprettetHeaderHeader';
import {TiltakshendelseDatoOpprettetHeader} from '../components/tabell/headerCells/TiltakshendelseDatoOpprettetHeader';
import {TiltakshendelseLenkeHeader} from '../components/tabell/headerCells/TiltakshendelseLenkeHeader';
import {EnsligeForsorgereOmBarnetHeader} from '../components/tabell/headerCells/EnsligeForsorgereOmBarnetHeader';
import {EnsligeForsorgereAktivitetspliktHeader} from '../components/tabell/headerCells/EnsligeForsorgereAktivitetspliktHeader';
import {EnsligeForsorgereVedtaksperiodeHeader} from '../components/tabell/headerCells/EnsligeForsorgereVedtaksperiodeHeader';
import {EnsligeForsorgereUtlopOvergangsstonadHeader} from '../components/tabell/headerCells/EnsligeForsorgereUtlopOvergangsstonadHeader';
import {SisteEndringDatoHeader} from '../components/tabell/headerCells/SisteEndringDatoHeader';
import {SisteEndringHeader} from '../components/tabell/headerCells/SisteEndringHeader';
import {VenterPaSvarFraNavHeader} from '../components/tabell/headerCells/VenterPaSvarFraNavHeader';
import {VenterPaSvarFraBrukerHeader} from '../components/tabell/headerCells/VenterPaSvarFraBrukerHeader';
import {UtlopteAktiviteterHeader} from '../components/tabell/headerCells/UtlopteAktiviteterHeader';
import {AvtaltAktivitetHeader} from '../components/tabell/headerCells/AvtaltAktivitetHeader';
import {MoterIDagHeader} from '../components/tabell/headerCells/MoterIDagHeader';
import {MoteVarighetHeader} from '../components/tabell/headerCells/MoteVarighetHeader';
import {MotestatusHeader} from '../components/tabell/headerCells/MotestatusHeader';
import {Utkast14aVedtaksstatusHeader} from '../components/tabell/headerCells/Utkast14aVedtaksstatusHeader';
import {Utkast14aVedtaksstatusEndretHeader} from '../components/tabell/headerCells/Utkast14aVedtaksstatusEndretHeader';
import {Utkast14aAnsvarligVeilederHeader} from '../components/tabell/headerCells/Utkast14aAnsvarligVeilederHeader';
import {VeilederNavidentHeader} from '../components/tabell/headerCells/enhetens-oversikt/VeilederNavidentHeader';
import {VeilederNavnHeader} from '../components/tabell/headerCells/enhetens-oversikt/VeilederNavnHeader';
import {Sorteringsfelt, Sorteringsrekkefolge} from '../typer/kolonnesortering';
import {AapKelvinVedtakTilOgMedDatoHeaderHeader} from '../components/tabell/headerCells/AapKelvinVedtakTilOgMedDatoHeaderHeader';
import {AapKelvinRettighetHeader} from '../components/tabell/headerCells/AapKelvinRettighetHeader';
import {TildeltTidspunktHeader} from '../components/tabell/headerCells/TildeltTidspunktHeader';
import {TiltakspengerVedtakTilOgMedDatoHeader} from '../components/tabell/headerCells/TiltakspengerVedtakTilOgMedDatoHeader';
import {TiltakspengerRettighetHeader} from '../components/tabell/headerCells/TiltakspengerRettighetHeader';
import {DagpengerArenaGjenstaendeUkerRettighetHeader} from '../components/tabell/headerCells/DagpengerArenaGjenstaendeUkerRettighetHeader';
import {TiltakspengerArenaGjenstaendeUkerVedtakHeader} from '../components/tabell/headerCells/TiltakspengerArenaGjenstaendeUkerVedtakHeader';
import {AapArenaYtelsestypeHeader} from '../components/tabell/headerCells/AapArenaYtelsestypeHeader';
import {AapArenaVurderingsfristHeader} from '../components/tabell/headerCells/AapArenaVurderingsfristHeader';
import {AapArenaVedtaksperiodeHeader} from '../components/tabell/headerCells/AapArenaVedtaksperiodeHeader';
import {AapArenaRettighetsperiodeHeader} from '../components/tabell/headerCells/AapArenaRettighetsperiodeHeader';
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

interface Props {
    sorteringsrekkefolge: OrNothing<Sorteringsrekkefolge>;
    sorteringOnClick: (sortering: string) => void;
    valgteKolonner: Kolonne[];
    filtervalg: FiltervalgModell;
    sorteringsfelt: OrNothing<Sorteringsfelt>;
}

export function EnhetTableHeader({
    sorteringsrekkefolge,
    sorteringOnClick,
    filtervalg,
    sorteringsfelt,
    valgteKolonner
}: Props) {
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

                <VeilederNavnHeader {...sorteringTilHeadercelle} />
                <VeilederNavidentHeader {...sorteringTilHeadercelle} />
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

                <MoterIDagHeader {...sorteringTilHeadercelle} />
                <MoteVarighetHeader {...sorteringTilHeadercelle} />
                <MotestatusHeader {...sorteringTilHeadercelle} />

                <Utkast14aVedtaksstatusHeader {...sorteringTilHeadercelle} />
                <Utkast14aVedtaksstatusEndretHeader {...sorteringTilHeadercelle} />
                <Utkast14aAnsvarligVeilederHeader {...sorteringTilHeadercelle} />

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

                <AapKelvinVedtakTilOgMedDatoHeaderHeader {...sorteringTilHeadercelle} />
                <AapKelvinRettighetHeader {...sorteringTilHeadercelle} />

                <TiltakspengerVedtakTilOgMedDatoHeader {...sorteringTilHeadercelle} />
                <TiltakspengerRettighetHeader {...sorteringTilHeadercelle} />
            </div>
            <div className="brukerliste__gutter-right" />
        </div>
    );
}
