import * as React from 'react';
import classNames from 'classnames';
import './tabell.less';

export interface HeaderProps {
    role?: string;
    skalVises?: boolean | null;
    className?: string;
    children?: React.ReactNode;
    title?: string;
    headerId: string;
}

function Header({children, skalVises = true, className = '', title, headerId}: HeaderProps) {
    if (!skalVises) {
        return null;
    }
    return (
        <span
            id={headerId}
            title={title}
            className={classNames('sorteringheader', className, `sorteringheader_${headerId}`)}
            data-testid={`sorteringheader_${headerId}`}
        >
            {children}
        </span>
    );
}

export default Header;
