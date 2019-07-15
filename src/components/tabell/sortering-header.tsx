import * as React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Sorteringsfelt, Sorteringsrekkefolge } from '../../model-interfaces';
import Header, {HeaderProps} from "./header";

interface SorteringHeaderProps extends HeaderProps{
    sortering: Sorteringsfelt;
    onClick: (sortering: string) => void;
    rekkefolge: Sorteringsrekkefolge;
    erValgt: boolean;
    tekstId: string;
}

function SorteringHeader({ sortering, onClick, rekkefolge, erValgt, tekstId, skalVises = true, className = '' }: SorteringHeaderProps) {
    return (
        <Header skalVises={skalVises} className={className}>
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
        </Header>
    );
}

export default SorteringHeader;
