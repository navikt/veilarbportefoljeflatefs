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
} from '../filtrering/filter-konstanter';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Kolonne } from '../ducks/ui/listevisning';

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

type Props = MinOversiktListehodeProps & InjectedIntlProps;

function MinOversiktListeHode({ sorteringsrekkefolge, sorteringOnClick, filtervalg, sorteringsfelt, valgteKolonner, intl }: Props) {
    const ytelseUtlopsdatoNavn = ytelseUtlopsSortering(intl)[filtervalg.ytelse];
    const harValgteAktivitetstyper = harValgteAktiviteter(filtervalg.aktiviteter);
    const ytelseSorteringHeader = ytelseUtlopsdatoNavn === 'utlopsdato' ? 'periode' : 'uker';
    const ferdigfilterListe = !!filtervalg ? filtervalg.ferdigfilterListe : '';

    return (
        <div className="brukerliste__header">
            <div className="brukerliste--borders">
                <div className="brukerliste__overskriftheader brukerliste--minoversikt-padding">
                    <div className="brukerliste__gutter-left brukerliste--min-width-minside" />
                    <div className="brukerliste__innhold">
                        <Listeoverskrift
                            className="listeoverskrift__bruker listeoverskrift col col-xs-5"
                            id="enhet.portefolje.tabell.bruker"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__arbeidsliste listeoverskrift col col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(MIN_ARBEIDSLISTE)}
                            id="portefolje.tabell.arbeidsliste"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__ytelse listeoverskrift col col-xs-2"
                            skalVises={!!filtervalg && ytelseFilterErAktiv(filtervalg.ytelse) && valgteKolonner.includes(Kolonne.UTLOP_YTELSE)}
                            id="portefolje.tabell.utlopsdato"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskrift col col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV)}
                            id={'portefolje.tabell.svarfranav'}
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_BRUKER)}
                            id={'portefolje.tabell.svarfrabruker'}
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(UTLOPTE_AKTIVITETER)}
                            id={'portefolje.tabell.utlopaktivitet'}
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                            valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
                            id={'portefolje.tabell.aktivitet.neste.utlop'}
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                            skalVises={!!filtervalg && harValgteAktivitetstyper && filtervalg.tiltakstyper.length === 0 &&
                            valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET)}
                            id={'portefolje.tabell.aktivitet.neste.utlop.aktivitetstype'}
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                            valgteKolonner.includes(Kolonne.START_DATO_AKTIVITET)}
                            id={'portefolje.tabell.aktivitet.start'}
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                            valgteKolonner.includes(Kolonne.NESTE_START_DATO_AKTIVITET)}
                            id={'portefolje.tabell.aktivitet.neste.start'}
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                            valgteKolonner.includes(Kolonne.FORRIGE_START_DATO_AKTIVITET)}
                            id={'portefolje.tabell.aktivitet.forrige.start'}
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
                            className="col col-xs-3"
                            sortering={Sorteringsfelt.ETTERNAVN}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.ETTERNAVN}
                            tekstId="portefolje.tabell.etternavn"
                        />
                        <SorteringHeader
                            className="col col-xs-2"
                            sortering={Sorteringsfelt.FODSELSNUMMER}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.FODSELSNUMMER}
                            tekstId="portefolje.tabell.fodselsnummer"
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.ARBEIDSLISTE_FRIST}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.ARBEIDSLISTE_FRIST}
                            tekstId="portefolje.tabell.ddmmyy"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(MIN_ARBEIDSLISTE)}
                            className={'sortering-header__dato col col-xs-2'}
                        />
                        <SorteringHeader
                            sortering={ytelseUtlopsdatoNavn}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === ytelseUtlopsdatoNavn}
                            tekstId={`portefolje.tabell.${ytelseSorteringHeader}`}
                            skalVises={ytelseFilterErAktiv(filtervalg.ytelse) && valgteKolonner.includes(Kolonne.UTLOP_YTELSE)}
                            className={'sortering-header__dato col col-xs-2'}
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.VENTER_PA_SVAR_FRA_NAV}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.VENTER_PA_SVAR_FRA_NAV}
                            tekstId="portefolje.tabell.ddmmyy"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV)}
                            className={'sortering-header__dato col col-xs-2'}
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.VENTER_PA_SVAR_FRA_BRUKER}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.VENTER_PA_SVAR_FRA_BRUKER}
                            tekstId="portefolje.tabell.ddmmyy"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_BRUKER)}
                            className={'sortering-header__dato col col-xs-2'}
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.UTLOPTE_AKTIVITETER}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.UTLOPTE_AKTIVITETER}
                            tekstId="portefolje.tabell.ddmmyy"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(UTLOPTE_AKTIVITETER)}
                            className={'sortering-header__dato col col-xs-2'}
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.I_AVTALT_AKTIVITET}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.I_AVTALT_AKTIVITET}
                            tekstId="portefolje.tabell.ddmmyy"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                            valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
                            className={'sortering-header__dato col col-xs-2'}
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.VALGTE_AKTIVITETER}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.VALGTE_AKTIVITETER}
                            tekstId="portefolje.tabell.ddmmyy"
                            skalVises={harValgteAktivitetstyper && filtervalg.tiltakstyper.length === 0 &&
                            valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET)}
                            className={'sortering-header__dato col col-xs-2'}
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.START_DATO_FOR_AVTALT_AKTIVITET}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.START_DATO_FOR_AVTALT_AKTIVITET}
                            tekstId="portefolje.tabell.ddmmyy"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                            valgteKolonner.includes(Kolonne.START_DATO_AKTIVITET)}
                            className={'sortering-header__dato col col-xs-2'}
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.NESTE_START_DATO_FOR_AVTALT_AKTIVITET}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.NESTE_START_DATO_FOR_AVTALT_AKTIVITET}
                            tekstId="portefolje.tabell.ddmmyy"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                            valgteKolonner.includes(Kolonne.NESTE_START_DATO_AKTIVITET)}
                            className={'sortering-header__dato col col-xs-2'}
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.FORRIGE_DATO_FOR_AVTALT_AKTIVITET}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.FORRIGE_DATO_FOR_AVTALT_AKTIVITET}
                            tekstId="portefolje.tabell.ddmmyy"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) &&
                            valgteKolonner.includes(Kolonne.FORRIGE_START_DATO_AKTIVITET)}
                            className={'sortering-header__dato col col-xs-2'}
                        />
                    </div>
                    <div className="brukerliste__gutter-right"/>
                </div>
            </div>
        </div>
    );
}

export default injectIntl(MinOversiktListeHode);
