import * as React from 'react';
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
import {FiltervalgModell} from '../model-interfaces';
import {Kolonne} from '../ducks/ui/listevisning';

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

const ytelseUtlopsSortering = {
    [ytelsevalg.DAGPENGER]: 'dagputlopUke',
    [ytelsevalg.ORDINARE_DAGPENGER]: 'dagputlopUke',
    [ytelsevalg.DAGPENGER_MED_PERMITTERING]: 'permutlopUke',
    [ytelsevalg.AAP]: 'utlopsdato',
    [ytelsevalg.AAP_UNNTAK]: 'utlopsdato',
    [ytelsevalg.AAP_MAXTID]: 'aapmaxtidUke',
    [ytelsevalg.TILTAKSPENGER]: 'utlopsdato'
};

interface EnhetListehodeProps {
    sorteringsrekkefolge: string;
    sorteringOnClick: (sortering: string) => void;
    valgteKolonner: Kolonne[];
    filtervalg: FiltervalgModell;
    sorteringsfelt: string;
}

function EnhetListehode({ sorteringsrekkefolge, sorteringOnClick, filtervalg, sorteringsfelt, valgteKolonner }: EnhetListehodeProps) {
    const ytelseUtlopsdatoNavn = ytelseUtlopsSortering[filtervalg.ytelse];
    const valgtAktivitetstype = utledValgtAktivitetstype(filtervalg.aktiviteter);
    const ytelseSorteringHeader = ytelseUtlopsdatoNavn === 'utlopsdato' ? 'ddmmyy' : 'uker';

    return (
        <div className="brukerliste__header">
            <div className="brukerliste--borders">
                <div className="brukerliste__overskriftheader">
                    <Listeoverskrift
                        className="listeoverskrift__bruker listeoverskrift col col-xs-5"
                        id="enhet.portefolje.tabell.bruker"
                    />
                    <Listeoverskrift
                        className="listeoverskrift__dato listeoverskrift col col-xs-2"
                        skalVises={!!filtervalg && ytelseFilterErAktiv(filtervalg.ytelse) && valgteKolonner.includes(Kolonne.UTLOP_YTELSE)}
                        id={`portefolje.tabell.utlopsdato`}
                    />
                    <Listeoverskrift
                        className="listeoverskrift__dato listeoverskrift col col-xs-2"
                        skalVises={!!filtervalg && filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_NAV && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
                        id={'portefolje.tabell.svarfranav'}
                    />
                    <Listeoverskrift
                        className="listeoverskrift__dato listeoverskrift col col-xs-2"
                        skalVises={!!filtervalg && filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_BRUKER && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
                        id={'portefolje.tabell.svarfrabruker'}
                    />
                    <Listeoverskrift
                        className="listeoverskrift__dato listeoverskrift col col-xs-2"
                        skalVises={!!filtervalg && filtervalg.brukerstatus === UTLOPTE_AKTIVITETER && valgteKolonner.includes(Kolonne.UTLOPTE_AKTIVITETER)}
                        id={'portefolje.tabell.utlopaktivitet'}
                    />
                    <Listeoverskrift
                        className="listeoverskrift__dato listeoverskrift col col-xs-2"
                        skalVises={!!filtervalg && filtervalg.brukerstatus === I_AVTALT_AKTIVITET && valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
                        id={'portefolje.tabell.aktivitet.neste.utlop'}
                    />
                    <Listeoverskrift
                        className="listeoverskrift__dato listeoverskrift col col-xs-2"
                        skalVises={!!filtervalg && !!valgtAktivitetstype && filtervalg.tiltakstyper.length === 0 && valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET)}
                        id={'portefolje.tabell.aktivitet.neste.utlop.aktivitetstype'}
                        values={{ aktivitetstype: valgtAktivitetstype ? valgtAktivitetstype.toLowerCase() : null }}
                    />
                    <Listeoverskrift
                        className="listeoverskrift__veileder listeoverskrift col col-xs-1"
                        skalVises={valgteKolonner.includes(Kolonne.VEILEDER) || valgteKolonner.includes(Kolonne.NAVIDENT)}
                        id="enhet.portefolje.tabell.veileder"
                    />
                </div>
            </div>
            <div className="brukerliste--border-bottom">
                <div className="brukerliste__sorteringheader typo-undertekst">
                    <SorteringHeader
                        sortering="etternavn"
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === 'etternavn'}
                        tekstId="portefolje.tabell.etternavn"
                        className={'col col-xs-3'}
                    />
                    <SorteringHeader
                        sortering="fodselsnummer"
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === 'fodselsnummer'}
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
                        sortering={VENTER_PA_SVAR_FRA_NAV}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === VENTER_PA_SVAR_FRA_NAV}
                        tekstId="portefolje.tabell.ddmmyy"
                        skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_NAV && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
                        className={'sortering-header__dato col col-xs-2'}
                    />
                    <SorteringHeader
                        sortering={VENTER_PA_SVAR_FRA_BRUKER}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === VENTER_PA_SVAR_FRA_BRUKER}
                        tekstId="portefolje.tabell.ddmmyy"
                        skalVises={filtervalg.brukerstatus === VENTER_PA_SVAR_FRA_BRUKER && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
                        className={'sortering-header__dato col col-xs-2'}
                    />
                    <SorteringHeader
                        sortering={UTLOPTE_AKTIVITETER}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === UTLOPTE_AKTIVITETER}
                        tekstId="portefolje.tabell.ddmmyy"
                        skalVises={filtervalg.brukerstatus === UTLOPTE_AKTIVITETER && valgteKolonner.includes(Kolonne.UTLOPTE_AKTIVITETER)}
                        className={'sortering-header__dato col col-xs-2'}
                    />
                    <SorteringHeader
                        sortering={I_AVTALT_AKTIVITET}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === I_AVTALT_AKTIVITET}
                        tekstId="portefolje.tabell.ddmmyy"
                        skalVises={filtervalg.brukerstatus === I_AVTALT_AKTIVITET && valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
                        className={'sortering-header__dato col col-xs-2'}
                    />
                    <SorteringHeader
                        sortering={lagAktiviteterSorteringsfelt(valgtAktivitetstype)}
                        onClick={sorteringOnClick}
                        rekkefolge={sorteringsrekkefolge}
                        erValgt={sorteringsfelt === lagAktiviteterSorteringsfelt(valgtAktivitetstype)}
                        tekstId="portefolje.tabell.ddmmyy"
                        skalVises={!!valgtAktivitetstype && filtervalg.tiltakstyper.length === 0 && valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET)}
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
