import * as React from 'react';
import classNames from 'classnames';

interface ArbeidslisteikonProps {
    className?: string;
    skalVises: boolean;
}

const cls = (className?: string) => className ? classNames('arbeidsliste--ikon', className) : 'arbeidsliste--ikon';

export default ({ className, skalVises}: ArbeidslisteikonProps) => {
    return <span className={ skalVises ? cls(className) : className}/>;
};
