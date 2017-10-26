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
                    brukerNavn(bruker, enhetId)
            )}
        </FormattedMessage>
    );
}

export default BrukerNavn;
