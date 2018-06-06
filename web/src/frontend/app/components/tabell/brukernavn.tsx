import * as React from 'react';
import * as classnames from 'classnames';
import { BrukerModell } from '../../model-interfaces';
import { FormattedMessage } from 'react-intl';
import {setFraBrukerIUrl} from "../../utils/url-utils";

const settSammenNavn = (bruker) => {
    if (bruker.etternavn === '' && bruker.fornavn === '') {
        return '';
    }
    return `${bruker.etternavn}, ${bruker.fornavn}`;
};

const brukerNavn = (className, bruker, enhetId) => (
    <div className={className}>
        <a
            onClick={() => {
                setFraBrukerIUrl(bruker.fnr);
            }}
            href={`${window.location.origin}/veilarbpersonflatefs/${bruker.fnr}?enhet=${enhetId}`}
            className={classnames('lenke lenke--frittstaende ')}

        >
        {settSammenNavn(bruker)}
        </a>
    </div>
);

interface BrukerNavnProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: string;
}

function BrukerNavn({ className, bruker, enhetId }: BrukerNavnProps) {
    return (
        <FormattedMessage id="listevisning.bruker.i.arbeidsliste">
            {(label) => (
                    brukerNavn(className,bruker, enhetId)
            )}
        </FormattedMessage>
    );
}

export default BrukerNavn;
