import React, { PropTypes as PT } from 'react';
import SorteringHeader from '../components/tabell/sortering-header';
import { ytelseFilterErAktiv } from '../utils/utils';
import Listeoverskrift from '../utils/listeoverskrift';
import { filtervalgShape } from './../proptype-shapes';
import {
    ytelsevalg,
    VENTER_PA_SVAR_FRA_NAV,
    VENTER_PA_SVAR_FRA_BRUKER,
    UTLOPTE_AKTIVITETER,
    MIN_ARBEIDSLISTE,
    I_AVTALT_AKTIVITET
} from '../filtrering/filter-konstanter';


function MinOversiktListeHode({ sorteringsrekkefolge, sorteringOnClick, filtervalg, sorteringsfelt }) {
    const ytelseUtlopsdatoNavn = filtervalg.ytelse === ytelsevalg.AAP_MAXTID ? 'aapMaxtid' : 'utlopsdato';
    const harValgteAktivitetstyper = filtervalg.aktiviteter ? Object.keys(filtervalg.aktiviteter).length > 0 : false;

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
                        id={`portefolje.tabell.${ytelseUtlopsdatoNavn}`}
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
                        sortering="etternavn"
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === 'etternavn'}
                        tekstId="portefolje.tabell.etternavn"
                    />
                    <SorteringHeader
                        className="col col-xs-2"
                        sortering="fodselsnummer"
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === 'fodselsnummer'}
                        tekstId="portefolje.tabell.fodselsnummer"
                    />
                    <SorteringHeader
                        sortering={'arbeidsliste_frist'}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === 'arbeidsliste_frist'}
                        tekstId="portefolje.tabell.ddmmyy"
                        skalVises={!!filtervalg && filtervalg.brukerstatus === MIN_ARBEIDSLISTE}
                        className={'sortering-header__dato col col-xs-1'}
                    />
                    <SorteringHeader
                        sortering={ytelseUtlopsdatoNavn}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={['utlopsdato', 'aapmaxtid'].includes(sorteringsfelt)}
                        tekstId="portefolje.tabell.ddmmyy"
                        skalVises={ytelseFilterErAktiv(filtervalg.ytelse)}
                        className={'sortering-header__dato col col-xs-1'}
                    />
                    <SorteringHeader
                        sortering={VENTER_PA_SVAR_FRA_NAV}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === VENTER_PA_SVAR_FRA_NAV}
                        tekstId="portefolje.tabell.ddmmyy"
                        skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_NAV}
                        className={'sortering-header__dato col col-xs-1'}
                    />
                    <SorteringHeader
                        sortering={VENTER_PA_SVAR_FRA_BRUKER}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === VENTER_PA_SVAR_FRA_BRUKER}
                        tekstId="portefolje.tabell.ddmmyy"
                        skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_BRUKER}
                        className={'sortering-header__dato col col-xs-1'}
                    />
                    <SorteringHeader
                        sortering={UTLOPTE_AKTIVITETER}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === UTLOPTE_AKTIVITETER}
                        tekstId="portefolje.tabell.ddmmyy"
                        skalVises={filtervalg.brukerstatus === UTLOPTE_AKTIVITETER}
                        className={'sortering-header__dato col col-xs-1'}
                    />
                    <SorteringHeader
                        sortering={I_AVTALT_AKTIVITET}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === I_AVTALT_AKTIVITET}
                        tekstId="portefolje.tabell.ddmmyy"
                        skalVises={filtervalg.brukerstatus === I_AVTALT_AKTIVITET}
                        className={'sortering-header__dato col col-xs-1'}
                    />
                    <SorteringHeader
                        sortering="valgte_aktiviteter"
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === 'valgte_aktiviteter'}
                        tekstId="portefolje.tabell.ddmmyy"
                        skalVises={harValgteAktivitetstyper && filtervalg.tiltakstyper.length === 0}
                        className={'sortering-header__dato col col-xs-1'}
                    />
                </div>
            </div>
        </div>
    );
}

MinOversiktListeHode.propTypes = {
    sorteringsrekkefolge: PT.string.isRequired,
    sorteringOnClick: PT.func.isRequired,
    filtervalg: filtervalgShape.isRequired,
    sorteringsfelt: PT.string.isRequired
};

export default MinOversiktListeHode;
