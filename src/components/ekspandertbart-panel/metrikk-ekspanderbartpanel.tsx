import {PropsWithChildren, useState} from 'react';
import classNames from 'classnames';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import {EkspanderbartpanelBaseProps} from 'nav-frontend-ekspanderbartpanel/lib/ekspanderbartpanel-base';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';
import '../toolbar/toolbar.css';

interface MetrikkEkspanderbartpanelProps extends EkspanderbartpanelBaseProps {
    lamellNavnForLogging: string;
}

export function MetrikkEkspanderbartpanel({
    tittel,
    lamellNavnForLogging,
    className,
    children
}: PropsWithChildren<MetrikkEkspanderbartpanelProps>) {
    const [isApen, setIsApen] = useState(true);

    const handleOnClick = () => {
        setIsApen(prevState => !prevState);
        logEvent('portefolje.metrikker.lamell', {
            navn: lamellNavnForLogging,
            apen: !isApen,
            sideNavn: finnSideNavn()
        });
    };

    return (
        <div className={classNames('portefolje__ekspanderbarpanel', className)}>
            <Ekspanderbartpanel tittel={tittel} border={true} onClick={handleOnClick} apen={isApen} role="button">
                {children}
            </Ekspanderbartpanel>
        </div>
    );
}
