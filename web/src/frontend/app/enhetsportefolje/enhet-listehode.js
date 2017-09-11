import React, { PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import SorteringHeader from '../components/tabell/sortering-header';
import { lagAktiviteterSorteringsfelt, utledValgtAktivitetstype, ytelseFilterErAktiv } from '../utils/utils';
import Listeoverskrift from '../utils/listeoverskrift';
import { filtervalgShape } from './../proptype-shapes';
import {
    ytelsevalg,
    VENTER_PA_SVAR_FRA_NAV,
    VENTER_PA_SVAR_FRA_BRUKER,
    UTLOPTE_AKTIVITETER,
    I_AVTALT_AKTIVITET } from '../filtrering/filter-konstanter';

function Header({ id, className }) {
    return (
        <span className={className}>
            <FormattedMessage id={id} />
        </span>
    );
}

const ytelseUtlopsSortering = {
    [ytelsevalg.DAGPENGER]: 'dagputlopUke',
    [ytelsevalg.ORDINARE_DAGPENGER]: 'dagputlopUke',
    [ytelsevalg.DAGPENGER_MED_PERMITTERING]: 'permutlopUke',
    [ytelsevalg.AAP]: 'utlopsdato',
    [ytelsevalg.AAP_UNNTAK]: 'utlopsdato',
    [ytelsevalg.AAP_MAXTID]: 'aapmaxtidUke',
    [ytelsevalg.TILTAKSPENGER]: 'utlopsdato'
};

function EnhetListehode({ sorteringsrekkefolge, sorteringOnClick, filtervalg, sorteringsfelt }) {
    const ytelseUtlopsdatoNavn = ytelseUtlopsSortering[filtervalg.ytelse];
    const valgtAktivitetstype = utledValgtAktivitetstype(filtervalg.aktiviteter);
    const ytelseSorteringHeader = ytelseUtlopsdatoNavn === 'utlopsdato' ? 'ddmmyy' : 'uker';

    return (
        <div className="enhet-listehode">
            <div className="enhet-overskrifter">
                <Listeoverskrift
                    className="listeoverskrift__bruker listeoverskrift"
                    id="enhet.portefolje.tabell.bruker"
                />
                <Listeoverskrift
                    className="listeoverskrift__dato listeoverskrift"
                    skalVises={!!filtervalg && ytelseFilterErAktiv(filtervalg.ytelse)}
                    id={`portefolje.tabell.utlopsdato`}
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
                <Listeoverskrift
                    className="listeoverskrift__dato listeoverskrift"
                    skalVises={!!filtervalg && filtervalg.brukerstatus === I_AVTALT_AKTIVITET}
                    id={'portefolje.tabell.aktivitet.neste.utlop'}
                />
                <Listeoverskrift
                    className="listeoverskrift__dato listeoverskrift"
                    skalVises={!!filtervalg && !!valgtAktivitetstype && filtervalg.tiltakstyper.length === 0}
                    id={'portefolje.tabell.aktivitet.neste.utlop.aktivitetstype'}
                    values={{ aktivitetstype: valgtAktivitetstype ? valgtAktivitetstype.toLowerCase() : null }}
                />
                <Listeoverskrift
                    className="listeoverskrift__veileder listeoverskrift"
                    id="enhet.portefolje.tabell.veileder"
                />
            </div>
            <div className="enhet-sortering-header__wrapper">
                <SorteringHeader
                    sortering="etternavn"
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === 'etternavn'}
                    tekstId="portefolje.tabell.etternavn"
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
                    erValgt={ytelseUtlopsdatoNavn === sorteringsfelt}
                    tekstId={`portefolje.tabell.${ytelseSorteringHeader}`}
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
                <SorteringHeader
                    sortering={I_AVTALT_AKTIVITET}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === I_AVTALT_AKTIVITET}
                    tekstId="portefolje.tabell.ddmmyy"
                    skalVises={filtervalg.brukerstatus === I_AVTALT_AKTIVITET}
                    className={'sortering-header__dato'}
                />
                <SorteringHeader
                    sortering={lagAktiviteterSorteringsfelt(valgtAktivitetstype)}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={sorteringsfelt === lagAktiviteterSorteringsfelt(valgtAktivitetstype)}
                    tekstId="portefolje.tabell.ddmmyy"
                    skalVises={!!valgtAktivitetstype && filtervalg.tiltakstyper.length === 0}
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
