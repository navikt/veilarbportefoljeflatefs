import * as React from 'react';
import classnames from 'classnames';
import {BrukerModell} from '../../model-interfaces';
import {getPersonUrl, setFraBrukerIUrl} from '../../utils/url-utils';
import '../../topp-meny/lenker.less';
import {BodyShort, Link} from '@navikt/ds-react';

interface BrukerNavnProps {
    className?: string;
    bruker: BrukerModell;
}

const BrukerNavn = ({className, bruker}: BrukerNavnProps) => {
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
                href={getPersonUrl(bruker.fnr)}
                className={classnames('lenke lenke--frittstaende')}
            >
                <BodyShort size="small">{settSammenNavn(bruker)}</BodyShort>
            </Link>
        </div>
    );
};

export default BrukerNavn;
