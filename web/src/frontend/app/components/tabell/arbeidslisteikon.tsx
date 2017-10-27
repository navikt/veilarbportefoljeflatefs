import * as React from 'react'
import * as classNames from 'classnames';

interface ArbeidslisteikonProps {
    className?: string;
    skalVises: boolean;
}

const cls = (className?: string) => classNames('arbeidsliste--ikon', className);

export default ({ className, skalVises}: ArbeidslisteikonProps) => {
    return <div className={ skalVises ? cls(className) : className}>&nbsp;</div>;
}
