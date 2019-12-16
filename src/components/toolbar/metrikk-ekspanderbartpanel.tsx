import React from 'react';
import Ekspanderbartpanel, { EkspanderbartpanelProps } from 'nav-frontend-ekspanderbartpanel';
import { logEvent } from '../../utils/frontend-logger';
import { finnSideNavn } from '../../middleware/metrics-middleware';
import { PropsWithChildren, useState } from 'react';
import hiddenIf from '../hidden-if/hidden-if';
import getStore from '../../store';

interface MetrikkEkspanderbartpanelProps {
    lamellNavn: string;
    skalVises?: boolean;
}

type AllProps = MetrikkEkspanderbartpanelProps & EkspanderbartpanelProps;

function MetrikkEkspanderbartpanel(props: PropsWithChildren<AllProps>) {
    const [isApen, setIsApen] = useState(false);

    const handleOnClick = () => {
        setIsApen(!isApen);
        logEvent('portefolje.metrikker.lamell', {
                navn: props.lamellNavn,
                apen: isApen,
                sideNavn: finnSideNavn(),
                antallGrupper: getStore().getState().lagretFilter.data.length
            },
            // @ts-ignore
            {enhetId: getStore().getState().enheter.valgtEnhet.enhet.enhetId});
    };

    if (!!props.skalVises) {
        return null;
    }

    const {children, onClick, lamellNavn, ...rest} = props;
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

export default hiddenIf(MetrikkEkspanderbartpanel);
