import React, { PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import SorteringHeader from '../components/tabell/sortering-header';
import { ytelseFilterErAktiv } from '../utils/utils';
import Listeoverskrift from '../utils/listeoverskrift';
import { filtervalgShape } from './../proptype-shapes';
import {
    ytelsevalg,
    VENTER_PA_SVAR_FRA_NAV,
    VENTER_PA_SVAR_FRA_BRUKER,
    UTLOPTE_AKTIVITETER } from '../filtrering/filter-konstanter';

function Header({ id, className }) {
    return (
        <span className={className}>
            <FormattedMessage id={id} />
        </span>
    );
}

function EnhetListehode({ sorteringsrekkefolge, sorteringOnClick, filtervalg, sorteringsfelt }) {
    const ytelseUtlopsdatoNavn = filtervalg.ytelse === ytelsevalg.AAP_MAXTID ? 'aapMaxtid' : 'utlopsdato';
    return (
        <div className="enhet-listehode">
            <div className="enhet-overskrifter">
                <Listeoverskrift className="listeoverskrift__bruker listeoverskrift">
                    <FormattedMessage id="enhet.portefolje.tabell.bruker" />
                </Listeoverskrift>
                <Listeoverskrift
                    className="listeoverskrift__dato listeoverskrift"
                    skalVises={!!filtervalg && ytelseFilterErAktiv(filtervalg.ytelse)}
                >
                    <FormattedMessage id={`portefolje.tabell.${ytelseUtlopsdatoNavn}`} />
                </Listeoverskrift>
                <Listeoverskrift
                    className="listeoverskrift__dato listeoverskrift"
                    skalVises={!!filtervalg && filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_NAV}

                >
                    <FormattedMessage id={'portefolje.tabell.svarfranav'} />
                </Listeoverskrift>
                <Listeoverskrift
                    className="listeoverskrift__dato listeoverskrift"
                    skalVises={!!filtervalg && filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_BRUKER}
                >
                    <FormattedMessage id={'portefolje.tabell.svarfrabruker'} />
                </Listeoverskrift>
                <Listeoverskrift
                    className="listeoverskrift__dato listeoverskrift"
                    skalVises={!!filtervalg && filtervalg.brukerstatus === UTLOPTE_AKTIVITETER}
                >
                    <FormattedMessage id={'portefolje.tabell.utlopaktivitet'} />
                </Listeoverskrift>

                <Listeoverskrift className="listeoverskrift__veileder listeoverskrift">
                    <FormattedMessage id="enhet.portefolje.tabell.veileder" />
                </Listeoverskrift>
            </div>
            <div className="enhet-sortering-header__wrapper">
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
                <Header
                    id="enhet.veiledere.tabell.navn"
                    className="header__veiledernavn"
                />
                <Header
                    id="enhet.veiledere.tabell.ident"
                    className="header__veilederident"
                />
            </div>
        </div>
    );
}

EnhetListehode.propTypes = {
    sorteringsrekkefolge: PT.string.isRequired,
    sorteringOnClick: PT.func.isRequired,
    filtervalg: filtervalgShape.isRequired,
    sorteringsfelt: PT.string.isRequired
};

Header.propTypes = {
    id: PT.string.isRequired,
    className: PT.string
};

export default EnhetListehode;
