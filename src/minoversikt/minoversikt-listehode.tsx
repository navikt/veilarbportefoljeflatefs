import {SorteringHeader} from '../components/tabell/sortering-header';
import {FiltervalgModell} from '../typer/filtervalg-modell';
import {Sorteringsfelt, Sorteringsrekkefolge} from '../typer/kolonnesortering';
import {
    AktiviteterValg,
    DAGPENGER_YTELSE,
    DAGPENGER_YTELSE_LONNSGARANTIMIDLER,
    DAGPENGER_YTELSE_ORDINARE,
    DAGPENGER_YTELSE_PERMITTERING,
    DAGPENGER_YTELSE_PERMITTERING_FISKEINDUSTRI,
    ytelseAapSortering,
    ytelseUtlopsSortering
} from '../filtrering/filter-konstanter';
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
import {HuskelappKommentar} from '../components/tabell/headerceller/HuskelappKommentar';
import {HuskelappFrist} from '../components/tabell/headerceller/HuskelappFrist';
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
import {Fargekategori} from '../components/tabell/headerceller/min-oversikt/Fargekategori';
import {Huskelapp} from '../components/tabell/headerceller/min-oversikt/Huskelapp';
import './minoversikt.css';
import {HuskelappSistEndret} from '../components/tabell/headerceller/HuskelappSistEndret';

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
                    skalVises={!!ytelse && erAapYtelse && valgteKolonner.includes(Kolonne.RETTIGHETSPERIODE)}
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

                <FilterhendelseLenke {...sorteringTilHeadercelle} />
                <FilterhendelseDatoOpprettet {...sorteringTilHeadercelle} />

                <TiltakshendelseLenke {...sorteringTilHeadercelle} />
                <TiltakshendelseDatoOpprettet {...sorteringTilHeadercelle} />

                <UtlopteAktiviteter {...sorteringTilHeadercelle} />
                <AvtaltAktivitet {...sorteringTilHeadercelle} />

                <MoterIDag {...sorteringTilHeadercelle} />
                <MoteVarighet {...sorteringTilHeadercelle} />
                <Motestatus {...sorteringTilHeadercelle} />

                <Utkast14aVedtaksstatus {...sorteringTilHeadercelle} />
                <Utkast14aVedtaksstatusEndret {...sorteringTilHeadercelle} />
                <Utkast14aAnsvarligVeileder {...sorteringTilHeadercelle} />

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

                <HuskelappKommentar {...sorteringTilHeadercelle} />
                <HuskelappFrist {...sorteringTilHeadercelle} />
                <HuskelappSistEndret {...sorteringTilHeadercelle} />
            </div>
            <div className="brukerliste__gutter-right" />
        </div>
    );
}
