import * as React from 'react';
import SorteringHeader from '../components/tabell/sortering-header';
import { ytelseFilterErAktiv } from '../utils/utils';
import Listeoverskrift from '../utils/listeoverskrift';
import { BrukerModell, FiltervalgModell, Sorteringsfelt, Sorteringsrekkefolge } from '../model-interfaces';
import { AktiviteterValg } from '../ducks/filtrering';
import {
    ytelseUtlopsSortering,
    VENTER_PA_SVAR_FRA_NAV,
    VENTER_PA_SVAR_FRA_BRUKER,
    UTLOPTE_AKTIVITETER,
    MIN_ARBEIDSLISTE,
    I_AVTALT_AKTIVITET,
    ytelseAapSortering, MOTER_IDAG
} from '../filtrering/filter-konstanter';
import { Kolonne } from '../ducks/ui/listevisning';
import Header from '../components/tabell/header';

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
}

function MinOversiktListeHode({ sorteringsrekkefolge, sorteringOnClick, filtervalg, sorteringsfelt, valgteKolonner }: MinOversiktListehodeProps) {
    const { ytelse } = filtervalg;
    const erAapYtelse = !!ytelse && Object.keys(ytelseAapSortering).includes(ytelse);
    const aapRettighetsperiode = !!ytelse  && erAapYtelse ? ytelseAapSortering[ytelse].rettighetsperiode : '';
    const ytelseUtlopsdatoNavn = erAapYtelse ? ytelseAapSortering[ytelse!].vedtaksperiode : ytelseUtlopsSortering[filtervalg.ytelse!];
    const harValgteAktivitetstyper = harValgteAktiviteter(filtervalg.aktiviteter);
    const ytelseSorteringHeader = (ytelseUtlopsdatoNavn === 'utlopsdato' || erAapYtelse) ? 'Vedtaksperiode' : 'Vedtaksperiode';
    const ferdigfilterListe = !!filtervalg ? filtervalg.ferdigfilterListe : '';

    return (
        <div className="brukerliste__header">
            <div className="brukerliste--borders">
                <div className="brukerliste__overskriftheader brukerliste--minoversikt-padding">
                    <div className="brukerliste__gutter-left brukerliste--min-width-minside" />
                    <div className="brukerliste__innhold">
                        <Listeoverskrift
                            className="listeoverskrift__bruker listeoverskrift col col-xs-4"
                            tekst="Bruker"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__arbeidsliste listeoverskrift col col-xs-4"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(MIN_ARBEIDSLISTE)}
                            tekst="Arbeidsliste"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__ytelse listeoverskrift col col-xs-2"
                            skalVises={!!filtervalg && ytelseFilterErAktiv(ytelse) && valgteKolonner.includes(Kolonne.UTLOP_YTELSE)}
                            tekst="Gjenstår"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__ytelse listeoverskrift col col-xs-2"
                            skalVises={!!filtervalg && ytelseFilterErAktiv(ytelse) && erAapYtelse}
                            tekst="Gjenstår"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskrift col col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV)}
                            tekst="Svar fra NAV"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_BRUKER)}
                            tekst="Svar fra bruker"
                        />
                        <Listeoverskrift
                            className="listeoverskrift col col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(MOTER_IDAG)}
                            tekst="Klokkeslett for møtet"
                        />
                        <Listeoverskrift
                            className="listeoverskrift col col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(MOTER_IDAG)}
                            tekst="Varighet"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(UTLOPTE_AKTIVITETER)}
                            tekst="Utløpt aktivitet"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                            valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
                            tekst="Neste utløpsdato aktivitet"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                            skalVises={!!filtervalg && harValgteAktivitetstyper && filtervalg.tiltakstyper.length === 0 &&
                            valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET)}
                            tekst="Første sluttdato av valgte aktiviteter"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                            valgteKolonner.includes(Kolonne.START_DATO_AKTIVITET)}
                            tekst="Startdato aktivitet"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                            valgteKolonner.includes(Kolonne.NESTE_START_DATO_AKTIVITET)}
                            tekst="Neste startdato aktivitet"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                            valgteKolonner.includes(Kolonne.FORRIGE_START_DATO_AKTIVITET)}
                            tekst="Startdato aktivitet passert"
                        />
                    </div>
                    <div className="brukerliste__gutter-right"/>
                </div>
            </div>
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
                            className="col col-xs-2"
                            sortering={Sorteringsfelt.REGDATO}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.REGDATO}
                            tekst="Reg. dato"
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.ARBEIDSLISTE_FRIST}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.ARBEIDSLISTE_FRIST}
                            tekst="Dato"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(MIN_ARBEIDSLISTE)}
                            className="sortering-header__dato col col-xs-2"
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.ARBEIDSLISTE_OVERSKRIFT}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.ARBEIDSLISTE_OVERSKRIFT}
                            tekst="Tittel"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(MIN_ARBEIDSLISTE)}
                            className="sortering-header__dato col col-xs-2"
                        />
                        <SorteringHeader
                            sortering={ytelseUtlopsdatoNavn}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === ytelseUtlopsdatoNavn}
                            tekst={ytelseSorteringHeader}
                            skalVises={ytelseFilterErAktiv(ytelse) && valgteKolonner.includes(Kolonne.UTLOP_YTELSE)}
                            className="sortering-header__dato col col-xs-2"
                        />
                        <SorteringHeader
                            sortering={aapRettighetsperiode}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === aapRettighetsperiode}
                            tekst="Rettighetsperiode"
                            skalVises={ytelseFilterErAktiv(ytelse) && erAapYtelse}
                            className="sortering-header__dato col col-xs-2"
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.VENTER_PA_SVAR_FRA_NAV}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.VENTER_PA_SVAR_FRA_NAV}
                            tekst="Dato"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV)}
                            className="sortering-header__dato col col-xs-2"
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.VENTER_PA_SVAR_FRA_BRUKER}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.VENTER_PA_SVAR_FRA_BRUKER}
                            tekst="Dato"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_BRUKER)}
                            className="sortering-header__dato col col-xs-2"
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.UTLOPTE_AKTIVITETER}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.UTLOPTE_AKTIVITETER}
                            tekst="Dato"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(UTLOPTE_AKTIVITETER)}
                            className="sortering-header__dato col col-xs-2"
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.I_AVTALT_AKTIVITET}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.I_AVTALT_AKTIVITET}
                            tekst="Dato"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                            valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
                            className="sortering-header__dato col col-xs-2"
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.MOTER_IDAG}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.MOTER_IDAG}
                            tekst="Klokkeslett"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(MOTER_IDAG)}
                            className="sortering-header__dato col col-xs-2"
                        />
                        <Header
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(MOTER_IDAG)}
                            className="sortering-header__dato col col-xs-2"
                        >
                            Varighet
                        </Header>
                        <SorteringHeader
                            sortering={Sorteringsfelt.VALGTE_AKTIVITETER}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.VALGTE_AKTIVITETER}
                            tekst="Dato"
                            skalVises={harValgteAktivitetstyper && filtervalg.tiltakstyper.length === 0 &&
                            valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET)}
                            className="sortering-header__dato col col-xs-2"
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.START_DATO_FOR_AVTALT_AKTIVITET}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.START_DATO_FOR_AVTALT_AKTIVITET}
                            tekst="Dato"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                            valgteKolonner.includes(Kolonne.START_DATO_AKTIVITET)}
                            className="sortering-header__dato col col-xs-2"
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.NESTE_START_DATO_FOR_AVTALT_AKTIVITET}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.NESTE_START_DATO_FOR_AVTALT_AKTIVITET}
                            tekst="Dato"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                            valgteKolonner.includes(Kolonne.NESTE_START_DATO_AKTIVITET)}
                            className="sortering-header__dato col col-xs-2"
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.FORRIGE_DATO_FOR_AVTALT_AKTIVITET}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.FORRIGE_DATO_FOR_AVTALT_AKTIVITET}
                            tekst="Dato"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                            valgteKolonner.includes(Kolonne.FORRIGE_START_DATO_AKTIVITET)}
                            className="sortering-header__dato col col-xs-2"
                        />
                    </div>
                    <div className="brukerliste__gutter-right"/>
                </div>
            </div>
        </div>
    );
}

export default MinOversiktListeHode;
