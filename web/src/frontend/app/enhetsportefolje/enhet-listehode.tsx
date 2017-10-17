import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import SorteringHeader from '../components/tabell/sortering-header';
import { ytelseFilterErAktiv } from '../utils/utils';
import Listeoverskrift from '../utils/listeoverskrift';
import { filtervalgShape } from './../proptype-shapes';
import {
    ytelseUtlopsSortering,
    ytelsevalg,
    VENTER_PA_SVAR_FRA_NAV,
    VENTER_PA_SVAR_FRA_BRUKER,
    UTLOPTE_AKTIVITETER,
    I_AVTALT_AKTIVITET } from '../filtrering/filter-konstanter';
import { FiltervalgModell, Sorteringsfelt, Sorteringsrekkefolge } from '../model-interfaces';
import { Kolonne } from '../ducks/ui/listevisning';
import { AktiviteterValg } from '../ducks/filtrering';

interface HeaderProps {
    id: string;
    className?: string;
    skalVises: boolean;
}

function Header({ id, className, skalVises }: HeaderProps) {
    if (!skalVises) {
        return null;
    }
    return (
        <span className={className}>
            <FormattedMessage id={id} />
        </span>
    );
}

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
    const ytelseUtlopsdatoNavn = ytelseUtlopsSortering[filtervalg.ytelse];
    const harValgteAktivitetstyper = harValgteAktiviteter(filtervalg.aktiviteter);
    const ytelseSorteringHeader = ytelseUtlopsdatoNavn === 'utlopsdato' ? 'ddmmyy' : 'uker';
    return (
        <div className="brukerliste__header">
            <div className="brukerliste--borders">
                <div className="brukerliste__overskriftheader">
                <Listeoverskrift
                    className="listeoverskrift__bruker listeoverskriftcol col-xs-5"
                    id="enhet.portefolje.tabell.bruker"
                />
                <Listeoverskrift
                    className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                    skalVises={!!filtervalg && ytelseFilterErAktiv(filtervalg.ytelse) && valgteKolonner.includes(Kolonne.UTLOP_YTELSE)}
                    id={`portefolje.tabell.utlopsdato`}
                />
                <Listeoverskrift
                    className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                    skalVises={!!filtervalg && filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_NAV && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
                    id={'portefolje.tabell.svarfranav'}
                />
                <Listeoverskrift
                    className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                    skalVises={!!filtervalg && filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_BRUKER && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
                    id={'portefolje.tabell.svarfrabruker'}
                />
                <Listeoverskrift
                    className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                    skalVises={!!filtervalg && filtervalg.brukerstatus === UTLOPTE_AKTIVITETER && valgteKolonner.includes(Kolonne.UTLOPTE_AKTIVITETER)}
                    id={'portefolje.tabell.utlopaktivitet'}
                />
                <Listeoverskrift
                    className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                    skalVises={!!filtervalg && filtervalg.brukerstatus === I_AVTALT_AKTIVITET && valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
                    id={'portefolje.tabell.aktivitet.neste.utlop'}
                />
                <Listeoverskrift
                    className="listeoverskrift__dato listeoverskriftcol col-xs-2"
                    skalVises={!!filtervalg && harValgteAktivitetstyper && filtervalg.tiltakstyper.length === 0 && valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET)}
                    id={'portefolje.tabell.aktivitet.neste.utlop.aktivitetstype'}

                />
                <Listeoverskrift
                    className="listeoverskrift__veileder listeoverskriftcol col-xs-1"
                    skalVises={valgteKolonner.includes(Kolonne.VEILEDER)|| valgteKolonner.includes(Kolonne.NAVIDENT)}
                    id="enhet.portefolje.tabell.veileder"
                /></div>
            </div>
            <div className="brukerliste--border-bottom">
                <div className="brukerliste__sorteringheader typo-undertekst">
                    <SorteringHeader
                        sortering={Sorteringsfelt.ETTERNAVN}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === Sorteringsfelt.ETTERNAVN}
                        tekstId="portefolje.tabell.etternavn"
                        className={'col col-xs-3'}
                    />
                    <SorteringHeader
                        sortering={Sorteringsfelt.FODSELSNUMMER}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === Sorteringsfelt.FODSELSNUMMER}
                        tekstId="portefolje.tabell.fodselsnummer"
                        className={'col col-xs-2'}
                    />
                    <SorteringHeader
                        sortering={ytelseUtlopsdatoNavn}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={ytelseUtlopsdatoNavn === sorteringsfelt}
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
                        skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_NAV && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
                        className={'sortering-header__dato col col-xs-2'}
                    />
                    <SorteringHeader
                        sortering={Sorteringsfelt.VENTER_PA_SVAR_FRA_BRUKER}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === Sorteringsfelt.VENTER_PA_SVAR_FRA_BRUKER}
                        tekstId="portefolje.tabell.ddmmyy"
                        skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_BRUKER && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
                        className={'sortering-header__dato col col-xs-2'}
                    />
                    <SorteringHeader
                        sortering={Sorteringsfelt.UTLOPTE_AKTIVITETER}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === Sorteringsfelt.UTLOPTE_AKTIVITETER}
                        tekstId="portefolje.tabell.ddmmyy"
                        skalVises={filtervalg.brukerstatus === UTLOPTE_AKTIVITETER && valgteKolonner.includes(Kolonne.UTLOPTE_AKTIVITETER)}
                        className={'sortering-header__dato col col-xs-2'}
                    />
                    <SorteringHeader
                        sortering={Sorteringsfelt.I_AVTALT_AKTIVITET}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === Sorteringsfelt.I_AVTALT_AKTIVITET}
                        tekstId="portefolje.tabell.ddmmyy"
                        skalVises={filtervalg.brukerstatus === I_AVTALT_AKTIVITET && valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
                        className={'sortering-header__dato col col-xs-2'}
                    />
                    <SorteringHeader
                        sortering={Sorteringsfelt.VALGTE_AKTIVITETER}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === Sorteringsfelt.VALGTE_AKTIVITETER}
                        tekstId="portefolje.tabell.ddmmyy"
                        skalVises={harValgteAktivitetstyper && filtervalg.tiltakstyper.length === 0 && valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET)}
                        className={'sortering-header__dato col col-xs-2'}
                    />
                    <Header
                        id="enhet.veiledere.tabell.navn"
                        className="header__veiledernavn col col-xs-2"
                        skalVises={valgteKolonner.includes(Kolonne.VEILEDER)}
                    />
                    <Header
                        id="enhet.veiledere.tabell.ident"
                        className="header__veilederident col col-xs-1"
                        skalVises={valgteKolonner.includes(Kolonne.NAVIDENT)}
                    />
                </div>
            </div>
        </div>
    );
}

export default EnhetListehode;
