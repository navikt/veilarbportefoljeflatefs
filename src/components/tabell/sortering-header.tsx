import * as React from 'react';
import classNames from 'classnames';
import { Sorteringsfelt, Sorteringsrekkefolge } from '../../model-interfaces';
import Header, { HeaderProps } from './header';

interface SorteringHeaderProps extends HeaderProps {
    sortering: Sorteringsfelt;
    onClick: (sortering: string) => void;
    rekkefolge: Sorteringsrekkefolge;
    erValgt: boolean;
    tekst: string;
}

function SorteringHeader({ sortering, onClick, rekkefolge, erValgt, tekst, skalVises = true, className = '' }: SorteringHeaderProps) {
    return (
        <Header skalVises={skalVises} className={className}>
            <button
                onClick={() => onClick(sortering)}
                className={classNames('lenke lenke--frittstaende text--left', { valgt: erValgt }, {'valgt-sortering': erValgt})}
                aria-pressed={erValgt}
                aria-label={erValgt && rekkefolge !== Sorteringsrekkefolge.ikke_satt ?
                rekkefolge : 'inaktiv'}
            >
                {tekst}
            </button>
            {sortering === 'etternavn' ?
                ', Fornavn' : null
            }
        </Header>
    );
}

export default SorteringHeader;
