import * as React from 'react';
import classnames from 'classnames';
import {BrukerModell} from '../../model-interfaces';
import {setFraBrukerIUrl} from '../../utils/url-utils';
import '../../topp-meny/lenker.less';
import {OrNothing} from '../../utils/types/types';
import {Link} from '@navikt/ds-react';

const settSammenNavn = bruker => {
    if (bruker.etternavn === '' && bruker.fornavn === '') {
        return '';
    }
    return `${bruker.etternavn}, ${bruker.fornavn}`;
};

const brukerNavn = (className, bruker, enhetId) => (
    <div className={className}>
        <Link
            onClick={() => {
                setFraBrukerIUrl(bruker.fnr);
            }}
            href={`${window.location.origin}/veilarbpersonflatefs/${bruker.fnr}?enhet=${enhetId}`}
            className={classnames('lenke lenke--frittstaende')}
        >
            {settSammenNavn(bruker)}
        </Link>
    </div>
);

interface BrukerNavnProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: OrNothing<string>;
}

function BrukerNavn({className, bruker, enhetId}: BrukerNavnProps) {
    return brukerNavn(className, bruker, enhetId);
}

export default BrukerNavn;
