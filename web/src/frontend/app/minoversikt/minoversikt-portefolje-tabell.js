import React, { PropTypes as PT } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Utlopsdatokolonne from '../tabell/kolonne_utlopsdato';
import Tabelletiketter from './../components/tabelletiketter/tabelletiketter';
import { ytelseFilterErAktiv } from '../utils/utils';
import { settBrukerSomMarkert, markerAlleBrukere } from '../ducks/portefolje';
import { enhetShape, veilederShape, filtervalgShape } from './../proptype-shapes';
import { ytelsevalg } from './../filtrering/filter-konstanter';

function MinoversiktTabell({ settMarkert, settSomMarkertAlle, portefolje, veileder, settSorteringOgHentPortefolje,
    filtervalg, sorteringsrekkefolge, valgtEnhet }) {
    const { brukere } = portefolje.data;
    const settSammenNavn = (bruker) => {
        if (bruker.etternavn === '' && bruker.fornavn === '') {
            return '';
        }
        return `${bruker.etternavn}, ${bruker.fornavn}`;
    };

    const utlopsdatoNavn = filtervalg.ytelse === ytelsevalg.AAP_MAXTID ? 'aapMaxtid' : 'utlopsdato';
    const sorterEtternavn = portefolje.sorteringsfelt === 'etternavn';
    const sorterFodelsnummer = portefolje.sorteringsfelt === 'fodselsnummer';
    const sorterUtlopsdato = ['utlopsdato', 'aapmaxtid'].includes(portefolje.sorteringsfelt);
    const sorterArbeidsliste = portefolje.sorteringsfelt === 'arbeidsliste';

    const alleMarkert = brukere.length > 0 && brukere.every((bruker) => bruker.markert);

    const utlopsdatoHeader = !!filtervalg && ytelseFilterErAktiv(filtervalg.ytelse) ?
        (<th className="tabell-element-center">
            <FormattedMessage id={`portefolje.tabell.${utlopsdatoNavn}`} />
        </th>)
        :
        null;

    const fodselsnummerHeader = (
        <th className="tabell-element-center">
            <button
                onClick={() => settSorteringOgHentPortefolje('fodselsnummer')}
                className={classNames('lenke lenke--frittstaende', { valgt: sorterFodelsnummer })}
                aria-pressed={sorterFodelsnummer}
                aria-label={sorterFodelsnummer && sorteringsrekkefolge !== 'ikke_satt' ?
                    sorteringsrekkefolge : 'inaktiv'}
            >
                <FormattedMessage id="portefolje.tabell.fodselsnummer" />
            </button>
        </th>
    );

    const ddmmyyUtlopsdatoHeader = (<th className="tabell-element-center">
        <button
            onClick={() => settSorteringOgHentPortefolje(utlopsdatoNavn)}
            className={classNames('lenke lenke--frittstaende', { valgt: sorterUtlopsdato })}
            aria-pressed={sorterUtlopsdato}
            aria-label={(sorterUtlopsdato && sorteringsrekkefolge !== 'ikke_satt') ?
                sorteringsrekkefolge : 'inaktiv'}
        >
            <FormattedMessage id="portefolje.tabell.ddmmyy" />
        </button>
    </th>);

    const ddmmyyArbeidslisteHeader = (<th className="tabell-element-center">
        <button
            onClick={() => settSorteringOgHentPortefolje(utlopsdatoNavn)}
            className={classNames('lenke lenke--frittstaende', { valgt: sorterArbeidsliste })}
            aria-pressed={sorterArbeidsliste}
            aria-label={(sorterArbeidsliste && sorteringsrekkefolge !== 'ikke_satt') ?
                sorteringsrekkefolge : 'inaktiv'}
        >
            <FormattedMessage id="portefolje.tabell.ddmmyy" />
        </button>
    </th>);

    const navnHeader = (
        <th>
            <button
                onClick={() => settSorteringOgHentPortefolje('etternavn')}
                role="button"
                className={classNames('lenke lenke--frittstaende', { valgt: sorterEtternavn })}
                aria-pressed={sorterEtternavn}
                aria-label={sorterEtternavn && sorteringsrekkefolge !== 'ikke_satt' ?
                    sorteringsrekkefolge : 'inaktiv'}
            >
                <FormattedMessage id="portefolje.tabell.navn" />
            </button>
        </th>
    );

    return (
        <div>
            <table className="tabell portefolje-tabell typo-avsnitt">
                <thead className="extra-head">
                    <tr>
                        <th />
                        <th>
                            <FormattedMessage id="enhet.portefolje.tabell.bruker" />
                        </th>
                        <th />
                        <th className="tabell-element-center">
                            <FormattedMessage id="enhet.portefolje.tabell.arbeidsliste" />
                        </th>
                        {utlopsdatoHeader}
                        <th />
                    </tr>
                </thead>
                <thead className="tabell__subhead">
                    <tr>
                        <th>
                            <div className="skjema__input">
                                <input
                                    className="checkboks"
                                    id="checkbox-alle-brukere"
                                    type="checkbox"
                                    checked={alleMarkert}
                                    onClick={() => settSomMarkertAlle(!alleMarkert)}
                                />
                                <label className="skjema__label" htmlFor="checkbox-alle-brukere" />
                            </div>
                        </th>
                        {navnHeader}
                        {fodselsnummerHeader}
                        {ddmmyyArbeidslisteHeader}
                        {ytelseFilterErAktiv(filtervalg.ytelse) ? ddmmyyUtlopsdatoHeader : null}
                        <th />
                    </tr>
                </thead>

                <tbody>
                    {brukere.filter((b) => b.veilederId === veileder.ident)
                    .map((bruker) => <tr key={bruker.fnr}>
                        <td>
                            <div className="skjema__input">
                                <input
                                    className="checkboks"
                                    id={`checkbox-${bruker.fnr}`}
                                    type="checkbox"
                                    checked={!!bruker.markert}
                                    onClick={() => settMarkert(bruker.fnr, !bruker.markert)}
                                />
                                <label className="skjema__label" htmlFor={`checkbox-${bruker.fnr}`} />
                            </div>
                        </td>
                        <th>
                            <a
                                href={`https://${window.location.hostname}` +
                                `/veilarbpersonflatefs/${bruker.fnr}?enhet=${valgtEnhet.enhet.enhetId}`}
                                className="lenke lenke--frittstaende"
                            >
                                {settSammenNavn(bruker)}
                            </a>
                        </th>

                        {bruker.fnr !== null ?
                            <td className="tabell-element-center">{bruker.fnr}</td> :
                            <td className="ny-bruker-td">
                                <span className="ny-bruker">
                                    <FormattedMessage id="enhet.portefolje.tabelletikett.ny.bruker" />
                                </span>
                            </td>
                        }
                        <td />
                        {
                            ytelseFilterErAktiv(filtervalg.ytelse) ?
                                <Utlopsdatokolonne bruker={bruker} ytelse={filtervalg.ytelse} />
                                : null
                        }
                        <td>
                            {bruker.sikkerhetstiltak.length > 0 ?
                                <Tabelletiketter type="sikkerhetstiltak">
                                    <FormattedMessage id="enhet.portefolje.tabelletikett.sikkerhetstiltak" />
                                </Tabelletiketter> : null}
                            {bruker.diskresjonskode !== null ?
                                <Tabelletiketter type="diskresjonskode">
                                    {`Kode ${bruker.diskresjonskode}`}
                                </Tabelletiketter> : null}
                            {bruker.egenAnsatt === true ?
                                <Tabelletiketter type="egen-ansatt">
                                    <FormattedMessage id="enhet.portefolje.tabelletikett.egen.ansatt" />
                                </Tabelletiketter> : null}
                            {bruker.erDoed === true ?
                                <Tabelletiketter type="doed">
                                    <FormattedMessage id="enhet.portefolje.tabelletikett.dod" />
                                </Tabelletiketter> : null}
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}

MinoversiktTabell.propTypes = {
    portefolje: PT.shape({
        data: PT.shape({
            brukere: PT.arrayOf(PT.object).isRequired,
            antallTotalt: PT.number.isRequired,
            antallReturnert: PT.number.isRequired,
            fraIndex: PT.number.isRequired
        }).isRequired,
        sorteringsrekkefolge: PT.string.isRequired
    }).isRequired,
    valgtEnhet: enhetShape.isRequired,
    veileder: veilederShape.isRequired,
    sorteringsrekkefolge: PT.string.isRequired,
    settMarkert: PT.func.isRequired,
    settSomMarkertAlle: PT.func.isRequired,
    filtervalg: filtervalgShape.isRequired,
    settSorteringOgHentPortefolje: PT.func.isRequired
};


const mapStateToProps = (state) => ({
    portefolje: state.portefolje,
    valgtEnhet: state.enheter.valgtEnhet,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    filtervalg: state.filtreringMinoversikt
});

const mapDispatchToProps = (dispatch) => ({
    settMarkert: (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert)),
    settSomMarkertAlle: (markert) => dispatch(markerAlleBrukere(markert))
});

export default connect(mapStateToProps, mapDispatchToProps)(MinoversiktTabell);

