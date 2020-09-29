import * as React from 'react';
import SorteringHeader from '../components/tabell/sortering-header';
import { ytelseFilterErAktiv } from '../utils/utils';
import { BrukerModell, FiltervalgModell, Sorteringsfelt, Sorteringsrekkefolge } from '../model-interfaces';
import { AktiviteterValg } from '../ducks/filtrering';
import {
    I_AVTALT_AKTIVITET,
    MIN_ARBEIDSLISTE,
    MOTER_IDAG, UNDER_VURDERING,
    UTLOPTE_AKTIVITETER,
    VENTER_PA_SVAR_FRA_BRUKER,
    VENTER_PA_SVAR_FRA_NAV,
    ytelseAapSortering,
    ytelseUtlopsSortering
} from '../filtrering/filter-konstanter';
import { Kolonne, ListevisningType } from '../ducks/ui/listevisning';
import Header from '../components/tabell/header';
import TittelValg from '../utils/utils';
import VelgalleCheckboks from '../components/toolbar/velgalle-checkboks';
import './minoversikt.less';
import { ReactComponent as ArbeidslisteikonBla } from '../components/ikoner/arbeidsliste/arbeidslisteikon_bla.svg';
import {OrNothing} from "../utils/types/types";

function harValgteAktiviteter(aktiviteter) {
    if (aktiviteter && Object.keys(aktiviteter).length > 0) {
        const valgteAktiviteter = Object.values(aktiviteter).filter((aktivitetvalg) => aktivitetvalg !== AktiviteterValg.NA);
        return valgteAktiviteter && valgteAktiviteter.length > 0;
    }
    return false;
}

interface MinOversiktListehodeProps {
    sorteringsrekkefolge: OrNothing<Sorteringsrekkefolge>;
    sorteringOnClick: (sortering: string) => void;
    sorteringsfelt: OrNothing<Sorteringsfelt>;
    filtervalg: FiltervalgModell;
    brukere: BrukerModell[];
    valgteKolonner: Kolonne[];
    filtergruppe: ListevisningType;
}

function MinOversiktListeHode({sorteringsrekkefolge, sorteringOnClick, filtervalg, sorteringsfelt, valgteKolonner, filtergruppe}: MinOversiktListehodeProps) {
    const {ytelse} = filtervalg;
    const erAapYtelse = Object.keys(ytelseAapSortering).includes(ytelse!);
    const aapRettighetsperiode = erAapYtelse ? ytelseAapSortering[ytelse!].rettighetsperiode : '';
    const ytelseUtlopsdatoNavn = erAapYtelse ? ytelseAapSortering[ytelse!].vedtaksperiode : ytelseUtlopsSortering[ytelse!];
    const harValgteAktivitetstyper = harValgteAktiviteter(filtervalg.aktiviteter);
    const ytelseSorteringHeader = ytelseUtlopsdatoNavn === 'utlopsdato' || erAapYtelse ? 'Gjenstående uker vedtak' : 'Gjenstående uker rettighet';
    const ferdigfilterListe = !!filtervalg ? filtervalg.ferdigfilterListe : '';
    const iAvtaltAktivitet = !!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) && valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET);
    const avtaltAktivitetOgTiltak = iAvtaltAktivitet ? false : harValgteAktivitetstyper && filtervalg.tiltakstyper.length === 0 && valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET);

    return (
        <div className="brukerliste__header brukerliste__sorteringheader typo-undertekst">
            <div className="brukerliste__gutter-left"/>
            <div className="brukerliste__innhold">
                <VelgalleCheckboks
                    skalVises={filtergruppe in ListevisningType}
                    className="velgalle-checkboks col col-xs-2"/>
                <SorteringHeader
                    className="arbeidslistekategori__sorteringsheader"
                    sortering={Sorteringsfelt.ARBEIDSLISTEKATEGORI}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.ARBEIDSLISTEKATEGORI}
                    tekst={<ArbeidslisteikonBla/>}
                    title="Sorter på farge"
                    headerId='arbeidslistekategori'
                />
                <SorteringHeader
                    className="col col-xs-2"
                    sortering={Sorteringsfelt.ETTERNAVN}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.ETTERNAVN}
                    tekst="Etternavn"
                    title='Etternavn'
                    headerId='etternavn'
                />
                <SorteringHeader
                    className="col col-xs-2"
                    sortering={Sorteringsfelt.FODSELSNUMMER}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.FODSELSNUMMER}
                    tekst="Fødselsnr."
                    title='Fødselsnummer'
                    headerId='fnr'
                />
                <SorteringHeader
                    sortering={Sorteringsfelt.OPPFOLGINGSTARTET}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.OPPFOLGINGSTARTET}
                    tekst="Oppfølging startet"
                    className="sortering-header__dato col col-xs-2"
                    skalVises={valgteKolonner.includes(Kolonne.OPPFOLGINGSTARTET)}
                    title='Startdato for pågående oppfølgingsperiode'
                    headerId='oppfolgingstartet'
                />
                <SorteringHeader
                    sortering={Sorteringsfelt.ARBEIDSLISTE_FRIST}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.ARBEIDSLISTE_FRIST}
                    tekst="Arbeidsliste frist"
                    skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(MIN_ARBEIDSLISTE) && valgteKolonner.includes(Kolonne.ARBEIDSLISTE_FRIST)}
                    className="sortering-header__dato col col-xs-2"
                    title='Fristdato som er satt i arbeidslisten'
                    headerId='arbeidsliste-frist'
                />
                <SorteringHeader
                    sortering={Sorteringsfelt.ARBEIDSLISTE_OVERSKRIFT}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.ARBEIDSLISTE_OVERSKRIFT}
                    tekst="Arbeidsliste tittel"
                    skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(MIN_ARBEIDSLISTE) && valgteKolonner.includes(Kolonne.ARBEIDSLISTE_OVERSKRIFT)}
                    className="sortering-header__dato col col-xs-2"
                    title='Tittel som er skrevet i arbeidslisten'
                    headerId='arbeidsliste-overskrift'
                />
                <SorteringHeader
                    sortering={ytelseUtlopsdatoNavn}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === ytelseUtlopsdatoNavn}
                    tekst={ytelseSorteringHeader}
                    skalVises={ytelseFilterErAktiv(ytelse) && valgteKolonner.includes(Kolonne.UTLOP_YTELSE)}
                    className="sortering-header__dato col col-xs-2"
                    title={TittelValg(ytelseSorteringHeader)}
                    headerId='ytelse-utlopsdato'
                />
                <SorteringHeader
                    sortering={ytelseUtlopsdatoNavn}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={ytelseUtlopsdatoNavn === sorteringsfelt}
                    tekst="Gjenstående uker vedtak"
                    skalVises={ytelseFilterErAktiv(filtervalg.ytelse) && erAapYtelse && valgteKolonner.includes(Kolonne.VEDTAKSPERIODE)}
                    className="sortering-header__dato col col-xs-2"
                    title='Gjenstående uker på gjeldende vedtak'
                    headerId='ytelse-utlopsdato-navn'
                />
                <SorteringHeader
                    sortering={aapRettighetsperiode}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === aapRettighetsperiode}
                    tekst="Gjenstående uker rettighet"
                    skalVises={ytelseFilterErAktiv(ytelse) && erAapYtelse && valgteKolonner.includes(Kolonne.RETTIGHETSPERIODE)}
                    className="sortering-header__dato col col-xs-2"
                    title='Gjenstående uker av rettighetsperioden for ytelsen'
                    headerId='rettighetsperiode-gjenstaende'
                />
                <SorteringHeader
                    sortering={Sorteringsfelt.VENTER_PA_SVAR_FRA_NAV}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.VENTER_PA_SVAR_FRA_NAV}
                    tekst="Dato på melding"
                    skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV)}
                    className="sortering-header__dato col col-xs-2"
                    title='Dato på meldingen som er merket "Venter på svar fra NAV"'
                    headerId='venter-pa-svar-fra-nav'
                />
                <SorteringHeader
                    sortering={Sorteringsfelt.VENTER_PA_SVAR_FRA_BRUKER}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.VENTER_PA_SVAR_FRA_BRUKER}
                    tekst="Dato på melding"
                    skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_BRUKER)}
                    className="sortering-header__dato col col-xs-2"
                    title='Dato på meldingen som er merket "Venter på svar fra bruker"'
                    headerId='venter-pa-svar-fra-bruker'
                />
                <SorteringHeader
                    sortering={Sorteringsfelt.UTLOPTE_AKTIVITETER}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.UTLOPTE_AKTIVITETER}
                    tekst="Utløpsdato aktivitet"
                    skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(UTLOPTE_AKTIVITETER)}
                    className="sortering-header__dato col col-xs-2"
                    title='Utløpsdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                    headerId='utlopte-aktiviteter'

                />
                <SorteringHeader
                    sortering={Sorteringsfelt.I_AVTALT_AKTIVITET}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.I_AVTALT_AKTIVITET}
                    tekst="Neste utløpsdato aktivitet"
                    skalVises={iAvtaltAktivitet}
                    className="sortering-header__dato col col-xs-2"
                    title='Neste utløpsdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                    headerId='i-avtalt-aktivitet'
                />
                <SorteringHeader
                    sortering={Sorteringsfelt.MOTER_IDAG}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.MOTER_IDAG}
                    tekst="Klokkeslett møte"
                    skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(MOTER_IDAG) && valgteKolonner.includes(Kolonne.MOTER_IDAG)}
                    className="sortering-header__dato col col-xs-2"
                    title='Tidspunktet møtet starter'
                    headerId='moter-idag'
                />
                <Header
                    skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(MOTER_IDAG) && valgteKolonner.includes(Kolonne.MOTER_VARIGHET)}
                    className="sortering-header__dato col col-xs-2"
                    title='Varighet på møtet'
                    headerId='varighet-mote'
                >
                    Varighet møte
                </Header>
                <SorteringHeader
                    sortering={Sorteringsfelt.VEDTAKSTATUS}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.VEDTAKSTATUS}
                    skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(UNDER_VURDERING) && valgteKolonner.includes(Kolonne.VEDTAKSTATUS)}
                    tekst="Status oppfølgingsvedtak"
                    className="sortering-header__dato col col-xs-2"
                    title="Status oppfølgingvedtak"
                    headerId='vedtakstatus'
                />
                <SorteringHeader
                    sortering={Sorteringsfelt.VEDTAKSTATUS_ENDRET}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.VEDTAKSTATUS_ENDRET}
                    tekst="Dager siden status"
                    skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(UNDER_VURDERING) && valgteKolonner.includes(Kolonne.VEDTAKSTATUS_ENDRET)}
                    className="sortering-header__dato col col-xs-2"
                    title="Dager siden status"
                    headerId='vedtakstatus-endret'
                />
                <SorteringHeader
                    sortering={Sorteringsfelt.VALGTE_AKTIVITETER}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.VALGTE_AKTIVITETER}
                    tekst="Neste utløpsdato aktivitet"
                    skalVises={avtaltAktivitetOgTiltak}
                    className="sortering-header__dato col col-xs-2"
                    title='Neste utløpsdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                    headerId='valgte-aktiviteter'
                />
                <SorteringHeader
                    sortering={Sorteringsfelt.START_DATO_FOR_AVTALT_AKTIVITET}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.START_DATO_FOR_AVTALT_AKTIVITET}
                    tekst="Startdato aktivitet"
                    skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                    valgteKolonner.includes(Kolonne.START_DATO_AKTIVITET)}
                    className="sortering-header__dato col col-xs-2"
                    title='Startdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                    headerId='start-dato-for-avtalt-aktivitet'
                />
                <SorteringHeader
                    sortering={Sorteringsfelt.NESTE_START_DATO_FOR_AVTALT_AKTIVITET}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.NESTE_START_DATO_FOR_AVTALT_AKTIVITET}
                    tekst="Neste startdato aktivitet"
                    skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                    valgteKolonner.includes(Kolonne.NESTE_START_DATO_AKTIVITET)}
                    className="sortering-header__dato col col-xs-2"
                    title='Neste startdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                    headerId='neste-start-dato-for-avtalt-aktivitet'
                />
                <SorteringHeader
                    sortering={Sorteringsfelt.FORRIGE_DATO_FOR_AVTALT_AKTIVITET}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === Sorteringsfelt.FORRIGE_DATO_FOR_AVTALT_AKTIVITET}
                    tekst="Passert startdato aktivitet"
                    skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                    valgteKolonner.includes(Kolonne.FORRIGE_START_DATO_AKTIVITET)}
                    className="sortering-header__dato col col-xs-2"
                    title='Passert startdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                    headerId='forrige-dato-for-avtalt-aktivitet'
                />
            </div>
            <div className="brukerliste__gutter-right"/>
        </div>
    );
}

export default MinOversiktListeHode;
