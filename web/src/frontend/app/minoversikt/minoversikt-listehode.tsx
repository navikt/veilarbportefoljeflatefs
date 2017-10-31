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
    I_AVTALT_AKTIVITET
} from '../filtrering/filter-konstanter';

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
}

function MinOversiktListeHode({ sorteringsrekkefolge, sorteringOnClick, filtervalg, sorteringsfelt }: MinOversiktListehodeProps) {
    const ytelseUtlopsdatoNavn = ytelseUtlopsSortering[filtervalg.ytelse];
    const harValgteAktivitetstyper = harValgteAktiviteter(filtervalg.aktiviteter);
    const ytelseSorteringHeader = ytelseUtlopsdatoNavn === 'utlopsdato' ? 'ddmmyy' : 'uker';
    return (
        <div className="brukerliste__header">
            <div className="brukerliste--borders">
                <div className="brukerliste__overskriftheader brukerliste--minoversikt-padding">
                    <div className="brukerliste__gutter-left brukerliste--min-width-3" />
                    <div className="brukerliste__innhold">
                        <Listeoverskrift
                            className="listeoverskrift__bruker listeoverskrift col col-xs-5"
                            id="enhet.portefolje.tabell.bruker"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__arbeidsliste listeoverskrift col col-xs-2"
                            skalVises={!!filtervalg && filtervalg.brukerstatus === MIN_ARBEIDSLISTE}
                            id="portefolje.tabell.arbeidsliste"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__ytelse listeoverskrift col col-xs-2"
                            skalVises={!!filtervalg && ytelseFilterErAktiv(filtervalg.ytelse)}
                            id="portefolje.tabell.utlopsdato"
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskrift col col-xs-2"
                            skalVises={!!filtervalg && filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_NAV}
                            id={'portefolje.tabell.svarfranav'}
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                            skalVises={!!filtervalg && filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_BRUKER}
                            id={'portefolje.tabell.svarfrabruker'}
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                            skalVises={!!filtervalg && filtervalg.brukerstatus === UTLOPTE_AKTIVITETER}
                            id={'portefolje.tabell.utlopaktivitet'}
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                            skalVises={!!filtervalg && filtervalg.brukerstatus === I_AVTALT_AKTIVITET}
                            id={'portefolje.tabell.aktivitet.neste.utlop'}
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                            skalVises={!!filtervalg && harValgteAktivitetstyper && filtervalg.tiltakstyper.length === 0}
                            id={'portefolje.tabell.aktivitet.neste.utlop.aktivitetstype'}
                        />
                    </div>
                    <div className="brukerliste__gutter-right"/>
                </div>
            </div>
            <div className="brukerliste--border-bottom">
                <div className="brukerliste__sorteringheader">
                    <div className="brukerliste__gutter-left brukerliste--min-width-3"/>
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
                            skalVises={!!filtervalg && filtervalg.brukerstatus === MIN_ARBEIDSLISTE}
                            className={'sortering-header__dato col col-xs-2'}
                        />
                        <SorteringHeader
                            sortering={ytelseUtlopsdatoNavn}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === ytelseUtlopsdatoNavn}
                            tekstId={`portefolje.tabell.${ytelseSorteringHeader}`}
                            skalVises={ytelseFilterErAktiv(filtervalg.ytelse)}
                            className={'sortering-header__dato col col-xs-2'}
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.VENTER_PA_SVAR_FRA_NAV}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.VENTER_PA_SVAR_FRA_NAV}
                            tekstId="portefolje.tabell.ddmmyy"
                            skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_NAV}
                            className={'sortering-header__dato col col-xs-2'}
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.VENTER_PA_SVAR_FRA_BRUKER}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.VENTER_PA_SVAR_FRA_BRUKER}
                            tekstId="portefolje.tabell.ddmmyy"
                            skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_BRUKER}
                            className={'sortering-header__dato col col-xs-2'}
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.UTLOPTE_AKTIVITETER}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.UTLOPTE_AKTIVITETER}
                            tekstId="portefolje.tabell.ddmmyy"
                            skalVises={filtervalg.brukerstatus === UTLOPTE_AKTIVITETER}
                            className={'sortering-header__dato col col-xs-2'}
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.I_AVTALT_AKTIVITET}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.I_AVTALT_AKTIVITET}
                            tekstId="portefolje.tabell.ddmmyy"
                            skalVises={filtervalg.brukerstatus === I_AVTALT_AKTIVITET}
                            className={'sortering-header__dato col col-xs-2'}
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.VALGTE_AKTIVITETER}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.VALGTE_AKTIVITETER}
                            tekstId="portefolje.tabell.ddmmyy"
                            skalVises={harValgteAktivitetstyper && filtervalg.tiltakstyper.length === 0}
                            className={'sortering-header__dato col col-xs-2'}
                        />
                    </div>
                    <div className="brukerliste__gutter-right"/>
                </div>
            </div>
        </div>
    );
}

export default MinOversiktListeHode;
