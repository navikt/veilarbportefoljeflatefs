import * as React from 'react';
import * as classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

interface SorteringHeaderProps {
    sortering: string;
    onClick: (sortering: string) => void;
    rekkefolge: string;
    erValgt: boolean;
    tekstId: string;
    skalVises?: boolean;
    className?: string;
}

function SorteringHeader({ sortering, onClick, rekkefolge, erValgt, tekstId, skalVises = true, className = '' }: SorteringHeaderProps) {
    if (!skalVises) {
        return null;
    }
    return (
        <span className={classNames(`sortering-header__${sortering}`, className)}>
            <button
                onClick={() => onClick(sortering)}
                className={classNames('lenke lenke--frittstaende', { valgt: erValgt })}
                aria-pressed={erValgt}
                aria-label={erValgt && rekkefolge !== 'ikke_satt' ?
                rekkefolge : 'inaktiv'}
            >
                <FormattedMessage id={tekstId} />
            </button>
            {sortering === 'etternavn' ?
                <FormattedMessage id="portefolje.tabell.fornavn" /> : null
            }
        </span>
    );
}

export default SorteringHeader;
