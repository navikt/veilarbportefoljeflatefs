import React from 'react';
import SorteringHeader from '../components/tabell/sortering-header';
import { ytelseFilterErAktiv } from '../utils/utils';
import Listeoverskrift from '../utils/listeoverskrift';
import {
    ytelseUtlopsSortering,
    ytelseAapSortering,
    VENTER_PA_SVAR_FRA_NAV,
    VENTER_PA_SVAR_FRA_BRUKER,
    UTLOPTE_AKTIVITETER,
    I_AVTALT_AKTIVITET } from '../filtrering/filter-konstanter';
import { FiltervalgModell, Sorteringsfelt, Sorteringsrekkefolge } from '../model-interfaces';
import { Kolonne } from '../ducks/ui/listevisning';
import { AktiviteterValg } from '../ducks/filtrering';
import Header from '../components/tabell/header';

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
}

function EnhetListehode({ sorteringsrekkefolge, sorteringOnClick, filtervalg, sorteringsfelt, valgteKolonner }: EnhetListehodeProps) {
    const { ytelse } = filtervalg;
    const erAapYtelse = Object.keys(ytelseAapSortering).includes(ytelse);
    const aapRettighetsperiode = erAapYtelse ? ytelseAapSortering[ytelse].rettighetsperiode : '';
    const ytelseUtlopsdatoNavn = erAapYtelse ? ytelseAapSortering[ytelse].vedtaksperiode : ytelseUtlopsSortering[filtervalg.ytelse];
    const harValgteAktivitetstyper = harValgteAktiviteter(filtervalg.aktiviteter);
    const ytelseSorteringHeader = ytelseUtlopsdatoNavn === 'utlopsdato' || erAapYtelse ? 'Vedtaksperiode' : 'Rettighetsperiode';
    const ferdigfilterListe = !!filtervalg ? filtervalg.ferdigfilterListe : '';

    return (
        <div className="brukerliste__header">
            <div className="brukerliste--borders">
                <div className="brukerliste__overskriftheader">
                    <div className="brukerliste__gutter-left brukerliste--min-width-enhet"/>
                    <div className="brukerliste__innhold">
                        <Listeoverskrift
                            className="listeoverskrift__bruker listeoverskriftcol col col-xs-4"
                            tekst="Bruker"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col col-xs-2"
                            skalVises={!!filtervalg && ytelseFilterErAktiv(filtervalg.ytelse) && valgteKolonner.includes(Kolonne.UTLOP_YTELSE)}
                            tekst="Gjenstår"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col col-xs-2"
                            skalVises={!!filtervalg && ytelseFilterErAktiv(filtervalg.ytelse) && erAapYtelse}
                            tekst="Gjenstår"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV) && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
                            tekst="Svar fra NAV"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskrift col col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_BRUKER) && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
                            tekst="Svar fra bruker"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskrift col col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(UTLOPTE_AKTIVITETER) && valgteKolonner.includes(Kolonne.UTLOPTE_AKTIVITETER)}
                            tekst="Utløpt aktivitet"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskrift col col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) && valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
                            tekst="Neste utløpsdato aktivitet"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskrift col col-xs-2"
                            skalVises={!!filtervalg && harValgteAktivitetstyper && filtervalg.tiltakstyper.length === 0 && valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET)}
                            tekst="Første sluttdato av valgte aktiviteter"

                        />
                        <Listeoverskrift
                            className="listeoverskrift__veileder listeoverskrift col col-xs-2"
                            skalVises={valgteKolonner.includes(Kolonne.VEILEDER)|| valgteKolonner.includes(Kolonne.NAVIDENT)}
                            tekst="Veileder"
                        />
                    </div>
                    <div className="brukerliste__gutter-right"/>
                </div>
            </div>
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
                            sortering={ytelseUtlopsdatoNavn}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={ytelseUtlopsdatoNavn === sorteringsfelt}
                            tekst={ytelseSorteringHeader}
                            skalVises={ytelseFilterErAktiv(filtervalg.ytelse) && valgteKolonner.includes(Kolonne.UTLOP_YTELSE)}
                            className="sortering-header__dato col col-xs-2"
                        />
                        <SorteringHeader
                            sortering={aapRettighetsperiode}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === aapRettighetsperiode}
                            tekst="Rettighetsperiode"
                            skalVises={ytelseFilterErAktiv(filtervalg.ytelse) && erAapYtelse}
                            className="sortering-header__dato col col-xs-2"
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.VENTER_PA_SVAR_FRA_NAV}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.VENTER_PA_SVAR_FRA_NAV}
                            tekst="Dato"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV) && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
                            className="sortering-header__dato col col-xs-2"
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.VENTER_PA_SVAR_FRA_BRUKER}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.VENTER_PA_SVAR_FRA_BRUKER}
                            tekst="Dato"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_BRUKER) && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
                            className="sortering-header__dato col col-xs-2"
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.UTLOPTE_AKTIVITETER}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.UTLOPTE_AKTIVITETER}
                            tekst="Dato"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(UTLOPTE_AKTIVITETER) && valgteKolonner.includes(Kolonne.UTLOPTE_AKTIVITETER)}
                            className="sortering-header__dato col col-xs-2"
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.I_AVTALT_AKTIVITET}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.I_AVTALT_AKTIVITET}
                            tekst="Dato"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) && valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
                            className="sortering-header__dato col col-xs-2"
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.VALGTE_AKTIVITETER}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.VALGTE_AKTIVITETER}
                            tekst="Dato"
                            skalVises={harValgteAktivitetstyper && filtervalg.tiltakstyper.length === 0 && valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET)}
                            className="sortering-header__dato col col-xs-2"
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.NAVIDENT}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.NAVIDENT}
                            tekst="NAV-ident"
                            skalVises={valgteKolonner.includes(Kolonne.NAVIDENT)}
                            className="header__veilederident col col-xs-2"
                        />
                        <Header
                            className="col col-xs-2"
                            skalVises={valgteKolonner.includes(Kolonne.VEILEDER)}
                        >
                            Veileder
                        </Header>
                    </div>
                    <div className="brukerliste__gutter-right"/>
                </div>
            </div>
        </div>
    );
}

export default EnhetListehode;
