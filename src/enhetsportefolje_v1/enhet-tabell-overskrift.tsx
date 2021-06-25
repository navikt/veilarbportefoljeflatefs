import React from 'react';
import SorteringHeader from '../components/tabell_v1/sortering-header';
import TittelValg from '../utils/utils';
import {
    I_AVTALT_AKTIVITET,
    MOTER_IDAG,
    UNDER_VURDERING,
    UTLOPTE_AKTIVITETER,
    VENTER_PA_SVAR_FRA_BRUKER,
    VENTER_PA_SVAR_FRA_NAV,
    ytelseAapSortering,
    ytelseUtlopsSortering
} from '../filtrering/filter-konstanter';
import {FiltervalgModell, Sorteringsfelt, Sorteringsrekkefolge} from '../model-interfaces';
import {Kolonne, OversiktType} from '../ducks/ui/listevisning';
import {AktiviteterValg} from '../ducks/filtrering';
import Header from '../components/tabell_v1/header';
import VelgalleCheckboks from '../components/toolbar/velgalle-checkboks';
import './enhetsportefolje.less';
import './brukerliste.less';
import {OrNothing} from '../utils/types/types';

function harValgteAktiviteter(aktiviteter) {
    if (aktiviteter && Object.keys(aktiviteter).length > 0) {
        const valgteAktiviteter = Object.values(aktiviteter).filter(
            aktivitetvalg => aktivitetvalg !== AktiviteterValg.NA
        );
        return valgteAktiviteter?.length > 0;
    }
    return false;
}

interface EnhetTabellHeaderProps {
    sorteringsrekkefolge: OrNothing<Sorteringsrekkefolge>;
    sorteringOnClick: (sortering: string) => void;
    valgteKolonner: Kolonne[];
    filtervalg: FiltervalgModell;
    sorteringsfelt: OrNothing<Sorteringsfelt>;
    oversiktType: OversiktType;
}

function EnhetTabellOverskrift({
    sorteringsrekkefolge,
    sorteringOnClick,
    filtervalg,
    sorteringsfelt,
    valgteKolonner,
    oversiktType
}: EnhetTabellHeaderProps) {
    const {ytelse} = filtervalg;
    const erAapYtelse = Object.keys(ytelseAapSortering).includes(ytelse!);
    const aapRettighetsperiode = erAapYtelse ? ytelseAapSortering[ytelse!].rettighetsperiode : '';
    const ytelseUtlopsdatoNavn = erAapYtelse ? ytelseAapSortering[ytelse!].vedtaksperiode : ytelseUtlopsSortering[ytelse!];
    const ytelseSorteringHeader = ytelseUtlopsdatoNavn === 'utlopsdato' || erAapYtelse ? 'Gjenstående uker vedtak' : 'Gjenstående uker rettighet';
    const ferdigfilterListe = !!filtervalg ? filtervalg.ferdigfilterListe : '';
    const iAvtaltAktivitet = ferdigfilterListe?.includes(I_AVTALT_AKTIVITET) && valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET);

    const avansertAktivitet = iAvtaltAktivitet
        ? false
        : harValgteAktiviteter(filtervalg.aktiviteter) && valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET);

    const forenkletAktivitet =
        harValgteAktiviteter(filtervalg.aktiviteterForenklet) && valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET);

    return (
        <div role="row" className="brukerliste__header brukerliste__sorteringheader typo-undertekst-enhet">
            <div className="brukerliste__gutter-left"/>
            <div role="columnheader" className="brukerliste__innhold" data-testid="brukerliste_innhold">
                <VelgalleCheckboks
                    role="checkbox"
                    skalVises={oversiktType in OversiktType}
                    className="velgalle-checkboks col col-xs-2"
                />
                <SorteringHeader
                    role="columnheader"
                    sortering={Sorteringsfelt.ETTERNAVN}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.ETTERNAVN}
                    tekst="Etternavn"
                    className="col col-xs-2"
                    title="Etternavn"
                    headerId="etternavn"
                />
                <SorteringHeader
                    role="columnheader"
                    sortering={Sorteringsfelt.FODSELSNUMMER}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.FODSELSNUMMER}
                    tekst="Fødselsnr."
                    className="col col-xs-2"
                    title="Fødselsnummer"
                    headerId="fødselsnummer"
                />
                <SorteringHeader
                    role="columnheader"
                    sortering={Sorteringsfelt.OPPFOLGINGSTARTET}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.OPPFOLGINGSTARTET}
                    tekst="Oppfølging startet"
                    className="col col-xs-2"
                    skalVises={valgteKolonner.includes(Kolonne.OPPFOLGINGSTARTET)}
                    title="Startdato for pågående oppfølgingsperiode"
                    headerId="oppfolging-startet"
                />
                <Header
                    role="columnheader"
                    className="col col-xs-2"
                    skalVises={valgteKolonner.includes(Kolonne.VEILEDER)}
                    headerId="veileder"
                >
                    Veileder
                </Header>
                <SorteringHeader
                    role="columnheader"
                    sortering={Sorteringsfelt.NAVIDENT}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.NAVIDENT}
                    tekst="NAV-ident"
                    skalVises={valgteKolonner.includes(Kolonne.NAVIDENT)}
                    className="header__veilederident col col-xs-2"
                    title="NAV-ident på tildelt veileder"
                    headerId="navident"
                />
                <SorteringHeader
                    role="columnheader"
                    sortering={ytelseUtlopsdatoNavn}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={ytelseUtlopsdatoNavn === sorteringsfelt}
                    tekst={ytelseSorteringHeader}
                    skalVises={!!filtervalg.ytelse && valgteKolonner.includes(Kolonne.UTLOP_YTELSE)}
                    className="col col-xs-2"
                    title={TittelValg(ytelseSorteringHeader)}
                    headerId="ytelse-utlopsdato"
                />
                <SorteringHeader
                    role="columnheader"
                    sortering={ytelseUtlopsdatoNavn}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={ytelseUtlopsdatoNavn === sorteringsfelt}
                    tekst="Gjenstående uker vedtak"
                    skalVises={!!filtervalg.ytelse && erAapYtelse && valgteKolonner.includes(Kolonne.VEDTAKSPERIODE)}
                    className="col col-xs-2"
                    title="Gjenstående uker på gjeldende vedtak"
                    headerId="ytelse-utlopsdato-navn"
                />
                <SorteringHeader
                    role="columnheader"
                    sortering={aapRettighetsperiode}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === aapRettighetsperiode}
                    tekst="Gjenstående uker rettighet"
                    skalVises={!!filtervalg.ytelse && erAapYtelse && valgteKolonner.includes(Kolonne.RETTIGHETSPERIODE)}
                    className="col col-xs-2"
                    title="Gjenstående uker av rettighetsperioden for ytelsen"
                    headerId="rettighetsperiode-gjenstaende"
                />
                <SorteringHeader
                    role="columnheader"
                    sortering={Sorteringsfelt.VENTER_PA_SVAR_FRA_NAV}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.VENTER_PA_SVAR_FRA_NAV}
                    tekst="Dato på melding"
                    skalVises={
                        ferdigfilterListe?.includes(VENTER_PA_SVAR_FRA_NAV) &&
                        valgteKolonner.includes(Kolonne.VENTER_SVAR)
                    }
                    className="col col-xs-2"
                    title='Dato på meldingen som er merket "Venter på svar fra NAV"'
                    headerId="venter-pa-svar-fra-nav"
                />
                <SorteringHeader
                    role="columnheader"
                    sortering={Sorteringsfelt.VENTER_PA_SVAR_FRA_BRUKER}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.VENTER_PA_SVAR_FRA_BRUKER}
                    tekst="Dato på melding"
                    skalVises={
                        ferdigfilterListe?.includes(VENTER_PA_SVAR_FRA_BRUKER) &&
                        valgteKolonner.includes(Kolonne.VENTER_SVAR)
                    }
                    className="col col-xs-2"
                    title='Dato på meldingen som er merket "Venter på svar fra bruker"'
                    headerId="venter-pa-svar-fra-bruker"
                />
                <SorteringHeader
                    role="columnheader"
                    sortering={Sorteringsfelt.UTLOPTE_AKTIVITETER}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.UTLOPTE_AKTIVITETER}
                    tekst="Utløpsdato aktivitet"
                    skalVises={
                        ferdigfilterListe?.includes(UTLOPTE_AKTIVITETER) &&
                        valgteKolonner.includes(Kolonne.UTLOPTE_AKTIVITETER)
                    }
                    className="col col-xs-2"
                    title='Utløpsdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                    headerId="utlopte-aktiviteter"
                />
                <SorteringHeader
                    role="columnheader"
                    sortering={Sorteringsfelt.I_AVTALT_AKTIVITET}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.I_AVTALT_AKTIVITET}
                    tekst="Neste utløpsdato aktivitet"
                    skalVises={iAvtaltAktivitet}
                    className="col col-xs-2"
                    title='Neste utløpsdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                    headerId="i-avtalt-aktivitet"
                />
                <SorteringHeader
                    role="columnheader"
                    sortering={Sorteringsfelt.VALGTE_AKTIVITETER}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.VALGTE_AKTIVITETER}
                    tekst="Neste utløpsdato aktivitet"
                    skalVises={avansertAktivitet || forenkletAktivitet}
                    className="col col-xs-2"
                    title='Neste utløpsdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                    headerId="valgte-aktiviteter"
                />
                <SorteringHeader
                    role="columnheader"
                    sortering={Sorteringsfelt.MOTER_IDAG}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.MOTER_IDAG}
                    tekst="Klokkeslett møte"
                    skalVises={ferdigfilterListe?.includes(MOTER_IDAG) && valgteKolonner.includes(Kolonne.MOTER_IDAG)}
                    className="col col-xs-2"
                    title="Tidspunktet møtet starter"
                    headerId="moter-idag"
                />
                <Header
                    role="columnheader"
                    skalVises={ferdigfilterListe?.includes(MOTER_IDAG) && valgteKolonner.includes(Kolonne.MOTER_VARIGHET)}
                    className="col col-xs-2"
                    title="Varighet på møtet"
                    headerId="varighet-mote"
                >
                    Varighet møte
                </Header>
                <SorteringHeader
                    role="columnheader"
                    sortering={Sorteringsfelt.VEDTAKSTATUS}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.VEDTAKSTATUS}
                    skalVises={ferdigfilterListe?.includes(UNDER_VURDERING) && valgteKolonner.includes(Kolonne.VEDTAKSTATUS)}
                    tekst="Status § 14a-vedtak"
                    className="col col-xs-2"
                    title="Status oppfølgingvedtak"
                    headerId="vedtakstatus"
                />
                <SorteringHeader
                    role="columnheader"
                    sortering={Sorteringsfelt.VEDTAKSTATUS_ENDRET}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.VEDTAKSTATUS_ENDRET}
                    tekst="Statusendring"
                    skalVises={ferdigfilterListe?.includes(UNDER_VURDERING) && valgteKolonner.includes(Kolonne.VEDTAKSTATUS_ENDRET)}
                    className="col col-xs-2"
                    title="Dager siden fikk status"
                    headerId="vedtakstatus-endret"
                />
                <SorteringHeader
                    role="columnheader"
                    sortering={Sorteringsfelt.ANSVARLIG_VEILEDER_FOR_VEDTAK}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.ANSVARLIG_VEILEDER_FOR_VEDTAK}
                    tekst="Ansvarlig for vedtak"
                    skalVises={
                        ferdigfilterListe?.includes(UNDER_VURDERING) &&
                        valgteKolonner.includes(Kolonne.ANSVARLIG_VEILEDER_FOR_VEDTAK)
                    }
                    className="col col-xs-2"
                    title="Ansvarlig veileder for vedtak"
                    headerId="ansvarlig-veileder-for-vedtak"
                />
                <Header
                    role="columnheader"
                    skalVises={!!filtervalg.sisteEndringKategori && valgteKolonner.includes(Kolonne.SISTE_ENDRING)}
                    className="col col-xs-2"
                    title="Siste endring"
                    headerId="siste-endring"
                >
                    Siste endring
                </Header>
                <SorteringHeader
                    role="columnheader"
                    sortering={Sorteringsfelt.SISTE_ENDRING_DATO}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.SISTE_ENDRING_DATO}
                    tekst="Dato siste endring"
                    skalVises={!!filtervalg.sisteEndringKategori && valgteKolonner.includes(Kolonne.SISTE_ENDRING_DATO)}
                    className="col col-xs-2"
                    title="Dato siste endring"
                    headerId="dato-siste-endring"
                />
            </div>
            <div className="brukerliste__gutter-right" role="columnheader" id="etiketter"/>
        </div>
    );
}

export default EnhetTabellOverskrift;
