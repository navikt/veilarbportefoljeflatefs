import * as React from 'react';
import * as classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Sorteringsfelt, Sorteringsrekkefolge } from '../../model-interfaces';

interface SorteringHeaderProps {
    sortering: Sorteringsfelt;
    onClick: (sortering: string) => void;
    rekkefolge: Sorteringsrekkefolge;
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
                className={classNames('lenke lenke--frittstaende', { valgt: erValgt }, {'valgt-sortering': erValgt})}
                aria-pressed={erValgt}
                aria-label={erValgt && rekkefolge !== Sorteringsrekkefolge.ikke_satt ?
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
