import * as React from 'react';
import classnames from 'classnames';
import {BrukerModell} from '../../model-interfaces';
import {setFraBrukerIUrl} from '../../utils/url-utils';
import '../../topp-meny/lenker.less';
import {OrNothing} from '../../utils/types/types';
import {BodyShort, Link} from '@navikt/ds-react';

interface BrukerNavnProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: OrNothing<string>;
}

const BrukerNavn = ({className, bruker, enhetId}: BrukerNavnProps) => {
    const settSammenNavn = bruker => {
        if (bruker.etternavn === '' && bruker.fornavn === '') {
            return '';
        }
        return `${bruker.etternavn}, ${bruker.fornavn}`;
    };

    return (
        <div className={className}>
            <Link
                onClick={() => {
                    setFraBrukerIUrl(bruker.fnr);
                }}
                href={`${window.location.origin}/veilarbpersonflatefs/${bruker.fnr}?enhet=${enhetId}`}
                className={classnames('lenke lenke--frittstaende')}
            >
                <BodyShort size="small">{settSammenNavn(bruker)}</BodyShort>
            </Link>
        </div>
    );
};

export default BrukerNavn;