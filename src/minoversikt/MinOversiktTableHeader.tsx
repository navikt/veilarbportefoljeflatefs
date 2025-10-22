import {SorteringHeader} from '../components/tabell/sortering-header';
import {FiltervalgModell} from '../typer/filtervalg-modell';
import {Sorteringsfelt, Sorteringsrekkefolge} from '../typer/kolonnesortering';
import {AktiviteterValg} from '../filtrering/filter-konstanter';
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
import {HuskelappKommentarHeader} from '../components/tabell/headerCells/min-oversikt/HuskelappKommentarHeader';
import {HuskelappFristHeader} from '../components/tabell/headerCells/min-oversikt/HuskelappFristHeader';
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
import {FargekategoriHeader} from '../components/tabell/headerCells/min-oversikt/FargekategoriHeader';
import {HuskelappHeader} from '../components/tabell/headerCells/min-oversikt/HuskelappHeader';
import {HuskelappSistEndretHeader} from '../components/tabell/headerCells/min-oversikt/HuskelappSistEndretHeader';
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

interface Props {
    sorteringsrekkefolge: OrNothing<Sorteringsrekkefolge>;
    sorteringOnClick: (sortering: string) => void;
    sorteringsfelt: OrNothing<Sorteringsfelt>;
    filtervalg: FiltervalgModell;
    valgteKolonner: Kolonne[];
}

export function MinOversiktTableHeader({
    sorteringsrekkefolge,
    sorteringOnClick,
    sorteringsfelt,
    filtervalg,
    valgteKolonner
}: Props) {
    const avansertAktivitet = harValgteAktiviteter(filtervalg.aktiviteter);
    const forenkletAktivitet = harValgteAktiviteter(filtervalg.aktiviteterForenklet);
    const tiltaksType = harValgteAktiviteter(filtervalg.tiltakstyper);

    const sorteringTilHeaderCell = {
        gjeldendeSorteringsfelt: sorteringsfelt,
        valgteKolonner: valgteKolonner,
        rekkefolge: sorteringsrekkefolge,
        onClick: sorteringOnClick
    };

    return (
        <div className="brukerliste__header brukerliste__sorteringheader">
            <VelgalleCheckboks />

            <div className="brukerliste__minoversikt-ikonknapper">
                <FargekategoriHeader {...sorteringTilHeaderCell} />
                <HuskelappHeader {...sorteringTilHeaderCell} />
            </div>

            <div className="brukerliste__innhold" data-testid="brukerliste_innhold">
                <NavnHeader {...sorteringTilHeaderCell} />
                <FnrHeader {...sorteringTilHeaderCell} />

                <FodelandHeader {...sorteringTilHeaderCell} />
                <StatsborgerskapHeader {...sorteringTilHeaderCell} />
                <StatsborgerskapGyldigFraHeader {...sorteringTilHeaderCell} />

                <TolkebehovHeader {...sorteringTilHeaderCell} />
                <TolkesprakHeader {...sorteringTilHeaderCell} />
                <TolkebehovSistOppdatertHeader {...sorteringTilHeaderCell} />

                <GeografiskBostedHeader {...sorteringTilHeaderCell} />
                <GeografiskBostedDetaljerHeader {...sorteringTilHeaderCell} />
                <GeografiskBostedSistOppdatertHeader {...sorteringTilHeaderCell} />

                <OppfolgingStartetHeader {...sorteringTilHeaderCell} />
                <TildeltTidspunktHeader {...sorteringTilHeaderCell} />

                <DagpengerArenaGjenstaendeUkerRettighetHeader {...sorteringTilHeaderCell} filtervalg={filtervalg} />

                <TiltakspengerArenaGjenstaendeUkerVedtakHeader {...sorteringTilHeaderCell} />

                <AapArenaYtelsestypeHeader {...sorteringTilHeaderCell} />
                <AapArenaVurderingsfristHeader {...sorteringTilHeaderCell} />
                <AapArenaVedtaksperiodeHeader {...sorteringTilHeaderCell} />
                <AapArenaRettighetsperiodeHeader {...sorteringTilHeaderCell} filtervalg={filtervalg} />

                <VenterPaSvarFraNavHeader {...sorteringTilHeaderCell} />
                <VenterPaSvarFraBrukerHeader {...sorteringTilHeaderCell} />

                <FilterhendelseLenkeHeader {...sorteringTilHeaderCell} />
                <FilterhendelseDatoOpprettetHeaderHeader {...sorteringTilHeaderCell} />

                <TiltakshendelseLenkeHeader {...sorteringTilHeaderCell} />
                <TiltakshendelseDatoOpprettetHeader {...sorteringTilHeaderCell} />

                <UtlopteAktiviteterHeader {...sorteringTilHeaderCell} />
                <AvtaltAktivitetHeader {...sorteringTilHeaderCell} />

                <MoterIDagHeader {...sorteringTilHeaderCell} />
                <MoteVarighetHeader {...sorteringTilHeaderCell} />
                <MotestatusHeader {...sorteringTilHeaderCell} />

                <Utkast14aVedtaksstatusHeader {...sorteringTilHeaderCell} />
                <Utkast14aVedtaksstatusEndretHeader {...sorteringTilHeaderCell} />
                <Utkast14aAnsvarligVeilederHeader {...sorteringTilHeaderCell} />

                <SorteringHeader
                    skalVises={
                        sorteringTilHeaderCell.valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET) &&
                        (avansertAktivitet || forenkletAktivitet || tiltaksType)
                    }
                    sortering={Sorteringsfelt.VALGTE_AKTIVITETER}
                    erValgt={sorteringTilHeaderCell.gjeldendeSorteringsfelt === Sorteringsfelt.VALGTE_AKTIVITETER}
                    rekkefolge={sorteringTilHeaderCell.rekkefolge}
                    onClick={sorteringTilHeaderCell.onClick}
                    tekst="Neste utløpsdato valgt aktivitet"
                    title='Neste utløpsdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                    className="col col-xs-2"
                />
                <SorteringHeader
                    skalVises={sorteringTilHeaderCell.valgteKolonner.includes(Kolonne.START_DATO_AKTIVITET)}
                    sortering={Sorteringsfelt.STARTDATO_FOR_AVTALT_AKTIVITET}
                    erValgt={
                        sorteringTilHeaderCell.gjeldendeSorteringsfelt === Sorteringsfelt.STARTDATO_FOR_AVTALT_AKTIVITET
                    }
                    rekkefolge={sorteringTilHeaderCell.rekkefolge}
                    onClick={sorteringTilHeaderCell.onClick}
                    tekst="Startdato aktivitet"
                    title='Startdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                    className="col col-xs-2"
                />
                <SorteringHeader
                    skalVises={sorteringTilHeaderCell.valgteKolonner.includes(Kolonne.NESTE_START_DATO_AKTIVITET)}
                    sortering={Sorteringsfelt.NESTE_STARTDATO_FOR_AVTALT_AKTIVITET}
                    erValgt={
                        sorteringTilHeaderCell.gjeldendeSorteringsfelt ===
                        Sorteringsfelt.NESTE_STARTDATO_FOR_AVTALT_AKTIVITET
                    }
                    rekkefolge={sorteringTilHeaderCell.rekkefolge}
                    onClick={sorteringTilHeaderCell.onClick}
                    tekst="Neste startdato aktivitet"
                    title='Neste startdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                    className="col col-xs-2"
                />
                <SorteringHeader
                    skalVises={sorteringTilHeaderCell.valgteKolonner.includes(Kolonne.FORRIGE_START_DATO_AKTIVITET)}
                    sortering={Sorteringsfelt.FORRIGE_DATO_FOR_AVTALT_AKTIVITET}
                    erValgt={
                        sorteringTilHeaderCell.gjeldendeSorteringsfelt ===
                        Sorteringsfelt.FORRIGE_DATO_FOR_AVTALT_AKTIVITET
                    }
                    rekkefolge={sorteringTilHeaderCell.rekkefolge}
                    onClick={sorteringTilHeaderCell.onClick}
                    tekst="Passert startdato aktivitet"
                    title='Passert startdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                    className="col col-xs-2"
                />

                <SisteEndringHeader {...sorteringTilHeaderCell} />
                <SisteEndringDatoHeader {...sorteringTilHeaderCell} />

                <SvarfristCvHeader {...sorteringTilHeaderCell} />

                <Status14aVedtakHeader {...sorteringTilHeaderCell} />

                <GjeldendeVedtak14aInnsatsgruppeHeader {...sorteringTilHeaderCell} />
                <GjeldendeVedtak14aHovedmalHeader {...sorteringTilHeaderCell} />
                <GjeldendeVedtak14aVedtaksdatoHeader {...sorteringTilHeaderCell} />

                <EnsligeForsorgereUtlopOvergangsstonadHeader {...sorteringTilHeaderCell} />
                <EnsligeForsorgereVedtaksperiodeHeader {...sorteringTilHeaderCell} />
                <EnsligeForsorgereAktivitetspliktHeader {...sorteringTilHeaderCell} />
                <EnsligeForsorgereOmBarnetHeader {...sorteringTilHeaderCell} />

                <BarnUnder18AarHeader {...sorteringTilHeaderCell} />

                <UtdanningOgSituasjonSistEndretHeader {...sorteringTilHeaderCell} />

                <HuskelappKommentarHeader {...sorteringTilHeaderCell} />
                <HuskelappFristHeader {...sorteringTilHeaderCell} />
                <HuskelappSistEndretHeader {...sorteringTilHeaderCell} />

                <AapKelvinVedtakTilOgMedDatoHeaderHeader {...sorteringTilHeaderCell} />
                <AapKelvinRettighetHeader {...sorteringTilHeaderCell} />

                <TiltakspengerVedtakTilOgMedDatoHeader {...sorteringTilHeaderCell} />
                <TiltakspengerRettighetHeader {...sorteringTilHeaderCell} />
            </div>
            <div className="brukerliste__gutter-right" />
        </div>
    );
}
