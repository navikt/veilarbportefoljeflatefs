import * as React from 'react';
import classNames from 'classnames';

export interface HeaderProps {
    skalVises?: boolean | null;
    className?: string;
    children?: React.ReactNode;
    title?: string;
}

function Header({ children, skalVises = true, className = '', title }: HeaderProps) {
    if (!skalVises) {
        return null;
    }
    return (
        <span title={title} className={classNames('sortering-header', className)}>
            {children}
        </span>
    );
}

export default Header;
