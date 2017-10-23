import * as React from 'react';
import SorteringHeader from '../components/tabell/sortering-header';
import { ytelseFilterErAktiv } from '../utils/utils';
import Listeoverskrift from '../utils/listeoverskrift';
import { BrukerModell, FiltervalgModell, SorteringsfeltEnhetPortefolje, Sorteringsrekkefolge } from '../model-interfaces';
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
    sorteringsfelt: SorteringsfeltEnhetPortefolje;
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
                        className="listeoverskrift__ytelse listeoverskrift col col-xs-1"
                        skalVises={!!filtervalg && ytelseFilterErAktiv(filtervalg.ytelse)}
                        id="portefolje.tabell.utlopsdato"
                    />
                    <Listeoverskrift
                        className="listeoverskrift__dato listeoverskrift col col-xs-1"
                        skalVises={!!filtervalg && filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_NAV}
                        id={'portefolje.tabell.svarfranav'}
                    />
                    <Listeoverskrift
                        className="listeoverskrift__dato listeoverskriftcol col-xs-1"
                        skalVises={!!filtervalg && filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_BRUKER}
                        id={'portefolje.tabell.svarfrabruker'}
                    />
                    <Listeoverskrift
                        className="listeoverskrift__dato listeoverskriftcol col-xs-1"
                        skalVises={!!filtervalg && filtervalg.brukerstatus === UTLOPTE_AKTIVITETER}
                        id={'portefolje.tabell.utlopaktivitet'}
                    />
                    <Listeoverskrift
                        className="listeoverskrift__dato listeoverskriftcol col-xs-1"
                        skalVises={!!filtervalg && filtervalg.brukerstatus === I_AVTALT_AKTIVITET}
                        id={'portefolje.tabell.aktivitet.neste.utlop'}
                    />
                    <Listeoverskrift
                        className="listeoverskrift__dato listeoverskriftcol col-xs-1"
                        skalVises={!!filtervalg && harValgteAktivitetstyper && filtervalg.tiltakstyper.length === 0}
                        id={'portefolje.tabell.aktivitet.neste.utlop.aktivitetstype'}
                    /></div>
            </div>
            <div className="brukerliste--border-bottom">
                <div className="brukerliste__sorteringheader brukerliste--minoversikt-padding">
                    <SorteringHeader
                        className="col col-xs-3"
                        sortering={SorteringsfeltEnhetPortefolje.ETTERNAVN}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === SorteringsfeltEnhetPortefolje.ETTERNAVN}
                        tekstId="portefolje.tabell.etternavn"
                    />
                    <SorteringHeader
                        className="col col-xs-2"
                        sortering={SorteringsfeltEnhetPortefolje.FODSELSNUMMER}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === SorteringsfeltEnhetPortefolje.FODSELSNUMMER}
                        tekstId="portefolje.tabell.fodselsnummer"
                    />
                    <SorteringHeader
                        sortering={SorteringsfeltEnhetPortefolje.ARBEIDSLISTE_FRIST}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === SorteringsfeltEnhetPortefolje.ARBEIDSLISTE_FRIST}
                        tekstId="portefolje.tabell.ddmmyy"
                        skalVises={!!filtervalg && filtervalg.brukerstatus === MIN_ARBEIDSLISTE}
                        className={'sortering-header__dato col col-xs-1'}
                    />
                    <SorteringHeader
                        sortering={ytelseUtlopsdatoNavn}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === ytelseUtlopsdatoNavn}
                        tekstId={`portefolje.tabell.${ytelseSorteringHeader}`}
                        skalVises={ytelseFilterErAktiv(filtervalg.ytelse)}
                        className={'sortering-header__dato col col-xs-1'}
                    />
                    <SorteringHeader
                        sortering={SorteringsfeltEnhetPortefolje.VENTER_PA_SVAR_FRA_NAV}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === SorteringsfeltEnhetPortefolje.VENTER_PA_SVAR_FRA_NAV}
                        tekstId="portefolje.tabell.ddmmyy"
                        skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_NAV}
                        className={'sortering-header__dato col col-xs-1'}
                    />
                    <SorteringHeader
                        sortering={SorteringsfeltEnhetPortefolje.VENTER_PA_SVAR_FRA_BRUKER}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === SorteringsfeltEnhetPortefolje.VENTER_PA_SVAR_FRA_BRUKER}
                        tekstId="portefolje.tabell.ddmmyy"
                        skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_BRUKER}
                        className={'sortering-header__dato col col-xs-1'}
                    />
                    <SorteringHeader
                        sortering={SorteringsfeltEnhetPortefolje.UTLOPTE_AKTIVITETER}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === SorteringsfeltEnhetPortefolje.UTLOPTE_AKTIVITETER}
                        tekstId="portefolje.tabell.ddmmyy"
                        skalVises={filtervalg.brukerstatus === UTLOPTE_AKTIVITETER}
                        className={'sortering-header__dato col col-xs-1'}
                    />
                    <SorteringHeader
                        sortering={SorteringsfeltEnhetPortefolje.I_AVTALT_AKTIVITET}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === SorteringsfeltEnhetPortefolje.I_AVTALT_AKTIVITET}
                        tekstId="portefolje.tabell.ddmmyy"
                        skalVises={filtervalg.brukerstatus === I_AVTALT_AKTIVITET}
                        className={'sortering-header__dato col col-xs-1'}
                    />
                    <SorteringHeader
                        sortering={SorteringsfeltEnhetPortefolje.VALGTE_AKTIVITETER}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === SorteringsfeltEnhetPortefolje.VALGTE_AKTIVITETER}
                        tekstId="portefolje.tabell.ddmmyy"
                        skalVises={harValgteAktivitetstyper && filtervalg.tiltakstyper.length === 0}
                        className={'sortering-header__dato col col-xs-1'}
                    />
                </div>
            </div>
        </div>
    );
}

export default MinOversiktListeHode;
