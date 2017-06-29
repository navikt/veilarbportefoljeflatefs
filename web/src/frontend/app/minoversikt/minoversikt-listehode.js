import React, { PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import SorteringHeader from './sortering-header';
import { ytelsevalg } from './../filtrering/filter-konstanter';
import { ytelseFilterErAktiv } from '../utils/utils';
import Listeoverskrift from '../utils/listeoverskrift';
import { filtervalgShape } from './../proptype-shapes';


function MinOversiktListeHode({ sorteringsrekkefolge, sorteringOnClick, filtervalg, sorteringsfelt }) {
    const ytelseUtlopsdatoNavn = filtervalg.ytelse === ytelsevalg.AAP_MAXTID ? 'aapMaxtid' : 'utlopsdato';

    return (
        <div className="minoversikt-listehode">
            <div className="minoversikt-overskrifter">
                <Listeoverskrift className="listeoverskrift__bruker listeoverskrift">
                    <FormattedMessage id="enhet.portefolje.tabell.bruker" />
                </Listeoverskrift>
                <Listeoverskrift
                    className="listeoverskrift__dato listeoverskrift"
                    skalVises={!!filtervalg && ytelseFilterErAktiv(filtervalg.ytelse)}
                >
                    <FormattedMessage id={`portefolje.tabell.${ytelseUtlopsdatoNavn}`} />
                </Listeoverskrift>
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
                    sortering={ytelseUtlopsdatoNavn}
                    onClick={sorteringOnClick}
                    rekkefolge={sorteringsrekkefolge}
                    erValgt={['utlopsdato', 'aapmaxtid'].includes(sorteringsfelt)}
                    tekstId="portefolje.tabell.ddmmyy"
                    skalVises={ytelseFilterErAktiv(filtervalg.ytelse)}
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
