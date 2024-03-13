import React, {PropsWithChildren, useState} from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';
import hiddenIf from '../hidden-if/hidden-if';
import '../toolbar/toolbar.css';
import classNames from 'classnames';
import {EkspanderbartpanelBaseProps} from 'nav-frontend-ekspanderbartpanel/lib/ekspanderbartpanel-base';

interface MetrikkEkspanderbartpanelProps extends EkspanderbartpanelBaseProps {
    lamellNavn: string;
}

function MetrikkEkspanderbartpanel({
    lamellNavn,
    tittel,
    className,
    children
}: PropsWithChildren<MetrikkEkspanderbartpanelProps>) {
    const [isApen, setIsApen] = useState(true);

    const handleOnClick = () => {
        setIsApen(prevState => !prevState);
        logEvent('portefolje.metrikker.lamell', {
            navn: lamellNavn,
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

export default hiddenIf(MetrikkEkspanderbartpanel);
