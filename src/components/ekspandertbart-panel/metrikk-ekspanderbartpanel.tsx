import React, {PropsWithChildren, useState} from 'react';
import Ekspanderbartpanel, {EkspanderbartpanelProps} from 'nav-frontend-ekspanderbartpanel';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';
import hiddenIf from '../hidden-if/hidden-if';
import '../toolbar/toolbar.less';
import classNames from "classnames";

interface MetrikkEkspanderbartpanelProps {
    lamellNavn: string;
    apen: boolean;
    skalVises?: boolean;
    onClick?: () => void;
    className?: string;
}

type AllProps = MetrikkEkspanderbartpanelProps & EkspanderbartpanelProps;

function MetrikkEkspanderbartpanel(props: PropsWithChildren<AllProps>) {
    const [isApen, setIsApen] = useState(props.apen);

    const handleOnClick = () => {
        setIsApen(!isApen);
        if (props.onClick) {
            props.onClick()
        }
        logEvent('portefolje.metrikker.lamell', {
            navn: props.lamellNavn,
            apen: !isApen,
            sideNavn: finnSideNavn(),
        });
    };

    if (!!props.skalVises) {
        return null;
    }

    const {children, onClick, lamellNavn, className, ...rest} = props;
    return (
        <div className={classNames("blokk-xxs portefolje__ekspanderbarpanel", className)}>
            <Ekspanderbartpanel
                border={true}
                onClick={handleOnClick}
                {...rest}
            >
                {children}
            </Ekspanderbartpanel>
        </div>
    );
}

export default hiddenIf(MetrikkEkspanderbartpanel);
