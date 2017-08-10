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
    MIN_ARBEIDSLISTE } from '../filtrering/filter-konstanter';


function MinOversiktListeHode({ sorteringsrekkefolge, sorteringOnClick, filtervalg, sorteringsfelt }) {
    const ytelseUtlopsdatoNavn = filtervalg.ytelse === ytelsevalg.AAP_MAXTID ? 'aapMaxtid' : 'utlopsdato';

    return (
        <div className="minoversikt-listehode">
            <div className="minoversikt-overskrifter">
                <Listeoverskrift
                    className="listeoverskrift__bruker listeoverskrift"
                    id="enhet.portefolje.tabell.bruker"
                />
                <Listeoverskrift
                    className="listeoverskrift__arbeidsliste listeoverskrift"
                    skalVises={!!filtervalg && filtervalg.brukerstatus === MIN_ARBEIDSLISTE}
                    id="portefolje.tabell.arbeidsliste"
                />
                <Listeoverskrift
                    className="listeoverskrift__ytelse listeoverskrift"
                    skalVises={!!filtervalg && ytelseFilterErAktiv(filtervalg.ytelse)}
                    id={`portefolje.tabell.${ytelseUtlopsdatoNavn}`}
                />
                <Listeoverskrift
                    className="listeoverskrift__dato listeoverskrift"
                    skalVises={!!filtervalg && filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_NAV}
                    id={'portefolje.tabell.svarfranav'}

                />
                <Listeoverskrift
                    className="listeoverskrift__dato listeoverskrift"
                    skalVises={!!filtervalg && filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_BRUKER}
                    id={'portefolje.tabell.svarfrabruker'}
                />
                <Listeoverskrift
                    className="listeoverskrift__dato listeoverskrift"
                    skalVises={!!filtervalg && filtervalg.brukerstatus === UTLOPTE_AKTIVITETER}
                    id={'portefolje.tabell.utlopaktivitet'}
                />
            </div>
            <div className="minoversikt-sortering-header__wrapper">
                <SorteringHeader
                    sortering="etternavn"
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === 'etternavn'}
                    tekstId="portefolje.tabell.navn"
                />
                <SorteringHeader
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
                    className={'sortering-header__dato'}
                />
                <SorteringHeader
                    sortering={ytelseUtlopsdatoNavn}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={['utlopsdato', 'aapmaxtid'].includes(sorteringsfelt)}
                    tekstId="portefolje.tabell.ddmmyy"
                    skalVises={ytelseFilterErAktiv(filtervalg.ytelse)}
                    className={'sortering-header__dato'}
                />
                <SorteringHeader
                    sortering={VENTER_PA_SVAR_FRA_NAV}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === VENTER_PA_SVAR_FRA_NAV}
                    tekstId="portefolje.tabell.ddmmyy"
                    skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_NAV}
                    className={'sortering-header__dato'}
                />
                <SorteringHeader
                    sortering={VENTER_PA_SVAR_FRA_BRUKER}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === VENTER_PA_SVAR_FRA_BRUKER}
                    tekstId="portefolje.tabell.ddmmyy"
                    skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_BRUKER}
                    className={'sortering-header__dato'}
                />
                <SorteringHeader
                    sortering={UTLOPTE_AKTIVITETER}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === UTLOPTE_AKTIVITETER}
                    tekstId="portefolje.tabell.ddmmyy"
                    skalVises={filtervalg.brukerstatus === UTLOPTE_AKTIVITETER}
                    className={'sortering-header__dato'}
                />
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
