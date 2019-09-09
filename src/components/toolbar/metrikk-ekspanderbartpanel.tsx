import React from 'react';
import Ekspanderbartpanel, { EkspanderbartpanelProps } from 'nav-frontend-ekspanderbartpanel';
import { logEvent } from '../../utils/frontend-logger';
import { finnSideNavn } from '../../middleware/metrics-middleware';
import {PropsWithChildren, useState} from 'react';

interface MetrikkEkspanderbartpanelProps {
    lamellNavn: string;
    skalVises?: boolean;
}

type AllProps = MetrikkEkspanderbartpanelProps & EkspanderbartpanelProps;

function MetrikkEkspanderbartpanel (props: PropsWithChildren<AllProps>){
    if(!!props.skalVises) {
        return null;
    }

    const[isApen, setIsApen] = useState(false);

    const handleOnClick = () => {
        setIsApen(!isApen);
        logEvent('portefolje.metrikker.lamell', { navn: props.lamellNavn, apen: isApen, sideNavn: finnSideNavn() });
    };
    const { children, onClick, lamellNavn, ...rest } = props;
    return (
        <div className="blokk-xxs portefolje__ekspanderbarpanel">
            <Ekspanderbartpanel
                onClick={handleOnClick}
                {...rest}
            >
                {children}
            </Ekspanderbartpanel>
        </div>
    );
}

export default MetrikkEkspanderbartpanel;
