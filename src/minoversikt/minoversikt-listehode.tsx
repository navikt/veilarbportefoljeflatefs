import * as React from 'react';
import SorteringHeader from '../components/tabell/sortering-header';
import { ytelseFilterErAktiv } from '../utils/utils';
import { BrukerModell, FiltervalgModell, Sorteringsfelt, Sorteringsrekkefolge } from '../model-interfaces';
import { AktiviteterValg } from '../ducks/filtrering';
import {
    I_AVTALT_AKTIVITET,
    MIN_ARBEIDSLISTE,
    MOTER_IDAG,
    UTLOPTE_AKTIVITETER,
    VENTER_PA_SVAR_FRA_BRUKER,
    VENTER_PA_SVAR_FRA_NAV,
    ytelseAapSortering,
    ytelseUtlopsSortering
} from '../filtrering/filter-konstanter';
import { Kolonne } from '../ducks/ui/listevisning';
import Header from '../components/tabell/header';
import { OPPFOLGING_STARTET } from '../konstanter';
import { connect } from 'react-redux';
import { sjekkFeature } from '../ducks/features';
import TittelValg from '../utils/utils'

function harValgteAktiviteter(aktiviteter) {
    if (aktiviteter && Object.keys(aktiviteter).length > 0) {
        const valgteAktiviteter = Object.values(aktiviteter).filter((aktivitetvalg) => aktivitetvalg !== AktiviteterValg.NA);
        return valgteAktiviteter && valgteAktiviteter.length > 0;
    }
    return false;
}

interface MinOversiktListehodeProps {
    sorteringsrekkefolge: Sorteringsrekkefolge;
    sorteringOnClick: (sortering: string) => void;
    filtervalg: FiltervalgModell;
    sorteringsfelt: Sorteringsfelt;
    brukere: BrukerModell[];
    valgteKolonner: Kolonne[];
    harFeature: Function; //fjern etter featuretoggle
}

function MinOversiktListeHode({sorteringsrekkefolge, sorteringOnClick, filtervalg, sorteringsfelt, valgteKolonner, harFeature}: MinOversiktListehodeProps) {
    const {ytelse} = filtervalg;
    const erAapYtelse = !!ytelse && Object.keys(ytelseAapSortering).includes(ytelse);
    const aapRettighetsperiode = !!ytelse && erAapYtelse ? ytelseAapSortering[ytelse].rettighetsperiode : '';
    const ytelseUtlopsdatoNavn = erAapYtelse ? ytelseAapSortering[ytelse!].vedtaksperiode : ytelseUtlopsSortering[filtervalg.ytelse!];
    const harValgteAktivitetstyper = harValgteAktiviteter(filtervalg.aktiviteter);
    const ytelseSorteringHeader = (ytelseUtlopsdatoNavn === 'utlopsdato' || erAapYtelse) ? 'Gjenstående uker vedtak' : 'Gjenstående uker rettighet';
    const ferdigfilterListe = !!filtervalg ? filtervalg.ferdigfilterListe : '';
    const iAvtaltAktivitet = !!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) && valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET);
    const avtaltAktivitetOgTiltak = iAvtaltAktivitet ? false : harValgteAktivitetstyper && filtervalg.tiltakstyper.length === 0 && valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET);
    const skalViseOppfolgingStartet = harFeature(OPPFOLGING_STARTET); //fjern etter featuretoggle

    return (
        <div className="brukerliste__header">
            <div className="brukerliste--border-bottom">
                <div className="brukerliste__sorteringheader">
                    <div className="brukerliste__gutter-left brukerliste--min-width-minside"/>
                    <div className="brukerliste__innhold">
                        <SorteringHeader
                            className="col col-xs-2"
                            sortering={Sorteringsfelt.ETTERNAVN}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.ETTERNAVN}
                            tekst="Etternavn"
                        />
                        <SorteringHeader
                            className="col col-xs-2"
                            sortering={Sorteringsfelt.FODSELSNUMMER}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.FODSELSNUMMER}
                            tekst="Fødselsnummer"
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.OPPFOLGINGSTARTET}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.OPPFOLGINGSTARTET}
                            tekst="Oppfølging startet"
                            className="sortering-header__dato col col-xs-2"
                            skalVises={skalViseOppfolgingStartet && valgteKolonner.includes(Kolonne.OPPFOLGINGSTARTET)} //fiks etter featuretoggle
                            title='Startdato for pågående oppfølgingsperiode'
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
                        />
                        <Header
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(MOTER_IDAG) && valgteKolonner.includes(Kolonne.MOTER_VARIGHET)}
                            className="sortering-header__dato col col-xs-2"
                            title='Varighet på møtet'
                        >
                            Varighet møte
                        </Header>
                        <SorteringHeader
                            sortering={Sorteringsfelt.VALGTE_AKTIVITETER}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.VALGTE_AKTIVITETER}
                            tekst="Neste utløpsdato aktivitet"
                            skalVises={avtaltAktivitetOgTiltak}
                            className="sortering-header__dato col col-xs-2"
                            title='Neste utløpsdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
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
                        />
                    </div>
                    <div className="brukerliste__gutter-right"/>
                </div>
            </div>
        </div>
    );
}

//fjern etter featuretoggle
const mapStateToProps = (state) => ({
    harFeature: (feature: string) => sjekkFeature(state, feature)
});

export default connect(mapStateToProps)(MinOversiktListeHode);

// export default MinOversiktListeHode;
