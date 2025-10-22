import {NavnData} from '../components/tabell/dataCells/NavnData';
import {FnrData} from '../components/tabell/dataCells/FnrData';
import {DatoDataCellType} from '../components/tabell/dataCellTypes/DatoDataCellType';
import {Kolonne} from '../ducks/ui/listevisning';
import {BrukerModell} from '../typer/bruker-modell';
import {FiltervalgModell} from '../typer/filtervalg-modell';
import {parseDatoString, utledValgteAktivitetsTyper} from '../utils/utils';
import {VeilederNavnData} from '../components/tabell/dataCells/enhetens-oversikt/veilederNavnData';
import {VeilederNavidentData} from '../components/tabell/dataCells/enhetens-oversikt/veilederNavidentData';
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
import {UtdanningOgSituasjonSistEndretData} from '../components/tabell/dataCells/UtdanningOgSituasjonSistEndretData';
import {BarnUnder18AarData} from '../components/tabell/dataCells/BarnUnder18AarData';
import {EnsligeForsorgereOmBarnetData} from '../components/tabell/dataCells/EnsligeForsorgereOmBarnetData';
import {AapKelvinVedtakTilOgMedDatoData} from '../components/tabell/dataCells/AapKelvinVedtakTilOgMedDatoData';
import {AapKelvinRettighetData} from '../components/tabell/dataCells/AapKelvinRettighetData';
import {TildeltTidspunktData} from '../components/tabell/dataCells/TildeltTidspunktData';
import {AapArenaYtelsestypeData} from '../components/tabell/dataCells/AapArenaYtelsestypeData';
import {AapArenaVurderingsfristData} from '../components/tabell/dataCells/AapArenaVurderingsfristData';
import {AapArenaVedtaksperiodeData} from '../components/tabell/dataCells/AapArenaVedtaksperiodeData';
import {AapArenaRettighetsperiodeData} from '../components/tabell/dataCells/AapArenaRettighetsperiodeData';
import {TiltakspengerArenaGjenstaendeUkerVedtakData} from '../components/tabell/dataCells/TiltakspengerArenaGjenstaendeUkerVedtakData';
import {DagpengerArenaGjenstaendeUkerRettighetData} from '../components/tabell/dataCells/DagpengerArenaGjenstaendeUkerRettighetData';
import './enhetensoversikt.css';
import './brukerliste.css';
import {TiltakspengerVedtakTilOgMedDatoData} from '../components/tabell/dataCells/TiltakspengerVedtakTilOgMedDatoData';
import {TiltakspengerRettighetData} from '../components/tabell/dataCells/TiltakspengerRettighetData';

interface EnhetKolonnerProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: string;
    filtervalg: FiltervalgModell;
    valgteKolonner: Kolonne[];
}

export function EnhetKolonner({className, bruker, enhetId, filtervalg, valgteKolonner}: EnhetKolonnerProps) {
    const valgteAktivitetstyper = utledValgteAktivitetsTyper(bruker.aktiviteter, filtervalg.aktiviteter);

    const avtaltAktivitetOgTiltak: boolean =
        !!valgteAktivitetstyper &&
        filtervalg.tiltakstyper.length === 0 &&
        valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET);

    const forenkletAktivitetOgTiltak =
        valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET) &&
        (filtervalg.tiltakstyper.length > 0 || filtervalg.aktiviteterForenklet.length > 0);

    return (
        <div className={className}>
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

            <VeilederNavnData bruker={bruker} valgteKolonner={valgteKolonner} />
            <VeilederNavidentData bruker={bruker} valgteKolonner={valgteKolonner} />
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

            <FilterhendelseLenkeData bruker={bruker} valgteKolonner={valgteKolonner} enhetId={enhetId} />
            <FilterhendelseDatoOpprettetData bruker={bruker} valgteKolonner={valgteKolonner} />

            <TiltakshendelseLenkeData bruker={bruker} valgteKolonner={valgteKolonner} enhetId={enhetId} />
            <TiltakshendelseDatoOpprettetData bruker={bruker} valgteKolonner={valgteKolonner} />

            <UtlopteAktiviteterData bruker={bruker} valgteKolonner={valgteKolonner} />
            <AvtaltAktivitetData bruker={bruker} valgteKolonner={valgteKolonner} />

            <DatoDataCellType
                className="col col-xs-2"
                dato={parseDatoString(bruker.nesteUtlopsdatoAktivitet)}
                skalVises={avtaltAktivitetOgTiltak || forenkletAktivitetOgTiltak}
            />

            <MoterIDagData bruker={bruker} valgteKolonner={valgteKolonner} />
            <MoteVarighetData bruker={bruker} valgteKolonner={valgteKolonner} />
            <MotestatusData bruker={bruker} valgteKolonner={valgteKolonner} />

            <Utkast14aVedtaksstatusData bruker={bruker} valgteKolonner={valgteKolonner} />
            <Utkast14aVedtaksstatusEndretData bruker={bruker} valgteKolonner={valgteKolonner} />
            <Utkast14aAnsvarligVeilederData bruker={bruker} valgteKolonner={valgteKolonner} />

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

            <AapKelvinVedtakTilOgMedDatoData bruker={bruker} valgteKolonner={valgteKolonner} />
            <AapKelvinRettighetData bruker={bruker} valgteKolonner={valgteKolonner} />

            <TiltakspengerVedtakTilOgMedDatoData bruker={bruker} valgteKolonner={valgteKolonner} />
            <TiltakspengerRettighetData bruker={bruker} valgteKolonner={valgteKolonner} />
        </div>
    );
}
