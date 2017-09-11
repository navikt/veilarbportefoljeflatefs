import * as React from 'react';
import { FormattedMessage } from 'react-intl';

interface ListeoverskriftProps {
    id: string;
    skalVises?: boolean;
    className?: string;
    values?: {[id: string]: any};
}

function Listeoverskrift({ id, skalVises=true, className='', values={} }: ListeoverskriftProps) {
    if (!skalVises) {
        return null;
    }
    return (
        <span className={className}>
            <FormattedMessage id={id} values={values} />
        </span>
    );
}

export default Listeoverskrift;
