import * as React from 'react';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import SorteringHeader from '../components/tabell/sortering-header';
import { ytelseFilterErAktiv } from '../utils/utils';
import Listeoverskrift from '../utils/listeoverskrift';
import { filtervalgShape } from './../proptype-shapes';
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

type Props = EnhetListehodeProps & InjectedIntlProps;

function EnhetListehode({ sorteringsrekkefolge, sorteringOnClick, filtervalg, sorteringsfelt, valgteKolonner, intl }: Props) {
    const { ytelse } = filtervalg;
    const erAapYtelse = Object.keys(ytelseAapSortering()).includes(ytelse);
    const aapRettighetsperiode = erAapYtelse ? ytelseAapSortering()[ytelse].rettighetsperiode : '';
    const ytelseUtlopsdatoNavn = erAapYtelse ? ytelseAapSortering()[ytelse].vedtaksperiode : ytelseUtlopsSortering(intl)[filtervalg.ytelse];
    const harValgteAktivitetstyper = harValgteAktiviteter(filtervalg.aktiviteter);
    const ytelseSorteringHeader = ytelseUtlopsdatoNavn === 'utlopsdato' || erAapYtelse ? 'periode' : 'uker';
    const ferdigfilterListe = !!filtervalg ? filtervalg.ferdigfilterListe : '';

    return (
        <div className="brukerliste__header">
            <div className="brukerliste--borders">
                <div className="brukerliste__overskriftheader">
                    <div className="brukerliste__gutter-left brukerliste--min-width-enhet"/>
                    <div className="brukerliste__innhold">
                        <div className="col col-xs-4">
                            <Listeoverskrift
                                className="listeoverskrift__bruker listeoverskriftcol col col-xs-8"
                                id="enhet.portefolje.tabell.bruker"
                            />
                        </div>
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col col-xs-2"
                            skalVises={!!filtervalg && ytelseFilterErAktiv(filtervalg.ytelse) && valgteKolonner.includes(Kolonne.UTLOP_YTELSE)}
                            id={`portefolje.tabell.utlopsdato`}
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col col-xs-2"
                            skalVises={!!filtervalg && ytelseFilterErAktiv(filtervalg.ytelse) && erAapYtelse}
                            id={`portefolje.tabell.utlopsdato`}
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskriftcol col col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV) && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
                            id={'portefolje.tabell.svarfranav'}
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskrift col col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_BRUKER) && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
                            id={'portefolje.tabell.svarfrabruker'}
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskrift col col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(UTLOPTE_AKTIVITETER) && valgteKolonner.includes(Kolonne.UTLOPTE_AKTIVITETER)}
                            id={'portefolje.tabell.utlopaktivitet'}
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskrift col col-xs-2"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) && valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
                            id={'portefolje.tabell.aktivitet.neste.utlop'}
                        />
                        <Listeoverskrift
                            className="listeoverskrift__dato listeoverskrift col col-xs-2"
                            skalVises={!!filtervalg && harValgteAktivitetstyper && filtervalg.tiltakstyper.length === 0 && valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET)}
                            id={'portefolje.tabell.aktivitet.neste.utlop.aktivitetstype'}

                        />
                        <div className="col col-xs-4">
                            <Listeoverskrift
                                className="listeoverskrift__veileder listeoverskrift col col-xs-1"
                                skalVises={valgteKolonner.includes(Kolonne.VEILEDER)|| valgteKolonner.includes(Kolonne.NAVIDENT)}
                                id="enhet.portefolje.tabell.veileder"
                            />
                        </div>
                    </div>
                    <div className="brukerliste__gutter-right"/>
                </div>
            </div>
            <div className="brukerliste--border-bottom">
                <div className="brukerliste__sorteringheader typo-undertekst">
                    <div className="brukerliste__gutter-left brukerliste--min-width-enhet"/>
                    <div className="brukerliste__innhold">
                        <div className="col col-xs-4">
                            <SorteringHeader
                                sortering={Sorteringsfelt.ETTERNAVN}
                                onClick={sorteringOnClick}
                                rekkefolge={sorteringsrekkefolge}
                                erValgt={sorteringsfelt === Sorteringsfelt.ETTERNAVN}
                                tekstId="portefolje.tabell.etternavn"
                                className={'col col-xs-7'}
                            />
                            <SorteringHeader
                                sortering={Sorteringsfelt.FODSELSNUMMER}
                                onClick={sorteringOnClick}
                                rekkefolge={sorteringsrekkefolge}
                                erValgt={sorteringsfelt === Sorteringsfelt.FODSELSNUMMER}
                                tekstId="portefolje.tabell.fodselsnummer"
                                className={'col col-xs-5'}
                            />
                        </div>
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
                            sortering={aapRettighetsperiode}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === aapRettighetsperiode}
                            tekstId="portefolje.tabell.uker"
                            skalVises={ytelseFilterErAktiv(filtervalg.ytelse) && erAapYtelse}
                            className={'sortering-header__dato col col-xs-2'}
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.VENTER_PA_SVAR_FRA_NAV}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.VENTER_PA_SVAR_FRA_NAV}
                            tekstId="portefolje.tabell.ddmmyy"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV) && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
                            className={'sortering-header__dato col col-xs-2'}
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.VENTER_PA_SVAR_FRA_BRUKER}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.VENTER_PA_SVAR_FRA_BRUKER}
                            tekstId="portefolje.tabell.ddmmyy"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_BRUKER) && valgteKolonner.includes(Kolonne.VENTER_SVAR)}
                            className={'sortering-header__dato col col-xs-2'}
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.UTLOPTE_AKTIVITETER}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.UTLOPTE_AKTIVITETER}
                            tekstId="portefolje.tabell.ddmmyy"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(UTLOPTE_AKTIVITETER) && valgteKolonner.includes(Kolonne.UTLOPTE_AKTIVITETER)}
                            className={'sortering-header__dato col col-xs-2'}
                        />
                        <SorteringHeader
                            sortering={Sorteringsfelt.I_AVTALT_AKTIVITET}
                            onClick={sorteringOnClick}
                            rekkefolge={sorteringsrekkefolge}
                            erValgt={sorteringsfelt === Sorteringsfelt.I_AVTALT_AKTIVITET}
                            tekstId="portefolje.tabell.ddmmyy"
                            skalVises={!!ferdigfilterListe && ferdigfilterListe.includes(I_AVTALT_AKTIVITET) && valgteKolonner.includes(Kolonne.AVTALT_AKTIVITET)}
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
                        <div className="col col-xs-4">
                            <SorteringHeader
                                sortering={Sorteringsfelt.NAVIDENT}
                                onClick={sorteringOnClick}
                                rekkefolge={sorteringsrekkefolge}
                                erValgt={sorteringsfelt === Sorteringsfelt.NAVIDENT}
                                tekstId="enhet.veiledere.tabell.ident"
                                skalVises={valgteKolonner.includes(Kolonne.NAVIDENT)}
                                className="header__veilederident col col-xs-4"
                            />
                            <Header
                                id="enhet.veiledere.tabell.navn"
                                className="col col-xs-8"
                                skalVises={valgteKolonner.includes(Kolonne.VEILEDER)}
                            />
                        </div>
                    </div>
                    <div className="brukerliste__gutter-right"/>
                </div>
            </div>
        </div>
    );
}

export default injectIntl(EnhetListehode);
