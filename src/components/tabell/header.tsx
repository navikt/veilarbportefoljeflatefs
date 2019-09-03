import * as React from 'react';
import classNames from 'classnames';

export interface HeaderProps {
    skalVises?: boolean | null;
    className?: string;
    children?: React.ReactNode;
}

function Header({ children, skalVises = true, className = '' }: HeaderProps) {
    if (!skalVises) {
        return null;
    }
    return (
        <span className={classNames('sortering-header', className)}>
            {children}
        </span>
    );
}

export default Header;
