import {parseDatoString, utledValgteAktivitetsTyper} from '../utils/utils';
import {NavnData} from '../components/tabell/dataCells/NavnData';
import {FnrData} from '../components/tabell/dataCells/FnrData';
import {DatoDataCellType} from '../components/tabell/dataCellTypes/DatoDataCellType';
import {BrukerModell} from '../typer/bruker-modell';
import {FiltervalgModell} from '../typer/filtervalg-modell';
import {Kolonne} from '../ducks/ui/listevisning';
import {SisteEndringData} from '../components/tabell/dataCells/SisteEndringData';
import {FodelandData} from '../components/tabell/dataCells/FodelandData';
import {StatsborgerskapData} from '../components/tabell/dataCells/StatsborgerskapData';
import {StatsborgerskapGyldigFraData} from '../components/tabell/dataCells/StatsborgerskapGyldigFraData';
import {GeografiskBostedData} from '../components/tabell/dataCells/GeografiskBostedData';
import {GeografiskBostedDetaljerData} from '../components/tabell/dataCells/GeografiskBostedDetaljerData';
import {GeografiskBostedSistOppdatertData} from '../components/tabell/dataCells/GeografiskBostedSistOppdatertData';
import {TolkebehovData} from '../components/tabell/dataCells/TolkebehovData';
import {TolkesprakData} from '../components/tabell/dataCells/TolkesprakData';
import {TolkebehovSistOppdatertData} from '../components/tabell/dataCells/TolkebehovSistOppdatertData';
import {OppfolgingStartetData} from '../components/tabell/dataCells/OppfolgingStartetData';
import {VenterPaSvarFraNavData} from '../components/tabell/dataCells/VenterPaSvarFraNavData';
import {VenterPaSvarFraBrukerData} from '../components/tabell/dataCells/VenterPaSvarFraBrukerData';
import {FilterhendelseLenkeData} from '../components/tabell/dataCells/FilterhendelseLenkeData';
import {FilterhendelseDatoOpprettetData} from '../components/tabell/dataCells/FilterhendelseDatoOpprettetData';
import {TiltakshendelseLenkeData} from '../components/tabell/dataCells/TiltakshendelseLenkeData';
import {TiltakshendelseDatoOpprettetData} from '../components/tabell/dataCells/TiltakshendelseDatoOpprettetData';
import {UtlopteAktiviteterData} from '../components/tabell/dataCells/UtlopteAktiviteterData';
import {AvtaltAktivitetData} from '../components/tabell/dataCells/AvtaltAktivitetData';
import {MoterIDagData} from '../components/tabell/dataCells/MoterIDagData';
import {MoteVarighetData} from '../components/tabell/dataCells/MoteVarighetData';
import {MotestatusData} from '../components/tabell/dataCells/MotestatusData';
import {Utkast14aVedtaksstatusData} from '../components/tabell/dataCells/Utkast14aVedtaksstatusData';
import {Utkast14aVedtaksstatusEndretData} from '../components/tabell/dataCells/Utkast14aVedtaksstatusEndretData';
import {Utkast14aAnsvarligVeilederData} from '../components/tabell/dataCells/Utkast14aAnsvarligVeilederData';
import {SisteEndringDatoData} from '../components/tabell/dataCells/SisteEndringDatoData';
import {SvarfristCvData} from '../components/tabell/dataCells/SvarfristCvData';
import {Status14aVedtakData} from '../components/tabell/dataCells/Status14aVedtakData';
import {GjeldendeVedtak14aInnsatsgruppeData} from '../components/tabell/dataCells/GjeldendeVedtak14aInnsatsgruppeData';
import {GjeldendeVedtak14aHovedmalData} from '../components/tabell/dataCells/GjeldendeVedtak14aHovedmalData';
import {GjeldendeVedtak14aVedtaksdatoData} from '../components/tabell/dataCells/GjeldendeVedtak14aVedtaksdatoData';
import {EnsligeForsorgereUtlopOvergangsstonadData} from '../components/tabell/dataCells/EnsligeForsorgereUtlopOvergangsstonadData';
import {EnsligeForsorgereVedtaksperiodeData} from '../components/tabell/dataCells/EnsligeForsorgereVedtaksperiodeData';
import {EnsligeForsorgereAktivitetspliktData} from '../components/tabell/dataCells/EnsligeForsorgereAktivitetspliktData';
import {EnsligeForsorgereOmBarnetData} from '../components/tabell/dataCells/EnsligeForsorgereOmBarnetData';
import {UtdanningOgSituasjonSistEndretData} from '../components/tabell/dataCells/UtdanningOgSituasjonSistEndretData';
import {BarnUnder18AarData} from '../components/tabell/dataCells/BarnUnder18AarData';
import {HuskelappKommentarData} from '../components/tabell/dataCells/min-oversikt/HuskelappKommentarData';
import {HuskelappFristData} from '../components/tabell/dataCells/min-oversikt/HuskelappFristData';
import {HuskelappSistEndretData} from '../components/tabell/dataCells/min-oversikt/HuskelappSistEndretData';
import {AapKelvinVedtakTilOgMedDatoData} from '../components/tabell/dataCells/AapKelvinVedtakTilOgMedDatoData';
import {AapKelvinRettighetData} from '../components/tabell/dataCells/AapKelvinRettighetData';
import {TildeltTidspunktData} from '../components/tabell/dataCells/TildeltTidspunktData';
import {AapArenaYtelsestypeData} from '../components/tabell/dataCells/AapArenaYtelsestypeData';
import {AapArenaVurderingsfristData} from '../components/tabell/dataCells/AapArenaVurderingsfristData';
import {AapArenaVedtaksperiodeData} from '../components/tabell/dataCells/AapArenaVedtaksperiodeData';
import {AapArenaRettighetsperiodeData} from '../components/tabell/dataCells/AapArenaRettighetsperiodeData';
import {TiltakspengerArenaGjenstaendeUkerVedtakData} from '../components/tabell/dataCells/TiltakspengerArenaGjenstaendeUkerVedtakData';
import {DagpengerArenaGjenstaendeUkerRettighetData} from '../components/tabell/dataCells/DagpengerArenaGjenstaendeUkerRettighetData';
import './minoversikt.css';
import {TiltakspengerVedtakTilOgMedDatoData} from '../components/tabell/dataCells/TiltakspengerVedtakTilOgMedDatoData';
import {TiltakspengerRettighetData} from '../components/tabell/dataCells/TiltakspengerRettighetData';

interface Props {
    bruker: BrukerModell;
    enhetId: string;
    filtervalg: FiltervalgModell;
    valgteKolonner: Kolonne[];
}

export function MinoversiktTableDataCells({bruker, enhetId, filtervalg, valgteKolonner}: Props) {
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
            <NavnData bruker={bruker} enhetId={enhetId} />
            <FnrData bruker={bruker} />

            <FodelandData bruker={bruker} valgteKolonner={valgteKolonner} />
            <StatsborgerskapData bruker={bruker} valgteKolonner={valgteKolonner} />
            <StatsborgerskapGyldigFraData bruker={bruker} valgteKolonner={valgteKolonner} />

            <TolkebehovData bruker={bruker} valgteKolonner={valgteKolonner} filtervalg={filtervalg} />
            <TolkesprakData bruker={bruker} valgteKolonner={valgteKolonner} filtervalg={filtervalg} />
            <TolkebehovSistOppdatertData bruker={bruker} valgteKolonner={valgteKolonner} />

            <GeografiskBostedData bruker={bruker} valgteKolonner={valgteKolonner} />
            <GeografiskBostedDetaljerData bruker={bruker} valgteKolonner={valgteKolonner} />
            <GeografiskBostedSistOppdatertData bruker={bruker} valgteKolonner={valgteKolonner} />

            <OppfolgingStartetData bruker={bruker} valgteKolonner={valgteKolonner} />
            <TildeltTidspunktData bruker={bruker} valgteKolonner={valgteKolonner} />

            <DagpengerArenaGjenstaendeUkerRettighetData
                bruker={bruker}
                valgteKolonner={valgteKolonner}
                filtervalg={filtervalg}
            />

            <TiltakspengerArenaGjenstaendeUkerVedtakData bruker={bruker} valgteKolonner={valgteKolonner} />

            <AapArenaYtelsestypeData bruker={bruker} valgteKolonner={valgteKolonner} />
            <AapArenaVurderingsfristData bruker={bruker} valgteKolonner={valgteKolonner} />
            <AapArenaVedtaksperiodeData bruker={bruker} valgteKolonner={valgteKolonner} />
            <AapArenaRettighetsperiodeData bruker={bruker} valgteKolonner={valgteKolonner} filtervalg={filtervalg} />

            <VenterPaSvarFraNavData bruker={bruker} valgteKolonner={valgteKolonner} />
            <VenterPaSvarFraBrukerData bruker={bruker} valgteKolonner={valgteKolonner} />

            <FilterhendelseLenkeData
                bruker={bruker}
                valgteKolonner={valgteKolonner}
                enhetId={enhetId}
                filtervalg={filtervalg}
            />
            <FilterhendelseDatoOpprettetData bruker={bruker} valgteKolonner={valgteKolonner} filtervalg={filtervalg} />

            <TiltakshendelseLenkeData bruker={bruker} valgteKolonner={valgteKolonner} enhetId={enhetId} />
            <TiltakshendelseDatoOpprettetData bruker={bruker} valgteKolonner={valgteKolonner} />

            <UtlopteAktiviteterData bruker={bruker} valgteKolonner={valgteKolonner} />
            <AvtaltAktivitetData bruker={bruker} valgteKolonner={valgteKolonner} />

            <MoterIDagData bruker={bruker} valgteKolonner={valgteKolonner} />
            <MoteVarighetData bruker={bruker} valgteKolonner={valgteKolonner} />
            <MotestatusData bruker={bruker} valgteKolonner={valgteKolonner} />

            <Utkast14aVedtaksstatusData bruker={bruker} valgteKolonner={valgteKolonner} />
            <Utkast14aVedtaksstatusEndretData bruker={bruker} valgteKolonner={valgteKolonner} />
            <Utkast14aAnsvarligVeilederData bruker={bruker} valgteKolonner={valgteKolonner} />

            <DatoDataCellType
                className="col col-xs-2"
                dato={parseDatoString(bruker.nesteUtlopsdatoAktivitet)}
                skalVises={avtaltAktivitetOgTiltak || forenkletAktivitetOgTiltak}
            />
            <DatoDataCellType
                className="col col-xs-2"
                dato={bruker.aktivitetStart ? new Date(bruker.aktivitetStart) : null}
                skalVises={valgteKolonner.includes(Kolonne.START_DATO_AKTIVITET)}
            />
            <DatoDataCellType
                className="col col-xs-2"
                dato={bruker.nesteAktivitetStart ? new Date(bruker.nesteAktivitetStart) : null}
                skalVises={valgteKolonner.includes(Kolonne.NESTE_START_DATO_AKTIVITET)}
            />
            <DatoDataCellType
                className="col col-xs-2"
                dato={bruker.forrigeAktivitetStart ? new Date(bruker.forrigeAktivitetStart) : null}
                skalVises={valgteKolonner.includes(Kolonne.FORRIGE_START_DATO_AKTIVITET)}
            />

            <SisteEndringData bruker={bruker} enhetId={enhetId} valgteKolonner={valgteKolonner} />
            <SisteEndringDatoData bruker={bruker} valgteKolonner={valgteKolonner} />

            <SvarfristCvData bruker={bruker} valgteKolonner={valgteKolonner} />

            <Status14aVedtakData bruker={bruker} valgteKolonner={valgteKolonner} />

            <GjeldendeVedtak14aInnsatsgruppeData bruker={bruker} valgteKolonner={valgteKolonner} />
            <GjeldendeVedtak14aHovedmalData bruker={bruker} valgteKolonner={valgteKolonner} />
            <GjeldendeVedtak14aVedtaksdatoData bruker={bruker} valgteKolonner={valgteKolonner} />

            <EnsligeForsorgereUtlopOvergangsstonadData bruker={bruker} valgteKolonner={valgteKolonner} />
            <EnsligeForsorgereVedtaksperiodeData bruker={bruker} valgteKolonner={valgteKolonner} />
            <EnsligeForsorgereAktivitetspliktData bruker={bruker} valgteKolonner={valgteKolonner} />
            <EnsligeForsorgereOmBarnetData bruker={bruker} valgteKolonner={valgteKolonner} />

            <BarnUnder18AarData bruker={bruker} valgteKolonner={valgteKolonner} />

            <UtdanningOgSituasjonSistEndretData bruker={bruker} valgteKolonner={valgteKolonner} />

            <HuskelappKommentarData bruker={bruker} valgteKolonner={valgteKolonner} />
            <HuskelappFristData bruker={bruker} valgteKolonner={valgteKolonner} />
            <HuskelappSistEndretData bruker={bruker} valgteKolonner={valgteKolonner} />

            <AapKelvinVedtakTilOgMedDatoData bruker={bruker} valgteKolonner={valgteKolonner} />
            <AapKelvinRettighetData bruker={bruker} valgteKolonner={valgteKolonner} />

            <TiltakspengerVedtakTilOgMedDatoData bruker={bruker} valgteKolonner={valgteKolonner} />
            <TiltakspengerRettighetData bruker={bruker} valgteKolonner={valgteKolonner} />
        </div>
    );
}
