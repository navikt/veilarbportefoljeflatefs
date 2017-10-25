import * as React from 'react';
import * as classnames from 'classnames';
import { BrukerModell } from '../../model-interfaces';
import { FormattedMessage } from 'react-intl';

const settSammenNavn = (bruker) => {
    if (bruker.etternavn === '' && bruker.fornavn === '') {
        return '';
    }
    return `${bruker.etternavn}, ${bruker.fornavn}`;
};

const brukerIArbeidslisteNavn = (bruker, enhetId, arialabel) => (
        <a
            href={`https://${window.location.hostname}` +
            `/veilarbpersonflatefs/${bruker.fnr}?enhet=${enhetId}`}
            className={classnames('lenke lenke--frittstaende brukerinformasjon__navn', 'arbeidslistebruker', 'col', 'col-xs-3')}
            aria-label={arialabel}
        >
            {settSammenNavn(bruker)}
        </a>
);

const brukerNavn = (bruker, enhetId) => (
    <div className="brukerliste__panelelement col col-xs-3">
        <a
        href={`https://${window.location.hostname}` +
                `/veilarbpersonflatefs/${bruker.fnr}?enhet=${enhetId}`}
        className={classnames('lenke lenke--frittstaende ')}

    >
        {settSammenNavn(bruker)}
    </a></div>
);

interface BrukerNavnProps {
    bruker: BrukerModell;
    enhetId: string;
}

function BrukerNavn({ bruker, enhetId }: BrukerNavnProps) {
    return (
        <FormattedMessage id="listevisning.bruker.i.arbeidsliste">
            {(label) => (
                <div className="brukerinformasjon__wrapper">
                    {bruker.arbeidsliste.arbeidslisteAktiv ? brukerIArbeidslisteNavn(bruker, enhetId, label) : brukerNavn(bruker, enhetId)}
                </div>
            )}
        </FormattedMessage>
    );
}

export default BrukerNavn;
