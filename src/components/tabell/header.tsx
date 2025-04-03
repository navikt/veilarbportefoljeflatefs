import {ReactNode} from 'react';
import classNames from 'classnames';
import {BodyShort} from '@navikt/ds-react';
import './tabell.css';

export interface HeaderProps {
    skalVises?: boolean | null;
    className?: string;
    children?: ReactNode;
    title?: string;
    headerTestId?: string;
}

export function Header({children, skalVises = true, className = '', title, headerTestId}: HeaderProps) {
    if (!skalVises) {
        return null;
    }
    return (
        <BodyShort
            size="small"
            title={title}
            className={classNames('sorteringheader', className)}
            data-testid={headerTestId}
        >
            {children}
        </BodyShort>
    );
}
