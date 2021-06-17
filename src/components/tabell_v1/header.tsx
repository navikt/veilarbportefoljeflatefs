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

function Header({children, role, skalVises = true, className = '', title, headerId}: HeaderProps) {
    if (!skalVises) {
        return null;
    }
    return (
        <span
            role={role}
            title={title}
            className={classNames('sorteringheader', className, `sorteringheader_${headerId}`)}
            data-testid={`sorteringheader_${headerId}`}
        >
            {children}
        </span>
    );
}

export default Header;
