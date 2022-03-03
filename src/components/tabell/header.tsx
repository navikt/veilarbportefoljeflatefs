import * as React from 'react';
import classNames from 'classnames';
import './tabell.less';
import {BodyShort} from '@navikt/ds-react';

export interface HeaderProps {
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
        <BodyShort
            size="small"
            title={title}
            className={classNames('sorteringheader', className, `sorteringheader_${headerId}`)}
            data-testid={`sorteringheader_${headerId}`}
        >
            {children}
        </BodyShort>
    );
}

export default Header;
