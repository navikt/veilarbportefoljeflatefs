import SorteringHeader from '../components/tabell/sortering-header';
import SorteringHeaderIkon from '../components/tabell/sortering-header-ikon';
import {FiltervalgModell, Sorteringsfelt, Sorteringsrekkefolge} from '../model-interfaces';
import {AktiviteterValg} from '../ducks/filtrering';
import {
    DAGPENGER_YTELSE,
    DAGPENGER_YTELSE_LONNSGARANTIMIDLER,
    DAGPENGER_YTELSE_ORDINARE,
    DAGPENGER_YTELSE_PERMITTERING,
    DAGPENGER_YTELSE_PERMITTERING_FISKEINDUSTRI,
    I_AVTALT_AKTIVITET,
    MOTER_IDAG,
    TILTAKSHENDELSER,
    UNDER_VURDERING,
    UTGATTE_VARSEL,
    UTLOPTE_AKTIVITETER,
    VENTER_PA_SVAR_FRA_BRUKER,
    VENTER_PA_SVAR_FRA_NAV,
    ytelseAapSortering,
    ytelseUtlopsSortering
} from '../filtrering/filter-konstanter';
import {Kolonne} from '../ducks/ui/listevisning';
import Header from '../components/tabell/header';
import VelgalleCheckboks from '../components/toolbar/velgalle-checkboks';
import {OrNothing} from '../utils/types/types';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {VIS_AAP_VURDERINGSFRISTKOLONNER, VIS_FILTER_14A_FRA_VEDTAKSSTOTTE, VIS_HENDELSESFILTER} from '../konstanter';
import {ReactComponent as FargekategoriIkonTomtBokmerke} from '../components/ikoner/fargekategorier/Fargekategoriikon_bokmerke.svg';
import {ReactComponent as HuskelappIkon} from '../components/ikoner/huskelapp/Huskelappikon.svg';
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
import {HuskelappKommentar} from '../components/tabell/headerceller/HuskelappKommentar';
import {HuskelappFrist} from '../components/tabell/headerceller/HuskelappFrist';
import {GjeldendeVedtak14aInnsatsgruppe} from '../components/tabell/headerceller/GjeldendeVedtak14aInnsatsgruppe';
import {GjeldendeVedtak14aHovedmal} from '../components/tabell/headerceller/GjeldendeVedtak14aHovedmal';
import {GjeldendeVedtak14aVedtaksdato} from '../components/tabell/headerceller/GjeldendeVedtak14aVedtaksdato';
import './minoversikt.css';
import React from 'react';

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

function MinOversiktListeHode({
    sorteringsrekkefolge,
    sorteringOnClick,
    sorteringsfelt,
    filtervalg,
    valgteKolonner
}: MinOversiktListehodeProps) {
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
    const ferdigfilterListe = filtervalg ? filtervalg.ferdigfilterListe : '';
    const iAvtaltAktivitet =
        !!ferdigfilterListe?.includes(I_AVTALT_AKTIVITET) && valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET);

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
            <div className="brukerliste__minoversikt-ikonknapper">
                <SorteringHeaderIkon
                    ikon={<FargekategoriIkonTomtBokmerke aria-hidden />}
                    sortering={Sorteringsfelt.FARGEKATEGORI}
                    erValgt={sorteringsfelt === Sorteringsfelt.FARGEKATEGORI}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    title="Fargekategori-sortering"
                    headerId="fargekategori"
                />
                <SorteringHeaderIkon
                    ikon={<HuskelappIkon aria-hidden />}
                    sortering={Sorteringsfelt.HUSKELAPP}
                    erValgt={sorteringsfelt === Sorteringsfelt.HUSKELAPP}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    title="Huskelapp-sortering"
                    headerId="huskelapp"
                    className="huskelapp__sorteringsheader"
                />
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

                <Bosted {...sorteringTilHeadercelle} />
                <BostedDetaljer {...sorteringTilHeadercelle} />
                <BostedSistOppdatert {...sorteringTilHeadercelle} />

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
                    skalVises={!!ytelse && erAapYtelse && valgteKolonner.includes(Kolonne.RETTIGHETSPERIODE)}
                    sortering={aapRettighetsperiode}
                    erValgt={sorteringsfelt === aapRettighetsperiode}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Gjenstående uker rettighet AAP"
                    title="Gjenstående uker av rettighetsperioden for AAP"
                    className="col col-xs-2"
                />
                <SorteringHeader
                    skalVises={!!ferdigfilterListe?.includes(VENTER_PA_SVAR_FRA_NAV)}
                    sortering={Sorteringsfelt.VENTER_PA_SVAR_FRA_NAV}
                    erValgt={sorteringsfelt === Sorteringsfelt.VENTER_PA_SVAR_FRA_NAV}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Dato på melding"
                    title='Dato på meldingen som er merket "Venter på svar fra NAV"'
                    className="col col-xs-2"
                />
                <SorteringHeader
                    skalVises={!!ferdigfilterListe?.includes(VENTER_PA_SVAR_FRA_BRUKER)}
                    sortering={Sorteringsfelt.VENTER_PA_SVAR_FRA_BRUKER}
                    erValgt={sorteringsfelt === Sorteringsfelt.VENTER_PA_SVAR_FRA_BRUKER}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Dato på melding"
                    title='Dato på meldingen som er merket "Venter på svar fra bruker"'
                    className="col col-xs-2"
                />
                {visKolonnerForHendelsesfilter && (
                    <>
                        <Header
                            skalVises={!!ferdigfilterListe?.includes(UTGATTE_VARSEL)}
                            title="Lenke til hendelsen"
                            className="col col-xs-2"
                        >
                            Hendelse
                        </Header>
                        <Header
                            skalVises={!!ferdigfilterListe?.includes(UTGATTE_VARSEL)}
                            title="Dato da hendelsen ble opprettet"
                            className="col col-xs-2"
                        >
                            Dato for hendelse
                        </Header>
                    </>
                )}
                <SorteringHeader
                    skalVises={!!ferdigfilterListe?.includes(UTLOPTE_AKTIVITETER)}
                    sortering={Sorteringsfelt.UTLOPTE_AKTIVITETER}
                    erValgt={sorteringsfelt === Sorteringsfelt.UTLOPTE_AKTIVITETER}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Utløpsdato aktivitet"
                    title='Utløpsdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                    className="col col-xs-2"
                />
                <SorteringHeader
                    skalVises={iAvtaltAktivitet}
                    sortering={Sorteringsfelt.I_AVTALT_AKTIVITET}
                    erValgt={sorteringsfelt === Sorteringsfelt.I_AVTALT_AKTIVITET}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Neste utløpsdato aktivitet"
                    title='Neste utløpsdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                    headerTestId="sorteringheader_i-avtalt-aktivitet"
                    className="col col-xs-2"
                />
                <SorteringHeader
                    skalVises={!!ferdigfilterListe?.includes(MOTER_IDAG) && valgteKolonner.includes(Kolonne.MOTER_IDAG)}
                    sortering={Sorteringsfelt.MOTER_IDAG}
                    erValgt={sorteringsfelt === Sorteringsfelt.MOTER_IDAG}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Klokkeslett møte"
                    title="Tidspunktet møtet starter"
                    className="col col-xs-2"
                />
                <Header
                    skalVises={
                        !!ferdigfilterListe?.includes(MOTER_IDAG) && valgteKolonner.includes(Kolonne.MOTER_VARIGHET)
                    }
                    title="Varighet på møtet"
                    className="col col-xs-2"
                >
                    Varighet møte
                </Header>
                <SorteringHeader
                    skalVises={
                        !!ferdigfilterListe?.includes(MOTER_IDAG) && valgteKolonner.includes(Kolonne.MOTE_ER_AVTALT)
                    }
                    sortering={Sorteringsfelt.MOTESTATUS}
                    erValgt={sorteringsfelt === Sorteringsfelt.MOTESTATUS}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Avtalt med NAV"
                    title="Møtestatus"
                    className="col col-xs-2"
                />
                <SorteringHeader
                    skalVises={
                        !!ferdigfilterListe?.includes(UNDER_VURDERING) && valgteKolonner.includes(Kolonne.VEDTAKSTATUS)
                    }
                    sortering={Sorteringsfelt.UTKAST_14A_STATUS}
                    erValgt={sorteringsfelt === Sorteringsfelt.UTKAST_14A_STATUS}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Status § 14a-vedtak"
                    title="Status oppfølgingvedtak"
                    className="col col-xs-2"
                />
                <SorteringHeader
                    skalVises={
                        !!ferdigfilterListe?.includes(UNDER_VURDERING) &&
                        valgteKolonner.includes(Kolonne.VEDTAKSTATUS_ENDRET)
                    }
                    sortering={Sorteringsfelt.UTKAST_14A_STATUS_ENDRET}
                    erValgt={sorteringsfelt === Sorteringsfelt.UTKAST_14A_STATUS_ENDRET}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Dager siden status"
                    title="Dager siden status"
                    className="col col-xs-2"
                />
                <SorteringHeader
                    skalVises={
                        !!ferdigfilterListe?.includes(UNDER_VURDERING) &&
                        valgteKolonner.includes(Kolonne.ANSVARLIG_VEILEDER_FOR_VEDTAK)
                    }
                    sortering={Sorteringsfelt.UTKAST_14A_ANSVARLIG_VEILEDER}
                    erValgt={sorteringsfelt === Sorteringsfelt.UTKAST_14A_ANSVARLIG_VEILEDER}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Ansvarlig for vedtak"
                    title="Ansvarlig veileder for vedtak"
                    className="col col-xs-2"
                />
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
                <SorteringHeader
                    skalVises={
                        !!ferdigfilterListe?.includes(I_AVTALT_AKTIVITET) &&
                        valgteKolonner.includes(Kolonne.START_DATO_AKTIVITET)
                    }
                    sortering={Sorteringsfelt.START_DATO_FOR_AVTALT_AKTIVITET}
                    erValgt={sorteringsfelt === Sorteringsfelt.START_DATO_FOR_AVTALT_AKTIVITET}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Startdato aktivitet"
                    title='Startdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                    className="col col-xs-2"
                />
                <SorteringHeader
                    skalVises={
                        !!ferdigfilterListe?.includes(I_AVTALT_AKTIVITET) &&
                        valgteKolonner.includes(Kolonne.NESTE_START_DATO_AKTIVITET)
                    }
                    sortering={Sorteringsfelt.NESTE_START_DATO_FOR_AVTALT_AKTIVITET}
                    erValgt={sorteringsfelt === Sorteringsfelt.NESTE_START_DATO_FOR_AVTALT_AKTIVITET}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Neste startdato aktivitet"
                    title='Neste startdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                    className="col col-xs-2"
                />
                <SorteringHeader
                    skalVises={
                        !!ferdigfilterListe?.includes(I_AVTALT_AKTIVITET) &&
                        valgteKolonner.includes(Kolonne.FORRIGE_START_DATO_AKTIVITET)
                    }
                    sortering={Sorteringsfelt.FORRIGE_DATO_FOR_AVTALT_AKTIVITET}
                    erValgt={sorteringsfelt === Sorteringsfelt.FORRIGE_DATO_FOR_AVTALT_AKTIVITET}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Passert startdato aktivitet"
                    title='Passert startdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                    className="col col-xs-2"
                />
                <Header
                    // Dette er siste endring frå under "Hendelser", i aktiviteter personen sjølv har oppretta.
                    skalVises={!!filtervalg.sisteEndringKategori && valgteKolonner.includes(Kolonne.SISTE_ENDRING)}
                    title="Personens siste endring av aktiviteter/mål"
                    className="col col-xs-2"
                >
                    Siste endring
                </Header>
                <SorteringHeader
                    // Dette er siste endring frå under "Hendelser", i aktiviteter personen sjølv har oppretta.
                    skalVises={!!filtervalg.sisteEndringKategori && valgteKolonner.includes(Kolonne.SISTE_ENDRING_DATO)}
                    sortering={Sorteringsfelt.SISTE_ENDRING_DATO}
                    erValgt={sorteringsfelt === Sorteringsfelt.SISTE_ENDRING_DATO}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Dato personen sist gjorde endring i aktiviteter/mål"
                    title="Dato siste endring"
                    className="col col-xs-2"
                />

                <SvarfristCv {...sorteringTilHeadercelle} />

                <Status14AVedtak {...sorteringTilHeadercelle} />
                {visFilter14aFraVedtaksstotte && (
                    <>
                        <GjeldendeVedtak14aInnsatsgruppe {...sorteringTilHeadercelle} />
                        <GjeldendeVedtak14aHovedmal {...sorteringTilHeadercelle} />
                        <GjeldendeVedtak14aVedtaksdato {...sorteringTilHeadercelle} />
                    </>
                )}

                <SorteringHeader
                    skalVises={
                        valgteKolonner.includes(Kolonne.ENSLIGE_FORSORGERE_UTLOP_OVERGANGSSTONAD) &&
                        !!filtervalg.ensligeForsorgere.length
                    }
                    sortering={Sorteringsfelt.ENSLIGE_FORSORGERE_UTLOPS_YTELSE}
                    erValgt={sorteringsfelt === Sorteringsfelt.ENSLIGE_FORSORGERE_UTLOPS_YTELSE}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Utløp overgangsstønad"
                    title="Utløpsdato for overgangsstønad"
                    headerTestId="sorteringheader_utlop_overgangsstonad"
                    className="col col-xs-2"
                />
                <SorteringHeader
                    skalVises={
                        valgteKolonner.includes(Kolonne.ENSLIGE_FORSORGERE_VEDTAKSPERIODE) &&
                        !!filtervalg.ensligeForsorgere.length
                    }
                    sortering={Sorteringsfelt.ENSLIGE_FORSORGERE_VEDTAKSPERIODETYPE}
                    erValgt={sorteringsfelt === Sorteringsfelt.ENSLIGE_FORSORGERE_VEDTAKSPERIODETYPE}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Type vedtaksperiode overgangsstønad"
                    title="Type vedtaksperiode for overgangsstønad"
                    className="col col-xs-2"
                />
                <SorteringHeader
                    skalVises={
                        valgteKolonner.includes(Kolonne.ENSLIGE_FORSORGERE_AKIVITETSPLIKT) &&
                        !!filtervalg.ensligeForsorgere.length
                    }
                    sortering={Sorteringsfelt.ENSLIGE_FORSORGERE_AKTIVITETSPLIKT}
                    erValgt={sorteringsfelt === Sorteringsfelt.ENSLIGE_FORSORGERE_AKTIVITETSPLIKT}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Om aktivitetsplikt overgangsstønad"
                    title="Om bruker har aktivitetsplikt på overgangsstønad"
                    className="col col-xs-2"
                />
                <SorteringHeader
                    skalVises={
                        valgteKolonner.includes(Kolonne.ENSLIGE_FORSORGERE_OM_BARNET) &&
                        !!filtervalg.ensligeForsorgere.length
                    }
                    sortering={Sorteringsfelt.ENSLIGE_FORSORGERE_OM_BARNET}
                    erValgt={sorteringsfelt === Sorteringsfelt.ENSLIGE_FORSORGERE_OM_BARNET}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Om barnet"
                    title="Dato når barnet er hhv. 6 mnd/1 år gammelt"
                    headerTestId="sorteringheader_enslige-forsorgere-om-barnet"
                    className="col col-xs-2"
                />
                <BarnUnder18Aar {...sorteringTilHeadercelle} />

                <UtdanningOgSituasjonSistEndret {...sorteringTilHeadercelle} />

                <HuskelappKommentar {...sorteringTilHeadercelle} />
                <HuskelappFrist {...sorteringTilHeadercelle} />

                <SorteringHeader
                    skalVises={
                        !!ferdigfilterListe?.includes(TILTAKSHENDELSER) &&
                        valgteKolonner.includes(Kolonne.TILTAKSHENDELSE_LENKE)
                    }
                    sortering={Sorteringsfelt.TILTAKSHENDELSE_TEKST}
                    erValgt={sorteringsfelt === Sorteringsfelt.TILTAKSHENDELSE_TEKST}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Hendelse på tiltak"
                    title="Lenke til hendelsen"
                    className="col col-xs-3"
                />
                <SorteringHeader
                    skalVises={
                        !!ferdigfilterListe?.includes(TILTAKSHENDELSER) &&
                        valgteKolonner.includes(Kolonne.TILTAKSHENDELSE_DATO_OPPRETTET)
                    }
                    sortering={Sorteringsfelt.TILTAKSHENDELSE_DATO_OPPRETTET}
                    erValgt={sorteringsfelt === Sorteringsfelt.TILTAKSHENDELSE_DATO_OPPRETTET}
                    rekkefolge={sorteringsrekkefolge}
                    onClick={sorteringOnClick}
                    tekst="Dato for hendelse"
                    title="Dato da hendelsen ble opprettet"
                    className="col col-xs-2"
                />
            </div>
            <div className="brukerliste__gutter-right" />
        </div>
    );
}

export default MinOversiktListeHode;
