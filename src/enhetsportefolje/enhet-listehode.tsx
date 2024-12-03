import SorteringHeader from '../components/tabell/sortering-header';
import {
    DAGPENGER_YTELSE,
    DAGPENGER_YTELSE_LONNSGARANTIMIDLER,
    DAGPENGER_YTELSE_ORDINARE,
    DAGPENGER_YTELSE_PERMITTERING,
    DAGPENGER_YTELSE_PERMITTERING_FISKEINDUSTRI,
    ytelseAapSortering,
    ytelseUtlopsSortering
} from '../filtrering/filter-konstanter';
import {FiltervalgModell, Sorteringsfelt, Sorteringsrekkefolge} from '../model-interfaces';
import {Kolonne} from '../ducks/ui/listevisning';
import {AktiviteterValg} from '../ducks/filtrering';
import Header from '../components/tabell/header';
import VelgalleCheckboks from '../components/toolbar/velgalle-checkboks';
import './enhetsportefolje.css';
import './brukerliste.css';
import {OrNothing} from '../utils/types/types';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {VIS_AAP_VURDERINGSFRISTKOLONNER, VIS_FILTER_14A_FRA_VEDTAKSSTOTTE, VIS_HENDELSESFILTER} from '../konstanter';
import {Navn} from '../components/tabell/headerceller/Navn';
import {Fnr} from '../components/tabell/headerceller/Fnr';
import {Fodeland} from '../components/tabell/headerceller/Fodeland';
import {Statsborgerskap} from '../components/tabell/headerceller/Statsborgerskap';
import {StatsborgerskapGyldigFra} from '../components/tabell/headerceller/StatsborgerskapGyldigFra';
import {Tolkebehov} from '../components/tabell/headerceller/Tolkebehov';
import {Tolkesprak} from '../components/tabell/headerceller/Tolkesprak';
import {TolkebehovSistOppdatert} from '../components/tabell/headerceller/TolkebehovSistOppdatert';
import {Bosted} from '../components/tabell/headerceller/Bosted';
import {BostedDetaljer} from '../components/tabell/headerceller/BostedDetaljer';
import {BostedSistOppdatert} from '../components/tabell/headerceller/BostedSistOppdatert';
import {OppfolgingStartet} from '../components/tabell/headerceller/OppfolgingStartet';
import {SvarfristCv} from '../components/tabell/headerceller/SvarfristCv';
import {Status14AVedtak} from '../components/tabell/headerceller/Status14AVedtak';
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

function EnhetListehode({
    sorteringsrekkefolge,
    sorteringOnClick,
    filtervalg,
    sorteringsfelt,
    valgteKolonner
}: EnhetListehodeProps) {
    const vis_kolonner_for_vurderingsfrist_aap = useFeatureSelector()(VIS_AAP_VURDERINGSFRISTKOLONNER);
    const visFilter14aFraVedtaksstotte = useFeatureSelector()(VIS_FILTER_14A_FRA_VEDTAKSSTOTTE);
    const visKolonnerForHendelsesfilter = useFeatureSelector()(VIS_HENDELSESFILTER);

    const {ytelse} = filtervalg;
    const erAapYtelse = Object.keys(ytelseAapSortering).includes(ytelse!);
    const aapPeriodetype = erAapYtelse ? ytelseAapSortering[ytelse!].periodetype : '';
    const aapVurderingsfrist = erAapYtelse ? ytelseAapSortering[ytelse!].vurderingsfrist : '';
    const aapVedtakssperiode = erAapYtelse ? ytelseAapSortering[ytelse!].vedtaksperiode : '';
    const aapRettighetsperiode = erAapYtelse ? ytelseAapSortering[ytelse!].rettighetsperiode : '';
    const erDagpengerYtelse = [
        DAGPENGER_YTELSE,
        DAGPENGER_YTELSE_ORDINARE,
        DAGPENGER_YTELSE_PERMITTERING,
        DAGPENGER_YTELSE_PERMITTERING_FISKEINDUSTRI,
        DAGPENGER_YTELSE_LONNSGARANTIMIDLER
    ].some(y => y === ytelse!);
    const ytelseUtlopsdatoNavn = ytelseUtlopsSortering[ytelse!];

    const avansertAktivitet =
        harValgteAktiviteter(filtervalg.aktiviteter) && valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET);

    const forenkletAktivitet =
        harValgteAktiviteter(filtervalg.aktiviteterForenklet) && valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET);

    const tiltaksType =
        harValgteAktiviteter(filtervalg.tiltakstyper) && valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET);

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

                <Bosted {...sorteringTilHeadercelle} />
                <BostedDetaljer {...sorteringTilHeadercelle} />
                <BostedSistOppdatert {...sorteringTilHeadercelle} />

                <Tolkebehov {...sorteringTilHeadercelle} />
                <Tolkesprak {...sorteringTilHeadercelle} />
                <TolkebehovSistOppdatert {...sorteringTilHeadercelle} />

                <OppfolgingStartet {...sorteringTilHeadercelle} />

                <Header
                    skalVises={valgteKolonner.includes(Kolonne.VEILEDER)}
                    headerTestId="sorteringheader_veileder"
                    className="col col-xs-2"
                >
                    Veileder
                </Header>
                <SorteringHeader
                    skalVises={valgteKolonner.includes(Kolonne.NAVIDENT)}
                    sortering={Sorteringsfelt.NAVIDENT}
                    erValgt={sorteringsfelt === Sorteringsfelt.NAVIDENT}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="NAV-ident"
                    title="NAV-ident på tildelt veileder"
                    className="header__veilederident col col-xs-2"
                />
                <SorteringHeader
                    skalVises={
                        erDagpengerYtelse && valgteKolonner.includes(Kolonne.GJENSTAENDE_UKER_RETTIGHET_DAGPENGER)
                    }
                    sortering={ytelseUtlopsdatoNavn}
                    erValgt={ytelseUtlopsdatoNavn === sorteringsfelt}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Gjenstående uker rettighet dagpenger"
                    title="Gjenstående uker av rettighetsperioden for dagpenger"
                    className="col col-xs-2"
                />
                <SorteringHeader
                    skalVises={
                        !!filtervalg.ytelse &&
                        !erAapYtelse &&
                        !erDagpengerYtelse &&
                        valgteKolonner.includes(Kolonne.GJENSTAENDE_UKER_VEDTAK_TILTAKSPENGER)
                    }
                    sortering={ytelseUtlopsdatoNavn}
                    erValgt={ytelseUtlopsdatoNavn === sorteringsfelt}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Gjenstående uker vedtak tiltakspenger"
                    title="Gjenstående uker på gjeldende vedtak tiltakspenger"
                    className="col col-xs-2"
                />
                {vis_kolonner_for_vurderingsfrist_aap && (
                    <SorteringHeader
                        skalVises={erAapYtelse && valgteKolonner.includes(Kolonne.TYPE_YTELSE)}
                        sortering={aapPeriodetype}
                        erValgt={sorteringsfelt === aapPeriodetype}
                        rekkefolge={sorteringsrekkefolge}
                        onClick={sorteringOnClick}
                        tekst="Type AAP-periode"
                        title="Type AAP-periode"
                        className="col col-xs-2"
                    />
                )}
                {vis_kolonner_for_vurderingsfrist_aap && (
                    <SorteringHeader
                        skalVises={erAapYtelse && valgteKolonner.includes(Kolonne.VURDERINGSFRIST_YTELSE)}
                        sortering={aapVurderingsfrist}
                        erValgt={sorteringsfelt === aapVurderingsfrist}
                        rekkefolge={sorteringsrekkefolge}
                        onClick={sorteringOnClick}
                        tekst="Frist vurdering rett AAP"
                        title="Omtrentlig frist for ny vurdering av AAP"
                        className="col col-xs-2"
                    />
                )}
                <SorteringHeader
                    skalVises={erAapYtelse && valgteKolonner.includes(Kolonne.VEDTAKSPERIODE)}
                    sortering={aapVedtakssperiode}
                    erValgt={sorteringsfelt === aapVedtakssperiode}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Gjenstående uker vedtak AAP"
                    title="Gjenstående uker på gjeldende vedtak AAP"
                    className="col col-xs-2"
                />
                <SorteringHeader
                    skalVises={erAapYtelse && valgteKolonner.includes(Kolonne.RETTIGHETSPERIODE)}
                    sortering={aapRettighetsperiode}
                    erValgt={sorteringsfelt === aapRettighetsperiode}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Gjenstående uker rettighet AAP"
                    title="Gjenstående uker av rettighetsperioden for AAP"
                    className="col col-xs-2"
                />

                <VenterPaSvarFraNav {...sorteringTilHeadercelle} />
                <VenterPaSvarFraBruker {...sorteringTilHeadercelle} />

                {visKolonnerForHendelsesfilter && (
                    <>
                        <FilterhendelseLenke {...sorteringTilHeadercelle} />
                        <FilterhendelseDatoOpprettet {...sorteringTilHeadercelle} />
                    </>
                )}

                <UtlopteAktiviteter {...sorteringTilHeadercelle} />
                <AvtaltAktivitet {...sorteringTilHeadercelle} />

                <SorteringHeader
                    skalVises={avansertAktivitet || forenkletAktivitet || tiltaksType}
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

                <SorteringHeader
                    skalVises={valgteKolonner.includes(Kolonne.VEDTAKSTATUS)}
                    sortering={Sorteringsfelt.UTKAST_14A_STATUS}
                    erValgt={sorteringsfelt === Sorteringsfelt.UTKAST_14A_STATUS}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Status § 14a-vedtak"
                    title="Status oppfølgingvedtak"
                    className="col col-xs-2"
                />
                <SorteringHeader
                    skalVises={valgteKolonner.includes(Kolonne.VEDTAKSTATUS_ENDRET)}
                    sortering={Sorteringsfelt.UTKAST_14A_STATUS_ENDRET}
                    erValgt={sorteringsfelt === Sorteringsfelt.UTKAST_14A_STATUS_ENDRET}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Statusendring"
                    title="Dager siden fikk status"
                    className="col col-xs-2"
                />
                <SorteringHeader
                    skalVises={valgteKolonner.includes(Kolonne.ANSVARLIG_VEILEDER_FOR_VEDTAK)}
                    sortering={Sorteringsfelt.UTKAST_14A_ANSVARLIG_VEILEDER}
                    erValgt={sorteringsfelt === Sorteringsfelt.UTKAST_14A_ANSVARLIG_VEILEDER}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Ansvarlig for vedtak"
                    title="Ansvarlig veileder for vedtak"
                    className="col col-xs-2"
                />

                <SisteEndring {...sorteringTilHeadercelle} />
                <SisteEndringDato {...sorteringTilHeadercelle} />

                <SvarfristCv {...sorteringTilHeadercelle} />

                <Status14AVedtak {...sorteringTilHeadercelle} />
                {visFilter14aFraVedtaksstotte && (
                    <>
                        <GjeldendeVedtak14aInnsatsgruppe {...sorteringTilHeadercelle} />
                        <GjeldendeVedtak14aHovedmal {...sorteringTilHeadercelle} />
                        <GjeldendeVedtak14aVedtaksdato {...sorteringTilHeadercelle} />
                    </>
                )}

                <EnsligeForsorgereUtlopOvergangsstonad {...sorteringTilHeadercelle} />
                <EnsligeForsorgereVedtaksperiode {...sorteringTilHeadercelle} />
                <EnsligeForsorgereAktivitetsplikt {...sorteringTilHeadercelle} />
                <EnsligeForsorgereOmBarnet {...sorteringTilHeadercelle} />

                <BarnUnder18Aar {...sorteringTilHeadercelle} />

                <UtdanningOgSituasjonSistEndret {...sorteringTilHeadercelle} />

                <TiltakshendelseLenke {...sorteringTilHeadercelle} />
                <TiltakshendelseDatoOpprettet {...sorteringTilHeadercelle} />
            </div>
            <div className="brukerliste__gutter-right" />
        </div>
    );
}

export default EnhetListehode;
