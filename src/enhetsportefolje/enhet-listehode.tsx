import React from 'react';
import SorteringHeader from '../components/tabell/sortering-header';
import TittelValg, { ytelseFilterErAktiv } from '../utils/utils';
import {
    I_AVTALT_AKTIVITET,
    MOTER_IDAG,
    UTLOPTE_AKTIVITETER,
    VENTER_PA_SVAR_FRA_BRUKER,
    VENTER_PA_SVAR_FRA_NAV,
    ytelseAapSortering,
    ytelseUtlopsSortering
} from '../filtrering/filter-konstanter';
import { FiltervalgModell, Sorteringsfelt, Sorteringsrekkefolge } from '../model-interfaces';
import { Kolonne } from '../ducks/ui/listevisning';
import { AktiviteterValg } from '../ducks/filtrering';
import Header from '../components/tabell/header';
import { OPPFOLGING_STARTET } from '../konstanter';
import { sjekkFeature } from '../ducks/features';
import { connect } from 'react-redux';

function harValgteAktiviteter(aktiviteter) {
    if (aktiviteter && Object.keys(aktiviteter).length > 0) {
        const valgteAktiviteter = Object.values(aktiviteter).filter((aktivitetvalg) => aktivitetvalg !== AktiviteterValg.NA);
        return valgteAktiviteter && valgteAktiviteter.length > 0;
    }
    return false;
}

interface EnhetListehodeProps {
    sorteringsrekkefolge: Sorteringsrekkefolge;
    sorteringOnClick: (sortering: string) => void;
    valgteKolonner: Kolonne[];
    filtervalg: FiltervalgModell;
    sorteringsfelt: string;
    harFeature: Function; //fjern etter featuretoggle
}

function EnhetListehode({sorteringsrekkefolge, sorteringOnClick, filtervalg, sorteringsfelt, valgteKolonner, harFeature}: EnhetListehodeProps) {
    const {ytelse} = filtervalg;
    const erAapYtelse = Object.keys(ytelseAapSortering).includes(ytelse!);
    const aapRettighetsperiode = erAapYtelse ? ytelseAapSortering[ytelse!].rettighetsperiode : '';
    const ytelseUtlopsdatoNavn = erAapYtelse ? ytelseAapSortering[ytelse!].vedtaksperiode : ytelseUtlopsSortering[ytelse!];
    const harValgteAktivitetstyper = harValgteAktiviteter(filtervalg.aktiviteter);
    const ytelseSorteringHeader = ytelseUtlopsdatoNavn === 'utlopsdato' || erAapYtelse ? 'Gjenstående uker vedtak' : 'Gjenstående uker rettighet';
    const ferdigfilterListe = !!filtervalg ? filtervalg.ferdigfilterListe : '';
    const skalViseOppfolgingStartet = harFeature(OPPFOLGING_STARTET); //fjern etter featuretoggle


    return (
        <div className="brukerliste__header">
            <div className="brukerliste--border-bottom">
                <div className="brukerliste__sorteringheader typo-undertekst">
                    <div className="brukerliste__gutter-left brukerliste--min-width-enhet"/>
                    <div className="brukerliste__innhold">
                        <SorteringHeader
                            sortering={Sorteringsfelt.ETTERNAVN}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.ETTERNAVN}
                            tekst="Etternavn"
                            className="col col-xs-2"
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.FODSELSNUMMER}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.FODSELSNUMMER}
                            tekst="Fødselsnummer"
                            className="col col-xs-2"
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
                        <Header
                            className="col col-xs-2"
                            skalVises={valgteKolonner.includes(Kolonne.VEILEDER)}
                            title='Navn på tildelt veileder'
                        >
                            Veileder
                        </Header>
                        <SorteringHeader
                            sortering={Sorteringsfelt.NAVIDENT}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.NAVIDENT}
                            tekst="NAV-ident"
                            skalVises={valgteKolonner.includes(Kolonne.NAVIDENT)}
                            className="header__veilederident col col-xs-2"
                            title='NAV-ident på tildelt veileder'
                        />

                        <SorteringHeader
                            sortering={ytelseUtlopsdatoNavn}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={ytelseUtlopsdatoNavn === sorteringsfelt}
                            tekst={ytelseSorteringHeader}
                            skalVises={ytelseFilterErAktiv(filtervalg.ytelse) && valgteKolonner.includes(Kolonne.UTLOP_YTELSE)}
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
                            skalVises={ytelseFilterErAktiv(filtervalg.ytelse) && erAapYtelse && valgteKolonner.includes(Kolonne.RETTIGHETSPERIODE)}
                            className="sortering-header__dato col col-xs-2"
                            title='Gjenstående uker av rettighetsperioden for ytelsen'
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.VENTER_PA_SVAR_FRA_NAV}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.VENTER_PA_SVAR_FRA_NAV}
                            tekst="Dato på melding"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV) && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
                            className="sortering-header__dato col col-xs-2"
                            title='Dato på meldingen som er merket "Venter på svar fra NAV"'
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.VENTER_PA_SVAR_FRA_BRUKER}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.VENTER_PA_SVAR_FRA_BRUKER}
                            tekst="Dato på melding"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_BRUKER) && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
                            className="sortering-header__dato col col-xs-2"
                            title='Dato på meldingen som er merket "Venter på svar fra bruker"'
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.UTLOPTE_AKTIVITETER}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.UTLOPTE_AKTIVITETER}
                            tekst="Utløpsdato aktivitet"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(UTLOPTE_AKTIVITETER) && valgteKolonner.includes(Kolonne.UTLOPTE_AKTIVITETER)}
                            className="sortering-header__dato col col-xs-2"
                            title='Utløpsdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.I_AVTALT_AKTIVITET}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.I_AVTALT_AKTIVITET}
                            tekst="Neste utløpsdato aktivitet"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) && valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
                            className="sortering-header__dato col col-xs-2"
                            title='Neste utløpsdato på avtalt aktivitet under "Planlegger" eller "Gjennomfører"'
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.VALGTE_AKTIVITETER}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.VALGTE_AKTIVITETER}
                            tekst="Neste utløpsdato aktivitet" //Første utløpsdato aktivitet - ny
                            skalVises={harValgteAktivitetstyper && filtervalg.tiltakstyper.length === 0 && valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET)}
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
                            title="Varighet på møtet"
                        >
                            Varighet møte
                        </Header>

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

export default connect(mapStateToProps)(EnhetListehode);

// export default EnhetListehode;
